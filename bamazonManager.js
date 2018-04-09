//NPM inquirer package for prompts
var inquirer = require("inquirer");

//NPM MySQL package to link MySQL & NODE (??????DO I HAVE TO DO THIS FOR EACH FILE?????)
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Tricia615', //put in password, but will hide in .env
  database : 'bamazon'
});



connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
    menuOptions();
});

//list a set of menu options : VIEW PRODUCTS FOR SALE, LOW INVENTORY, ADD TO INVENTORY, ADD NEW PRODUCT

//display all of the items available for sale. Include the ids, names, and prices of products for sale.
function menuOptions(){
 connection.query("SELECT * FROM products", function (err, results){
    if (err)throw err;
    for (var i = 0; i < results.length; i++){
        console.log ("ID: " + results[i].item_id + "|","Product: " + results[i].product_name + "|", "Price: $" + results[i].price);
    }

    console.log (results.product_name);//gets product
    connection.end();
 });

}


    //

        //If selects View Products for Sale, list every available item: the item IDs, names, prices, and quantities.

        //If selects View Low Inventory, then it should list all items with an inventory count lower than five.


        //If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

        //If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
    
    //EXPORT.MODULE