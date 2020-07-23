const express = require('express');

const { inviteUser, getPeople, addUser } = require('../controllers/PeopleController');

const router = express.Router();

router
    .route('/addUser')
    .post(addUser)

router
    .route('/inviteUser')
    .post(inviteUser)
    
router
    .route('/getPeople')
    .get(getPeople)
module.exports = router;