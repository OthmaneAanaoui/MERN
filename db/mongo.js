const mongoose = require('mongoose');

const clientOptions = {
    socketTimeoutMS   : 30000,
    keepAlive         : true,
    useNewUrlParser   : true,
    useUnifiedTopology: true,
};

exports.InitDbConnection = async () => {
    try{
        await mongoose.connect(process.env.URL_MONGO || 'mongodb://api:docker1234@localhost:27017/apiuser', clientOptions);
        console.log('Connexion à mongo réussie');
    } catch (error) {
        console.log(`La connexion à mongo a échoué ${error}`);
        throw error;
    }
}

// const mongoose = require('mongoose');
// const connection = mongoose.connection;
// mongoose.connect(process.env.URL_MONGO || 'mongodb://localhost:27017/apiuser', { useNewUrlParser: true });
// connection.on('error', (err) => {
//     console.error(`La connexion à mongoose a échoué : ${err}`)
// });

// connection.once('open', () => {
//     console.log('Connexion à mongoose réussie');
    
// });