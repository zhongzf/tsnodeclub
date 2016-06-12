import {Topic} from '../models';

export class TopicService {
    getTopicById(id) {
        return Topic.findOne({ _id: id });
    }

    getTopicByQuery(query, opt) {
        return Topic.find(query, {}, opt);
    }

    getCountByQuery(query) {
        return new Promise<number>(resolve => {            
            Topic.count(query, (error, count) => {            
                resolve(count);
            })
        });
    };

    async newAndSave(title, content, tab, authorId?) {
        var topic = new Topic();
        topic.title = title;
        topic.content = content;
        topic.tab = tab;
        topic.author_id = authorId;

        await topic.save();
    }
}