// Importaciones de rutas
import authRoutes from './routes/Auth.js';
import productsRoutes from './routes/Products.js';
import colorRoutes from './routes/Colors.js';
import sizesRoutes from './routes/Sizes.js';
import userAdminRoutes from './routes/UserAdmin.js';
import stockRoutes from './routes/Stock.js';
import orderRoutes from './routes/Orders.js';

// Importaciones de dependencias 
import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.js';
import loadEnv from './utils/loadEnv.js';

// - Arreglar -
import loadStaticFiles from './utils/loadStaticsFiles.js';

import cookieParser from 'cookie-parser';

// Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());

// Cargar variables de entorno
loadEnv();

// Validar entorno (Desarrollo o Produccion)
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    console.log('Modo de desarrollo')

    app.use(logger);
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        credentials: true,
    }));
} else  {
    console.log('Modo de produccion')
}

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes); 
app.use('/api/colors', colorRoutes);
app.use('/api/sizes', sizesRoutes);
app.use('/api/admin', userAdminRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/orders', orderRoutes);

// Testeo de api
app.get('/api/ping', async (req, res) => {
    res.send('Pong')
});

// Servir archivos estaticos de la build de Vite
if (isProduction) loadStaticFiles(app);

// Prender servidor de solicitudes http 
const port = process.env.API_PORT || 5001;
app.listen(port, () => console.log(`Server escuchando en el puerto ${port}`));