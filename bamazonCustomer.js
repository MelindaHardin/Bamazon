//NPM MySQL package to link MySQL & NODE
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '#', //put in password, but will hide in .env
  database : 'bamazon'
});
 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

//display all of the items available for sale. Include the ids, names, and prices of products for sale.
function afterConnection(){
 connection.query("SELECT * FROM products", function (err, results){
    if (err)throw err;
    for (var i = 0; i < results.length; i++){
        console.log ("ID: " + results[i].item_id + "|","Product: " + results[i].product_name + "|", "Price: $" + results[i].price);
    }

    console.log (results.product_name);//gets product
    connection.end();
 });

}