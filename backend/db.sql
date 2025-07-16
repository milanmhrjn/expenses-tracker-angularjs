select * from users;
select * from expensesTracker;

ALTER TABLE Users ADD password VARCHAR(255);


SELECT * FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'expensesTracker';



SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'expensesTracker';

INSERT INTO expensesTracker (UserId, Amount, Category, Description, ExpenseDate, Miscellaneous)
VALUES (9, 100, 'Food', 'Lunch', '2025-07-06', NULL);
SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'users';

SELECT * FROM users WHERE id = 9;


ALTER TABLE Users ADD password VARCHAR(255);

ALTER TABLE Users
DROP COLUMN password;

ALTER TABLE Users ADD role NVARCHAR(20) NOT NULL DEFAULT 'user';
