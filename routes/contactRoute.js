const express = require("express");
const router = express.Router();

//Modell
const Contact = require("../models/Contact");
//Controller
const { createContact, getContacts } = require("../controller/contactController");

//ROUTES

//post anrop för att skicka ett kontakt meddelande - lägga till
router.post("/", createContact);


//(skyddad route)!!!
//hämta all kontakt meddelanden
router.get("/", getContacts);



//exportera - skicka till server.js
module.exports = router;