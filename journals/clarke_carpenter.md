## January 16, 2024

Today, I worked on:

* Project Gamma setup


Today I learned how to properly make a merge request (test to main) without squashing the branch a merge request is being made from. We talked about our strengths, where we wanted to work the most, and how our image of the project will come together.

## January 17, 2024

Today I worked on:

* Setting up pgAdmin and starting authentication

For pgAdmin I was the driver and able to create a pg-admin volume so that the configurations I make will survive whenever restarting the service. This was done in the volumes entry in the docker-compose.yaml file. I also added a new service that uses that volume and the official pgAdmin image from hub.docker.com. I then logged in and registered a server.

For starting authentication Kyle was the driver and I helped out along with Clarke and Cameron. We followed the JWTdown for FastAPI tutorial that was supplied to us by the instructors and got through the Installation and customization, Signing Key, and Easy log in and log out sections.

Today I learned that we each need to create a .env file that will store our DATABASE_URL and SIGNING_KEY since when we pull what the driver for that day pushed up to gitlab, the .env file is included in the .gitignore and will not be pulled down. I also learned that when making changes in the requirements.txt file, I need to kill and run my containers as opposed to just restarting them in order for the updated code to go through.

# January 18, 2024

Today I worked on:

* Inserting all of the tables we had previously planned out into our database.

Cameron was the driver and I helped out along with Kyle and Austin. We wrote out and compiled the SQL defining each table in a separate .api/init.sql file and created a separate migrations file for each table we wanted to insert into the database. We had some issues with certain tables not being created which we often remedied by deleting our volumes, images, and containers and starting everything up again.

Today I learned that:

1. You always have to rebuild everytime you change anything to your migration tables. You have to rebuild the database in pgAdmin everytime, as well.

# January 19, 2024

Today I worked on:

I was the driver and thanks to Riley's help we redid the convention of ids in our table. We also flushed out more of the authentication and eventually got to a point where we could not create an account in our database because of a Pydantic validation error involving an id. We did go against the advice to not have account and user seperate.

Today I learned that:

There's many ways to do authentication and there all much more difficult than django.

### January 22, 2024

Today I worked on:

Cameron was the driver. We decided to use seeder data to populate our database with games and icons. With the help of a seir, we were able to write it to where it only adds to the database if it isn't there to begin with. We finished all logic for the user since the icons were fixed.


Today I learned that:

Seeder data is a smart way to go for certain situations. Code is whatever you want it to do.

### January 23, 2024

Today I worked on:


In the morning we had our standup and went through various items with Kyle as the driver: fixing some of our tables in the migration files, correcting the logic in our seeder file so that data would be properly loaded in, and eventually split up the remaining API endpoints for each table amongst the four of us. I was responsible with screenshots, boards and games endpoints.

Today I learned that:

I had to make an endpoint in the backend that called the API to get screenshots, using the rawg_pk. This was harder than I thought, because I have to first check if that rawg_pk was in the database and if not, had to make the call. I thought it was workinig, but when Kyle checked, it wasn't working. What happened is that it only retrieved screenshots from games in the database, so my logic was flawed. You would have to send it twice. Eventually this was fixed by using backend logic to retrieve screenshots from the database, and Kyles logic on the frontend logic to get screenshots when someone searches for a game, it will get all information in that search: game details, screenshots, and stores.

### January 24, 2024

Today I worked on:

We each spent time working on our respective endpoints and then screenshared one at a time as we merged our respective feature branch with our test branch and then pulled accordingly. We then began testing our endpoints only to find our user endpoint was bugged out. Austin and I spent some time after hours debugging this.

Today I learned that:

If you mistakenly run .dict() on an object that is already a Python dictionary, this will cause an AttributeError: 'dict' object has no attribute 'dict'. I also learned more about making merging requests and systematically dealing with merge conflicts. This was funny because we kept converting dictionaries into another dictionary back to a dictionary.

### January 25, 2024

Today I worked on:

Last day working on the endpoints, everyone came together in the standup to either show they were working or doing the finishing touches. I was driving during this, and testing all endpoints until we got all 42 working.

Today I learned that:

Endpoints start to add up quickly. I also like having a delete route just for me to work, even if the front end isn't using it.

### January 26, 2024

Absent for Work :/

### January 29, 2024

Today I worked on:

Today I started the dashboard, which is on the frontend. Design and functionality. I used a tabbed dashboard to have the following: Boards, Games, Wishlist, Reviews, and Settings. It shows one at a time, and is perfect for a dashboard interface.

Today I learned that:

Codepen is an awesome tool to build css assets. I built the cards we are using for the project in there, and found the tabbed dashboard there.

### January 30, 2024

Today I worked on:

Finishing up the functionality of the dashboard, and started on the navigation functions. Putting in a drop down, search bar and logo.

Today I learned:

Flex box doesn't always work the way you want.

### January 31, 2024

Today I worked on:

The game cards are showing on the dashboard, and are being filtered by a logged in users id and fetching from the libraries endpoint to display those games. Once we get the games from the libraries, we make another call to the games endpoint to get the game details to display the image, name, and description on the card.

Today I learned:

You can make multiple api calls, and use the data from those calls to filter another call to get something specific.


### February 1, 2024

Today I finished the Board card, which was a difficult feat. The same basic principle as the game card, but an extra step. I also needed to access the board, and get the games inside. So through the boards call, I access the game ids in a users board, then I get the index of the games to display the first three games in a board on the front of the card. It was a feature we all really liked on the rawg website, so I was excited to recreate in our project.

Today I learned:

React is very complex and robust. There is a lot you can do. Something that sounds simple outloud, takes hours and hours to figure out how to do.


### February 2, 2024

Today was a day off but I got a lot done. I finished showing the corresponding reviews for each game on the games details page. I got the screenshots populating on the games details page as well, passing in the rawg_pk useParams to the screenshots api call. I created the boards page that has teh corresponding game cards displaying and the ability to go to that board page through the title link. At this point, you can navigate the website with ease, now that links and nav link is working with authentication. I also had to put in a case in which a game doesn't have reviews, so that there wasn't an error.


### February 5, 2024

Today I got the wishlist populating in the dashboard. I also fixed the css for the dashboard, settings page and populated a recommendation status based on the incoming rating. I decided to show the review cards side by side on the dashboard, because I could not figure out how to get them to intertwine because they are populated for each game review made. A lot of css today.

### February 6, 2024

Today I found the final group of preset icons a user can choose. It now populates in the nav bar for a logged in user. I just made a call to authtication which has the users information, and get the icon id and make another call to icons to get the url to display it. It will display the base icon for unlogged in users or their personal icon. I started on fixing the carousel, it would not automatically scroll without first pressing the arrow. I am not understanding why.

### February 7, 2024

I npm installed react slick for the carousel. I got tired of fighting with the bootstrap one. Now it works. I also got the game titles to show and filtered the games that show to have a rating better than 4.35, I found this was a good rating and also showed a not overwhelming amount of games. I finished the review cards css on the dashboard. I did a animation for a png on our login page, still struggling with the search results page. I cannot get the cards to get into a row of 5.


### February 8, 2024

Today I added back the icons on the wishlist card that is actual links to the stores for that game. I used an invisible icon to maintain the structure of the card in the case someone adds a game to wishlist that has no link to anywhere for it. Pointer menu css, Kyle showed me hsl which was the only color that would change the color because of inheriting issues. We all went through the site and checked everything, and getting a final list of finsihing touches and functionality to do. I made the logo a link to the homepage. I had to touch up the css to all games and sign up pages. I also finished my unit test for getting an icon. 
