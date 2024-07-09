import React, { useState, useEffect } from 'react';

interface APIConnectorProps {
  endpoint: string;
  method: string;
  apiKey: string;
  children: (
    data: any,
    loading: boolean,
    error: Error | null,
  ) => React.ReactNode;
  cacheTime?: number;
  retryCount?: number;
}

const cache: Record<string, { data: any; timestamp: number }> = {};

export const APIConnector: React.FC<APIConnectorProps> = ({
  endpoint,
  method,
  apiKey,
  children,
  cacheTime = 60000, // 1 minute default cache time
  retryCount = 3,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async (retries: number = 0) => {
      const cacheKey = `${method}:${endpoint}`;
      const cachedData = cache[cacheKey];

      if (cachedData && Date.now() - cachedData.timestamp < cacheTime) {
        setData(cachedData.data);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        cache[cacheKey] = { data: result, timestamp: Date.now() };
      } catch (e) {
        if (retries < retryCount) {
          setTimeout(() => fetchData(retries + 1), 1000 * Math.pow(2, retries));
        } else {
          setError(
            e instanceof Error ? e : new Error('An unknown error occurred'),
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, apiKey, cacheTime, retryCount]);

  return <>{children(data, loading, error)}</>;
};
