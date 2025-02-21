export default function sharesToCSV(shares) {
    const lines = [toLine(["Share", "X", "SK", "VK"])];
    shares.forEach((share, index) => {
        lines.push(toLine([index + 1, share.share, share.spendingKey, share.viewingKey]));
    });
    const content = lines.join('\n');
    const file = new Blob([content], { type: 'text/csv' });
    return file;
}

function toLine(elements) {
    return elements.join(';');
}