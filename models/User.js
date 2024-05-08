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

//metod för att registrera


//metod för att logga in  