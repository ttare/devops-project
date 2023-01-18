export interface DatabaseConfig {
  DATABASE_SERVER_URL: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_MAX_CONNECTION?: number;
  DATABASE_MIN_CONNECTION?: number;
  DATABASE_IDLE_TIMEOUT?: number;
  DATABASE_ALLOW_EXIT_ON_IDLE?: boolean;
  DATABASE_MAX_USES?: number;
}

export interface QueryModel {
  query: string;
  values?: Array<string | number | boolean | Date>;
}
