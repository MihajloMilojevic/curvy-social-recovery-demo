import React, { useState } from 'react';
import styles from './recover.module.css';
import Share from "./Share"

export default function Recover() {
    const [shares, setShares] = useState(Array(3).fill({
        id: 0,
        spendingKey:    'd3a5d55fe7f4c66bd386b7f06d371ef7834b2f46bda5c3aa2ca9d94af588aa07',
        viewingKey:     '02ca73421efadad1c52bdd3c29df9a67afc180bcd106a5faf10ed5c87cf110c4',
        share:          'fe7f4c66bd386b7f06d371ef79a67afc180bcd106a5faf2ca73421e4af588a10'
    }));
    const [threshold, setThreshold] = useState(5);
    const [keys, setKeys] = useState({
        error: 'Error message will be shown like this',
        spendingKey: 'd3a5d55fe7f4c66bd386b7f06d371ef7834b2f46bda5c3aa2ca9d94af588aa07',
        viewingKey: '02ca73421efadad1c52bdd3c29df9a67afc180bcd106a5faf10ed5c87cf110c4',
    });

    const handleThreasholdChange = (e) => {
        setThreshold(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.container}>
            <h2>Recover keys</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="thresholdRecovery">Threshold:</label>
                    <input type="number" id="thresholdRecovery" name="threshold" value={threshold} min={1} max={10000} onChange={handleThreasholdChange} />
                </div>
                <div className={styles.buttons_container}>
                    <button type="button">Import CSV</button>
                    <button type="button">Import ZIP</button>
                    <button type="submit">Recover Keys</button>
                </div>
            </form>
            <div className={styles.recovered_keys}>
                <h3>Recovered keys:</h3>
                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    <div>
                        <label htmlFor="spendingKey">Spending key:</label>
                        <input type="text" id="spendingKey" name="spendingKey" value={keys.spendingKey} readOnly />
                    </div>
                    <div>
                        <label htmlFor="viewingKey">Viewing key:</label>
                        <input type="text" id="viewingKey" name="viewingKey" value={keys.viewingKey} readOnly />
                    </div>
                </form>
                <p className={styles.error}>{keys.error}</p>
            </div>
            {
                shares.length > 0 && (
                    <div>
                        <div className={styles.shares_info}>
                            <h3>Shares: </h3>
                            <div className={styles.buttons_container}>
                                <button type="button">Add Empty Share</button>
                            </div>
                        </div>
                        <div>
                            {
                                shares.map((share, index) => (
                                    <Share key={index} share={share} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}