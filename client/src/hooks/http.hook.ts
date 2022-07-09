import { useState, useCallback } from 'react';

const useHttp = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(
        async (url: string, method: string = 'GET', body: any = null, headers: any = {}) => {
            setLoading(true);

            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }

                const response = await fetch(url, { method, body, headers });
                const data = await response.json();

                if (!response.ok) {
                    setError(data);
                    setLoading(false)
                    setTimeout(() => setError(null), 10000);
                    return;
                }

                setLoading(false);

                return data;
            } catch (err: any) {
                setLoading(false);
                setError(err.message);
                throw err;
            }
        },
        [],
    );

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

export default useHttp;
