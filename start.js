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
    password: "Saclip2015!",
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
            "Delete Role",
            "Delete Employee",
            "View Utilized Budget By Department"
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

            case "Delete Employee":
                deleteEmployee();
                break;

            case "View Utilized Budget By Department":
                deptBudget();
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

function viewAllByDepartment() {
    inquirer.prompt({
        type: "list",
        name: "department",
        message: "Which department would you like to view?",
        choices: departments
    }).then((answer) => {
        const query =
            `SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title,
            role.salary,
            department.department,
            CONCAT(m.first_name, " ", m.last_name) as "manager"
        FROM
            employee
        INNER JOIN
            role
          ON employee.role_id = role.id
        INNER JOIN
            department
          ON role.department_id = department.id
        LEFT OUTER JOIN employee m
          ON employee.manager_id = m.id
        WHERE department = "${answer.department}"`
        connection.query(query, (err, res) => {
            console.table(res);
            action();
        })
    })
};

function viewAllByManager() {
    inquirer.prompt({
        type: "list",
        name: "manager",
        message: "Which manager would you like to view?",
        choices: managers
    }).then((answer) => {
        const query =
            `SELECT
	            employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                role.salary,
                department.department,
                CONCAT(m.first_name, " ", m.last_name) as "manager"
            FROM
	            employee
            INNER JOIN
	            role
            ON employee.role_id = role.id
            INNER JOIN
	            department
            ON role.department_id = department.id
            LEFT OUTER JOIN employee m
            ON employee.manager_id = m.id
            HAVING manager = "${answer.manager}"`
        connection.query(query, (err, res) => {
            console.table(res);
            action();
        })
    })
};

function viewAllByRole() {
    inquirer.prompt({
        type: "list",
        name: "role",
        message: "Which role would you like to view?",
        choices: roles
    }).then((answer) => {
        const query =
            `SELECT
	            employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                role.salary,
                department.department,
                CONCAT(m.first_name, " ", m.last_name) as "manager"
            FROM
	            employee
            INNER JOIN
	            role
            ON employee.role_id = role.id
            INNER JOIN
	            department
            ON role.department_id = department.id
            LEFT OUTER JOIN employee m
            ON employee.manager_id = m.id
            HAVING title = "${answer.role}"`
        connection.query(query, (err, res) => {
            console.table(res);
            action();
        })
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "What is the employees first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employees role?",
        choices: roles
    },
    {
        type: "list",
        name: "mgr",
        message: "Who is the employees manager?",
        choices: managers
    }
    ]).then((answer) => {
        connection.query("SELECT id FROM role WHERE ?",
            {
                title: answer.role
            },
            (err, res) => {
                const role = res[0].id;
                let mgr;
                const name = answer.mgr.split(" ")
                connection.query("SELECT id FROM employee WHERE ? AND ?",
                    [{
                        first_name: name[0]
                    },
                    {
                        last_name: name[1]
                    }],
                    (err, res) => {
                        if (!res.length) {
                            mgr = null;
                        } else {
                            mgr = res[0].id
                        }
                        connection.query("INSERT INTO employee SET ?",
                            {
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: role,
                                manager_id: mgr
                            },
                            (err) => {
                                if (err) throw err;
                                console.log("Employee added!")
                                action();
                            })
                    })

            });
    })
};

function addDept() {
    inquirer.prompt({
        type: "input",
        name: "dept",
        message: "What is the name of the new department?"
    }).then((answer) => {
        connection.query("INSERT INTO department SET ?",
            {
                department: answer.dept
            },
            (err) => {
                if (err) throw err;
                console.log("Department added!");
                action();
            }
        )
    })
}

function addRole() {
    inquirer.prompt(
        [{
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "number",
            name: "salary",
            message: "What is the salary of the new role?"
        },
        {
            type: "list",
            name: "dept",
            message: "Which department is this role in?",
            choices: departments
        }]
    ).then((answer) => {
        connection.query(`SELECT id FROM department WHERE department = "${answer.dept}"`, (err, res) => {
            const id = res[0].id;
            connection.query("INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: id
                },
                (err) => {
                    if (err) throw err;
                    console.log("New role added!");
                    action();
                }
            )
        })
    })
}

function getDepts() {
    const query = "SELECT department FROM department"
    connection.query(query, (err, res) => {
        departments = [];
        for (let i = 0; i < res.length; i++) {
            const department = res[i].department;
            departments.push(department);
        }
    })
};

function getRoles() {
    const query = "SELECT title FROM role"
    connection.query(query, (err, res) => {
        roles = [];
        for (let i = 0; i < res.length; i++) {
            const role = res[i].title;
            roles.push(role);
        }
    })
};

function getMgrs() {
    const query =
        `SELECT DISTINCT manager
    FROM (
    SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        role.salary,
        department.department,
        CONCAT(m.first_name, " ", m.last_name) as "manager"
    FROM
        employee
    INNER JOIN
        role
      ON employee.role_id = role.id
    INNER JOIN
        department
      ON role.department_id = department.id
    LEFT OUTER JOIN employee m
      ON employee.manager_id = m.id
    ) m`
    connection.query(query, (err, res) => {
        managers = ["None"]
        for (let i = 1; i < res.length; i++) {
            const manager = res[i].manager;
            managers.push(manager);
        }
    })
};

function updateRole() {
    connection.query('SELECT CONCAT(first_name, " ", last_name) FROM employee', (err, res) => {
        let employees = [];
        for (let i = 0; i < res.length; i++) {
            const name = res[i]['CONCAT(first_name, " ", last_name)'];
            employees.push(name);
        }
        inquirer.prompt([{
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employees
        },
        {
            type: "list",
            name: "role",
            message: "What is their new role?",
            choices: roles
        }
        ]).then((answer) => {
            const name = answer.employee.split(" ")
            connection.query("SELECT id FROM role WHERE ?",
                {
                    title: answer.role
                },
                (err, res) => {
                    connection.query("UPDATE employee SET ? WHERE ? AND ?",
                        [{
                            role_id: res[0].id
                        },
                        {
                            first_name: name[0]
                        },
                        {
                            last_name: name[1]
                        }], (err) => {
                            if (err) throw err;
                            console.log("Employee Role Updated!")
                            action();
                        })
                })
        })
    });
};

function updateMgr() {
    connection.query('SELECT CONCAT(first_name, " ", last_name) FROM employee', (err, res) => {
        let employees = [];
        for (let i = 0; i < res.length; i++) {
            const name = res[i]['CONCAT(first_name, " ", last_name)'];
            employees.push(name);
        }
        inquirer.prompt([{
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employees
        },
        {
            type: "list",
            name: "manager",
            message: "Who is their new manager?",
            choices: employees
        }
        ]).then((answer) => {
            if (answer.employee === answer.manager) {
                console.log("Employee and manager cannot be the same person")
                updateMgr();
            }
            const employeeName = answer.employee.split(" ");
            const managerName = answer.manager.split(" ");
            connection.query("SELECT id FROM employee WHERE ?",
                [
                    {
                        first_name: managerName[0]
                    },
                    {
                        last_name: managerName[1]
                    }
                ],
                (err, res) => {
                    connection.query("UPDATE employee SET ? WHERE ? AND ?",
                        [{
                            manager_id: res[0].id
                        },
                        {
                            first_name: employeeName[0]
                        },
                        {
                            last_name: employeeName[1]
                        }], (err) => {
                            if (err) throw err;
                            console.log("Employee Manager Updated!")
                            action();
                        })
                })
        })
    });
}

function deleteDept() {
    inquirer.prompt({
        type: "list",
        name: "dept",
        message: "Which department would you like to delete?",
        choices: departments
    }).then((answer) => {
        connection.query(`DELETE FROM department WHERE department = "${answer.dept}"`, (err) => {
            if (err) throw err;
            console.log("Department deleted!");
            action();
        })
    })
}

function deleteRole() {
    inquirer.prompt({
        type: "list",
        name: "role",
        message: "Which role would you like to delete?",
        choices: roles
    }).then((answer) => {
        connection.query(`DELETE FROM role WHERE title = "${answer.role}"`, (err) => {
            if (err) throw err;
            console.log("Role deleted!");
            action();
        })
    })
}

function deleteEmployee() {
    connection.query('SELECT CONCAT(first_name, " ", last_name) FROM employee', (err, res) => {
        let employees = [];
        for (let i = 0; i < res.length; i++) {
            const name = res[i]['CONCAT(first_name, " ", last_name)'];
            employees.push(name);
        }
        inquirer.prompt([{
            type: "list",
            name: "employee",
            message: "Which employee would you like to delete?",
            choices: employees
        }
        ]).then((answer) => {
            const name = answer.employee.split(" ")
            connection.query("DELETE FROM employee WHERE ? AND ?",
                [
                    {
                        first_name: name[0]
                    },
                    {
                        last_name: name[1]
                    }
                ], (err) => {
                    if (err) throw err;
                    console.log("Employee Deleted!")
                    action();
                })
        })
    });
}

function deptBudget() {
    inquirer.prompt({
        type: "list",
        name: "dept",
        message: "Which department would you like to view?",
        choices: departments
    }).then((answer) => {
        const query =
            `SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                role.salary,
                department.department,
                CONCAT(m.first_name, " ", m.last_name) as "manager"
            FROM
                employee
            INNER JOIN
                role
            ON employee.role_id = role.id
            INNER JOIN
                department
            ON role.department_id = department.id
            LEFT OUTER JOIN employee m
            ON employee.manager_id = m.id
            WHERE department = "${answer.dept}"`
        connection.query(query, (err, res) => {
            let total = 0;
            for (let i = 0; i < res.length; i++) {
                const salary = res[i].salary;
                total += salary;
            }
            console.log(`Utilized budget for ${answer.dept} is $${total}`);
            action();
        })
    })
}