import express from 'express'
import loadPromptsController from '../../controllers/load-prompts'
const router = express.Router()

// CREATE
router.post('/', loadPromptsController.createPrompt)

export default router
// Modified on Wed Jan 22 04:35:06 PM +01 2025
