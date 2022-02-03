const User = require('../models/user');
const Lobby = require('../models/lobby');
exports.getById = async (req,res) => {
    const id = req.params.id;
    try{
        let user = await User.findById(id);
        if(user){
            return res.status(200).json(user);
        }
        return res.status(404).json('User not found');
    } catch (err){
        return res.status(501).json(err);
    }
    // Avec les promesses
    // User.findById(id)
    // .then(user => res.status(200).json(user))
    // .catch(err => res.status(501).json({
    //     message: `blog post with id ${id} not found`,
    //     error: err
    // }));
}



exports.getLobbyById = async (req,res) => {
    const id = req.params.id;
    try{
        let lobby = await Lobby.findById(id);
        if(lobby){
            return res.status(200).json(lobby);
        }
        return res.status(404).json('lobby not found');
    } catch (err){
        return res.status(501).json(err);
    }
    // Avec les promesses
    // User.findById(id)
    // .then(user => res.status(200).json(user))
    // .catch(err => res.status(501).json({
    //     message: `blog post with id ${id} not found`,
    //     error: err
    // }));
}

exports.getUsers = (req,res) => {
    User.find()
    .exec()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(501).json({
        message: 'No user in database',
        error: err
    }));
}

exports.getLobbies = (req,res) => {
    Lobby.find()
    .exec()
    .then(lobby => res.status(200).json(lobby))
    .catch(err => res.status(501).json({
        message: 'No lobby in database',
        error: err
    }));
}

exports.add = async (req, res) => {
    const temp = {}
    const user = new User(req.body);
    user.save((err)=>{
        if(err){
            return res.status(501).json(err);
        }
        return res.status(201).json(user);
    });
}

exports.update = (req, res) => {
    User.findOneAndUpdate({email: req.body.email}, req.body)
    .then(user => User.findOne({email:req.body.email})
    .then(newUser => res.status(201).json(newUser))
    .catch(err2 => res.status(501).json(err2)))
    .catch(err => res.status(501).json(err));
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        return res.status(201).json('delete ok');
    } catch (err) {
        return res.status(501).json(err);
    }
}