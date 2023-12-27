import express from 'express'
import getUploadPathController from '../../controllers/get-upload-path'
const router = express.Router()

// READ
router.get('/', getUploadPathController.getPathForUploads)

export default router
// Default commit message - Wed Jan 22 04:26:28 PM +01 2025
