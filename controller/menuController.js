//Meny modell
const Menu = require("../models/Menu");

//GET
const getMenus = async (req, res) => {
    try {
        let result = await Menu.find({}); //"hitta" all data i namngiven tabell
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error); //serverfel
    }
};


//POST
const createMenu = async (req, res) => {
    try {
        const { category, name, price, description } = req.body;

        if (!category || !name || !price || !description) {
            return res.status(400).json({ error: "Empty input, please fill out all fields" })
        }

        const menu = new Menu({ category, name, price, description });
        await menu.save();
        res.status(201).json({ message: "Meny object created in database" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


//UPDATE
const updateMenu = async (req, res) => {
    try {
        //få ut id:t
        const { id } = req.params;
        //hitta efter id:t och updatera vad som är i req.body
        const menu = await Menu.findByIdAndUpdate(id, req.body);

        //om den inte finns
        if (!menu) {
            return res.status(404).json({ message: "Could not find selected object" })
        }
        //kolla efter det uppdaterade inlägget
        const updatedMenu = await Menu.findById(id);
        //och retunera
        res.status(200).json(updatedMenu);


    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}


//DELETE
const deleteMenu = async (req, res) => {
    try {
        //få ut id:t
        const { id } = req.params;
        //hitta med hjälp av id och ta bort inlägg
        let menu = await Menu.findByIdAndDelete(id);

        //om det inte finns
        if (!menu) {
            return res.status(404).json({ message: "Could not find selected object" })
        }

        res.status(200).json({ message: "Menu object deleted!" })


    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};



module.exports = {
    getMenus,
    createMenu,
    updateMenu,
    deleteMenu
}