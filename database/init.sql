CREATE TABLE icons ( 
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE
);

CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    assets_count INT,
    assets_value INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    icon_id UUID,
    FOREIGN KEY (icon_id) REFERENCES icons(id)
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    icon_id UUID,
    FOREIGN KEY (icon_id) REFERENCES icons(id)
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    role_id UUID,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE role_permission (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID,
    permission_id UUID,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);


CREATE FUNCTION auto_update()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER updated_at_automatically
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION auto_update();

CREATE TRIGGER updated_at_automatically
BEFORE UPDATE ON assets
FOR EACH ROW
EXECUTE FUNCTION auto_update();

CREATE TRIGGER updated_at_automatically
BEFORE UPDATE ON roles
FOR EACH ROW
EXECUTE FUNCTION auto_update();
