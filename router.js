const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const service = require('./service/userService');
const serviceMail = require('./service/mailing');
const User = require('./models/user');
const lobby = require('./models/lobby');

router.get('/user', service.getUsers);
router.get('/lobby', service.getLobbies);

router.use('/', (req, res, next) => {
    if (req.url == '/') {
        res.redirect('/user');
    } else {
        next();
    }
});
router.post('/sendmail', serviceMail.add);
router.get('/user/:id', service.getById);

router.delete('/user/:id', service.delete);
router.post('/user', service.add);
router.put('/user', service.update);
router.use((req, res) => {
    res.status(404).send('Page non trouvée');
});

module.exports = router;