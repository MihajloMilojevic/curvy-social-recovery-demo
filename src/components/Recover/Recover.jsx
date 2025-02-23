import React, { useState } from 'react';
import styles from './recover.module.css';
import Share from "./Share"
import upload from '../../utils/upload';
import csvToShares from '../../utils/csvToShares';
import zipToShares from '../../utils/zipToShares';
import { useDemoContext } from '../../context/demoContext';
import { WASM_STATUS } from '../../wasm';

export default function Recover() {
   
    const {
        recoverShares: shares, 
        setRecoverShares: setShares, 
        removeShareFromRecovery,
        addEmpryShare,
        wasm
    } = useDemoContext();

    const [threshold, setThreshold] = useState(5);
    const [keys, setKeys] = useState({
        error: '',
        spendingKey: '',
        viewingKey: '',
    });

    const handleThreasholdChange = (e) => {
        setThreshold(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (wasm.status === WASM_STATUS.READY) {
            try {
                const goShares = shares.map(({share: x, spendingKey: skEval, viewingKey: vkEval}) => ({x, skEval, vkEval}));
                const keys = await wasm.fn.recover(parseInt(threshold), goShares);
                setKeys({
                    error: '',
                    spendingKey: keys.k,
                    viewingKey: keys.v
                });
            } catch (error) {
                setKeys({
                    error: error.message,
                    spendingKey: '',
                    viewingKey: ''
                });
            }
        } else {
            alert('WASM not loaded!');
        }
    }

    const handleShareChange = (index) => {
        return ( key, value) => {
            const newShares = [...shares];
            newShares[index][key] = value;
            setShares(newShares);
        }
    }

    const handleImportCSV = async () => {
        try {
            const file = await upload();
            const shs = await csvToShares(file.file);
            setShares(shs);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    } 

    const handleImportZIP = async () => {
        try {
            const file = await upload();
            const shs = await zipToShares(file.file);
            setShares(shs);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
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
                    <button type="button" onClick={handleImportCSV}>Import CSV</button>
                    <button type="button" onClick={handleImportZIP}>Import ZIP</button>
                    <button type="submit">Recover Keys</button>
                </div>
            </form>
            {
                !!(keys.spendingKey || keys.viewingKey) && (
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
                    </div>
                )
            }
            {
                !!keys.error && (    
                    <p className={styles.error}>{keys.error}</p>
                )
            }
            {
                shares.length > 0 && (
                    <div>
                        <div className={styles.shares_info}>
                            <h3>Shares: </h3>
                            <div className={styles.buttons_container}>
                                <button type="button" onClick={addEmpryShare}>Add Empty Share</button>
                            </div>
                        </div>
                        <div>
                            {
                                shares.map((share, index) => (
                                    <Share 
                                        key={index} 
                                        onRemove={() => removeShareFromRecovery(index)} 
                                        onChange={handleShareChange(index)} 
                                        share={share} 
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}