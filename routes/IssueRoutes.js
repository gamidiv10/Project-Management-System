import { Router } from "express"
import {
    createIssue,
    updateIssue,
    deleteIssue,
    getIssues
} from "../controllers/IssueController"

const router = Router()

router.post('/createIssue', createIssue)
router.put('/updateIssue', updateIssue)
router.delete('/deleteIssue', deleteIssue)
router.post('/getIssues', getIssues)

export default router