# Employee Tracker

## Table of Contents
 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)

## Description
This is a terminal application for managing employees, job roles and departments. The application can be used alongside a mySQL database to easily add, edit & delete data.

## Installation
Run the included schema.sql in mySQL to create the database. Netflix bingers will appreciate the following seed that can be used for testing purposes:
```
USE employees_db;

-- Inserting Departments
INSERT INTO department (department)
VALUES ("Sales");
INSERT INTO department (department)
VALUES ("Accounting");
INSERT INTO department (department)
VALUES ("Warehouse");
INSERT INTO department (department)
VALUES ("Customer Service");
INSERT INTO department (department)
VALUES ("Reception");
INSERT INTO department (department)
VALUES ("Quality Assurance");
INSERT INTO department (department)
VALUES ("Human Resources");

-- Inserting Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Regional Manager", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Assistant To The Regional Manager", 57000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 57000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 78000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Warehouse Manager", 67800, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Warehouse Picker", 28000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Rep", 32000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Receptionist", 29650, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Quality Assurance Specialist", 49274, 6);
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Specialist", 65120, 7);

-- Inserting Employees
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Scott", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Beesly", 8, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Bernard", 3, 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Darryl", "Philbin", 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nate", "Nickerson", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lonny", "Collins", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Martin", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Oscar", "Martinez", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Malone", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelly", "Kapoor", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Creed", "Bratton", 9, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Meredith", "Palmer", 9, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Toby", "Flenderson", 10, 1);
```
Switch to the application folder and run the command `npm i` to install required packages. Open start.js and edit lines 9:19 to reflect your mySQL details. In most cases just the password should need to be changed.

## Usage
Run the application with the command `node start`. Follow the prompts in the terminal to manage the database as needed. All changes to the database are saved automatically.

![Usage](./assets/usage.gif)

