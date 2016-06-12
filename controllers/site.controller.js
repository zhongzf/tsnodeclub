"use strict";
const renderHelper = require('../common/render-helper');
const config = require('../config');
const topic_service_1 = require('../services/topic.service');
var topicService = new topic_service_1.TopicService();
class SiteController {
    index(req, res, next) {
        var page = parseInt(req.query.page, 10) || 1;
        page = page > 0 ? page : 1;
        var tab = req.query.tab || 'all';
        // 取主题
        var query = {};
        if (tab && tab !== 'all') {
            if (tab === 'good') {
                query.good = true;
            }
            else {
                query.tab = tab;
            }
        }
        topicService.getTopicByQuery().then(topics => {
            var all_topics_count = topics.length;
            var limit = config.list_topic_count;
            var options = { skip: (page - 1) * limit, limit: limit, sort: '-top -last_reply_at' };
            var pages = Math.ceil(all_topics_count / limit);
            var tabName = renderHelper.tabName(tab);
            res.render('index', {
                topics: topics,
                current_page: 0,
                list_topic_count: 10,
                tops: topics,
                no_reply_topics: topics,
                pages: pages,
                tabs: config.tabs,
                tab: tab,
                pageTitle: tabName && (tabName + '版块'),
            });
        });
    }
}
exports.SiteController = SiteController;
//# sourceMappingURL=site.controller.js.map