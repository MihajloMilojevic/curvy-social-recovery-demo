import blobToText from './blobToText';

export default async function txtToShare(blob) {
    const txt = await blobToText(blob);
    const lines = txt.split('\n').filter(row => !!row).map(row => row.replace('\r', ''));
    if (lines.length !== 4) {
        throw new Error('Invalid TXT data');
    }
    if (!lines[0].startsWith('Share ')) {
        throw new Error('Invalid TXT data');
    }
    if (!lines[1].startsWith('X:  ')) {
        throw new Error('Invalid TXT data');
    }
    if (!lines[2].startsWith('SK: ')) {
        throw new Error('Invalid TXT data');
    }
    if (!lines[3].startsWith('VK: ')) {
        throw new Error('Invalid TXT data');
    }
    return {
        share: lines[1].substring(4),
        spendingKey: lines[2].substring(4),
        viewingKey: lines[3].substring(4)
    };
}