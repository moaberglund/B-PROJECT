// BACKEND PROJEKT

const express = require("express");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");


//import av routes
const loginRouter = require("./routes/loginRoute");
const bookingRoute = require("./routes/bookingRoute");
const contactRoute = require("./routes/contactRoute");
const menuRoute = require("./routes/menuRoute");

const app = express();
const port = process.env.PORT || 3000;
//middleware
app.use(bodyparser.json());
app.use(cors());

//starta upp applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port)
});

//ROUTES
app.use("/api/login", loginRouter);
app.use("/api/booking", bookingRoute);
app.use("/api/contact", contactRoute);
app.use("/api/menu", menuRoute);


//anslutning till databas - Atlas MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Error i koppling till databasen...");
});

//skyddad, login route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "På skyddad route! " });
});

//Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; //Token

    //Saknas token?
    if (token == null) res.status(401).json({ message: "Åtkomst nekad! - saknad av token" });

    //Token OK
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) return res.status(403).json({ message: "Ogiltig JWT!" });

        req.username = username;
        next();
    });
};


module.exports = { authenticateToken };