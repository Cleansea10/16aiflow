import { INodeParams, INodeCredential } from '../src/Interface'

class OpenSearchUrl implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'OpenSearch'
        this.name = 'openSearchUrl'
        this.version = 2.0
        this.inputs = [
            {
                label: 'OpenSearch Url',
                name: 'openSearchUrl',
                type: 'string'
            },
            {
                label: 'User',
                name: 'user',
                type: 'string',
                placeholder: '<OPENSEARCH_USERNAME>',
                optional: true
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '<OPENSEARCH_PASSWORD>',
                optional: true
            }
        ]
    }
}

module.exports = { credClass: OpenSearchUrl }
// Default commit message - Wed Jan 22 04:27:25 PM +01 2025
// Modified on Wed Jan 22 04:34:23 PM +01 2025
// Modified on Wed Jan 22 04:34:57 PM +01 2025
