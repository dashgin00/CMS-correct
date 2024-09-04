const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://192.168.73.131/', // Replace with your frontend URL
    credentials: true // Allow credentials (cookies)
}));


// Importing routes

const adminRoutes = require("./routes/adminRoutes")
const usersRoutes = require("./routes/usersRoutes")
const authRoutes = require("./routes/authRoutes")


// Middlewares
app.use("/api/admin", adminRoutes)
app.use("/api/users/", usersRoutes)
app.use("/api/auth", authRoutes)
const port = 3001


app.listen(port, (req, res)=>{
    console.log("server is running on ", port)
})
