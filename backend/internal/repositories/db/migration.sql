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
