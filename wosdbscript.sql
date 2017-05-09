create database wosdb;

CREATE USER wosuser WITH PASSWORD 'password-1';

GRANT ALL PRIVILEGES ON DATABASE "wosdb" to wosuser;

create table users(
	id serial primary key,
	name varchar(100),
	email varchar(500),
	password varchar(100)
);


#Grant all table access to user
grant all privileges on database wosdb to wosuser;

#Grant all permission to table
GRANT ALL PRIVILEGES ON TABLE users TO wosuser;

--Grant access to all seuence like serial
--login as adminuser
--\c wosdb
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO wosuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO wosuser;

INSERT INTO users (
	name
	,email
	,password
	)
VALUES (
	'admin user'
	,'adminuser@gmail.com'
	,'password-1'
	);

	
