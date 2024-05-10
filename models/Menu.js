const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});



//metod för att lagra / registrera
//menu namn på metod
MenuSchema.static.addMenu = async function (category, name, price, description) {
    try {
        const menu = new this({ category, name, price, description });
        await menu.save();  //spara
        return menu;
    } catch (error) {
        throw error;
    }
};







//export
const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;