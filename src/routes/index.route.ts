import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import { BaseRoute } from '@/utils/base-route';


class IndexRoute extends BaseRoute implements Routes {
    public path = '/';
    public router = Router();
    public indexController = new IndexController();

    constructor() {
        super()
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.getBaseUrl(`${this.path + 'health'}`), this.indexController.index);
    }
}

export default IndexRoute;