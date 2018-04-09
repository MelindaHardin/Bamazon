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
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + "|", "Product: " + results[i].product_name + "|", "Price: $" + results[i].price);
            
        }

        //constructor function to get user inputs
        //prompt users with two messages.
        //The first should ask them the ID of the product they would like to buy.
        //The second message should ask how many units of the product they would like to buy.
        function Buyer(buy, units) {
            this.buy = buy;
            this.units = units;
        }
    
        inquirer.prompt([
            {
                name: "buy",
                message: "What is the ID of the product you would like to purchse?"
            },
    
            {
                name: "units",
                message: "How many would you like to purchase?"
            }
        ]).then(function (answer) {
            var newBuyer = new Buyer(
                answer.buy,
                answer.units
            );
    
    
        });
    });

}

        //Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

            //IF (does have enough of the product, you should fulfill the customer's order.)


                //This means updating the SQL database to reflect the remaining quantity.

                //Once the update goes through, show the customer the total cost of their purchas

            //ELSE } If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

