"use strict";
const path = require('path');
const express = require('express');
const web_router_1 = require('./web-router');
const bodyParser = require('body-parser');
const auth_1 = require('./middlewares/auth');
const _ = require('lodash');
const config = require('./config');
const renderHelper = require('./common/render-helper');
const Loader = require('loader');
class App {
    constructor() {
        this.webRouter = new web_router_1.WebRouter();
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
        var auth = new auth_1.Auth();
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
exports.App = App;
var app = new App();
//# sourceMappingURL=app.js.map