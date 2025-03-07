import downloadFile from '../../utils/download';
import shareToJson from '../../utils/shareToJson';
import styles from './share.module.css';

export default function Share({share, index, onMove}) {

    function downloadTxt() {
        const file = shareToJson(share);
        const url = URL.createObjectURL(file);
        downloadFile(url, `share_${String(index + 1).padStart(2, "0")}.json`);
        URL.revokeObjectURL(url); // Clean up the URL object
    }

    return (
        <div className={styles.share}>
            <div> 
                <label htmlFor="sh">X: </label>
                <input type="text" id='sh' name='sh' value={share.share} readOnly />
            </div>
            <div>
                <label htmlFor="sk">SK: </label>
                <input type="text" id='sk' name='sk' value={share.spendingKey} readOnly />
            </div>
            <div>
                <label htmlFor="vk">VK: </label>
                <input type="text" id='vk' name='vk' value={share.viewingKey} readOnly />
            </div>
            <div className={styles.buttons_container}>
                <button type="button" onClick={downloadTxt}>Download .json</button>
                <button type="button" onClick={onMove}>Add to recovery</button>
            </div>
        </div>
    )
}