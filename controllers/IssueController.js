import Issue from "../models/Issue"

export const createIssue = (req, res) => {
    const issue = {
        type: req.body.type,
        name: req.body.name,
        description: req.body.description
    }
    Issue.create(issue)
    .then(createdIssue => {
        res.send({
            success:true,
            issue: createdIssue,
            message: 'Successfully created an Issue.'
        })
    })
    .catch(error => {
        res.send({
            success: false, 
            isError: true, 
            error,
            message: 'Error occurred while creating existing issue.'
        })
    })
}

export const updateIssue = (req, res) => {
    const id = req.body.issueId
    const issue = {
        type: req.body.type,
        name: req.body.name,
        description: req.body.description
    }
    Issue.findOneAndUpdate({_id: id}, issue, {new: true})
    .then(updatedIssue => {
        res.send({  
            success:true,
            issue: updatedIssue,
            message: 'Successfully updated the Issue.'
        })
    })
    .catch(error => {
        res.send({
            success: false, 
            isError: true, 
            error,
            message: 'Error occurred while updating existing issue.'
        })
    })
}

export const deleteIssue = (req, res) => {
    Issue.findOneAndDelete({_id: req.body.issueId})
    .then(deletedItem => {
        if (deletedItem) {
            res.send({
                success: true,
                isError: false,
                message: 'Issue successfully got deleted.'
            })
        }
    })
    .catch(error => {
        res.send({
            success: false,
            isError: true,
            error,
            message: 'Error occurred while deleting Issue.'
        })
    })
}

export const getIssues = (req, res) => {
    const query = req.body.issueId ? { _id:  req.body.issueId } : {}
    Issue.find(query)
    .then(issues => {
        res.send({
            success: true,
            isError: false,
            issues,
            message: 'Successfully fetched Issues.'
        })
    })
    .catch(error => {
        res.send({
            success: false,
            isError: true,
            error,
            message: 'Error occurred in fetching Issues.'
        })
    })
}