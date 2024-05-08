const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Contact modell
const Contact = require("../models/Contact");

//Routes

//post anrop för att skicka ett kontakt meddelande - lägga till
router.post("/contact", async (req, res) => {
    try {
        const { name, phone, mail, textmessage } = req.body;

        //Validera
        if (!name || !phone || !mail || !textmessage) {
            return res.status(400).json({ error: "Tom input, vänligen fyll i alla fält" })
        }

        //OK - spara ny bokning
        const contact = new Contact({ name, phone, mail, textmessage });
        await contact.save();
        res.status(201).json({ message: "Meddelande skickat" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//get anrop för personal att se meddelanden (skyddad route)








//exportera - skicka till server.js
module.exports = router;