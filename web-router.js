"use strict";
const express = require('express');
const auth_1 = require('./middlewares/auth');
const site_controller_1 = require('./controllers/site.controller');
const topic_controller_1 = require('./controllers/topic.controller');
class WebRouter {
    constructor() {
        this.siteController = new site_controller_1.SiteController();
        this.topicController = new topic_controller_1.TopicController();
        this.router = express.Router();
        this.auth = new auth_1.Auth();
        // home page
        this.router.get('/', this.siteController.index);
        // topic
        // 新建文章界面
        this.router.get('/topic/create', /*this.auth.userRequired,*/ this.topicController.create);
        // 保存新建的文章
        this.router.post('/topic/create', /*this.auth.userRequired, limit.peruserperday('create_topic', config.create_post_per_day, false),*/ this.topicController.put);
    }
}
exports.WebRouter = WebRouter;
//# sourceMappingURL=web-router.js.map