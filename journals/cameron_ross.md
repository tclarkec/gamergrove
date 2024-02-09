January 16th, 2024

As a team, we came together and designated Austin to host our barebones template file from GitLab. From there, we added the appropriate members, forked the project, and registered our server on pg-admin. We worked out some quirks in GitLab and discussed our plan of action for future merges and migrations.


January 17th, 2024

Today, the team had Kyle as the driver, and we started working on our authentication, understanding how to piece together our authentication and other files to get things to work, and have access to our backend. Granted, we had a pretty in-depth lecture for the day, so that played a role in our understanding and starting the whole authentication process. We got some good functionality going with some of our code appearing in FastAPI. The day was a success. From cross-referencing JWTdown, we were able to note that the installation came with quite a few packages that appeared by default; we just had to go in and make our own changes for how we want things to be.


January 18th, 2024

Today, as a team, I was the designated driver for today's daily task. What was accomplished today was that we came together and re-referenced our wireframing for our tables that will be talking to the other strings of data that we will be retrieving from the 3rd Party API and eventually our database.
After manually inserting our own migrations into our migrations folder, we made sure that our information
was working by cross-referencing db-fiddle and other sources. In our migrations files, we discovered that
we need to add the table name into the drop table as well so that the code knows where & what to place
into our Database. Realizing that our init.SQL database is still a little fuzzy to me, I see that in our
file here, the information that we placed in those tables is what we want as our layout in the DB, and the migrations are just a repeat of that table, in triple quotations, and drop that information into the db
when called upon. Also, when information is cross-referenced between previous and later migrations, it can sometimes cause issues with Docker, so nuking the DB and deleting the containers and images help
restore order, and everything should be working at that point. Also, we had to rebuild our server several times to see if the information was getting passed, but the repetition helped improve our comfortability
with navigating through the software and troubleshooting. Overall, having the init.sql file directly replicated by the migrations file helps solidify the work that is done on the backend to solidify what we
want in our database. A lot of moving parts, but as I am writing this and rethinking about everything that has been done thus far helps solidify my understanding. Also, to note that from vastly different perspectives, we all have a unique way of how our code is perceived and used, which is really good
because it often conditions you to others who share the same perspectives and language, so it's easier for you to translate how one another is thinking so that communication is not lost, and miscommunication is at a minimum.


January 19th, 2024

Today we had Clark as the driver, and the team sat down and worked on finishing up our Authentication on the Backend. Though it was confusing due to the many different ways of handling the errors we were having, we ultimately got the authenticators to work after realizing that in our RETURNING INSERT, we were missing "id." As mentioned by the instructors and the SEIRs, our approach was a bit different and unique in its own way, which I think made things a bit complicated when trying to lay things out. Overall, the day was a success; progress was made with some of our models, migrations, and tables in our .sql files.

January 22nd, 2024

Today we accomplished fully building out our User endpoints when it comes to our backend data. We created the update, delete, and functionality, as well as getting some of the other files in order in regards to putting pen to paper. We've added more files to our catalog in the queries and routers folder to incorporate our tables from our wireframe/miro. Today's objective helped increase our understanding of how our code works, and it was a great team-building exercise and good stress flex. A lot of good code was placed today, and plenty of trial and error. For the next couple of days, we will build upon the work we have mustered today and use today's objectives as a template for later file functions.


January 23rd, 2024

Today we sectioned off the tables that needed to be completed from our Wireframe data. From there each of us
worked on Routes and Queries for our respective tables and made modifications to our code to smooth out
potential and present bumps in conflicting code.


January 24th, 2024

Today we finished up lingering code adjustments that we had and made adjustments as needed. Then from
there we started to merge and hashed out some merge conflicts that so that everyone has the same code.


January 25th 2024

Today we tested out our end points can made some adjustments and connections that needed to be made so that our tables are talking.
A lot of moving pieces and connecting parts. Also we've contemplated standardizing our code for future reference and have a cleaner and seemless backlog of our funtioning code. As of today we have 42 endpoints that we are testing, what's been pressing the most today was the reviews. To make it brief:

Endpoint Teststing & Adjustments:
- Tested Endpoints
- Made adjustments to ensure connections between tables

Standardized Code:
- Disscused consistency in code style for readablity

Multi-Authentication:
- Made adjustments to how the information is being transfered and handled amongst the tables

URL Path Re-routing:
- Modified what information is being fetched


January 26th 2024
 Kyle drove in the afternoon to get started a bit as far as putting things on paper
 for the carousel and searchbar on the frontend. It was end of day and we were basically done with backend functionailty for the most part. Plus if I can remember
 corretly it was a lecture heavy day and we had the Cohert party thing with November and December Cohert

January 27th & 29th  2024
    I took the stuff that we started with and built out a template as a starter place for how our home/landing page will
    look like when someone visits our site. From there i managed to ajust the carousell place a side menu that was not
    interactive at all at first with a list on the side to get some things to list out and show. From there also took the search bar and adjust to the right
    side of the screen as close as possible to the mapping out of our design in figma. It increased my knowledge of CSS but
    reminded my how tedious it can be at tines with so many moving parts.


January 30th 2024
 Worked on the Homepage as the first thing that everyone sees and what everything will be connecting to. Today been
 making changes to the Nav bar to get that working, inlcuded our logo from the placeholder logo to our
 interactive logo that is now a gif that runs on repeat. On the Menu tried to adjust the width of
 the menu so that its not disproportionate in conjunction to the rest of the things on the page. As well
 as bug fixes and handling.

January 31st 2024
 Ran into a lot of CSS issues trying to create the gamelist page. Upon this we discovered, that
 theres a lot of cross referenced CSS that is being inherited from other files that was making it
 extremely difficult to modify pages and keep it all stanadarized. Despite efforts of
 renaming css files and classes. Also worked on connecting our backend data to the frontend to get somethings populating

February 1st, 2024
 Today i worked on a feature that would filter the games based on the data that was passed into our Database in the backend and
 to appropriately filter out accordingly when populating the home page. On the home page I had some place holders set in place
 to display how we would have the games listed on the home screen. From there when the games populated after hours of attempts
 I got it to work but becuase of the genre is was not an even distribution of games across per genre.  So decesions were made to
 clean it up a bit and took a bit of nuking the database to get things more aesthetically pleasing.


February 5th, 2024
 So Icons is not working properly because for some reason the FastAPI is not connecting to the Database, the code is working but
 for some odd reason its not responding well. Extremely difficult to get the function to work, commented it out and asked around to see if anyone
 had some ideas. Also with inconjuntion with that modifing our seederfile so that in the description of a game it will
 have the limit of charaters but also the p tags that were also included in the description, curtisoy of the
 3rd party API we were using. The function i had implemented apparently works for Windows but for Mac Users thats a no.
 Kyle helped put together a parse function that he used for his personal project to help clean up how we can do it
 properly on our group project. Solid.


February 6th, 2024
 For todays objective i was still working on getting the stores to populate on certain games that have links to a platform
 where the games can be purchased on. In other words, if I can buy a game from the xbox store it needs to have the icon next
 to it so that the user knows that its available for purchase. After not only checking my hard coded data checking PG-admin
 to see if the information is in there, it still was not properly functioning because when the code is being applied,
 all the icons disappear, so i know it works its just something is not connecting. After merging everyones information from
 the test branch for some reason the FastAPI ping from the backend to our Database was working and whatever blocker that took
 place must've been some code that was being used or not used appropriately in our backend API folder. From their I was able to get some information now that my backend for Storesdb is now talking to the database retreieving that information. Awesome
 from there the code is still responding the same whenever I implent the function. Kyle and myself worked on this issue for several hours to discover that in our naming convention in the backend that our capitalization is slightly off. With that
 we had to go back and in our queries and make some changes in games queries return statements so that what we are getting
 back the information that we are expecting. From that and the logic that was implemented we were able to get it to properly
 assign itself accordingly. Also with that, we've added a feature to where when a game is being searched, thats not in
 our starting database pull, it will follow the same logic and fall in place. We also made it to where it will do the same across
 our other SPA's incase the user is intrested in purchasing the game that they're reviewing.


February 7th, 2024
 Today we worked on error handling in our code and other adjustments that the team members wanted to see implented
 in certain parameters that they worked on. And modified other functionality paths that deemed not working or seemed a bit
 off as far as UI goes. From here I worked on the creating a delete account function that would delete a users account
 when that said person goes into their settings. In the settings the user has the option to update their account information
 as well as thier icons. But now they also have the ability to delete the account as well and it automatically forwards them
 to the homepage. I created a popup handle same as how google and other sites use a "Are you sure?" pop up that drops down
 from the url search bar and would delete that account. Also with that on the games board where we store our games, I
 swapped out the options button for the remove game button so that once selected, it will bring you back to the dahsboard.
 This is a temporary place holder depending on if the team wants to have that as a redirect instance once selected or
 implement something else in its place, but as for now it works and thats that.


February 8th, 2024
 Today we worked on fixing some minor bugs on the frontend that were causing some problems in with our
 functionailty. What was achieved today was that i removed links that were tethered to our rows.jsx that
 seperated games based on their genres. That was fixed. Another ticket that was completed was making changes
 to the API call. With that because we are using VITE, in our .env file i needed to change the naming convention
 of the the RAWG_API and place VITE in front of it as well as some import.meta jargon in our Search.jsx so the API call
 is getting pinged correctly. Tested that feature out several times to make sure that was responding approperately for
 the landing page that was built. Next the more complex task, Kyle and myself collaborated on fixing an onClick event for the Nav bar that when selecting a console that we control that it will populate those games that fit that profile.
 For example, if i were to select Playstation i shouldn't see a Kirby game in that section but all the games relevant to the
 playstation platform.
 With that functionaility, it was pretty complex due to the fact that instead of the route/logic being implentend in the menu.jsx section, it was a completely different jsx that similar to how we've done it for genres we had to implememnt another way to retrieve that data.

    Cleaned up our Code, deleted console logs

 Tasks Accomplished:

 - Front Page Navigation Links (Difficulty 3/10)

 - Side Menu Navigation for Consoles (Difficulty 9/10)

 - Reverse Hardcoded API Call from .env file (Difficulty 6/10)

February 9th, 2024
 Today were working on some error handling fixing minor bugs and ran some Unit test on our endpoints
 to ensure everything is working accordingly. Next were planning to clean up our code and take out any
 and all unnecessary logs from our console. Home stretch
