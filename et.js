var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "me2penders2000",
    database: "employee_trackerDB"
});




// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    console.log("\n")


    console.log("  ______                 _                        ")
    console.log(" |  ____|               | |                       ")
    console.log(" | |__   _ __ ___  _ __ | | ___  _   _  ___  ___  ")
    console.log(" |  __| | '_ ` _ || '_ || |/ _  | | | |/ _  / _   ")
    console.log(" | |____| | | | | | |_||| | |_| | |_| |  __/  __/ ")
    console.log(" |______|_| |_| |_| .__/|_| ___/  __| | ___| ___| ")
    console.log("                  | |             __/ |           ")
    console.log("                  |_|            |___/            ")
    console.log("  ______       _        _                          ")
    console.log(" |  __  |     | |      | |                        ")
    console.log(" | |  | | __ _| |_ __ _| |__   __ _ ___  ___      ")
    console.log(" | |  | |/ _` | __/ _` | '_   / _` / __|/ _       ")
    console.log(" | |__| | |_| | || |_| | |_| | |_|  __    __/     ")
    console.log(" |_____/  __,_| __ __,_|_.__/  __,_|___/ ___|     ")
    console.log("\n")

    
    inquirer
        .prompt({
            name: "ChoiceOne",
            type: "list",
            message: "Would you like to [VIEW], [ADD]  or [UPDATE] an employee, department or role?",
            choices: ["VIEW", "ADD", "UPDATE", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.ChoiceOne === "VIEW") {
                selectBy_VIEW();
            }
            else if (answer.ChoiceOne === "ADD") {
                selectBy_ADD();
            }
            else if (answer.ChoiceOne === "UPDATE") {
                selectBy_UPDATE();
            }
            else {
                connection.end();
            }
        });
}

function selectBy_VIEW() {
    inquirer
        .prompt({
            name: "View employee, department or role",
            type: "list",
            message: "Would you like to VIEW an [EMPLOYEE], [DEPARTMENT] or [ROLE] ?",
            choices: ["EMPLOYEE", "DEPARTMENT", "ROLE", "BACK"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.postOrBid === "DEPARTMENT") {
                viewDepartment();
            }
            else if (answer.postOrBid === "EMPLOYEE") {
                viewEmployee();
            }
            else if (answer.postOrBid === "ROLE") {
                viewRole();
            }
            else {
                start();
            }
        });
}

function selectBy_ADD() {
    inquirer
        .prompt({
            name: "Add to employee, department or role",
            type: "list",
            message: "Would you like to ADD an [EMPLOYEE], [DEPARTMENT] or [ROLE] ?",
            choices: ["EMPLOYEE", "DEPARTMENT", "ROLE", "BACK"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.postOrBid === "DEPARTMENT") {
                addDepartment();
            }
            else if (answer.postOrBid === "EMPLOYEE") {
                addEmployee();
            }
            else if (answer.postOrBid === "ROLE") {
                addRole();
            }
            else {
                start();
            }
        });
}

function selectBy_UPDATE() {
    inquirer
        .prompt({
            name: "Update employee, department or role",
            type: "list",
            message: "Would you like to UPDATE an [EMPLOYEE], [DEPARTMENT] or [ROLE] ?",
            choices: ["EMPLOYEE", "DEPARTMENT", "ROLE", "BACK"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.postOrBid === "DEPARTMENT") {
                updateDepartment();
            }
            else if (answer.postOrBid === "EMPLOYEE") {
                updateEmployee();
            }
            else if (answer.postOrBid === "ROLE") {
                updateRole();
            }
            else {
                start();
            }
        });
}


























// // function to handle posting new items up for auction
// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid || 0,
//           highest_bid: answer.startingBid || 0
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
