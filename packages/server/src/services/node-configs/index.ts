import { StatusCodes } from 'http-status-codes'
import { findAvailableConfigs } from '../../utils'
import { IReactFlowNode } from '../../Interface'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { Internal16aiflowError } from '../../errors/internal16aiflowError'
import { getErrorMessage } from '../../errors/utils'

const getAllNodeConfigs = async (requestBody: any) => {
    try {
        const appServer = getRunningExpressApp()
        const nodes = [{ data: requestBody }] as IReactFlowNode[]
        const dbResponse = findAvailableConfigs(nodes, appServer.nodesPool.componentCredentials)
        return dbResponse
    } catch (error) {
        throw new Internal16aiflowError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: nodeConfigsService.getAllNodeConfigs - ${getErrorMessage(error)}`
        )
    }
}

export default {
    getAllNodeConfigs
}
// Modified on Wed Jan 22 04:34:46 PM +01 2025
// Modified on Wed Jan 22 04:35:24 PM +01 2025
