DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
 id INT PRIMARY KEY NOT NULL,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INT
); 

CREATE TABLE employee (
  id INT PRIMARY KEY
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL
);