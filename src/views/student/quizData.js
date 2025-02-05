// quizData.js
export const quizData = [
    // Group 1
    {
      question: "What does the term 'database' mean?",
      options: [
        { text: "A programming language for building applications", isCorrect: false },
        { text: "A structured collection of data for easy access and management", isCorrect: true },
        { text: "A hardware device for data storage", isCorrect: false },
        { text: "A tool for analyzing data", isCorrect: false },
      ],
    },
    {
      question: "Which of the following is NOT a feature of relational databases?",
      options: [
        { text: "Data is stored in tables", isCorrect: false },
        { text: "Uses keys to establish relationships", isCorrect: false },
        { text: "Supports a schema-less design", isCorrect: true },
        { text: "Ensures data integrity", isCorrect: false },
      ],
    },
    {
      question: "Which SQL command is used to retrieve data from a database?",
      options: [
        { text: "INSERT", isCorrect: false },
        { text: "UPDATE", isCorrect: false },
        { text: "DELETE", isCorrect: false },
        { text: "SELECT", isCorrect: true },
      ],
    },
    {
      question: "What kind of data can non-relational databases handle effectively?",
      options: [
        { text: "Only structured data", isCorrect: false },
        { text: "Unstructured and semi-structured data", isCorrect: true },
        { text: "Data in fixed rows and columns", isCorrect: false },
        { text: "Data requiring strong ACID compliance", isCorrect: false },
      ],
    },
    {
      question: "Which of these databases is an example of a non-relational database?",
      options: [
        { text: "Oracle Database", isCorrect: false },
        { text: "MongoDB", isCorrect: true },
        { text: "PostgreSQL", isCorrect: false },
        { text: "Microsoft SQL Server", isCorrect: false },
      ],
    },
  
    // Group 2
    {
      question: "Which type of SQL statement is used to create or alter database schemas?",
      options: [
        { text: "DML", isCorrect: false },
        { text: "DDL", isCorrect: true },
        { text: "DCL", isCorrect: false },
        { text: "TCL", isCorrect: false },
      ],
    },
    {
      question: "What is the purpose of the DISTINCT keyword in a SELECT statement?",
      options: [
        { text: "To count rows", isCorrect: false },
        { text: "To retrieve all records", isCorrect: false },
        { text: "To return unique values only", isCorrect: true },
        { text: "To sort records", isCorrect: false },
      ],
    },
    {
      question: "What operator would you use to filter rows where a column value falls within a specified range?",
      options: [
        { text: "IN", isCorrect: false },
        { text: "BETWEEN", isCorrect: true },
        { text: "LIKE", isCorrect: false },
        { text: "LIMIT", isCorrect: false },
      ],
    },
    {
      question: "Which logical operator combines multiple conditions that must all be true?",
      options: [
        { text: "AND", isCorrect: true },
        { text: "OR", isCorrect: false },
        { text: "NOT", isCorrect: false },
        { text: "XOR", isCorrect: false },
      ],
    },
    {
      question: "What does the % symbol represent in the LIKE operator?",
      options: [
        { text: "A single character match", isCorrect: false },
        { text: "Any sequence of characters", isCorrect: true },
        { text: "Case-sensitive match", isCorrect: false },
        { text: "A numerical comparison", isCorrect: false },
      ],
    },
  
    // Group 3
    {
      question: "Which SQL clause is used to group rows and apply aggregate functions to each group?",
      options: [
        { text: "JOIN", isCorrect: false },
        { text: "WHERE", isCorrect: false },
        { text: "GROUP BY", isCorrect: true },
        { text: "ORDER BY", isCorrect: false },
      ],
    },
    {
      question: "What does the AVG function do in SQL?",
      options: [
        { text: "Finds the maximum value", isCorrect: false },
        { text: "Returns the average of column values", isCorrect: true },
        { text: "Counts the number of rows", isCorrect: false },
        { text: "Finds the minimum value", isCorrect: false },
      ],
    },
    {
      question: "Which type of join returns only matching rows from both tables?",
      options: [
        { text: "LEFT JOIN", isCorrect: false },
        { text: "RIGHT JOIN", isCorrect: false },
        { text: "FULL JOIN", isCorrect: false },
        { text: "INNER JOIN", isCorrect: true },
      ],
    },
    {
      question:
        "In the following query, what does SUM(revenue) do?\n\nSELECT region, SUM(revenue) FROM sales GROUP BY region;",
      options: [
        { text: "Counts the rows in the region column", isCorrect: false },
        { text: "Calculates the total revenue for each region", isCorrect: true },
        { text: "Finds the maximum revenue in each region", isCorrect: false },
        { text: "Returns the average revenue for each region", isCorrect: false },
      ],
    },
    {
      question: "What is the difference between a LEFT JOIN and an INNER JOIN?",
      options: [
        {
          text: "LEFT JOIN returns all rows from the left table, while INNER JOIN only returns matched rows",
          isCorrect: true,
        },
        { text: "INNER JOIN returns unmatched rows, while LEFT JOIN does not", isCorrect: false },
        { text: "LEFT JOIN excludes rows with NULL values, while INNER JOIN includes them", isCorrect: false },
        { text: "There is no difference", isCorrect: false },
      ],
    },
  
    // Group 4
    {
      question: "What SQL statement is used to add new records to a table?",
      options: [
        { text: "UPDATE", isCorrect: false },
        { text: "DELETE", isCorrect: false },
        { text: "INSERT INTO", isCorrect: true },
        { text: "SELECT", isCorrect: false },
      ],
    },
    {
      question: "Which of the following statements is faster for removing all rows from a table?",
      options: [
        { text: "DELETE", isCorrect: false },
        { text: "TRUNCATE", isCorrect: true },
        { text: "DROP", isCorrect: false },
        { text: "REMOVE", isCorrect: false },
      ],
    },
    {
      question: "How can you undo changes made during a transaction?",
      options: [
        { text: "COMMIT", isCorrect: false },
        { text: "BEGIN", isCorrect: false },
        { text: "ROLLBACK", isCorrect: true },
        { text: "SAVEPOINT", isCorrect: false },
      ],
    },
    {
      question: "What is the correct syntax to update a specific row in a table?",
      options: [
        { text: "UPDATE table_name SET column = value;", isCorrect: false },
        { text: "UPDATE table_name SET column = value WHERE condition;", isCorrect: true },
        { text: "UPDATE column = value FROM table_name;", isCorrect: false },
        { text: "SET column = value UPDATE table_name;", isCorrect: false },
      ],
    },
    {
      question: "How do you add multiple records into a table in one SQL statement?",
      options: [
        { text: "Use INSERT INTO with multiple VALUES separated by commas", isCorrect: true },
        { text: "Use INSERT INTO repeatedly for each record", isCorrect: false },
        { text: "Use UPDATE for all records simultaneously", isCorrect: false },
        { text: "Use INSERT ALL", isCorrect: false },
      ],
    },
  
    // Group 5
    {
      question: "What is the purpose of normalization in database design?",
      options: [
        { text: "To speed up query performance", isCorrect: false },
        { text: "To reduce data redundancy and dependency", isCorrect: true },
        { text: "To ensure referential integrity", isCorrect: false },
        { text: "To create foreign keys", isCorrect: false },
      ],
    },
    {
      question: "Which key uniquely identifies records in a table?",
      options: [
        { text: "Foreign key", isCorrect: false },
        { text: "Composite key", isCorrect: false },
        { text: "Primary key", isCorrect: true },
        { text: "Candidate key", isCorrect: false },
      ],
    },
    {
      question: "In a one-to-many relationship, which statement is true?",
      options: [
        { text: "A single record in one table can relate to multiple records in another table", isCorrect: true },
        { text: "Multiple records in one table relate to a single record in another", isCorrect: false },
        { text: "Each record in one table relates to only one record in another", isCorrect: false },
        { text: "It cannot be implemented using foreign keys", isCorrect: false },
      ],
    },
    {
      question: "How is a many-to-many relationship typically implemented in a database?",
      options: [
        { text: "By using composite keys", isCorrect: false },
        { text: "By creating a junction table", isCorrect: true },
        { text: "By denormalizing the database", isCorrect: false },
        { text: "By using foreign keys without a primary key", isCorrect: false },
      ],
    },
    {
      question: "What happens when referential integrity is violated?",
      options: [
        { text: "A query returns duplicate records", isCorrect: false },
        { text: "Orphaned records are created", isCorrect: true },
        { text: "The database automatically deletes invalid records", isCorrect: false },
        { text: "Transactions are rolled back", isCorrect: false },
      ],
    },
  
    // Group 6
    {
      question: "What is the primary purpose of a stored procedure?",
      options: [
        { text: "Automate database backups", isCorrect: false },
        { text: "Execute predefined SQL statements with parameters", isCorrect: true },
        { text: "Log all changes in a database", isCorrect: false },
        { text: "Optimize data retrieval", isCorrect: false },
      ],
    },
    {
      question: "Which SQL event can trigger a database action using a trigger?",
      options: [
        { text: "SELECT", isCorrect: false },
        { text: "INSERT", isCorrect: true },
        { text: "COMMIT", isCorrect: false },
        { text: "CREATE", isCorrect: false },
      ],
    },
    {
      question: "How is a view different from a table?",
      options: [
        { text: "A view is a virtual table derived from a query, while a table stores physical data", isCorrect: true },
        { text: "A view requires indexing, while a table does not", isCorrect: false },
        { text: "A view is faster to query than a table", isCorrect: false },
        { text: "A view does not support joins", isCorrect: false },
      ],
    },
    {
      question: "What is the primary trade-off of using an index?",
      options: [
        { text: "Reduced query execution time but increased storage requirements", isCorrect: false },
        { text: "Improved data retrieval speed but slower data insertion and updates", isCorrect: true },
        { text: "Enhanced security but slower joins", isCorrect: false },
        { text: "Faster sorting but reduced data accuracy", isCorrect: false },
      ],
    },
    {
      question: "Which command would you use to create an index on a column?",
      options: [
        { text: "CREATE INDEX", isCorrect: true },
        { text: "CREATE VIEW", isCorrect: false },
        { text: "CREATE TRIGGER", isCorrect: false },
        { text: "CREATE PROCEDURE", isCorrect: false },
      ],
    },
  ];
  