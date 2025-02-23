import blobToText from "./blobToText";
import csvToSplitData from "./csvToSplitData";


export default async function parseSplitDataFile(blob, filename) {
    const text = await blobToText(blob);
    if (!text) {
        throw new Error('Invalid file content');
    }
    switch (filename.split('.').pop()) {
        case 'csv': 
            return csvToSplitData(text);
        case 'json': 
            const json = JSON.parse(text);
            if (!json.spendingKey || !json.viewingKey || !json.threshold || !json.totalShares) {
                throw new Error('Invalid JSON content');
            }
            return json;
        case 'txt': {
            const lines = text.replace('\r', '').split('\n').filter(line => line.trim() !== '');
            if (lines.length !== 4) {
                throw new Error('Invalid file content');
            }
            return {
                spendingKey: lines[0],
                viewingKey: lines[1],
                threshold: parseInt(lines[2]),
                totalShares: parseInt(lines[3])
            };
        }
        default:
            throw new Error('Invalid file type');
    }
}