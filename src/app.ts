import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
// import { connect, set } from 'mongoose';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
// import { dbConnection } from '@databases';
// import { Routes } from '@interfaces/routes.interface';
// import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
// import listeners from './listeners';
import { Routes } from '@interfaces/routes.interface';


// declare global {
//     namespace Express {
//         interface Request {
//             user: User
//         }
//     }
// }

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.initializeProcessListeners()
        this.connectToDatabase();
        this.registerAgendaJobs();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.registerEventListeners()
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private connectToDatabase() {
        // if (this.env !== 'production') {
        //     set('debug', true);
        // }

        // connect(dbConnection);
        console.log('Database connected')
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT as string, { stream }));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeProcessListeners() {
        process
            .on('unhandledRejection', (reason, p) => {
                console.error(reason, 'Unhandled Rejection at Promise', p);
            })

            .on('uncaughtException', err => {
                console.error(err, 'Uncaught Exception thrown');
                process.exit(1);
            });

        process.on('SIGTERM', () => {
            console.log('👋 SIGTERM signal received. Exiting gracefully');
            process.exit(0);
        })

        process.once('SIGUSR2', function () {
            console.log('👋 SIGUSR2 signal received. Exiting gracefully');
            process.kill(process.pid, 'SIGUSR2');
        });

        process.on('SIGINT', function () {
            console.log('👋 SIGINT signal received. Exiting gracefully');
            // this is only called on ctrl+c, not restart
            process.kill(process.pid, 'SIGINT');
            process.exit(0);
        });
    }

    private initializeErrorHandling() {
        // this.app.use(errorMiddleware);
    }

    private registerEventListeners() {
        // listeners.register()
    }

    private registerAgendaJobs() {
        // agenda.init()
    }
}

export default App;