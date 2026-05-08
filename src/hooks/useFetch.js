import { useState, useEffect, useCallback, useRef } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const execute = useCallback(async (overrideOptions = {}) => {
    cancel();
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    const fetchOptions = {
      ...options,
      ...overrideOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...overrideOptions.headers
      }
    };
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, [url, options, cancel]);

  useEffect(() => {
    if (options.autoLoad) {
      execute();
    }
    
    return cancel;
  }, [execute, options.autoLoad, cancel]);

  return { data, loading, error, execute, cancel };
}

export default useFetch;