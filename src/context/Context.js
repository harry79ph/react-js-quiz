import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    details: {},
    users: []
};

const appReducer = (state, action) => {
    switch (action.type) {
        case 'RESET_ALL':
            return initialState;
        case 'RESET_DETAILS':
            return {
                ...state, details: action.payload
            }
        case 'RESET_USERS':
            return {
                ...state, users: action.payload
            }
        case 'ADD_DETAILS':
            return {
                ...state, details: {...state.details, ...action.payload}
            }
        case 'ADD_USERS':
            return {
                ...state, users: [...action.payload]
            }
        case 'SORT_USERS':
            if (action.payload === 'name') {
                return {
                    ...state, users: [...state.users].sort((a, b) => a.name > b.name ? 1 : -1)
                }
            } else if (action.payload === 'score') {
                return {
                    ...state, users: [...state.users].sort((a, b) => a.score - b.score)
                }
            } else {
                return {
                    ...state, users: [...state.users].sort((a, b) => a.created.getTime() - b.created.getTime())
                }
            }
        default:
            return state;
    }
}

const List = createContext();

const Context = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <List.Provider value={{ state, dispatch }}>{ children }</List.Provider>
    );
}

export const MainState = () => {
    return useContext(List);
}
 
export default Context;