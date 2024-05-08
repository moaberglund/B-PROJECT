// route för inloggning

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//anslutning till databas - Atlas MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB!")
}).catch((error) => {
    console.error("Error i koppling till databasen...")
});

//User modell
const User = require("../models/User");


//post anrop för REGISTRERING
router.post("/register", async (req, res) => {
    console.log("Registrering påbörjad")
    try {
        const { username, password } = req.body;

        //Validera
        if (!username || !password) {
            return res.status(400).json({ error: "Tom input, vänligen fyll i båda fält" })
        }

        //OK - spara ny användare
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "Användare skapad" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

//post anrop för INLOGGNING
router.post("/login", (req, res) => {
    console.log("Inloggning påbörjad")
})





//exportera - skicka till server.js
module.exports = router;