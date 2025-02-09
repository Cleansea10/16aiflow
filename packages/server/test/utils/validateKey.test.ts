import { Request } from 'express'
import { ChatFlow } from '../../src/database/entities/ChatFlow'
import { validateChatflowAPIKey } from '../../src/utils/validateKey'
import { compareKeys, getAPIKeys } from '../../src/utils/apiKey'

jest.mock('../../src/utils/apiKey')

describe('validateChatflowAPIKey', () => {
    let req: Partial<Request>
    let chatflow: ChatFlow

    beforeEach(() => {
        req = {
            headers: {}
        }
        chatflow = {
            apikeyid: null
        } as ChatFlow
    })

    it('should return true if chatflow.apikeyid is not set', async () => {
        const result = await validateChatflowAPIKey(req as Request, chatflow)
        expect(result).toBe(true)
    })

    it('should return false if chatflow.apikeyid is set but authorization header is missing', async () => {
        chatflow.apikeyid = 'some-api-key-id'
        const result = await validateChatflowAPIKey(req as Request, chatflow)
        expect(result).toBe(false)
    })

    it('should return false if supplied key does not match the expected key', async () => {
        chatflow.apikeyid = 'some-api-key-id'
        req.headers['authorization'] = 'Bearer invalid-key'
        ;(getAPIKeys as jest.Mock).mockResolvedValue([{ id: 'some-api-key-id', apiSecret: 'expected-secret-key' }])
        ;(compareKeys as jest.Mock).mockImplementation((expected, supplied) => expected === supplied)

        const result = await validateChatflowAPIKey(req as Request, chatflow)
        expect(result).toBe(false)
    })
})
// Modified on Wed Jan 22 04:34:37 PM +01 2025
