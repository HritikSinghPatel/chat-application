// Import the required modules
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

describe('Register Controller Tests', () => {
    test('should register a user successfully', () => {
        // Mock connection.query method
        const mockQuery = jest.fn((sql, values, callback) => {
            callback(null, { success: true });
        });
        pool.getConnection = jest.fn(callback => callback(null, { query: mockQuery }));

        // Call the register method with mock request and response objects
        controller.register(mockRequest, mockResponse);

        // Assertions
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: true, message: 'User registered successfully' });
    });

    test('should return 400 if username or password is missing', () => {
        // Mock request object with missing username
        const invalidRequest = { body: { password: 'testpassword' } };

        // Call the register method with mock request and response objects
        controller.register(invalidRequest, mockResponse);

        // Assertions
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Username and password are required' });
    });

    test('should return 500 on database error', () => {
        // Mock connection.query method
        const mockQuery = jest.fn((sql, values, callback) => {
            callback(new Error('Database error'), null);
        });
        pool.getConnection = jest.fn(callback => callback(null, { query: mockQuery }));

        // Call the register method with mock request and response objects
        controller.register(mockRequest, mockResponse);

        // Assertions
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Error registering user' });
    });
});
