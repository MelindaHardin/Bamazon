var inquirer = require("inquirer");
var mysql = require('mysql');

//npm connection information for sql database

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#', //hide in .env
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

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                name: 'choice',
                /*choices: function () {
                    var choiceArray = [];
                    for (var j = 0; j < results.length; j++) {
                        choiceArray.push(results[j].item_id);
                    }
                    return choiceArray;
                },*/

                message: 'Please enter the Item ID which you would like to purchase.'

            },
            {
                type: 'input',
                name: "itemQuantity",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
                    
            for (var k = 0; k < results.length; k++) {
                (results[k].item_id === answer.choice)
                var chosenItem = results[k];
            }    
                
                if (chosenItem.stock_quantity >= parseInt(answer.itemQuantity)) {
                    
                    var updateQuantity = 'UPDATE products SET stock_quantity = ' + (answer.itemQuantity - chosenItem.stock_quantity) + ' WHERE item_id = ' + chosenItem;


                    connection.query(updateQuantity, function (error) {
                        if (error) throw err;
                        console.log("Thank you for your purchase!");

                    }
                    );
                } else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Insufficient quantity.");
                    userInputs();
                }
            
        });
    });
}

