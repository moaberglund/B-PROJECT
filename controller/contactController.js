//Contact modell
const Contact = require("../models/Contact");

//skicka kontakt-meddelande POST
const createContact = async (req, res) => {
    try {
        const { name, phone, mail, textmessage } = req.body;

        //Validera
        if (!name || !phone || !mail || !textmessage) {
            return res.status(400).json({ error: "Tom input, vänligen fyll i alla fält" })
        }

        //OK - spara ny bokning
        const contact = new Contact({ name, phone, mail, textmessage });
        await contact.save();
        res.status(201).json({ message: "Meddelande skickat" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//hämta GET
const getContacts = async (req, res) => {
    try {
        let result = Contact.find({}); //"hitta" all data i namngiven tabell
        return res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}


module.exports = {
    createContact,
    getContacts
}