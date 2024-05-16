const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


//Modell
const Contact = require("../models/Contact");
//Controller
const { createContact, getContacts } = require("../controller/contactController");

//ROUTES

//post anrop för att skicka ett kontakt meddelande - lägga till
router.post("/postcontact", createContact);


//(skyddad route)!!!
//hämta all kontakt meddelanden
router.get("/", authenticateToken, getContacts);



 
//Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; //Token

    //Saknas token?
    if (token == null) res.status(401).json({ message: "Åtkomst nekad! - saknad av token" });

    //Token OK
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Ogiltig JWT!" });

        req.username = username;
        next();
    });
};




//exportera - skicka till server.js
module.exports = router;