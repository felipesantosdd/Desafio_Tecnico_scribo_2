import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSourceOptions, DataSource } from "typeorm"; // Correção aqui
import { User } from "./entities/users.Entity";
import { PhoneNumber } from "./entities/phone.Entity";

const dataSourceConfig = (): DataSourceOptions => { // Correção aqui
    const migrationPath: string = path.join(__dirname, "./migrations/**.{ts,js}");

    const dbUrl: string | undefined = process.env.DATABASE_URL;

    if (!dbUrl) {
        throw new Error("Missing env var: 'DATABASE_URL'");
    }

    return {
        type: "postgres",
        url: dbUrl,
        logging: ["error", "warn"],
        entities: [User, PhoneNumber],
        migrations: [migrationPath],
    };
};

const AppDataSource = new DataSource(dataSourceConfig());

export { AppDataSource };
