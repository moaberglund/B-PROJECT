// route för inloggning

const express = require("express");
const router = express.Router();

//anslutning till databas - Atlas MongoDB

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