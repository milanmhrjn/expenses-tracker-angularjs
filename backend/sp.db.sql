-- CREATE PROCEDURE showAllUsers
-- AS
-- SELECT * FROM users
-- GO;

-- exec showAllUsers


-- CREATE PROCEDURE showAllExpenses 
-- AS 
-- SELECT * FROM expensesTracker 
-- GO;

-- exec showAllExpenses


-- CREATE PROCEDURE showUserById
--     @showUserById INT
-- AS
-- BEGIN
--     SELECT * FROM users WHERE id = @showUserById;
-- END;
-- EXEC showUserById @showUserById = 10;