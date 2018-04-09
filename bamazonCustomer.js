//NPM inquirer package for prompts
var inquirer = require("inquirer");

//NPM MySQL package to link MySQL & NODE (??????DO I HAVE TO DO THIS FOR EACH FILE?????)
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#', //put in password, but will hide in .env
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    afterConnection();
});


//display all of the items available for sale. Includes the ids, names, and prices of products for sale.
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + "|", "Product: " + results[i].product_name + "|", "Price: $" + results[i].price);
            console.log("\n--------------------------------------\n");

        }

        //constructor function to get user inputs .
        function Buyer(itemBuying, unitsPurchasing) {
            this.itemBuying = itemBuying;
            this.unitsPurchasing = unitsPurchasing;
            //this.price= <----------HOW TO GET PRICE OF SELECTION????????
            //this.inStock = __________; //<----------HOW TO GET STOCK OF SELECTION????????


            this.orderFulfilled = function () {
                var total = this.unitsPurchasing * results.price;
                console.log("Thank you for your purchase. Your total comes to $" + total + ".");
            };
            this.orderNotFulfilled = function () {
                console.log("Sorry, we only have " + inStock + "currently in stock.  Would you like to ")
            };
        };

        //prompt users with two messages
        inquirer.prompt([
            {
                name: "itemBuying",
                message: "What is the ID of the product you would like to purchse?"
            },

            {
                name: "unitsPurchasing",
                message: "How many would you like to purchase?"
            }
        ]).then(function (answer) {
            var newBuyer = new Buyer(
                answer.itemBuying,
                answer.unitsPurchasing
            );
            //IF ELSE statement here for orders info
            newBuyer.orderFulfilled();
        });

    });
}