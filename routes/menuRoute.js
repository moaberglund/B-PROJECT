const express = require("express");
const router = express.Router();

//Modell
const Menu = require("../models/Menu");
//Controller
const { getMenus, createMenu, updateMenu, deleteMenu } = require("../controller/menuController");

//routes

//get till webbplatsen, utskrift av menyn
router.get("/", getMenus);


//SKYDDAD ROUTE
//post - lägg till
router.post("/postmenu", authenticateToken, createMenu);


//put - ändra/uppdatera
router.put("/:id", authenticateToken, updateMenu);


//delete - ta bort
router.delete("/:id", authenticateToken, deleteMenu);


 
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