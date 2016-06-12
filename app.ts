import * as path from 'path';
import * as express  from 'express';
import { WebRouter } from './web-router';
import * as bodyParser from 'body-parser';
import { Auth } from './middlewares/auth';
import * as _ from 'lodash';
import * as config from './config';
import * as renderHelper from './common/render-helper';
import * as Loader from 'loader';

export class App {
    webRouter = new WebRouter();
    constructor() {

        // 静态文件目录
        var staticDir = path.join(__dirname, 'public');
        // assets
        var assets = {};

        var app = express();

        // views
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'html');
        app.engine('html', require('ejs-mate'));
        app.locals._layoutFile = 'layout.html';

        // public
        app.use('/public', express.static(staticDir));

        // bodyParser
        app.use(bodyParser.json({ limit: '1mb' }));
        app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

        // auth
        var auth = new Auth();
        app.use(auth.authUser);

        // extend
        _.extend(app.locals, {
            config: config,
            Loader: Loader,
            assets: assets
        });
        _.extend(app.locals, renderHelper);

        // csrf
        app.use(function (req, res, next) {
            res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
            next();
        });

        // router
        app.use('/', this.webRouter.router);

        app.listen(config.port);
    }
}

var app = new App();