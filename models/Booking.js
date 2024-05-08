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


//metod för att lagra bokningen
//booking namn på metod
BookingSchema.static.booking = async function (name, phone, mail, amountOfPeople, day, time) {
    try {
        const booking = new this({ name, phone, mail, amountOfPeople, day, time });
        await booking.save();  //spara
        return booking;
    } catch (error) {
        throw error;
    }
};

//export
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;