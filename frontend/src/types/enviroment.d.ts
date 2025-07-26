
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      BACKEND_URL: string;
      ENV: 'test'|'dev'|'prod';
    }
  }
}