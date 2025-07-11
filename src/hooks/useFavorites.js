import FavoriteContext from "@/context/FavoriteContext";
import { useContext } from "react";

export function useFavorites(params) {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw Error('Use Response should be use inside Response Context')
    }

    return context;
}