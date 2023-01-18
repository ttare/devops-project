export interface Config {
  NODE_ENV: 'development' | 'production';
  PORT: number;

  // database configuration
  DATABASE_SERVER_URL: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;

  // kafka configuration
  KAFKA_SERVER_URL: string;
  KAFKA_USERNAME: string;
  KAFKA_PASSWORD: string;
  KAFKA_TOPIC_USER_CREATED: string;
  KAFKA_CLIENT_ID: string;

  // sendgrid configuration
  SENDGRID_API_KEY: string;
  SENDGRID_VERIFIED_SENDER: string;
  SENDGRID_WELCOME_TEMPLATE_ID: string;
}
