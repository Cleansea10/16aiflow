import client from './client'

const getAvailablePrompts = (body) => client.post(`/prompts-list`, body)
const getPrompt = (body) => client.post(`/load-prompt`, body)

export default {
    getAvailablePrompts,
    getPrompt
}
// Modified on Wed Jan 22 04:34:27 PM +01 2025
console.log('Debug update');
