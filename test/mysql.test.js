// Import the required modules
const mysql = require('mysql');
const pool = require('../path/to/your/mysql_pool'); // Adjust the path as per your directory structure

// Mock data for testing
const mockConfig = {
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'chat_application'
};

describe('MySQL Pool Configuration Tests', () => {
    test('should create a MySQL pool with the correct configuration', () => {
        // Mock the mysql.createPool method
        const mockCreatePool = jest.spyOn(mysql, 'createPool').mockImplementation(() => {
            return {
                getConnection: jest.fn()
            };
        });

        // Call the MySQL pool module
        const createdPool = require('../path/to/your/mysql_pool');

        // Assertions
        expect(mockCreatePool).toHaveBeenCalledWith(mockConfig);
        expect(createdPool.getConnection).toBeDefined();

        // Restore the mock
        mockCreatePool.mockRestore();
    });
});
