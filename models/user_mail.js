const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserMail = new Schema({
    
    user_mail :  {
        type : Schema.Types.ObjectId,
        ref: "User",

    },

    text: {
        type: String,
        trim: true,
        required: [true, 'Le nom est obligatoire']
    },
    date_recep : {type: Date, default: Date.now },
    
    data: {
        type: Object
    }
});

// On hash le mot de passe avant la sauvegarde d'un user
UserMail.pre('save', (next) => {
    // if (!this.isModified('password')) {
    //     return next();
    // }
    //this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('UserMail', UserMail);