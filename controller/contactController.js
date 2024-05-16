//Contact modell
const Contact = require("../models/Contact");

//skicka kontakt-meddelande POST
const createContact = async (req, res) => {
    try {
        const { name, phone, mail, textmessage } = req.body;

        //Validera
        if (!name || !phone || !mail || !textmessage) {
            return res.status(400).json({ error: "Empty input, please fill out all fields" })
        }

        //OK - spara ny bokning
        const contact = new Contact({ name, phone, mail, textmessage });
        await contact.save();
        res.status(201).json({ message: "Message sent" })

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