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

//metod för att lagra / registrera
//register namn på metod
UserSchema.static.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();  //spara
        return user;
    } catch (error) {
        throw error;
    }
};

//metod för att Kontrollera lösenord (inmatat lösenord , hashed/sparat lösenord)
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};


//metod för att logga in  
UserSchema.static.login = async function (username, password) {
    try {
        //hitta användaren
        const user = await this.findOne({ username });

        //finns ej användaren
        if (!user) {
            throw new Error("Fel användarnamn eller lösenord"); //samma på båda pga säkerhet
        }

        //metoden från ovan comparePassword - kontrollera lösenord
        const isPasswordMatch = await user.comparePassword(password);

        //fel lösenord
        if (!isPasswordMatch) {
            throw new Error("Fel användarnamn eller lösenord"); //samma på båda pga säkerhet
        }

        //Om allt är OK
        return user;

    } catch (error) {
        throw error;
    }
};

//export
const User = mongoose.model("User", UserSchema);
module.exports = User;