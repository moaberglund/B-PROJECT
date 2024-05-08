// route för inloggning

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//anslutning till databas - Atlas MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Error i koppling till databasen...");
});

//User modell
const User = require("../models/User");


//post anrop för REGISTRERING
router.post("/register", async (req, res) => {
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
});

//post anrop för INLOGGNING
router.post("/login", async (req, res) => { 
    try {
        const { username, password } = req.body;

        //Kolla input - validering
        if (!username || !password) {
            return res.status(400).json({ error: "Inkorrekt input, fyll i båda fälten korrekt" });
        }

        //kolla om användaren finns (?)
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Fel användarnamn eller lösenord!" });
        }

        //koll av lösenord
        //comaprePassword från UserSchema
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Fel användarnamn eller lösenord!" });
        } else {
            //skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
            //skicka tillbaka ett svar
            const response = {
                message: "Användare inloggad",
                token: token
            }
            res.status(200).json({ response });
        }


    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});



//exportera - skicka till server.js
module.exports = router;