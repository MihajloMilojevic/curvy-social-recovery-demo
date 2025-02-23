import React, { createContext, useState } from 'react';

const DemoContext = createContext();

const DemoProvider = ({ children }) => {
    const [splitShares, setSplitShares] = useState([]);
    const [recoverShares, setRecoverShares] = useState([]);

    const moveShareToRecovery = (index) => {
        setRecoverShares([...recoverShares, splitShares[index]]);
    }

    const removeShareFromRecovery = (index) => {
        const newShares = [...recoverShares];
        newShares.splice(index, 1);
        setRecoverShares(newShares);
    }
    
    const addEmpryShare = () => {
        setRecoverShares([...recoverShares, {share: '', spendingKey: '', viewingKey: ''}]);
    }
    return (
        <DemoContext.Provider value={{ 
            splitShares, setSplitShares, 
            recoverShares, setRecoverShares, 
            moveShareToRecovery, removeShareFromRecovery,
            addEmpryShare
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