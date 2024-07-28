const connection = require("../config/dbConnection");

const getDoctors = (req, res) => {
  const query = "SELECT * FROM doctors;";
  connection.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
};

const getDoctor = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM doctors WHERE doctor_id = '${id}';`;
    connection.query(query, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result.length) return res.status(404).json({ message: "Doctor not found" });
      res.json(result);
    });
}

const createDoctor = (req, res) => {
  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    specialty,
    phone_number,
    email,
    address,
    city,
    date_hired,
  } = req.body;

  const query = `
        INSERT INTO doctors (
            first_name, 
            last_name, 
            gender, 
            date_of_birth, 
            specialty, 
            phone_number, 
            email, 
            address, 
            city, 
            date_hired
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    first_name,
    last_name,
    gender,
    date_of_birth,
    specialty,
    phone_number,
    email,
    address,
    city,
    date_hired,
  ];

  connection.query(query, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Doctor created successfully", id: result.insertId });
  });
};

const deleteDoctor = (req, res)=>{
    const id = req.params.id;
    const query = `DELETE FROM doctors WHERE id = '${id}';`;
    connection.query(query, (err, result) => {
        if(err) return res.status(500).send(err);
        if(!result.affectedRows) return res.status(404).send("Doctor not found");
        res.send({ message: "Doctor deleted successfully" });
    });
}

const deleteReserveDoctorSession = (req, res) => {
    const doctor_id = req.params.doctorID;
    const user_id = req.params.userID;
    const session_date = req.body.session_date;

    const query = `
        INSERT INTO sessions (doctor_id, user_id, session_date) 
        VALUES (?,?,?);
    `;

    connection.query(query, [doctor_id, user_id, session_date], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Appointment created successfully", id: result.insertId });
    });
}

const reserveDoctorSession = (req, res) => {
    const doctor_id = req.params.doctorID;
    const user_id = req.params.userID;
    const session_date = req.body.session_date; // Assuming session_date is provided in the request body

    // First, check if the session already exists for the given date
    const checkQuery = 'SELECT * FROM sessions WHERE doctor_id = ? AND user_id = ? AND session_date = ?';

    connection.query(checkQuery, [doctor_id, user_id, session_date], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length) return res.status(409).send("Doctor already reserved for this user on the given date");

        // If no existing session, insert a new session
        const insertQuery = 'INSERT INTO sessions (doctor_id, user_id, session_date) VALUES (?, ?, ?)';

        connection.query(insertQuery, [doctor_id, user_id, session_date], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: "Doctor reserved successfully" });
        });
    });
}

module.exports = { getDoctors, getDoctor, createDoctor, deleteDoctor, deleteReserveDoctorSession, reserveDoctorSession};
