const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Booking modell
const Booking = require("../models/Booking");

//Routes

//post anrop för att göra en bokning - lägga till
router.post("/booking", async (req, res) => {
    try {
        const { name, phone, mail, amountOfPeople, day, time } = req.body;

        //Validera
        if (!name || !phone || !mail || !amountOfPeople || !day || !time) {
            return res.status(400).json({ error: "Tom input, vänligen fyll i alla fält" })
        }

        //OK - spara ny bokning
        const booking = new Booking({ name, phone, mail, amountOfPeople, day, time });
        await booking.save();
        res.status(201).json({ message: "Bokning skapad" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})


//get anrop från skyddad route - hämta och se bokning










//exportera - skicka till server.js
module.exports = router;