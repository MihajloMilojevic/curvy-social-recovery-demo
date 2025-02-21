
import * as zip from "@zip.js/zip.js";
import shareToTxt from "./shareToTxt";

export default async function sharesToZip(shares) {
    const blobWriter = new zip.BlobWriter("application/zip");
    const writter = new zip.ZipWriter(blobWriter);
    const files = shares.map((share, index) => ({file: shareToTxt(share, index), filename: `share_${String(index + 1).padStart(2, "0")}.txt`}));
    await Promise.all(files.map(({file, filename}) => writter.add(filename, new zip.BlobReader(file))));
    await writter.close();
    const blob = await blobWriter.getData();
    return blob;
}