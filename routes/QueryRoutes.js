const express = require("express");

const {
    createQueryRequest
} = require('../controllers/QueryController')

const router = express.Router();

router.post("/createQuery", createQueryRequest);

module.exports = router;