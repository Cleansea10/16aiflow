import express from 'express'
import componentsCredentialsController from '../../controllers/components-credentials'
const router = express.Router()

// CREATE

// READ
router.get(['/', '/:name'], componentsCredentialsController.getSingleComponentsCredentialIcon)

// UPDATE

// DELETE

export default router
// Modified on Wed Jan 22 04:35:14 PM +01 2025
