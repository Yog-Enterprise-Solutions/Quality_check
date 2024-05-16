// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    return (
        <DataContext.Provider value={{ items, setItems, currentItem, setCurrentItem }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
