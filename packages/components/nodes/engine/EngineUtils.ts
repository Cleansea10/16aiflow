import { Metadata, NodeWithScore } from 'llamaindex'

export const reformatSourceDocuments = (sourceNodes: NodeWithScore<Metadata>[]) => {
    const sourceDocuments = []
    for (const node of sourceNodes) {
        sourceDocuments.push({
            pageContent: (node.node as any).text,
            metadata: node.node.metadata
        })
    }
    return sourceDocuments
}
// Modified on Wed Jan 22 04:35:12 PM +01 2025
