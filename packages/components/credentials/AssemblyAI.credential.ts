import { INodeParams, INodeCredential } from '../src/Interface'

class AssemblyAIApi implements INodeCredential {
    label: string
    name: string
    version: number
    inputs: INodeParams[]

    constructor() {
        this.label = 'AssemblyAI API'
        this.name = 'assemblyAIApi'
        this.version = 1.0
        this.inputs = [
            {
                label: 'AssemblyAI Api Key',
                name: 'assemblyAIApiKey',
                type: 'password'
            }
        ]
    }
}

module.exports = { credClass: AssemblyAIApi }
// Modified on Wed Jan 22 04:35:21 PM +01 2025
