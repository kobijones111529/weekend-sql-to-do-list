-- Create table
CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(63) NOT NULL UNIQUE
);

-- Initialize with test data
INSERT INTO "todos"
	("todo")
VALUES
	('Walk dog'),
	('Feed dog'),
	('Read bedtime stories to dog'),
	('Take dog ice skating'),
	('Go stargazing with dog');
