const mongoose = require('mongoose');
//const bcrypt   = require('bcryptjs');

const User = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est obligatoire']
    },
    firstName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'L\'email est obligatoire'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
    },
    data: {
        type: Object
    }
});

// On hash le mot de passe avant la sauvegarde d'un user
User.pre('save', (next) => {
    // if (!this.isModified('password')) {
    //     return next();
    // }
    //this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', User);