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
	price: 1.00,
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

function addProductToCart (productId) {
	if(cart.find(fruit => fruit.productId === productId)) {
		increaseQuantity(productId);
	} else {
		// Add the product to the cart and set increase quantity
		cart.push(products.find(product => product.productId === productId));
		increaseQuantity(productId);
	}
};

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity (productId) {
	cart.find(fruit => fruit.productId === productId).quantity++;
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

function decreaseQuantity (productId) {
	const item = cart.find(fruit => fruit.productId === productId);
	item.quantity--;
	if(item.quantity === 0) {
		removeProductFromCart(productId);
	}
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart (productId) {
	const index = cart.findIndex(fruit => fruit.productId === productId);
	cart[index].quantity = 0;
	cart.splice(index, 1);
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

function cartTotal () {
	let total = 0;
	cart.forEach(fruit => {
		total += fruit.price * fruit.quantity;
	});
	return total;
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart () {
	cart.splice(0);
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

function  pay (amount) {
	return amount - cartTotal();
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


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
   // currency
}
