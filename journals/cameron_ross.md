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
