"use strict";
const models_1 = require('../models');
class TopicService {
    getTopicById(id) {
        return models_1.Topic.findOne({ _id: id });
    }
    getTopicByQuery(query, opt) {
        return models_1.Topic.find(query, {}, opt);
    }
    getCountByQuery(query) {
        return models_1.Topic.count(query);
    }
    ;
}
exports.TopicService = TopicService;
//# sourceMappingURL=topic.service.js.map