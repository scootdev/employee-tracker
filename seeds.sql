-- Inserting Departments
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("Warehouse");
INSERT INTO department (name)
VALUES ("Customer Service");
INSERT INTO department (name)
VALUES ("Reception");
INSERT INTO department (name)
VALUES ("Quality Assurance");
INSERT INTO department (name)
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