import * as express from 'express';
import { Site } from './controllers/site';

export class WebRouter {
    site = new Site();
    router = express.Router();

    constructor() {
        // home page
        this.router.get('/', this.site.index);
    }
}
