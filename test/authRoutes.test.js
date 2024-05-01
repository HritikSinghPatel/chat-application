// Import required modules
const express = require('express');
const supertest = require('supertest');
const router = require('../path/to/router'); // Adjust the path as per your directory structure
const authController = require('../path/to/authController'); // Adjust the path as per your directory structure
const registerController = require('../path/to/registerController'); // Adjust the path as per your directory structure

// Create an Express app
const app = express();
app.use(express.json());
app.use('/', router);

// Mock request and response objects for testing
const mockRequest = (body) => ({
    body,
});
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Authentication Router Tests', () => {
    test('should call authController.login for POST /login route', async () => {
        const req = mockRequest({ username: 'testuser', password: 'testpassword' });
        const res = mockResponse();

        // Mock the authController.login method
        authController.login = jest.fn();

        // Send a POST request to /login route
        await supertest(app)
            .post('/login')
            .send(req.body);

        // Assertions
        expect(authController.login).toHaveBeenCalledWith(req, res);
    });

    test('should call registerController.register for POST /register route', async () => {
        const req = mockRequest({ username: 'testuser', password: 'testpassword' });
        const res = mockResponse();

        // Mock the registerController.register method
        registerController.register = jest.fn();

        // Send a POST request to /register route
        await supertest(app)
            .post('/register')
            .send(req.body);

        // Assertions
        expect(registerController.register).toHaveBeenCalledWith(req, res);
    });
});
