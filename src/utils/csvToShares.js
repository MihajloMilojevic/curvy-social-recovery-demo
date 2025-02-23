import blobToText from "./blobToText";

export default async function csvToShares(blob) {
    const csv = await blobToText(blob);
    const data = csv.split('\n').filter(row => !!row).map(row => row.replace('\r', '').split(';'));
    if (data.length < 2) {
        throw new Error('Invalid CSV data');
    }
    const headers = data.shift();
    const mandatoryHeaders = ["X", "SK", "VK"];
    if (!mandatoryHeaders.every(header => headers.includes(header)))
        throw new Error('Invalid CSV data');
    const csvData = data.map(row => {
        return headers.reduce((acc, header, i) => {
            acc[header] = row[i];
            return acc;
        }, {});
    });
    return csvData.map(row => {
        return {
            spendingKey: row.X,
            viewingKey: row.SK,
            share: row.VK
        };
    });
}