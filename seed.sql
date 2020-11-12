USE employee_trackerdb;

INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Administration");

INSERT INTO role (title, salary, department_id) VALUES ("Analyst", 110000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Communications Associate", 75000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Social Media Manager", 55000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Director", 150000, 3);


INSERT INTO employee (first_name, last_name, role_id) VALUES ("Homer", "Simpson", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Marg", "Simpson", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Moe", "Szyslak", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mr.", "Burns", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Madam", "Wu", 4);
