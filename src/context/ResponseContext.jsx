import { createContext, useReducer } from "react";

export const ResponseContext = createContext();

export function handleReducer(state, action) {
    switch (action.type) {
        case 'ADD_RESPONSE':
            return action.payload;
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

export function ResponseContextProvider({ children }) {
    const [state, dispatch] = useReducer(handleReducer, [])

    return (
        <ResponseContext.Provider value={{state, dispatch}} >
            {children}
        </ResponseContext.Provider>
    )
}
