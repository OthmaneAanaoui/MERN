const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const send_mail = new Schema({
    
    emetteur :  {
        type : Schema.Types.ObjectId,
        ref: "User",

    },

    recepteur : {
        type : Schema.Types.ObjectId,
        ref: "User",

    },

    message: {
        type: String,
        trim: true,
        required: [true, 'Le nom est obligatoire']
    },

    date_envoi : {type: Date, default: Date.now },
    data: {
        type: Object
    }
});

// On hash le mot de passe avant la sauvegarde d'un user
send_mail.pre('save', (next) => {
    // if (!this.isModified('password')) {
    //     return next();
    // }
    //this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('send_mail', send_mail);