const mongoose = require('mongoose');


const Lobby = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est obligatoire']
    },
    data: {
        type: Object
    }
});

// On hash le mot de passe avant la sauvegarde d'un user
Lobby.pre('save', (next) => {
    // if (!this.isModified('password')) {
    //     return next();
    // }
    //this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('Lobby', Lobby);