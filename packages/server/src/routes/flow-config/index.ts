import express from 'express'
import flowConfigsController from '../../controllers/flow-configs'
const router = express.Router()

// CREATE

// READ
router.get(['/', '/:id'], flowConfigsController.getSingleFlowConfig)

// UPDATE

// DELETE

export default router
// Modified on Wed Jan 22 04:35:17 PM +01 2025
