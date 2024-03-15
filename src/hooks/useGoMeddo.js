import { useMemo } from "react";
import GoMeddo from "@gomeddo/sdk"

export default function useGoMeddo() {
    const apiKey = process.env.REACT_APP_GOMEDDO_API_KEY; // Retrieve the API key from environment variables

    /* useMemo is used to memoize the GoMeddo instance. This ensures that the GoMeddo instance
     is not recreated on every render unless the apiKey changes, which is specified as a dependency
     in the dependency array [apiKey]. This optimization helps in avoiding unnecessary re-instantiations
     and ensures that components using this hook do not unnecessarily re-render due to reference changes. */
    return useMemo(() => new GoMeddo(apiKey), [apiKey]);
}