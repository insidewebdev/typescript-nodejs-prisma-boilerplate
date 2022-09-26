import App from '@/app';
import validateEnv from '@utils/validateEnv';
import fs from 'fs';

validateEnv();

const routes = []

// check if DevRoute file exists and import dynamically
const devRouteFilePath = './routes/dev.route.ts';

try {
    if (fs.existsSync('./src/routes/dev.route.ts')) {
        const DevRoute = require(devRouteFilePath).default;
        routes.push(new DevRoute());
    }
} catch (error) { }


const app = new App(routes);

app.listen();