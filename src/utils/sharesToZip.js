
import * as zip from "@zip.js/zip.js";
import shareToJson from "./shareToJson";

export default async function sharesToZip(shares) {
    const blobWriter = new zip.BlobWriter("application/zip");
    const writter = new zip.ZipWriter(blobWriter);
    const files = shares.map((share, index) => ({file: shareToJson(share), filename: `share_${String(index + 1).padStart(2, "0")}.json`}));
    await Promise.all(files.map(({file, filename}) => writter.add(filename, new zip.BlobReader(file))));
    await writter.close();
    const blob = await blobWriter.getData();
    return blob;
}