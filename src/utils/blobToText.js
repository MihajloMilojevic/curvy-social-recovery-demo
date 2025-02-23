
export default function blobToText(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };
        reader.readAsText(blob);
    });
}