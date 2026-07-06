CREATE TYPE USER_ROLE AS ENUM ('super-admin', 'admin', 'previliged', 'user');

CREATE TABLE categories ( 
    id INT PRIMARY KEY, 
    name TEXT
);

CREATE TABLE icons (
    id INT PRIMARY KEY, 
    name TEXT, 
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE status (
    id INT PRIMARY KEY, 
    name TEXT, 
    color TEXT
);

CREATE TABLE locations (
    id INT PRIMARY KEY, 
    name TEXT, 
    address TEXT, 
    created_at DATE, 
    updated_at DATE
);

CREATE TABLE assets (
    id INT PRIMARY KEY, 
    name TEXT UNIQUE,
    count INT, 
    location_id INT,
    status_id INT,
    icon_id INT,
    category_id INT,
    created_at DATE, 
    updated_at DATE,
    FOREIGN KEY (location_id) REFERENCES locations(id),
    FOREIGN KEY (status_id) REFERENCES status(id),
    FOREIGN KEY (icon_id) REFERENCES icons(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE roles (
	id INT PRIMARY KEY,
	name TEXT,
	user_level USER_ROLE
);

CREATE TABLE permissions (
	id INT PRIMARY KEY,
	name TEXT
);

CREATE TABLE role_permission (
	id INT PRIMARY KEY,
	role_id INT,
	permission_id INT,
	FOREIGN KEY (role_id) REFERENCES roles(id),
	FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE users (
	id INT PRIMARY KEY,
	name TEXT,
	email TEXT,
	password TEXT,
	created_at TIMESTAMPTZ,
	updated_at TIMESTAMPTZ,
	role_id INT,
	FOREIGN KEY (role_id) REFERENCES roles(id)
);
