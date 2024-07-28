const connection = require("../config/dbConnection")


const reservation = (req, res) => {
    const doctor_id = req.params.doctorID;
    const user_id = req.params.userID;
    const session_date = req.body.session_date;

    const query = `
        INSERT INTO sessions (doctor_id, user_id, session_date) 
        VALUES (?, ?, ?);
    `;

    const values = [doctor_id, user_id, session_date];

    connection.query(query, values, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Appointment created successfully", id: result.insertId });
    });
};

module.exports = {reservation};
