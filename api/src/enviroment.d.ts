declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_HOSTNAME: string;
      DB_PORT: string;
      DB_NAME: string;
      JWT_SECRET: string;
      PORT: string;
      SCRIPT_CALLBACK_URL: string;
    }
  }
}

export {};