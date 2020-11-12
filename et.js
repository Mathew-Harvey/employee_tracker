var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",  
    port: 3306,    
    user: "root",
    password: "me2penders2000",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});
function start() {
    console.log("\n")


    console.log("  ______                 _                        ")
    console.log(" |  ____|               | |                       ")
    console.log(" | |__   _ __ ___  _ __ | | ___  _   _  ___  ___  ")
    console.log(" |  __| | '_ ` _ || '_ || |/ _  | | | |/ _ |/ _ | ")
    console.log(" | |____| | | | | | |_||| | |_| | |_| |  __/  __/ ")
    console.log(" |______|_| |_| |_| .__/|_| ___/| __| | ___| ___| ")
    console.log("                  | |             __/ |           ")
    console.log("                  |_|            |___/            ")
    console.log("  ______       _        _                         ")
    console.log(" |  __  |     | |      | |                        ")
    console.log(" | |  | | __ _| |_ __ _| |__   __ _ ___  ___      ")
    console.log(" | |  | |/ _` | __/ _` | '_ | / _` / __|/ _ |     ")
    console.log(" | |__| | |_| | || |_| | |_| | |_|  __  | __/     ")
    console.log(" |_____/ |__,_| __ __,_|_.__/ |__,_|___/|___|     ")
    console.log("\n")


    inquirer
        .prompt({
            name: "ChoiceType",
            type: "list",
            message: "Would you like to [VIEW], [ADD], [DELETE] or [UPDATE] an employee, department or role?",
            choices: ["VIEW", "ADD", "DELETE", "UPDATE", "EXIT"]
        })
        .then(function (answer) {   
            if (answer.ChoiceType === "VIEW") {
                selectBy_VIEW();
            }
            else if (answer.ChoiceType === "ADD") {
                selectBy_ADD();
            }
            else if (answer.ChoiceType === "UPDATE") {
                selectBy_UPDATE();
            }
            else if (answer.ChoiceType === "DELETE") {
                selectBy_DELETE();
            }
            else {
                connection.end();
            }
        });
}

function returnStart() {
    inquirer
        .prompt({
            name: "returnStart",
            type: "list",
            message: "Would you like to return the the start menu?",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {
            if (answer.returnStart === "YES") {
                start();
            }
            else {
                selectBy_VIEW();
            };
        });
};

function selectBy_VIEW() {
    inquirer
        .prompt({
            name: "ChoiceWhoView",
            type: "list",
            message: "Would you like to VIEW an [EMPLOYEE], [DEPARTMENT] or [ROLE] ?",
            choices: ["EMPLOYEE", "DEPARTMENT", "ROLE", "BACK"]
        })
        .then(function (answer) {
            if (answer.ChoiceWhoView === "DEPARTMENT") {
                viewDepartment();
            }
            else if (answer.ChoiceWhoView === "EMPLOYEE") {
                viewEmployee();
            }
            else if (answer.ChoiceWhoView === "ROLE") {
                viewRole();
            }
            else if (answer.ChoiceWhoView === "BACK") {
                returnStart();
            }
        });
}

function selectBy_ADD() {
    inquirer
        .prompt({
            name: "ChoiceWhoAdd",
            type: "list",
            message: "Would you like to ADD an [EMPLOYEE], [DEPARTMENT] or [ROLE] ?",
            choices: ["EMPLOYEE", "DEPARTMENT", "ROLE", "BACK"]
        })
        .then(function (answer) {  
            if (answer.ChoiceWhoAdd === "DEPARTMENT") {
                addDepartment();
            }
            else if (answer.ChoiceWhoAdd === "EMPLOYEE") {
                addEmployee();
            }
            else if (answer.ChoiceWhoAdd === "ROLE") {
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
            name: "ChoiceWhoUpdate",
            type: "list",
            message: "Would you like to UPDATE an EMPLOYEE'S ROLE [YES] or [NO]?",
            choices: ["YES", "NO"],
        })
        .then(function (answer) {   
            if (answer.ChoiceWhoUpdate === "YES") {
                updateEmployee();
            }
            else {
                start();
            }
        });
}

function selectBy_DELETE() {
    inquirer
        .prompt({
            name: "ChoiceWhoAdd",
            type: "list",
            message: "Would you like to DELETE an [EMPLOYEE], [DEPARTMENT] or [ROLE] ?",
            choices: ["EMPLOYEE", "DEPARTMENT", "ROLE", "BACK"]
        })
        .then(function (answer) {  
            if (answer.ChoiceWhoAdd === "DEPARTMENT") {
                deleteDepartment();
            }
            else if (answer.ChoiceWhoAdd === "EMPLOYEE") {
                deleteEmployee();
            }
            else if (answer.ChoiceWhoAdd === "ROLE") {
                deleteRole();
            }
            else {
                start();
            }
        });
}


function viewDepartment() {
    console.log("View all Departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n")
            console.log(
                "   Department: " +
                res[i].name);
        }
        console.log("-----------------------------------");
        returnStart();
    });

}

function viewDepartmentNoReturn() {
    console.log("View all Departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n")
            console.log(
                "   Department: " +
                res[i].name);
        }
        console.log("-----------------------------------");
       return;
    });

}


function viewEmployee() {
    console.log("View all Employees...\n");
    console.log("-----------------------------------");
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager_id from employee inner join role ON (employee.role_id = role.id)"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n")
            console.log(
                "   ID: " +
                res[i].id +
                "| FIRST NAME: " +
                res[i].first_name +
                "| LAST NAME: " +
                res[i].last_name +
                "| ROLE: " +
                res[i].title +
                "| Salary: " +
                res[i].salary);
        }
        console.log("-----------------------------------");
        returnStart();
    });
}

function viewEmployeeNoReturn() {
    console.log("View all Employees...\n");
    console.log("-----------------------------------");
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager_id from employee inner join role ON (employee.role_id = role.id)"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n")
            console.log(
                "   ID: " +
                res[i].id +
                "| FIRST NAME: " +
                res[i].first_name +
                "| LAST NAME: " +
                res[i].last_name +
                "| ROLE: " +
                res[i].title +
                "| Salary: " +
                res[i].salary);
        }
        console.log("-----------------------------------");
        return;
    });
}

function viewRole() {
    console.log("View all Roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n")
            console.log(
                "   ID: " +
                res[i].id +
                "| ROLE: " +
                res[i].title +
                "| SALARY: " +
                res[i].salary
            );
        }
        console.log("-----------------------------------");
        returnStart();
    });
}

function viewRoleNoReturn() {
    console.log("View all Roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\n")
            console.log(
                "   ID: " +
                res[i].id +
                "| ROLE: " +
                res[i].title +
                "| SALARY: " +
                res[i].salary
            );
        }
        console.log("-----------------------------------");
       return;
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Please type the name of the department you would like to add"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department,
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("A department has been created");
                    console.log("-----------------------------------");
                    viewDepartment();
                }
            );
        });
}

function addEmployee() {
    inquirer
        .prompt([

            {
                name: "first_name",
                type: "input",
                message: "Please type the first name of the employee you would like to add"
            },
            {
                name: "last_name",
                type: "input",
                message: "Please type the last name of the employee you would like to add"
            },
            {
                name: "role_id",
                type: "input",
                message: "Please enter the number that corrisponds to the role ie. 0 = no role defined, 1 = Analyst, 2 = Communications Associate, 3 = Social Media Manager, 4 = Director"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Please enter the number the corrisponds the employees manager. Enter 0 for no manager "
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id || 0,
                    manager_id: answer.manager_id || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("An employee has been created and assigned to a role and a manager");
                    console.log("-----------------------------------");
                    viewEmployee();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Please enter the number that corrisponds to the role you wish to add: 0 = no role, 1 = Analyst, 2 = Communications Associate, 3 = Social Media Manager, 4 = Director"
            },
            {
                name: "salary",
                type: "input",
                message: "Please enter the median annual salary this role would attract"
            },
            {
                name: "department_id",
                type: "input",
                message: "Please enter the number that corrisponds to the departement that would house this role ie. 0 = fits in no department, 1 = HR, 2 = Engineering, 3 = Management, 4 = Administration"
            },
        ])
        .then(function (answer) { 
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id || 0,
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("A role has been created and assigned to a department");
                    console.log("-----------------------------------");             
                    viewRole();
                }
            );
        });
}

function deleteDepartment() {
    viewDepartmentNoReturn();
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Please type the name of the department you would like to delete"
            }
        ])
        .then(function (answer) {
            connection.query(
                "DELETE FROM department WHERE ?",
                {
                    name: answer.department,
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("A department has been deleted");
                    console.log("-----------------------------------");
                    returnStart();
                }
            );
        });
}

function deleteEmployee() {
    viewEmployeeNoReturn();
    inquirer
        .prompt([

            {
                name: "first_name",
                type: "input",
                message: "Please type the first name of the employee you would like to delete."
            }             
        ])
        .then(function (answer) {
            connection.query(
                "DELETE FROM employee WHERE ?",
                {
                    first_name: answer.first_name                                  
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("An employee has been deleted");
                    console.log("-----------------------------------");
                    returnStart();
                }
            );
        });
};

function deleteRole() {
    viewRoleNoReturn();
    inquirer
        .prompt([

            {
                name: "title",
                type: "input",
                message: "Please enter the number that corrisponds to the role you wish to DELETE: 0 = no role, 1 = Analyst, 2 = Communications Associate, 3 = Social Media Manager, 4 = Director"
            }     
        ])
        .then(function (answer) {
            connection.query(
                "DELETE FROM role WHERE ?",
                {
                    id: answer.title                                  
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("An role has been deleted");
                    console.log("-----------------------------------");
                    returnStart();
                }
            );
        });
}

function updateEmployee() {  
    viewEmployeeNoReturn();
    console.log("In this menu you can update the role of any employee. To begin, please review the current employee's below\n");
    inquirer
        .prompt([
            {
                name: "who_first",
                type: "input",
                message: "Please type the FIRST name of the employee you wish to update:"
            },    
            {
                name: "new_role",
                type: "input",
                message: "Please enter the number that corrisponds to the new role you wish to assign to the selected employee: 0 = no role, 1 = Analyst, 2 = Communications Associate, 3 = Social Media Manager, 4 = Director"
            }
        ])
        .then(function (answer) {
            var query = "SELECT first_name, last_name, role_id FROM employee"
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                     {
                        role_id: answer.new_role
                    },
                    {
                        first_name: answer.who_first
                    }        
                  
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log("-----------------------------------");
                    console.log("An employee's Role has been updated");
                    console.log("-----------------------------------");

                    returnStart();
                    
                }
            )
        })
}