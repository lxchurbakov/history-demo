import React from 'react';

export const useQuery = <T,>(query: () => Promise<T>, deps: React.DependencyList) => {
    const [value, setValue] = React.useState(null as null | T);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null as Error | null);
    
    React.useEffect(() => {
        setLoading(true);
        query().then(($) => {
            setValue($);
        }).catch((e) => {
            setError(e);
        }).then(() => {
            setLoading(false);
        });
    }, deps);

    return [value, loading, error] as const;
};

// type UpdatePredicate<T> = (value: T) => T;

export const useForceUpdate = ([state, setState] = React.useState(false)) => 
    React.useCallback(() => setState(($) => !$), [setState]);

export const useTicker = ([state, setState] = React.useState(false)) => {
    const forceUpdate = useForceUpdate([state, setState]);
    return React.useMemo(() => ({ value: state, update: forceUpdate }), [state]);
};
