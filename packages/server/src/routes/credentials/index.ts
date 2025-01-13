import express from 'express'
import credentialsController from '../../controllers/credentials'
const router = express.Router()

// CREATE
router.post('/', credentialsController.createCredential)

// READ
router.get('/', credentialsController.getAllCredentials)
router.get(['/', '/:id'], credentialsController.getCredentialById)

// UPDATE
router.put(['/', '/:id'], credentialsController.updateCredential)

// DELETE
router.delete(['/', '/:id'], credentialsController.deleteCredentials)

export default router
// Modified on Wed Jan 22 04:35:31 PM +01 2025
