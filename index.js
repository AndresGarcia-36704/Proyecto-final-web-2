import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import { routerMakeups } from './routes/index.js';
import { writeLog } from './utils/file.utils.js';
import { configurePassport } from './config/passport.js';
import { cartRouter } from './routes/cart.router.js';
import path from 'path';
import adminRouter from './routes/admin.router.js';
import { productsRouter } from './routes/productsRouter.js';
import { sequelize } from './libs/sequelize.js';  
import { defineUsers } from './db/models/user.model.js'; 
import { fileURLToPath } from 'url';

const app = express();

// Configuración de sesión
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

// Middleware para parsing de datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la vista EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Configuración de archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Rutas para productos
app.use('/api/v1/products', productsRouter);

// Configuración de Passport
configurePassport(app);

// Middleware para logueo
app.use((req, res, next) => {
    console.log('Middleware');
    writeLog(req);
    next();
});

// Rutas de administración y carrito
app.use('/admin', adminRouter);
app.use('/cart', cartRouter); // Ruta para el carrito de compras

// Rutas principales
routerMakeups(app);

// Iniciar servidor
app.listen(3000, async () => {
    console.log('Server is running on port 3000');
    
    // Definir modelos y sincronizar la base de datos
    defineUsers(sequelize); // Definir el modelo de usuarios
    try {
        // Sincronizar base de datos antes de iniciar el servidor
        await sequelize.sync({ force: false }); 
        console.log("Database synchronized successfully.");
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
    }
});
