

export default function shareToTxt(share, index) {
    const content = `Share ${index + 1}:\nX:  ${share.share}\nSK: ${share.spendingKey}\nVK: ${share.viewingKey}\n\n`;   
    const file = new Blob([content], { type: 'application/json' });
    return file;
}