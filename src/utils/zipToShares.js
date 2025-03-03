
import * as zip from '@zip.js/zip.js';
// import txtToShare from './txtToShare';
import jsonToShare from './jsonToShare';

export default async function zipToShares(blob) {
    const zipFile = new zip.ZipReader(new zip.BlobReader(blob));
    const entries = await zipFile.getEntries();
    const a = await entries[0].getData(new zip.BlobWriter());
    const files = await Promise.all(
        entries
            .filter(entry => entry.filename.endsWith('.json'))
            .map(async entry => await entry.getData(new zip.BlobWriter()))
    );
    // const res = await Promise.all(files.map(async file => txtToShare(file)));
    const res = await Promise.all(files.map(async file => jsonToShare(file)));
    return res;
}