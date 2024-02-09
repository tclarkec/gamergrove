# GamerGrove
- Clarke
- Austin
- Kyle
- Cam

GamerGrove – bringing you all the scents you want, and none of the ones you don’t.

## Design
- [API design](docs/apis.md)
- [SQL model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)
## Intended market
We are targeting general consumers in the self-care market who are looking for a tailored shopping experience. Consumers of skincare products, bath & body products, and home goods who can find a wide array of products that conform to their tastes.
## Functionality
- Visitors to the site can take a home or body scent profile quiz that will filter Smelli Belli’s products to match their tastes:
  - A home quiz to find them a home product that matches their scent profile
  - A body quiz to find them a body product that matches their scent profile
- Users can click on suggested products to go to product detail page to either wish list or add to cart
- Products page for a plain list view of all products
- Accounts
- Employees can add new products, view/search inventory, and update inventory stock
- Wish list for registered accounts so users can build a list of products based on their preferences/quiz results and save those grouped products for later
- About Page with company info, ingredient sourcing info, and FAQ
- Social Media Links/Contact at the footer
- Contact => Email or Help Chat via Facebook Messenger for questions/suggestions
- Main Page features popular products and quizzes
- The cart features products that was added from the product page
  - update quantity with an increment and decrement counter
  - can checkout and will populate the order end point
## Project Initialization
To fully enjoy this application on your local machine, please make sure to follow these steps:
1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create smelli-db`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it smelli-belli-inventory-api-1 bash`
7. Run `python manage.py loaddata products.json`
8. Exit the container's CLI, and enjoy Smelli Belli to its fullest!
