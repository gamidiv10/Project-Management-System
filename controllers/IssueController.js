import { Issue } from "../models/Issue"

export const createIssue = (req, res) => {
    const issue = {
        type: req.body.type,
        name: req.body.name,
        description: req.body.description
    }
    Issue.findOne({name: issue.name})
        .then(existingIssue => {
            if (existingIssue) {
                res.send({
                    success: false, 
                    isError: false, 
                    message: 'Issue you are trying to find already exist in the system.'
                })
            } else {
                res.send({
                    success: true
                })
            }
            
        }).catch(err => {
            res.send({
                success: false, 
                isError: true, 
                error: err,
                message: 'Error occurred while finding existing issue.'
            })
        })
}