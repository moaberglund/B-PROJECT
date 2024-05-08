const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Hasha lösenord
//.pre("save") => innan det sparas
UserSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next(); //gå vidare
    } catch (error) {
        next(error);
    }
});

//Kontrollera lösenord (inmatat lösenord , hashed/sparat lösenord)
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

//metod för att registrera
UserSchema.static.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();  //spara
        return user;
    } catch (error) {
        throw error;
    }
};

//metod för att logga in  