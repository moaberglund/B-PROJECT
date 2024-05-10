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
//addMenu namn på metod
MenuSchema.static.addMenu = async function (category, name, price, description) {
    try {
        const menu = new this({ category, name, price, description });
        await menu.save();  //spara
        return menu;
    } catch (error) {
        throw error;
    }
};

//metod för att updatera
//editMenu namn på metod
MenuSchema.static.editMenu = async function (category, name, price, description) {
    try {
        //hitta meny
        const menu = await this.findOne({})

    } catch (error) {
        throw error;
    }
}



//metod för att ta bort
//deleteMenu namn på metod






//export
const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;