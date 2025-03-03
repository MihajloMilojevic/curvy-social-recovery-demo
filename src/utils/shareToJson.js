export default function shareToJson(share) {
    let jsonObj = {
        x: share.share,
        spendingEval: share.spendingKey,
        viewingEval: share.viewingKey
    }
    const content = JSON.stringify(jsonObj)
    // const content = `Share ${index + 1}:\nX:  ${share.share}\nSK: ${share.spendingKey}\nVK: ${share.viewingKey}\n\n`;   
    const file = new Blob([content], { type: 'text/plain' });
    return file;
}