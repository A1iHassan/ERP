CREATE TABLE icons (
    id UUID PRIMARY KEY,
    name TEXT UNIQUE
);

CREATE TABLE assets (
    id UUID PRIMARY KEY,
    name TEXT,
    assets_count INT,
    assets_value INT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    icon_id UUID,
    FOREIGN KEY (icon_id) REFERENCES icons(id)
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY,
    name TEXT,
    icon_id UUID,
    FOREIGN KEY (icon_id) REFERENCES icons(id)
);

CREATE TABLE roles (
    id UUID PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    role_id UUID,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE role_permission (
    id UUID PRIMARY KEY,
    role_id UUID,
    permission_id UUID,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);
