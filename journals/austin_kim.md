## January 16, 2024

Today, I worked on:

* Project Gamma setup

I was the driver and we created our team Gitlab repo and set up our PostgreSQL database in our docker-compose.yaml, ./api/queries/accounts.py, ./api/Dockerfile.dev files. We also created a test branch to which we will push our developmental changes.

Today I learned how to properly make a merge request (test to main) without squashing the branch a merge request is being made from.

## January 17, 2024

Today I worked on:

* Setting up pgAdmin and starting authentication

For pgAdmin I was the driver and able to create a pg-admin volume so that the configurations I make will survive whenever restarting the service. This was done in the volumes entry in the docker-compose.yaml file. I also added a new service that uses that volume and the official pgAdmin image from hub.docker.com. I then logged in and registered a server.

For starting authentication Kyle was the driver and I helped out along with Clarke and Cameron. We followed the JWTdown for FastAPI tutorial that was supplied to us by the instructors and got through the Installation and customization, Signing Key, and Easy log in and log out sections.

Today I learned that we each need to create a .env file that will store our DATABASE_URL and SIGNING_KEY since when we pull what the driver for that day pushed up to gitlab, the .env file is included in the .gitignore and will not be pulled down. I also learned that when making changes in the requirements.txt file, I need to kill and run my containers as opposed to just restarting them in order for the updated code to go through.

# January 18, 2024

Today I worked on:

* Inserting all of the tables we had previously planned out into our database.

Cameron was the driver and I helped out along with Kyle and Clarke. We wrote out and compiled the SQL defining each table in a separate .api/init.sql file and created a separate migrations file for each table we wanted to insert into the database. We had some issues with certain tables not being created (verified by checking PgAdmin) which we often remedied by deleting our volumes, images, and containers and starting everything up again.

Today I learned that:

1. If you create a table that contains a foreign key field which references another table, that latter table must have been created in a prior migration file (makes sense since for a table to reference an id property in another table, that other table must have already been created in the database).

2. If you make a migration but then make subsequent changes to prior migration files (to update a column in a table) this will cause a "Incompatible migration history at XXX_example_migration_file_name" error, which will require clearing the database. Adding migration files should be fine as long as the new file doesn't contain any errors.

# January 19, 2024

Today I worked on:

* Fixing some of our table migrations and finishing the part of authentication that allows people to sign up for new accounts

In the morning I was the driver and fixed some issues in our tables:
- Icon Table
    - Added an icon table (acts as a value object) that will allow the user
    choose from a number of pre-inserted profile avator/icons
- User Table
    - Added an icon_id foreign key integer field
- Votes Table
    - review_id is simply listed as an integer field when it should be a
    foreign key integer field
    - we are missing a user_id foreign key integer field to associate each
     upvote or downvote with the logged in user
- Reviews Table
    - replies_count should be default 0 since when a review is first created
     it won’t have any replies
    - vote is listed as a foreign key when it should actually be
     votes_count, an integer field with a default of 0 since when a review
      is first created it won’t have any upvotes or downvotes
    - wouldn’t make sense for vote to be a foreign key since the review
     table has to be created before the vote table (will cause a reference
      error when starting the containers and running migration files)
    - votes_count will be incremented by 1 or decremented by 1 every time a
     user clicks upvote or downvote on the review (either upvote or downvote
      boolean for a vote row will be set to true through the frontend)

Later on Clark was the driver and thanks to Riley's help we redid the convention of ids in our table. We also flushed out more of the authentication and eventually got to a point where we could not create an account in our database because of a Pydantic validation error involving an id.

After Clark left, with the help of Thomas and Stesha we figured out that this error was being caused by not including id as a field in the RETURNING clause of the INSERT query we use to add an account to the accounts table in our database. Some other things we missed included not defining a response model for the create account router and mistakenly defining AccountsQueries as inheriting from Queries.

I also was able to finish out authentication fully, adding the get token and get account end points. In main.py, I also grouped all authentication-related routes using tags = ["AUTH"].

Today I learned that:

Watching Dalante's lecture on PostGres auth would have been very helpful from the beginning. Skipping through this lecture, reading the JWTdown documentation very closely, and rewatching the exploration (Curtis' lecture) on FastAPI was very helpful in understanding what is going on.

### January 22, 2024

Today I worked on:

* Creating the API endpoints for our User table, which involved first creating our Icons table (list of pre-selected icons/avatars a user chooses from when creating their profile) and pre-loading it into the database using a seeder file, and learning how to pass and access foreign keys in FastAPI.

In the morning I gave a little stand-up explaining what bugs I fixed to make authentication on the back-end work and then did a demo testing each endpoint. Then Cameron was the driver with myself, Kyle, and Clarke guiding him through the code.

We kept running into issues with inserting our four pre-selected icon records into the Icon table, first with syntax errors and then eventually realizing including the INSERT commands into our migrations were not getting the job done. Eli then helped us architect a seeder file. We then realized that the way we were calling the function that inserts our icons records into the table every time our container starts up which would cause duplication errors. We thus added logic so that this function would only run if the data had not been inserted yet.

We then went through and finished the CRUD for our User table, allowing us to create a user, get an individual user, update a user, and delete a user.

Today I learned that:

It is common industry practice to store all the functions/logic used to preload data of interest when an application is first run in a seeder file and that in addition to defining one-to-many relationships in the tables we create in our migration files, the passing of the necessary foreign key ids are handled in routers. I also learned how to hide unnecessary/unused JSON request body hints in FastAPI (since the account_id is accessed using the authenticator.get_current_account_data method). This involved removing account_id from my UserinBase model, turning my user Pydantic model object into a dictionary using the .dict() method, manually creating an account_id key-value pair, and then accessing the necessary values (using dictionary syntax) I want to insert into each column of the record I want to add to the users table.

### January 23, 2024

Today I worked on:

* Fixing the seeder file that it would load in the pre-selected icons that a user can choose when creating their profile and adding functionality that would allow certain games to be loaded into our database from Rawgs (third-party API). We also split up the rest of the API endpoints for each table.

In the morning we had our standup and went through various items with Kyle as the driver: fixing some of our tables in the migration files, correcting the logic in our seeder file so that data would be properly loaded in, and eventually split up the remaining API endpoints for each table amongst the four of us.

Today I learned that:

cur.execute allows you to execute whatever SQL operation you want to perform on the database and in most cases returns the number of rows affected by those operations you executed. This is why the original logic for our seed_data function in our seeder file was incorrect: we set it up so that if the application was being booted up for the first time, our function would check to see if the icons had already been inserted into the table so that we wouldn't be trying to insert into the table every time we restart our containers. However, because cur.execute simply returns the number of rows that are affected by whatever SQL operations we executed, our icons would never be inserted since our if condition just checked to see if icons = cur.execute("SELECT * FROM icons") was returning a truthy value - which would happen every time even if 0 operations were affected.

We thus changed the logic so that our if condition would use a variable icons = cur.fetchall() since this method actually returns the rows themselves, not just how many were affected by the pre-defined SQL operations.

### January 24, 2024

Today I worked on:

* Finishing my assigned API endpoints (replies, votes) although I couldn't test them without having access to reviews data, working with my group to merge feature branches into test (a main proxy branch), and fixing the update user endpoint.

In the morning we discussed locking down more CRUD backend routes for each table, cleaning up error handling once all of our endpoints were compiled and tested, and changes we needed to make to common files to avoid merge conflicts.

We each spent time working on our respective endpoints and then screenshared one at a time as we merged our respective feature branch with our test branch and then pulled accordingly. We then began testing our endpoints only to find our user endpoint was bugged out. Clarke and I spent some time after hours debugging this.

Today I learned that:

If you mistakenly run .dict() on an object that is already a Python dictionary, this will cause an AttributeError: 'dict' object has no attribute 'dict'. I also learned more about making merging requests and systematically dealing with merge conflicts.
