import { Global, Module } from "@nestjs/common";
import { Pool } from "pg";
import { DatabaseService } from "./database.service";
import { DatabaseConfig } from "./database";
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from "./database.definition";

@Global()
@Module({
  exports: [DatabaseService],
  providers: [
    DatabaseService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: async (databaseOptions: DatabaseConfig) => {
        const pool = new Pool({
          host: databaseOptions.DATABASE_SERVER_URL,
          user: databaseOptions.DATABASE_USERNAME,
          password: databaseOptions.DATABASE_PASSWORD,
          database: databaseOptions.DATABASE_NAME,
          min: databaseOptions.DATABASE_MIN_CONNECTION,
          max: databaseOptions.DATABASE_MAX_CONNECTION,
          maxUses: databaseOptions.DATABASE_MAX_USES,
          idleTimeoutMillis: databaseOptions.DATABASE_IDLE_TIMEOUT,
          allowExitOnIdle: databaseOptions.DATABASE_ALLOW_EXIT_ON_IDLE,
        });

        console.log("Connected to database");

        return pool;
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
