/// <reference types="vite/client" />

/**
 * Vite environment variables exposed to the game at build time.
 *
 * Any variable defined in a `.env` file must be prefixed with `VITE_`
 * to be inlined into the client bundle.
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string
  readonly VITE_APP_VERSION?: string
  readonly VITE_BASE_URL?: string
  readonly VITE_ENABLE_DEBUG?: string
  readonly VITE_AUDIO_ENABLED?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}