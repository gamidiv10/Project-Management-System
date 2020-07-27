const Query = require('../models/Query')

exports.createQueryRequest = (req, res) => {
    const query = {
        fullName: req.body.fullName,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description
    }

    Query.create(query)
        .then(() => {
            res.send({
                success: true,
                isError: false,
                message: 'Thank you for contacting us!, your query is submitted successfully. You will be contacted shortly.'
            })
        })
        .catch(err => {
            res.send({
                success: false,
                isError: true,
                message: err
            })
        })
}