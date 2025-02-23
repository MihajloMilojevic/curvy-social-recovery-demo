
import * as zip from '@zip.js/zip.js';
import txtToShare from './txtToShare';

export default async function zipToShares(blob) {
    const zipFile = new zip.ZipReader(new zip.BlobReader(blob));
    const entries = await zipFile.getEntries();
    const a = await entries[0].getData(new zip.BlobWriter());
    const files = await Promise.all(
        entries
            .filter(entry => entry.filename.endsWith('.txt'))
            .map(async entry => await entry.getData(new zip.BlobWriter()))
    );
    const res = await Promise.all(files.map(async file => txtToShare(file)));
    return res;
}