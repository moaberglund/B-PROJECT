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

//Meny modell
const Menu = require("../models/Menu");

//routes

//get till webbplatsen, utskrift av menyn
router.get("/menu", async (req, res) => {
    try {
        let result = await Menu.find({}); //"hitta" all data i namngiven tabell
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error); //serverfel
    }
});


//importera authenticateToken 
const authenticateToken = require("../server");

//post på skyddad route - lägg till
router.post("/menu", authenticateToken, async (req, res) => {
    try {
        const { category, name, price, description } = req.body;

        if (!category || !name || !price || !description) {
            return res.status(400).json({ error: "Tom input, vänligen fyll i alla fält" })
        }

        const menu = new Menu({ category, name, price, description });
        await menu.save();
        res.status(201).json({ message: "Menyinlägg skapat" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})





//put på skyddad route - ändra/uppdatera





//delete på skyddad route - ta bort






//exportera - skicka till server.js
module.exports = router;