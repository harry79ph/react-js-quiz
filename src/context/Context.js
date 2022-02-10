import React, { createContext, useContext, useReducer } from 'react';
import { initialState, appReducer } from './Reducer';

const GlobalContext = createContext();

const Context = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, initialState);
    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>{ children }</GlobalContext.Provider>
    );
}

export const MainState = () => {
    return useContext(GlobalContext);
}
 
export default Context;