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
        if (selection.menu === "View Products for Sale: ") {
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
                    updateProduct();
                } else {
                    deletingProduct();
                }

            });


        } else if (selection.menu === "Add New Product") {
            console.log("New item to add: ");
            addtoInventory();
        } else {
            console.log("Please make a selection from the above options.");
        } //DO I NEED THIS LAST ELSE STATEMENT???

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
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log("function here list all items with an inventory count lower than five");

        }
    });
}

function addtoInventory() {
    connection.query("INSERT INTO products SET?",
        {
            product_name: "THIS SOMETHING HERE",
            department_name: "THIS DEPARTMENT HERE",
            price: "THIS PRICE HERE",
            stock_quantity: "THIS STOCK QUANTITY HERE"
        },
        function (err, results) {
            console.log(results.affectedRows + "producted added!/n");
            updateProduct();
        }
    );
    console.log(query.sql);
}


function updateProduct() {
        console.log("Update product function here");
   
        
};


function deletingProduct() {
    console.log("Deleting product function here");
    
};


