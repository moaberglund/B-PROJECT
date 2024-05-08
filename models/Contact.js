const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    textmessage: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


//metod för att lagra kontakt meddelande
//contact namn på metod
ContactSchema.static.contact = async function (name, phone, mail, textmessage ) {
    try {
        const contact = new this({ name, phone, mail, textmessage });
        await contact.save();  //spara
        return contact;
    } catch (error) {
        throw error;
    }
};


//export
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;