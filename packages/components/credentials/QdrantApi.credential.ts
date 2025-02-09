import { INodeParams, INodeCredential } from '../src/Interface'

class QdrantApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Qdrant API'
        this.name = 'qdrantApi'
        this.version = 1.0
        this.inputs = [
            {
                label: 'Qdrant API Key',
                name: 'qdrantApiKey',
                type: 'password'
            }
        ]
    }
}

module.exports = { credClass: QdrantApi }
// Default commit message - Wed Jan 22 04:26:28 PM +01 2025
