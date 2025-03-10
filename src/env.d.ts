interface ImportMetaEnv {
  readonly VITE_PUBLIC_NODE_API_URL: string;
  // add other environment variables as needed
}

interface ImportMeta {
  env: {
    VITE_PUBLIC_NODE_API_URL: string;
    [key: string]: string;
  };
}

interface Window {
  __ENV: {
    VITE_PUBLIC_NODE_API_URL: string;
    [key: string]: string;
  };
}
