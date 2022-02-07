import React, { createContext, useContext, useState } from 'react';

const List = createContext();

const Context = ({ children }) => {
    const [details, setDetails] = useState(null);
    const usersList = [];
    return (
        <List.Provider value={{ details, setDetails, usersList }}>{ children }</List.Provider>
    );
}

export const MainState = () => {
    return useContext(List);
}
 
export default Context;