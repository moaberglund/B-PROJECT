const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


//Booking modell
const Booking = require("../models/Booking");
//Controller
const {createBooking, getBookings} = require("../controller/bookingController");


//ROUTES

//lägga till
router.post("/", createBooking);


//SKYDDAD ROUTE (??)
//hämta och se bokning
router.get("/", authenticateToken, getBookings);


 
//Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; //Token

    //Saknas token?
    if (token == null) res.status(401).json({ message: "Åtkomst nekad! - saknad av token" });

    //Token OK
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Ogiltig JWT!" });

        req.username = username;
        next();
    });
};




//exportera - skicka till server.js
module.exports = router;