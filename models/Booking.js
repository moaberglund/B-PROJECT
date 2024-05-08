const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
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
    amountOfPeople: {
        type: Number,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//export
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;