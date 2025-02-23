
export default function csvToSplitData(csv) {
    const data = csv.split('\n').filter(row => !!row).map(row => row.replace('\r', '').split(';'));
    if (data.length < 2) {
        throw new Error('Invalid CSV data');
    }
    const headers = data.shift();
    const csvData = data.map(row => {
        return headers.reduce((acc, header, i) => {
            acc[header] = row[i];
            return acc;
        }, {});
    });
    if (csvData.length !== 1) {
        throw new Error('Invalid CSV data');
    }
    const {spendingKey, viewingKey, threshold, totalShares} = csvData[0];
    if (!spendingKey || !viewingKey || !threshold || !totalShares) {
        throw new Error('Invalid CSV data');
    }
    return {
        spendingKey,
        viewingKey,
        threshold: parseInt(threshold),
        totalShares: parseInt(totalShares)
    };
}