const downloadFile = (url, filename) => {
    const element = document.createElement('a');
    element.style.display = 'none';
    element.href = url;
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export default downloadFile;