## Pizza order
* Author: Chau Nguyen V
* Team: FE
### Deployed link:
* https://rococo-klepon-4a9c3f.netlify.app/
### Run
* npm install | yarn
* npm start | yarn start
* Open localhost:3000

### Tutorial
#### Home page
* Url: /
* Function: Select pizza size and toppings
#### Enter personal information page
* Url: /info
* Function: Enter personal information
#### Checkout page
* Url: /checkout
* Function: Review orders and personal information
#### Payment page
* Url: /payment
* Function: Enter credit card and payment

### State management
* The states will be saved to localStorage
* After successful API call, the states will be removed from localStorage
### Libraries
* Used some component of `react-bootstrap`
* Used `react-hook-form` to validatie form `enter personal information` and `enter credit card`
* Used `card-validator` to validate `card format`
