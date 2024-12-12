import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { sequelize } from '../libs/sequelize.js';  // Asegúrate de importar sequelize

const PRODUCTS_FILE_PATH = path.join(__dirname, 'products.json');
const LOG_FILENAME = 'access_log.txt';

// Función para leer el archivo de productos
export function read() {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf8');
        return JSON.parse(data); // Retorna los productos como un objeto JS
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
        return []; // Si hay un error, retorna un arreglo vacío
    }
}

// Función para escribir en el archivo de productos
export function write(products) {
    try {
        fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf8');
    } catch (error) {
        console.error('Error escribiendo en el archivo:', error);
    }
}

// Función para escribir un log de acceso
export function writeLog(req) {
    const now = dayjs().format('DD-MM-YYYY HH:mm:ss');
    const logMessage = `${now} ${req.method} ${req.path} ${JSON.stringify(req.headers)}\n`;

    // Escribe el log en el archivo
    fs.appendFileSync(LOG_FILENAME, logMessage);
}

// Función para registrar una actividad en la base de datos (opcional)
export async function logActivity(action, details) {
    try {
        await sequelize.models.ActivityLog.create({
            action,
            details,
            timestamp: dayjs().toISOString(),
        });
    } catch (error) {
        console.error("Error al registrar la actividad:", error);
    }
}
