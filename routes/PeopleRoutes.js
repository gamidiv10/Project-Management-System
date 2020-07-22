const express = require('express');

const { inviteUser, getPeople } = require('../controllers/PeopleController');

const router = express.Router();

router
    .route('/inviteUser')
    .post(inviteUser)
    
router
    .route('/getPeople')
    .get(getPeople)
module.exports = router;