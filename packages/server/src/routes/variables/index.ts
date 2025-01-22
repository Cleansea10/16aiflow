import express from 'express'
import variablesController from '../../controllers/variables'

const router = express.Router()

// CREATE
router.post('/', variablesController.createVariable)

// READ
router.get('/', variablesController.getAllVariables)

// UPDATE
router.put(['/', '/:id'], variablesController.updateVariable)

// DELETE
router.delete(['/', '/:id'], variablesController.deleteVariable)

export default router
// Modified on Wed Jan 22 04:35:34 PM +01 2025
