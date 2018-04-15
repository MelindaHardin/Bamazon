var inquirer = require("inquirer");
var mysql = require('mysql');

//npm connection information for sql database

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    displayItems();
});





//display all of the items available for sale. Includes the ids, names, and prices of products for sale.
function displayItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //console.log(results);  //show everything in array

        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + "|", "Product: " + results[i].product_name + "|", "Price: $" + results[i].price);
            console.log("\n--------------------------------------\n");
        }
        userInputs();
    });

}

//prompt users with two messages with inquirer npm package

function userInputs() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'itemId',
            message: 'Please enter the Item ID which you would like to purchase.'

        },
        {
            type: 'input',
            name: "quantity",
            message: "How many would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        var idSelection = answer.itemId;
        var quantitySelection = answer.quantity;
        purchase(idSelection, quantitySelection);


    });

    function purchase(ID, reqQuantity) {

        connection.query("SELECT * FROM products WHERE item_id = " + ID, function (err, results) {
            if (err) throw err;

            if (reqQuantity <= results[0].stock_quantity) {
                
                var total = results[0].price * reqQuantity;
                console.log("thank you for your purchase.  Your total comes to $" +total + ".");
                connection.query("UPDATE products SET stock_quantity = stock_quantity - " + reqQuantity + " WHERE item_id = " + ID);
            } else {
                // bid wasn't high enough, so apologize and start over
                console.log("Insufficient quantity.");
                userInputs();
            }

        });
    }

};

