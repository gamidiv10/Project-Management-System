import { Router } from "express"
import {
    createSprint,
    updateSprint,
    deleteSprint,
    getSprints,
    addIssueToSprint,
    removeIssueFromSprint
} from "../controllers/SprintController"

const router = Router()

router.post('/createSprint', createSprint)
router.put('/updateSprint', updateSprint)
router.delete('/deleteSprint', deleteSprint)
router.post('/getSprints', getSprints)
router.post('/addIssueToSprint', addIssueToSprint)
router.post('/removeIssueFromSprint', removeIssueFromSprint)


export default router