const User = require('../models/user');
const Lobby = require('../models/lobby');
const serviceSoap = {
    user_service : {
        user_port : {
            getUsers: (args, callback) => {
                User.find()
                .exec()
                .then(users => callback({users: users}))
                .catch(err => callback(err));
            },

            getLobbies: (args, callback) => {
                Lobby.find()
                .exec()
                .then(lobbies => callback({lobbies: lobbies}))
                .catch(err => callback(err));
            },

            getUserByEmail: (args, callback) => {
                User.findOne({email: args.email})
                .exec()
                .then(user => callback({user: user}))
                .catch(err => callback(err));
            },

            addUser: (args, callback) => {
                const user = new User(args.user);
                console.log("addUser args : ", args);
                console.log("addUser : ", user);
                user.save((err, user)=>{
                    if(err){
                        callback(err);
                    } else {
                        callback({ user: user });
                    }
                });
            },


            addLobby: (args, callback) => {
                const lobby = new Lobby(args.lobby);
                console.log("addlobby args : ", args);
                console.log("addlobby : ", lobby);
                lobby.save((err, lobby)=>{
                    if(err){
                        callback(err);
                    } else {
                        callback({ lobby: lobby });
                    }
                });
            },
            updateUser: (args, callback)  => {
                const filter = {email: args.user.email};
                User.findOneAndUpdate(filter, args.user)
                .then(user => User.findOne(filter)
                    .then(userUpdate => callback({user: userUpdate}))
                    .catch(err2 => callback(err2))
                )
                .catch(err => callback(err));
            },

            deleteUser: (args, callback) => {
                User.findOneAndDelete({email: args.email})
                .then(res => callback({message: res}))
                .catch(err => callback({message: err}));
            }

        }
    }
}

module.exports = serviceSoap;