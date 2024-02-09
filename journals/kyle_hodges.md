## January 16, 2024

Today, I worked on: Project Gamma setup

Austin was the driver, I and the group helped navigate the setup for pulling the repo and getting access to our code base.

Today I learned several operations of Git requests.  We began to navigate the pull, merge, and rebase features.

## January 17, 2024

Today I worked on: PgAdmin and authentication

For pgAdmin Austin was the driver and the rest of us looked at Learn cards and helped navigate.

I drove for getting authentication setup we followed the JWTdown for FastAPI tutorial that was supplied to us by the instructors and got through the Installation and customization, Signing Key, and Easy log in and log out sections.

Today I learned the significance of creating the .env file and how to get that file to communicate with the yaml file.

# January 18, 2024

Today I worked on: Getting our database tables setup and defined

Cameron was the driver, the rest of the group helped navigate. We wrote out and compiled the SQL defining each table in a separate .api/init.sql file and created a separate migrations file for each table we wanted to insert into the database.

Today I learned that: Order of migrations is important especially when one table contains a foreign key to another table.

# January 19, 2024

Today I worked on: continued to get tables established properlly in the database

Austin was the driver in the morning, Clarke in the afternoon.  We Mob programmed through this with the help of the instructors to redefine our user / accounts tables.  The group worked well, I had several appointments today that took me away from group work.  I joined when I could and provided input but this group is solid and made excellent progress.



Today I learned that: I have a solid group that works hard and persists!

### January 22, 2024

Today I worked on: Creating API endpoints and establishing a seeder file to give our application seed data

Cameron was the driver, the group was guiding him through the code.

Eli then helped us architect a seeder file. We then realized that the way we were calling the function that inserts our icons records into the table every time our container starts up which would cause duplication errors. We thus added logic so that this function would only run if the data had not been inserted yet.



Today I learned that: The concept of a seeder file, how to call it, and how to program the logic so that it only runs if data isn't present in the database.

### January 23, 2024

Today I worked on: Adding data to the seeder file and API endpoints

I started as the driver with us mob programming. We fixed our tables in the migration files, correcting the logic in our seeder file so that data would be properly loaded in, and eventually split up the remaining API endpoints for each table amongst the four of us.

Today I learned that: That you don't need to have cur.execute() apply to a variable such as data = cur.execute.  Also the difference between fetch one and fetch all.

### January 24, 2024

Today I worked on: The libraries API endpoints and Games API endpoints

Our group mostly spent the day working on individual API endpoints with guiding help when needed.

Today I learned that: How to pass data from queries to router and back appropriately.

### January 25, 2024

Today I worked on: Cleaning up API endpoints

We tested out endpoints to make sure the HAPPY PATH's worked well

Today I learned that: trying to do many calls in one function can be cumbersome.  Order of operations matters!

### January 26, 2024

Today I worked on: Gathered more data for the seeder file so that we have screenshots

I drove today while the group helped navigate. We spent a great amount of time attempting to receive screenshots and store links when we add a game to our database. This was a miticulous process that required a ton of trial and error.

Today I learned that: It is possible to get a function to run before the sql query is finished even if the function call happens lower in the code.  The return lines are important!

### January 29, 2024

Today I worked on: Providing some guidance to my group regarding database management then had appointments in the afternoon.


Today I learned that: My group is resilient!

### January 30, 2024

Today I worked on: I was out on this day


Today I learned: Keeping up with my team chat gave me pride in the group I was assigned to.

### January 31, 2024

Today I worked on: I was out on this day

Today I learned: My group is passionate about doing well and they were hungry to support me while I was out!


### February 1, 2024

Today I worked on: The search feature for our website

I was able to get the search to work however we ran into a ton of CORS issues that no one was seemingly able to solve.  What the problem was, was an async issue with tryign to do too many api calls in the same function.

Today I learned: Spacing and timing out the api calls helps with async additionally I learned various new CORS Headers.


### February 2, 2024

Today I worked on: Getting a spinner loader feature added to the search feature.

I was able to find a library module to apply to our web application so that when someone searches, until the results come back a PACMAN themed spinner is called.

Today I learned: Applying freefrontend components is difficult especially if something was written for TypeScript or React Native.  Persevearance pays off!


### February 5, 2024

Today I worked on: Cleaning up and streamlining our gamedetails links and speeding up our search feature.

I sped up our search feature by limiting the results.  I also created styling for the search results page.

Today I learned: Our back end was never putting in our game platforms correctly due to the letter casing in our pydantic models.


### February 6, 2024

Today I worked on: A LOT OF STUFF.  Menu Links, Seeder file, Pointer Menu

Cameron and I paired programmed for most of the day working through getting the right information in seeder file.  Additionally, we fixed the side bar navlinks to auto populate based on database genre information. Lastly I incorporated an animated pointer menu with several buttons for functionality for our game cards.

Today I learned: How to map links and route paths from data sets and how to style my pointer menu from the module's documentation.


### February 7, 2024

Today I worked on:

Today I learned:


### February 8, 2024

Today I worked on:

Today I learned:


### February 9, 2024

Today I worked on:

Today I learned:
