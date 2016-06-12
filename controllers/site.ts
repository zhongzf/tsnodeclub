import * as renderHelper from '../common/render-helper';
import * as config from '../config';
import * as Loader from 'loader';
import { TopicService } from '../services/topic.service';

export class Site {
    index(req, res, next) {
        var page = parseInt(req.query.page, 10) || 1;
        page = page > 0 ? page : 1;
        var tab = req.query.tab || 'all';

        // 取主题
        var query = {};
        if (tab && tab !== 'all') {
            if (tab === 'good') {
                query.good = true;
            } else {
                query.tab = tab;
            }
        }

        var topicService = new TopicService();
        var all_topics_count = topicService.getCountByQuery();
        var limit = config.list_topic_count;
        var options = { skip: (page - 1) * limit, limit: limit, sort: '-top -last_reply_at' };
        var all_topics_count
        var pages = Math.ceil(all_topics_count / limit);
        var tabName = renderHelper.tabName(tab);
        res.render('index', {
            topics: [],
            current_page: 0,
            list_topic_count: 10,
            tops: [],
            no_reply_topics: [],
            pages: pages,
            tabs: config.tabs,
            tab: tab,
            pageTitle: tabName && (tabName + '版块'),
        });
    }
}