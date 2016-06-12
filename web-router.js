"use strict";
const express = require('express');
const site_1 = require('./controllers/site');
class WebRouter {
    constructor() {
        this.site = new site_1.Site();
        this.router = express.Router();
        // home page
        this.router.get('/', this.site.index);
    }
}
exports.WebRouter = WebRouter;
//# sourceMappingURL=web-router.js.map