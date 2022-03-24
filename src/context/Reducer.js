export const initialState = {
    details: {},
    users: [],
    list: []
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case 'GET_LIST':
            return {
                ...state, list: [...action.payload]
            }
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
            case 'FILTER_LIST':
            return {
                ...state, list: [...state.users].filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
            }
        default:
            return state;
    }
}