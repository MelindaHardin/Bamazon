//NPM inquirer package for prompts
var inquirer = require("inquirer");

//NPM MySQL package to link MySQL & NODE
var mysql = require('mysql');
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

    console.log('connected as Manager');
    menuOptions();
});

//list a set of menu options : VIEW PRODUCTS FOR SALE, LOW INVENTORY, ADD TO INVENTORY, ADD NEW PRODUCT

function menuOptions() {

    inquirer.prompt([
        {
            type: "rawlist",
            name: "menu",
            message: "Please select item to administer.",
            choices: ["View Products for Sale", "View Low Inventory", "Update Inventory", "Add New Product"]
        }
    ]).then(function (selection) {
        if (selection.menu === "View Products for Sale") {
            console.log("Products for Sale");
            itemsForSale();

        } else if (selection.menu === "View Low Inventory") {
            console.log("Items with inventory count lower than five: ");
            lowInventory();

        } else if (selection.menu === "Update Inventory") {

            inquirer.prompt([
                {
                    type: "rawlist",
                    name: "update",
                    message: "Would you like to add to inventory or delete an item?",
                    choices: ["Add to Inventory", "Delete an Item"]

                }

            ]).then(function (selectionII) {
                if (selectionII.update === "Add to Inventory") {
                    addToInventory();
                } else {
                    deleteItem();
                }

            });


        } else if (selection.menu === "Add New Product") {
            console.log("New item to add: ");
            addNewProduct();
        } else {
            console.log("Please make a selection from the above options.");

        }

    });
    
}






function itemsForSale() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + "|", "Product: " + results[i].product_name + "|", "Price: $" + results[i].price + "|" + "Quantity: " + results[i].stock_quantity);
            console.log("\n--------------------------------------\n");

        }
    });
    menuOptions();
    
}





function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
            console.log("-------------------------------------");
        for (var j = 0; j < results.length; j++) {
            console.log("Item ID " + results[j].item_id + "|" + "Item: " + results[j].product_name + "|" + "Total in stock: " + results[j].stock_quantity);
            console.log("-------------------------------------");
        }
    })
    
}





function addToInventory(update) {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "ID number of Item to be restocked: "
        },
        {
            name: "number",
            type: "input",
            message: "How many to be added: "
        }
    ]).then(function (updateInfo) {
        var query = connection.query("UPDATE products SET ? WHERE ?",
            [{
                stock_quantity: parseInt(updateInfo.number)
            },
            {
                item_id: updateInfo.id
            }],

            function (err, results) {
                console.log("\n" + updateInfo.number + " items have been added\n");
                //  help with this funtion
            }
        );
    })
    
};






function deleteItem() {
    inquirer.prompt([
        {
            name: "deleteId",
            type: "input",
            message: "Please enter ID number of product you would like to delete."
        }, {
            name: "confirmDelete",
            type: "confirm",
            message: "Are you sure you want to delete this item?"
        }

    ]).then(function (deleting) {
        if (deleting.confirmDelete === true) {
            var query = connection.query("DELETE FROM products WHERE ?",
                {
                    item_id: deleting.deleteId
                },

                function (err, results) {

                    console.log("----------------------------");
                    console.log("Item deleted.");
                }
            );
            menuOptions();
        } else {
            console.log("----------------------------");
            menuOptions();

        }

    })
}






function addNewProduct(input) {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Name of product: "
        },
        {
            name: "dept",
            type: "input",
            message: "Department: "
        },
        {
            name: "price",
            type: "input",
            message: "Sale Price: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Available quantity: "
        }

    ]).then(function (AddInfo) {
        var query = connection.query("INSERT INTO products SET?",
            {
                product_name: AddInfo.name,
                department_name: AddInfo.dept,
                price: parseFloat(AddInfo.price),
                stock_quantity: parseInt(AddInfo.quantity)

            },
            function (err, results) {
                console.log("\n" + AddInfo.quantity + " " + AddInfo.name + " have been added to the inventory!\n");

            });

    })

}

