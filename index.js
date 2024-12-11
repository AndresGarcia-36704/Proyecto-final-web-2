import express from 'express'
import session from 'express-session';
import 'dotenv/config';
import { routerMakeups } from './routes/index.js';
import { writeLog } from './utils/files.js';
import { configurePassport } from './config/passport.js';
import { cartRouter } from "./routes/cart.router.js";
import path from 'path';
import adminRouter from './routes/admin.router.js';  
import { makeupsRouter } from './routes/makeups.router.js'; // Asegúrate de que la ruta sea correcta
import { fileURLToPath } from 'url';

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } 
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use('/api/v1/makeups', makeupsRouter); // Asocia las rutas al prefijo correcto

configurePassport(app);

app.use((req, res, next) => {
    console.log('Middleware');
    writeLog(req);
    next();
})

app.use('/admin', adminRouter); 

app.use("/cart", cartRouter);
routerMakeups(app)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})