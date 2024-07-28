const connection = require('../config/dbConnection')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const {
        username,
        password,
        first_name,
        last_name,
        email,
        phone_number,
        address,
        city,
        state,
        zip_code,
        date_of_birth
    } = req.body;
    
    try {
        const query = `
            INSERT INTO users (
                username,
                password,
                first_name,
                last_name,
                email,
                phone_number,
                address,
                city,
                state,
                zip_code,
                date_of_birth
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            username,
            password, // Plain-text password (not recommended)
            first_name,
            last_name,
            email,
            phone_number,
            address,
            city,
            state,
            zip_code,
            date_of_birth
        ];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error(err); // Log the error
                return res.status(500).send({ message: 'Database error', error: err });
            }

            const userId = result.insertId;

            // Fetch the user details including is_admin field
            const fetchUserQuery = `SELECT username, is_admin FROM users WHERE user_id = ?`;
            connection.query(fetchUserQuery, [userId], (err, userResult) => {
                if (err) {
                    console.error(err); // Log the error
                    return res.status(500).send({ message: 'Database error', error: err });
                }

                const user = userResult[0];

                res.send({ message: "User registered successfully", id: userId, user });
            });
        });
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).send({ message: 'Server error', error: err });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT user_id, password, is_admin FROM users WHERE username = '${username}' AND password='${password}';`;
    console.log(query);
    connection.query(query, async (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // Create JWT token
        const token = jwt.sign({ username, isAdmin: user.is_admin }, "secret", { expiresIn: '24h' });

        // Set token in cookies
        res.cookie('token', token);

        res.send({ message: "Login successful", id: user.user_id });
    });
};

const logout = (req,res) => {
    res.clearCookie('token');
    res.send({ message: "Logged out successfully" });
}

module.exports = {register, login, logout};
