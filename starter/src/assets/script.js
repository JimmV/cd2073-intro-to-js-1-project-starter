/* Declare an empty array named products to hold the items available in the store */
const products = [];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

products.push(
	{
	name: "cherry",
	price: 1.00, // list base prices in $
	quantity: 0,
	productId: 101,
	image: "/images/cherry.jpg"
	},

	{
	name: "orange",
	price: 2.00,
	quantity: 0,
	productId: 102,
	image: "/images/orange.jpg"
	},

	{
	name: "strawberry",
	price: 3.00,
	quantity: 0,
	productId: 103,
	image: "/images/strawberry.jpg"
	},
);

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

const cart = [];

/* Create a function named addPreductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

// Helper function for finding product by id
function getProductById(id, list) {
	return list.find(product => product.productId === id);
}

function addProductToCart (productId) {
	// if(cart.find(fruit => fruit.productId === productId)) {
	if(getProductById(productId, cart)) {
		// Increase quantity only if item is found in cart
		increaseQuantity(productId);
	} else {
		// Add the product to the cart and set increase quantity if not found
		// cart.push(products.find(product => product.productId === productId));
		cart.push(getProductById(productId, products));
		increaseQuantity(productId);
	}
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity (productId) {
	// cart.find(fruit => fruit.productId === productId).quantity++;
	getProductById(productId, cart).quantity++;
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

// Function for decreasing the quantity of item in the cart
function decreaseQuantity (productId) {
	// get the item and decrease its quantity
	// const item = cart.find(fruit => fruit.productId === productId);
	const item = getProductById(productId, cart);
	item.quantity--;
	if(item.quantity === 0) { // if quantity === 0, remove item from cart
		removeProductFromCart(productId);
	}
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

// Function for removing a product from the cart
function removeProductFromCart (productId) {
	// get the index of the item and set it's quantitiy to 0
	const index = cart.findIndex(fruit => fruit.productId === productId);
	cart[index].quantity = 0;
	// then remove it from the cart
	cart.splice(index, 1);
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

function cartTotal () {
	let total = 0;
	// traverse the cart array and sum each item quantity by it's price
	cart.forEach(fruit => {
		total += fruit.price * fruit.quantity;
	});
	return roundTo(total, 2);
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart () {
	cart.forEach(fruit => { // set all quantities to 0 before removing
		fruit.quantity = 0;
	});
	// remove all items from cart
	cart.splice(0);
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

// This function is for running the test: does not use remainingBalance
let totalPaid = 0;
function pay (amount) {
	totalPaid =  roundTo(amount - cartTotal(), 2);
	return totalPaid;
}

// global variable for holding the reamining balance beteween transactions
let remainingBalance = 0;

// Getter method for accessing the remaining balance
// This method IS used in the modified webpage
function getRemainingBalance() {
	return remainingBalance;
}

// This function is for running on the site: uses remainingBalance 
// The remainingBalance stays on account for future transactions
// This function IS  used in the modified web page
function payUsingRB (amount) {
	remainingBalance = roundTo((cartTotal() + remainingBalance) - amount, 2);
	return -remainingBalance;
}


/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/
function roundTo(num, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

let currencyFactor_old = 1.00;
function currency (currency_new) {
	let currencyFactor_new;	
	switch(currency_new){
		case 'EUR':
			currencyFactor_new = 0.91;
			break;
		case 'YEN':
			currencyFactor_new = 148.99; 
			break;
		default:
			currencyFactor_new = 1.00;
			break;
	}

	products.forEach((fruit) => {
		fruit.price = roundTo((fruit.price / currencyFactor_old * currencyFactor_new), 2);
	});

	// Aslo convert the remainingBalance to new currency
	remainingBalance = roundTo((remainingBalance / currencyFactor_old * currencyFactor_new), 2);

	// Save the new currencyFactor in the global variable
	currencyFactor_old = currencyFactor_new;
}

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
	products,
	cart,
	addProductToCart,
	increaseQuantity,
	decreaseQuantity,
	removeProductFromCart,
	cartTotal,
	pay, 
	emptyCart,
	/* Uncomment the following line if completing the currency converter bonus */
	currency,
	payUsingRB,
	getRemainingBalance
}
