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
