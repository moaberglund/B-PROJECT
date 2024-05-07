// BACKEND PROJEKT

const express = require("express");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const loginRouter = require("./routes/login");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(cors());

//starta upp applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port)
});

//ROUTES
app.use("/api", loginRouter);



//skyddad, login route


//Validera token

