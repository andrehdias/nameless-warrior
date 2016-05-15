USE nameless_warrior;

CREATE TABLE user (
	id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(100) NOT NULL UNIQUE,
	password CHAR(40) NOT NULL
);

CREATE TABLE human (
	id INT AUTO_INCREMENT PRIMARY KEY,	
	nickname VARCHAR(30) NOT NULL,
	class INT(1) NOT NULL,
	strength INT(2) NOT NULL,
	dexterity INT(2) NOT NULL,
	constitution INT(2) NOT NULL,
	intelligence INT(2) NOT NULL,
	charisma INT(2) NOT NULL,
	id_user INT NOT NULL,
	FOREIGN KEY (id_user) REFERENCES user(id)
);
