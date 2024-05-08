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



//post anrop för REGISTRERING
router.post("/register", async (req, res) => {
    console.log("Registrering påbörjad")

})

//post anrop för INLOGGNING
router.post("/login", (req, res) => {
    console.log("Inloggning påbörjad")
})





//exportera - skicka till server.js
module.exports = router;