const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//anslutning till databas - Atlas MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Error i koppling till databasen...");
});

//Booking modell
const Booking = require("../models/Booking");

//Routes

//post anrop för att göra en bokning - lägga till
router.post("/booking", async (req, res) => {
    try {
        const { name, phone, mail, amountOfPeople, day, time } = req.body;

        //Validera
        if (!name || !phone || !mail || !amountOfPeople || !day || !time) {
            return res.status(400).json({ error: "Tom input, vänligen fyll i alla fält" });
        };

        //OK - spara ny bokning
        const booking = new Booking({ name, phone, mail, amountOfPeople, day, time });
        await booking.save();
        res.status(201).json({ message: "Bokning skapad" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


//get anrop från skyddad route - hämta och se bokning
//importera authenticateToken 
const authenticateToken = require("../server");

router.get("/booking", authenticateToken, (req, res) => {
    try {
        let result = Booking.find({}); //"hitta" all data i namngiven tabell
        return res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});









//exportera - skicka till server.js
module.exports = router;