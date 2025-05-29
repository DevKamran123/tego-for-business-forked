/**
 * Get environment variable value with runtime override support
 * @param key The environment variable key
 * @returns The environment variable value
 */

// Use the type definition from env.d.ts
export const getEnv = (key: string): string => {
  // First check runtime config from window.__ENV (set by container)
  if (
    typeof window !== "undefined" &&
    window.__ENV &&
    // Use type assertion to handle the specific object type
    (window.__ENV as Record<string, string>)[key] !== undefined
  ) {
    return (window.__ENV as Record<string, string>)[key];
  }
  // Fall back to build-time variables
  return import.meta.env[key] || "";
};

// Export specific environment variables
export const getNodeApiUrl = (): string => {
  return getEnv("VITE_PUBLIC_NODE_API_URL");
};

export const getGoogleMapsApiKey = (): string => {
  return getEnv("VITE_PUBLIC_GOOGLE_MAPS_API_KEY");
};
