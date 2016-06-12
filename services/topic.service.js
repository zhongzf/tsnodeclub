"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const models_1 = require('../models');
class TopicService {
    getTopicById(id) {
        return models_1.Topic.findOne({ _id: id });
    }
    getTopicByQuery(query, opt) {
        return models_1.Topic.find(query, {}, opt);
    }
    getCountByQuery(query) {
        return new Promise(resolve => {
            models_1.Topic.count(query, (error, count) => {
                resolve(count);
            });
        });
    }
    ;
    newAndSave(title, content, tab, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var topic = new models_1.Topic();
            topic.title = title;
            topic.content = content;
            topic.tab = tab;
            topic.author_id = authorId;
            yield topic.save();
        });
    }
}
exports.TopicService = TopicService;
//# sourceMappingURL=topic.service.js.map