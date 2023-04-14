/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly REACT_APP_API_URL: string
  readonly REACT_APP_COGNITO_REGION: string
  readonly REACT_APP_COGNITO_USER_POOL_ID: string
  readonly REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID: string
  readonly REACT_APP_STAGE: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}