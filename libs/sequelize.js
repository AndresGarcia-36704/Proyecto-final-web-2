import { Sequelize } from "sequelize";
import pgtools from "pgtools";

const DB_NAME = process.env.DB_NAME || 'TechShop';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASSWORD || 'varusdracoon';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '5432';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
});

async function createDatabaseIfNotExists() {
    try {
        await pgtools.createdb(
            {
                user: DB_USER,
                password: DB_PASS,
                host: DB_HOST,
                port: DB_PORT,
            },
            DB_NAME
        );
        console.log(`Database "${DB_NAME}" created successfully.`);
    } catch (err) {
        if (err.name === "duplicate_database") {
            console.log(`Database "${DB_NAME}" already exists.`);
        } else {
            console.error(`Error creating database: ${err.message}`);
            throw err;
        }
    }
}

await createDatabaseIfNotExists();
