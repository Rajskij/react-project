import { ResponseContext } from "@/context/ResponseContext";
import { useContext } from "react";

export function useResponse() {
    const response = useContext(ResponseContext);

    if (!response) {
        throw Error('Use Response should be use inside Response Context')
    }

    return response;
}