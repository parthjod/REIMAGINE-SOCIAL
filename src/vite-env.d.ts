/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 100% Client-side application with zero external APIs
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
