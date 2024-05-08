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

//export
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;