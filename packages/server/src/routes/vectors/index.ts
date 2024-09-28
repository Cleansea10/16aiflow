import express from 'express'
import vectorsController from '../../controllers/vectors'
import { getMulterStorage } from '../../utils'

const router = express.Router()

// CREATE
router.post(
    ['/upsert/', '/upsert/:id'],
    getMulterStorage().array('files'),
    vectorsController.getRateLimiterMiddleware,
    vectorsController.upsertVectorMiddleware
)
router.post(['/internal-upsert/', '/internal-upsert/:id'], getMulterStorage().array('files'), vectorsController.createInternalUpsert)

export default router
// Modified on Wed Jan 22 04:35:01 PM +01 2025
