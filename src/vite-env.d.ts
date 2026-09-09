/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHEETS_WEBHOOK_URL?: string;
  readonly VITE_CHAT_SHEETS_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
