import { Router } from "express"
// import bodyParser from "body-parser"
import {
    
} from "../controllers/IssueController"

const router = Router()
// const jsonParser = bodyParser.json()

router.post('/createIssue', createIssue)

export default router