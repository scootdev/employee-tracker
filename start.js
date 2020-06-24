const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
let departments = [];
let roles = [];
let managers = ["None"];

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employees_db"
});

connection.connect((err) => {
    if (err) throw err;
    init();
})

function init() {
    console.log(
        `
       ------------------------------------------------------------------------------
       | 8888888888                        888                                      |
       | 888                               888                                      |
       | 888                               888                                      |
       | 8888888    88888b.d88b.  88888b.  888  .d88b.  888  888  .d88b.   .d88b.   |
       | 888        888 "888 "88b 888 "88b 888 d88""88b 888  888 d8P  Y8b d8P  Y8b  |
       | 888        888  888  888 888  888 888 888  888 888  888 88888888 88888888  |
       | 888        888  888  888 888 d88P 888 Y88..88P Y88b 888 Y8b.     Y8b.      |
       | 8888888888 888  888  888 88888P"  888  "Y88P"   "Y88888  "Y8888   "Y8888   |
       |                          888                        888                    |
       |                          888                   Y8b d88P                    |
       |                          888                    "Y88P"                     |
       | 888b     d888                                                              |
       | 8888b   d8888                                                              |
       | 88888b.d88888                                                              |
       | 888Y88888P888  8888b.  88888b.   8888b.   .d88b.   .d88b.  888d888         |
       | 888 Y888P 888     "88b 888 "88b     "88b d88P"88b d8P  Y8b 888P"           |
       | 888  Y8P  888 .d888888 888  888 .d888888 888  888 88888888 888             |
       | 888   "   888 888  888 888  888 888  888 Y88b 888 Y8b.     888             |
       | 888       888 "Y888888 888  888 "Y888888  "Y88888  "Y8888  888             |
       |                                               888                          |
       |                                          Y8b d88P                          |
       |                                           "Y88P"                           |
       ------------------------------------------------------------------------------                                                                 
        `
    );
    action();
};

function action() {
    getDepts();
    getRoles();
    getMgrs();
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "View All Employees By Role",
            "Add New Employee",
            "Add New Role",
            "Add New Department",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Department",
            "Delete Role"
        ]
    }).then((answer) => {
        switch (answer.action) {
            case "View All Employees":
                viewAll();
                break;

            case "View All Employees By Department":
                viewAllByDepartment();
                break;

            case "View All Employees By Manager":
                viewAllByManager();
                break;

            case "View All Employees By Role":
                viewAllByRole();
                break;

            case "Add New Employee":
                addEmployee();
                break;

            case "Add New Role":
                addRole();
                break;

            case "Add New Department":
                addDept();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            case "Update Employee Manager":
                updateMgr();
                break;

            case "Delete Department":
                deleteDept();
                break;

            case "Delete Role":
                deleteRole();
                break;

        }
    });
};

function viewAll() {
    const query =
        `SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        role.salary,
        department.department,
        CONCAT(m.first_name, " ", m.last_name) as "Manager"
    FROM
        employee
    INNER JOIN
        role
      ON employee.role_id = role.id
    INNER JOIN
        department
      ON role.department_id = department.id
    LEFT OUTER JOIN employee m
      ON employee.manager_id = m.id`

    connection.query(query, (err, res) => {
        console.table(res);
        action();
    });
};

