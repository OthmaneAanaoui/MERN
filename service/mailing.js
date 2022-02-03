const User = require('../models/user');
const Lobby = require('../models/lobby');
const send_mail = require('../models/send_mail');
const UserMail = require('../models/user_mail');

exports.add = async (req, res) => {
    const temp = {}
    const sendmail = new send_mail(req.body);
    sendmail.save((err)=>{
        if(err){
            return res.status(501).json(err);
        }
        return res.status(201).json(user);
    });
}