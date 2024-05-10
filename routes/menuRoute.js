const express = require("express");
const router = express.Router();

//Modell
const Menu = require("../models/Menu");
//Controller
const {getMenus, createMenu, updateMenu, deleteMenu} = require("../controller/menuController");

//routes

//get till webbplatsen, utskrift av menyn
router.get("/", getMenus);


//SKYDDAD ROUTE
//post - lägg till
router.post("/", createMenu);


//put - ändra/uppdatera
router.put("/:id", updateMenu); 


//delete - ta bort
router.delete("/:id", deleteMenu);



//exportera - skicka till server.js
module.exports = router;