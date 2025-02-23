import React, { createContext, useState, useEffect } from 'react';
import {defaultWasmModule, loadWasm} from '../wasm';

const DemoContext = createContext();

const DemoProvider = ({ children }) => {
    const [wasm, setWasm] = useState(defaultWasmModule)
    const [splitShares, setSplitShares] = useState([]);
    const [recoverShares, setRecoverShares] = useState([]);


    useEffect(() => {
        loadWasm(wasm, setWasm);
    }, []);

    const moveShareToRecovery = (index) => {
        setRecoverShares([...recoverShares, splitShares[index]]);
    }

    const removeShareFromRecovery = (index) => {
        const newShares = [...recoverShares];
        newShares.splice(index, 1);
        setRecoverShares(newShares);
    }
    
    const addEmpryShare = () => {
        setRecoverShares([{share: '', spendingKey: '', viewingKey: ''}, ...recoverShares]);
    }
    return (
        <DemoContext.Provider value={{ 
            splitShares, setSplitShares, 
            recoverShares, setRecoverShares, 
            moveShareToRecovery, removeShareFromRecovery,
            addEmpryShare,
            wasm
        }}>
            {children}
        </DemoContext.Provider>
    );
};


function useDemoContext() {
    const context = React.useContext(DemoContext);
    if (context === undefined) {
        throw new Error('useDemoContext must be used within a DemoProvider');
    }
    return context;
}

export { DemoContext, DemoProvider, useDemoContext };