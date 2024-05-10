//Booking modell
const Booking = require("../models/Booking");

//lägga till bokning
const createBooking = async (req, res) => {
    try {
        const { name, phone, mail, amountOfPeople, day, time } = req.body;

        //Validera
        if (!name || !phone || !mail || !amountOfPeople || !day || !time) {
            return res.status(400).json({ error: "Tom input, vänligen fyll i alla fält" });
        };

        //OK - spara ny bokning
        const booking = new Booking({ name, phone, mail, amountOfPeople, day, time });
        await booking.save();
        res.status(201).json({ message: "Bokning skapad" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//SKYDDAD ROUTE (??)
//visa alla bokningar 
const getBookings = async (req, res) => {
    try {
        let result = Booking.find({}); //"hitta" all data i namngiven tabell
        return res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    createBooking,
    getBookings
}