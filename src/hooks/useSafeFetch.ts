/*
 * Space One — useSafeFetch Hook
 * Wraps fetch calls with global error handling
 * Automatically shows ServerUnavailable page on network/API errors
 * Usage: const { data, error, isLoading } = await useSafeFetch(url, options);
 */

import { useState } from "react";

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useSafeFetch() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async <T,>(
    url: string,
    options?: RequestInit
  ): Promise<FetchResult<T>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      // Check if response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error(
          `Invalid response type: ${contentType || "unknown"}. Expected JSON.`
        );
      }

      // Check for HTTP errors
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          // Response wasn't JSON, use default message
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      setIsLoading(false);

      return { data, error: null, isLoading: false };
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      setIsLoading(false);

      // If it's a network error, throw to trigger ErrorBoundary
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("Network") ||
        error.message.includes("timeout")
      ) {
        throw error;
      }

      return { data: null, error, isLoading: false };
    }
  };

  return { fetchData, error, isLoading };
}
