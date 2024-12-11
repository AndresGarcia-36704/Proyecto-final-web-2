import { Sequelize } from "sequelize";
import pgtools from "pgtools";
import { defineModels } from "../db/models/index.js";


const DB_NAME = 'Makeup-shop';
const DB_USER = 'postgres';
const DB_PASS = '';
const DB_HOST = '127.0.0.1';
const DB_PORT = '5432';

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

defineModels(sequelize);

try {
    await sequelize.sync({ force: false }); 
    console.log("Database synchronized successfully.");

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error.message);
}
