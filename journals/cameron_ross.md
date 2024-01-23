January 16th 2024

As a team we came together and designated Austin to host our barebones template file from GitLab. From there we added the appropriate members fork the project and registered our server on pg-admin.

January 17th 2024

Today the team had Kyle as the driver and we started working on our authenitcation and understanding how to start piecing together our Authentication and other files to get things to work and have that access to our backend. Granted we had a pretty indepth lecture for the day so that played a role in our understand and starting the whole authentication process. We got some good functionailty going with some of our code to appear in FastAPI. The day was a success. From cross referecencing JWTdown we were able to note that the installation came with quite a bit of packages that appeared by default, we just had to go in and make our own changes for how we want things to be.



January 18th 2024

Today as a Team I was the designated driver for todays daily task. What was accomplished today was that we came together and re-reference our wireframing for our tables that will be talking to the other strings of data that we will be retriving from the 3rd Party API and eventually our database. After manually, inserting our own migrations into our migrations folder. We made sure that our information was working by cross referecencing db-fiddle and other sources. In our migrations files we discovered that we need to add the table name into the drop table as well so that the code knows where & what to place into our Database. Realizing that our init.SQL database is still a little fuzzy to me. I see that in our file here, the information that we placed in those tabels is what we want as our layout in the DB and the migrations is just a repeat of that table, in tripple quotations, and drops that information into the db when called upon. Also when information is crossed reference between previous and later migrations, it can sometimes cause issues with the Docker, so nuking the DB and deleting the containers and Images help, restore order and everything should be working at that point. Also we had to rebuild our server several times to get seek if the information was getting passed, but the repition help imporved our comfortablility with navigating through the software and troubleshooting. Overall having the init.sql file directly replicated by the migrations file help solidify the work that is done on the back end to solidify what we want in our database. A lot of moving parts, but as i am writing this and rethinking about everything that has been done thus far helps solidify my understanding. Also to note that from vastly different perspectives we all have a unique way of how our code is perceived and used which is really good because it often times conditions you to others who share the same perspectives and lanuage so it easier for you to translate how one another is thinking so that communication is not lost and miscommunication is at a minimum.

January 19th 2024

 Today we had Clark as the driver and the team sat down and worked on finishing up our Authentication on the Backend. Though it was confusing due to the many different ways or handleing the errors we were having. We ultimately got the authenicators to work after realizing that in our RETURNING INSERT, we were missing "id". As mentioned by the insructors and the SEIRs our approach was a bit different and unique in its own way, which i think made things a bit complicated when trying to lay things out. Overall the Day was an success, progress was made with some of our models, migrations and tables in our .sql files.



January 22th 2024

