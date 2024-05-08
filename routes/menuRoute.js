const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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




//post på skyddad route - lägg till





//put på skyddad route - ändra/uppdatera





//delete på skyddad route - ta bort






//exportera - skicka till server.js
module.exports = router;