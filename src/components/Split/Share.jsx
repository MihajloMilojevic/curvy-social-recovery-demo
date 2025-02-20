import styles from './share.module.css';

export default function Share({share}) {
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
                <button type="button">Download .txt</button>
                <button type="button">Add to recovery</button>
            </div>
        </div>
    )
}