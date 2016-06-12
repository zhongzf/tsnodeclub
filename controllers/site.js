"use strict";
const renderHelper = require('../common/render-helper');
const config = require('../config');
class Site {
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
exports.Site = Site;
//# sourceMappingURL=site.js.map