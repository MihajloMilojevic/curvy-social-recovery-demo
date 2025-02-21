import React, { useState } from 'react';
import styles from './split.module.css';
import Share from "./Share"
import sharesToCSV from '../../utils/sharesToCSV';
import downloadFile from '../../utils/download';
import sharesToZip from '../../utils/sharesToZip';

export default function Split() {
    const [shares, setShares] = useState(Array(5).fill({
        id: 0,
        spendingKey:    'd3a5d55fe7f4c66bd386b7f06d371ef7834b2f46bda5c3aa2ca9d94af588aa07',
        viewingKey:     '02ca73421efadad1c52bdd3c29df9a67afc180bcd106a5faf10ed5c87cf110c4',
        share:          'fe7f4c66bd386b7f06d371ef79a67afc180bcd106a5faf2ca73421e4af588a10'
    }));
    const [formData, setFormData] = useState({
        spendingKey: '',
        viewingKey: '',
        threshold: 5,
        totalShares: 9
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    function exportCSV() {
        const file = sharesToCSV(shares);
        const url = URL.createObjectURL(file);
        downloadFile(url, 'shares.csv');
        URL.revokeObjectURL(url); // Clean up the URL object
    }

    async function exportZIP() {
        try {
            const file = await sharesToZip(shares);
            const url = URL.createObjectURL(file);
            downloadFile(url, 'shares.zip');
            URL.revokeObjectURL(url); // Clean up the URL object
        } catch (error) {
            console.error(error);
            alert('An error occurred while exporting the ZIP file');
        }
    }

    return (
        <div className={styles.container}>
            <h2>Generate Shares</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="spendingKey">Spending key:</label>
                    <input type="text" id="spendingKey" name="spendingKey" value={formData.spendingKey} onChange={handleChange} placeholder='d3a5d55fe7f4c66bd386b7f06d371ef7834b2f46bda5c3aa2ca9d94af588aa07' />
                </div>
                <div>
                    <label htmlFor="viewingKey">Viewing key:</label>
                    <input type="text" id="viewingKey" name="viewingKey" value={formData.viewingKey} onChange={handleChange} placeholder="02ca73421efadad1c52bdd3c29df9a67afc180bcd106a5faf10ed5c87cf110c4" />
                </div>
                <div>
                    <label htmlFor="threshold">Threshold:</label>
                    <input type="number" id="threshold" name="threshold" value={formData.threshold} min={1} max={10000} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="totalShares">Total shares:</label>
                    <input type="number" id="totalShares" name="totalShares" value={formData.totalShares} min={1} max={10000} onChange={handleChange} />
                </div>
                <div className={styles.buttons_container}>
                    <button type="button">Generate Random</button>
                    <button type="button">Import Data</button>
                    <button type="submit">Generate Shares</button>
                </div>
            </form>
            {
                shares.length > 0 && (
                    <div>
                        <div className={styles.shares_info}>
                            <h3>Shares: </h3>
                            <div className={styles.buttons_container}>
                                <button type="button" onClick={exportCSV}>Export CSV</button>
                                <button type="button" onClick={exportZIP}>Export ZIP</button>
                            </div>
                        </div>
                        <div>
                            {
                                shares.map((share, index) => (
                                    <Share key={index} share={share} index={index}/>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}