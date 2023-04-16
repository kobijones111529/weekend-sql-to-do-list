-- Create table
CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(63) NOT NULL UNIQUE,
	"complete" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Initialize with test data
INSERT INTO "todos"
	("todo", "complete")
VALUES
	('Walk dog', TRUE),
	('Feed dog', FALSE),
	('Read bedtime stories to dog', FALSE),
	('Take dog ice skating', FALSE),
	('Go stargazing with dog', FALSE);
