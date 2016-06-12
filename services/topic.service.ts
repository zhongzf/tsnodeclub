import {Topic} from '../models';

export class TopicService {
    getTopicById(id) {
        return Topic.findOne({ _id: id });
    }

    getTopicByQuery(query, opt) {
        return Topic.find(query, {}, opt);
    }

    getCountByQuery(query) {
        return Topic.count(query);
    };
}