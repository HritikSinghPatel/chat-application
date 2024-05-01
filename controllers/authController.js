const pool = require('../db/mysql'); // Adjust the path as per your directory structure
const jwt = require('jsonwebtoken');

// Function to execute queries
function executeQuery(sql, params, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            callback(err, null);
            return;
        }

        connection.query(sql, params, (error, results, fields) => {
            connection.release();
            if (error) {
                console.error('Error executing query:', error);
                callback(error, null);
                return;
            }
            callback(null, results);
        });
    });
}
// Secret key for JWT token generation (Replace this with a long, randomly generated secret)
const jwtSecret = 'hritik_singh';

// Controller method for user login
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const params = [username, password];

    executeQuery(sql, params, (error, results) => {
        if (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            if (results.length > 0) {
                // Generate JWT token
                const token = jwt.sign({ username: username }, jwtSecret, { expiresIn: '1h' });

                res.json({ success: true ,message: 'Authentication successful' , jwtToken:token });
            } else {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        }
    });
};
