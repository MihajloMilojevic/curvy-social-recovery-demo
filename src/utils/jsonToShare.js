import blobToText from './blobToText';

export default async function jsonToShare(blob) {
    const txt = await blobToText(blob);
    const obj = JSON.parse(txt)

    if (!('x' in obj && 'spendingEval' in obj && 'viewingEval' in obj)) {
        throw new Error("Invalid JSON format")
    }

    return {
        share: obj.x,
        spendingKey: obj.spendingEval,
        viewingKey: obj.viewingEval
    }
}