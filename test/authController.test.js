// Import the required modules
const jwt = require('jsonwebtoken');
const controller = require('../path/to/your/controller'); // Adjust the path as per your directory structure
const pool = require('../path/to/your/mock/mysql'); // Import a mock MySQL pool for testing

// Mock data for testing
const mockRequest = {
    body: {
        username: 'testuser',
        password: 'testpassword'
    }
};

const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
};

// Mock JWT secret
const jwtSecret = 'testsecret';

// Mock JWT sign method
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockToken')
}));

describe('Controller Tests', () => {
    describe('Login Method', () => {
        test('should return a JWT token on successful login', () => {
            // Mock connection.query method
            const mockQuery = jest.fn((sql, params, callback) => {
                callback(null, [{ username: 'testuser', password: 'testpassword' }]);
            });
            pool.getConnection = jest.fn(callback => callback(null, { query: mockQuery }));

            // Call the login method with mock request and response objects
            controller.login(mockRequest, mockResponse);

            // Assertions
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, message: 'Authentication successful', jwtToken: 'mockToken' });
        });

        test('should return 401 on invalid credentials', () => {
            // Mock connection.query method
            const mockQuery = jest.fn((sql, params, callback) => {
                callback(null, []);
            });
            pool.getConnection = jest.fn(callback => callback(null, { query: mockQuery }));

            // Call the login method with mock request and response objects
            controller.login(mockRequest, mockResponse);

            // Assertions
            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Invalid username or password' });
        });

        test('should return 500 on database error', () => {
            // Mock connection.query method
            const mockQuery = jest.fn((sql, params, callback) => {
                callback(new Error('Database error'), null);
            });
            pool.getConnection = jest.fn(callback => callback(null, { query: mockQuery }));

            // Call the login method with mock request and response objects
            controller.login(mockRequest, mockResponse);

            // Assertions
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Internal server error' });
        });
    });
});
