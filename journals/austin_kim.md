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

### January 25, 2024

Today I worked on:

* Finishing and testing my assigned API endpoints (replies, votes) even though reviews was not finished (did this by manually inserting reviews data into the database using SQL queries in pg-admin). I also refactored our user, reviews, and board delete/update endpoints so that a person can only delete or update objects they have created themselves and so that they cannot change the associated account_id, review_id or game_id.

In the morning we had our standup and began testing different endpoints with Clarke driving before I split off to finish off my portion of the endpoints (replies and votes) to save us some time.

Today I learned that:

We are really going to have invest time into standardizing how we implement error handling and write our endpoints code since some of us used Dalonte's videos as a scaffold while others used a combination of Riley and Curtis'.

### January 26, 2024

Today I worked on:

* Updating seederfile to also pull in screenshot data for the database, allowing for cascade delete, streamlining backend datadump for a new game, making the backend dynamic.

For the majority of the day Kyle drove while Cameron and I helped debug and offer ideas whenever we ran into issues. We spent a great amount of time on streamlining the process of getting a game and all the relevant information (screenshots, links to buy the game on different platforms) that is not preloaded into our database via the seederfile in the backend, since this will make the frontend not as difficult. This involved pulling in screenshots for the games preloaded into our database and having our create_game function also call on the get_screenshots and get_stores functions so that we can streamline getting whatever information we need for a game that is not already in our database through the backend. We also worked on implementing cascade delete into our tables so that in any one-to-many relationships for our application, if the one was deleted (i.e. reviews) so would the many (i.e. replies, votes). I also worked after-hours on making the backend actually dynamic (i.e. if a reply to a review is created, the reply_count for that review is automatically increased by 1.)

Today I learned that:

When inserting a record into a table in the database, it seems running the return command is also necessary. Excluding this from our get_stores function was a major blocker for a while. I also relearned the importance of rebuilding volumes and containers after pulling down recent migration/table related changes pushed up by my team members. I also learned that to pull from a particular table's queries class in the router file, you need to inject dependency. For example, when modifying my create_reply function in the routers -> replies.py so that whenever a reply was created the replies_count value for the associated review would be increased by 1, in order to interact with any of the ReviewQueries I had to do a dependency injection just like I did for ReplyQueries.

### January 29, 2024

Today I worked on:

* Continuing to make the backend dynamically linked and finishing out error handling. I also made some changes to our tables, began front-end authentication, and writing out the form component for creating a board through our website.

In the morning before breakout rooms were opened, I worked on dynamically linking reviews and games in the backend so that if a review was created/deleted for a game, the game's review count would go up or down. Also, the overall ratings for that game would be affected by whatever rating was submitted for the game in the review. I then changed vote_count to upvote_count and ratings to rating in the reviews and gamesdb tables for clarity. Once the breakout rooms opened, Cameron, Clarke, and I worked on dividing up front-end tasks and answering each other's questions whenever we could. As I started writing the BoardForm component, I realized that libraries and boards needed to be dynamically linked in the background so that if a game is saved to a user's library, the game count for that board is accordingly updated. I then also updated some of the error handling. Next was front-end authentication, in which I created a login component. I am now stuck on the signup component - since we have a separate account and user table I have to set up the form so that the sensitive info (i.e. username, password in accounts table) and nonsensitive info (i.e. first_name, last_name, email, icon_id in users table) are in two separate states and sent to two different endpoints (create accounts, create users). The issue is that in order for a user to be created, it requires an existing account. When my form is submitted, the account is created but the user is not - I am getting a CORS error in the front-end and foreign key violation in the backend (for some reason the account id that is passed into the user creation endpoint is one behind).

Today I learned that:

Error validation can require a fair amount of time and effort depending on how many potential errors you can anticipate for a particular endpoint. Also, working on the frontend is a great way to discover issues in your backend endpoints which previously slipped through the cracks.

### January 30, 2024

Today I worked on:

* Finishing out front end authentication, testing creating a board through our front-end, and starting an account/user settings component.

I spent pretty much the entire morning until lunch trying to figure out how to create one form so that a person trying to sign up on our website could upon submission, create a record of themselves both in the accounts and user table. The logic I wrote in this component script was solid and basically set up so that all of the form fields relevant to the account profile (username, password) and to the user profile (first name, last name, email, icon) were stored in two different states and then sent as a JSON body request to each respective endpoint (create account) and (create user). The issue is that our backend is set up so that a user can only be created if 1. an account has been created and the corresponding id can be input into the json request body for creating the user 2. there is a valid token so that the create endpoint can be accessed. For some reason, even though I set up the logic so that the create endpoint will only be called once an account is successfully created and a token is retrieved, due to the asynchronous nature of the script my code attempts to call the user endpoint before the token is retrieved. A couple of instructors and SEIRs also took a look at this, only for them to say my logic looked fine and that this was a difficult race condition to deal with. Thus, I ended up just separating the form into two, where the user is first asked to input credentials which are submitted and create an account and then they are asked to create a user profile, which is submitted to create a user.

I then finished testing the form to create a board through our front-end and began the account/user settings component. I soon realized that we hadn't written an update_account endpoint which I set out to do. When passing in the current username of the logged in user that is trying to create the account (to ensure that a person can only update an account they created) I was mistakenly using get_account_data as opposed to current_account_data which was causing a response model error that crashed my FastAPI swagger UI, even before getting to test the endpoint. I also then realized that upon updating a username for example, the currently logged in account wouldn't be able to update their account anymore since their current username wouldn't match the updated username in the database. To work around this I made it to where if a user updates their account details (username or password) a new token is created which reflects the updated credentials.

Today I learned:

When trying to send two different states to different endpoints in a certain order, due to the asynchronous nature of fetch requests it is easy to create a race condition and for code to not work out the way you want it to. I also learned more about FastAPI and how validation errors can be created during auto-docs generation.

### January 31, 2024

Today I worked on:

* Finishing out the account/user settings component (although I need to figure out how to account for if a user does not update their password), combining the account and user tables into one, recombining the account and user signup forms into one, added a get_all_games endpoint, getting all of the games in our database to show up on the Landing Page, creating the my saved games tab in the user dashboard, and added an update_library_entry endpoint so that a user can add and remove a game to their wishlist.

In the morning we each worked on our own individual features and I soon realized as I was working on the update account settings page that it would be best to combine our account and user tables into one. This is because in order to access the update user endpoint, we would need to pass in the user id into the fetch request url, which we have no way of accessing. I then recombined the account and user signup forms into a single form. We then came together to create a get_all_games endpoint so that we could fetch all games and load them into our landing page, with me driving. We then coded the filtering logic so that in the my saved games tab in the user dashboard, only the games that have been added to a user's board will populate that tab. I also added an update_library_entry endpoint so that a user can add and remove a game to their wishlist - I had to adjust the error handling so that a user cannot update a library entry they did not create. I am now going to move on to the create a review form - I eventually need to figure out how to get the account settings component (basically an update account form) to not update the current password in the database if nothing is input into the password field. This is uniquely difficult since the actual password is not saved in the database (it is hashed).

Today I learned:

The nature of async in JavaScript is still unpredictable and should not be relied upon when attempting to make fetch requests to endpoints in a particular order - we had trouble setting the state of our loaded-in games after getting a response back from the get_all_games endpoint.

### February 1, 2024

Today I worked on:

* Creating a component which allows a user to update their account settings, creating a form component which allows a user to create a board, updated the create_library_entry endpoint to account for no board_id, updating the replies table to exclude a title column, and began the replies front-end component.

At the current moment, a user can only update their account settings if they also submit a value for their password. This is because the account settings work as an update form and the way we have our backend set up, when an account is updated, some value has to be input into the JSON body request for each table column value corresponding to that account. I have set up the component so that whenever the account settings page is mounted, each account column value populates each field of the update settings form but because we only store the hashed password in the database, the actual password must be input by the user to submit the update form, even if they aren't trying to change their password. I was able to finish and test the board form, added some logic to the create_library_entry endpoint so that a game can be added to the user's wishlist without adding it to a board, and cleaned up the replies table in our database before starting the front-end component.

Today I learned:

The pains of authentication and how working on the front-end is a fantastic way to find either design flaws or things you want to change in the back-end.

### February 2, 2024

Today I worked on:

* Making our dropdown nav dynamic and based on whether a user is signed in or not

If a user is signed in and a token is active, I made it to where the jsx returned in the nav bar shows the dashboard, settings, and logout buttons whereas if the user is not signed and a token is not active, the jsx returned in the nav bar shows the signup and login buttons.

Today I learned:

Since if conditionals cannot be explicitly used in JSX, sometimes it may be easier to conditionally the JSX being returned as a whole.

### February 3, 2024

Today I worked on:

* Allowing a user to submit a review to a game on the games-detail page.

The challenging part of implementing this feature was getting the CSS/formatting to look how I wanted. I also made it to where the number of stars a user clicked for the rating would translate into an integer that would be used by the review form sent to the database. I also updated the gamesDetail page to dynamically show the updated ratings and overall rating count for that page as a number of stars.

Today I learned:

The importance of specificity in CSS and keeping track of the cascade flow.

### February 4, 2024

Today I worked on:

* Allowing a user on the frontend to add and remove games from a wishlist via the click of a button and being able to update reviews from the games detail page and dashboard.

The difficult part of this was getting the button to dynamically change to say 'Added to wishlist!' once it was clicked. This required me to utilize the useState hook and state changes more effectively. I also realized that there were async fetching issues happening whenever a user would log out and log back in, so I put in my code a way to manually refresh the browser upon logging in and out.

Today I learned:

The best way to combat async fetching issues is to use the updating of state.

### February 5, 2024

Today I worked on:

* Allowing a user to delete a review from both the dashboard and games detail page, upvoting and downvoting a review with a single click, and getting the color of whatever button the user pressed to persist even after refreshing or navigating to a different component.

Some issues I ran into with this was I either could get the user vote color change to persist on the page but have it affect every other review (on the front end) or make the color change specific to that review but not have it persist. Need to revisit this...

Today I learned:

Need to really emphasize the updating of state as opposed to relying on asynchronous fetching if I want something to force a dynamic re-rendering of the page after something is changed in the frontend.

### February 6, 2024

Today I worked on:

* Creating a games detail page for non-authenticated users that will redirect them to a prompt for them to sign-up, log-in, or go directly back to the games detail page, adding a game to the wishlist only changes the button for that specific game by that specific user, adding a button to create a board from the dashboard, fixing a bug on the create board form, and removing a game from the wishlist from the dashboard.

Overall today was a very productive day, but I cannot get the page to re-render once the final wishlist card is removed from the page - there is an async fetching issue since when there are no more library entries to pull from there will be a 404 error for that request.

Today I learned:

Whenever dynamically removing something in our dashboard, while running a fetch request if the delete request is successful works in re-rendering the page dynamically it will fail when deleting the last instance because the fetch request will return a 404 error.

### February 7, 2024

Today I worked on:

* Being able to fully remove wishlist cards from dashboard, fixing the site not rendering because of account data async issues, making it to where upvote_count dynamically re-renders, and login error handling if a user inputs invalid credentials.

Today was a tough day. In order to account for the final wishlist card being removed, I basically created a state called lastGameRemovedTrue and if fetchData got a 404 error back when searching for library entries and not finding any (either because the user has not added anything to their wishlist or they removed the last game from it) I had it set this state to true, and if so return a message on the dashboard saying 'No games saved to wishlist.' In terms of login error handling, I originally set it up so that after a user was attempted to be logged in using the JWTdown built in function, our code would do a fetch request for a token to see if a valid one was created. However, this created a race condition since a token would also be fetched for even before the login went through. Thus, I had to deconstruct the login function provided to us by JwtDown, and make a manual post request to the login endpoint, and conditionally render an error message if the response was not ok.

Today I learned:

Use state when re-rendering the page!!! Ctrl/cmd clicking on a function will allow you to see the code it is made of.

### February 8, 2024

Today I worked on:

Allowing for profile icons to load in automatically once a user signs up, adding a default cover photo value when creating a board, having a user's username show up at the top of the dashboard, when a user deletes an account also logging them out so that their token is no longer active, dynamically re-rendering the page when a game is removed from a board, and getting store icons to be clickable on a wishlist card.

Today was an extremely productive day. My biggest blocker was dynamically re-rendering the page when a game is removed from a board, since the actual fetching of data happened in parent component (boardPage.jsx) whereas the delete request was made in the child component (boardGameCard.jsx). I had to create a callback in which when the 'Remove Game' button would be clicked on a board game card (in boardGameCard.jsx), this would trigger a function called onGameRemoval in which the library_id and account_id for that library entry (representing an instance of that game being added to a board) would be passed back to the boardPage.jsx parent component and used in a function called handleGameRemoval (which is called by onGameRemoval) to delete that library entry instance within the same component (boardPage.jsx) that fetches for games that have been added to that board, allowing for dynamic re-rendering even after the final game is removed from the board.

Today I learned:

How to implement a callback function to connect the functionalities of a parent and child component.
