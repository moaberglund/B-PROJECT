const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 10
    },
    phone: {
        type: Number,
        required: true,
        min: 9
    },
    mail: {
        type: String,
        required: true,
        lowercase: true
    },
    amountOfPeople: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    day: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


//metod för att lagra bokningen
//addBooking namn på metod
BookingSchema.static.addBooking = async function (name, phone, mail, amountOfPeople, day, time) {
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