import { createContext, useEffect, useReducer } from "react";

export const FavoriteContext = createContext();

export function handleReducer(state, action) {
    switch (action.type) {
        case 'SAVE_FAVORITE':
            const movieId = action.payload.id;
            const title = action.payload.title;

            const newState = { ...state, [movieId]: title };
            localStorage.setItem('favs', JSON.stringify(newState));

            return newState;
        case 'REMOVE_FAVORITE':
            const { [action.payload.id]: _, ...rest } = state;
            localStorage.setItem('favs', JSON.stringify(rest));
            return rest;
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}

export function FavoriteContextProvider({ children }) {
    const [state, dispatch] = useReducer(handleReducer, null);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favs'));
        dispatch({ type: 'SET_FAVORITES', payload: favorites });
    }, [])

    return (
        <FavoriteContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export default FavoriteContext;
