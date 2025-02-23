
export default function upload() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.style.display = 'none';
        input.type = 'file';
        input.onchange = () => {
            if (!input.files || !input.files.length) {
                reject(new Error('No file selected'));
                return;
            }
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                resolve({file: new Blob([reader.result]), name: file.name, type: file.type});
            };
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            reader.readAsArrayBuffer(file);
            
        };
        input.click();
    });
}