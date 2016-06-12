import * as express from 'express';
import { Auth } from './middlewares/auth';
import { SiteController } from './controllers/site.controller';
import { TopicController } from './controllers/topic.controller';


export class WebRouter {
    siteController = new SiteController();
    topicController = new TopicController();
    router = express.Router();
    auth = new Auth();

    constructor() {
        // home page
        this.router.get('/', this.siteController.index);

        // topic

        // 新建文章界面
        this.router.get('/topic/create', /*this.auth.userRequired,*/ this.topicController.create);
        // 保存新建的文章
        this.router.post('/topic/create', /*this.auth.userRequired, limit.peruserperday('create_topic', config.create_post_per_day, false),*/ this.topicController.put);
    }
}
