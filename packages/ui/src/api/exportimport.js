import client from './client'

const exportData = (body) => client.post('/export-import/export', body)
const importData = (body) => client.post('/export-import/import', body)

export default {
    exportData,
    importData
}
// Modified on Wed Jan 22 04:35:20 PM +01 2025
console.log('Debug update');
