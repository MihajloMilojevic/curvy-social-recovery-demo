import styles from './share.module.css';

export default function Share({share, onChange, onRemove}) {
    return (
        <div className={styles.share}>
            <div> 
                <label htmlFor="sh">X: </label>
                <input type="text" id='sh' name='sh' onChange={e => onChange("share", e.target.value)} value={share.share} />
            </div>
            <div>
                <label htmlFor="sk">SK: </label>
                <input type="text" id='sk' name='sk' onChange={e => onChange("spendingKey", e.target.value)} value={share.spendingKey} />
            </div>
            <div>
                <label htmlFor="vk">VK: </label>
                <input type="text" id='vk' name='vk' onChange={e => onChange("viewingKey", e.target.value)} value={share.viewingKey} />
            </div>
            <div className={styles.buttons_container}>
                <button type="button" style={{width: "50%"}} onClick={onRemove}>Remove from list</button>
            </div>
        </div>
    )
}