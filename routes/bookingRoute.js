const express = require("express");
const router = express.Router();

//Booking modell
const Booking = require("../models/Booking");
//Controller
const {createBooking, getBookings} = require("../controller/bookingController");


//ROUTES

//lägga till
router.post("/", createBooking);


//SKYDDAD ROUTE (??)
//hämta och se bokning
router.get("/", getBookings);



//exportera - skicka till server.js
module.exports = router;