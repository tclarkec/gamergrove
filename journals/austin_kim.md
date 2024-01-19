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
