import * as renderHelper from '../common/render-helper';
import * as config from '../config';
import * as Loader from 'loader';

export class Site {
    index(req, res, next) {
        var tab = req.query.tab || 'all';
        var tabName = renderHelper.tabName(tab);

        res.render('index', {
            topics: [],
            current_page: 0,
            list_topic_count: 10,
            tops: [],
            no_reply_topics: [],
            pages: [],
            tabs: config.tabs,
            tab: tab,
            pageTitle: tabName && (tabName + '版块'),
        });
    }
}