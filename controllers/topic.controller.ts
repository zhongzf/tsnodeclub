import * as validator from 'validator';
import * as renderHelper from '../common/render-helper';
import * as config from '../config';
import * as Loader from 'loader';
import { TopicService } from '../services/topic.service';
var topicService = new TopicService();

export class TopicController {

    create(req, res, next) {
        res.render('topic/edit', {
            tabs: config.tabs
        });
    }

    put(req, res, next) {
        var title = validator.trim(req.body.title);
        var tab = validator.trim(req.body.tab);
        var content = validator.trim(req.body.t_content);

        // 得到所有的 tab, e.g. ['ask', 'share', ..]
        var allTabs = config.tabs.map(function (tPair) {
            return tPair[0];
        });

        // 验证
        var editError;
        if (title === '') {
            editError = '标题不能是空的。';
        } else if (title.length < 5 || title.length > 100) {
            editError = '标题字数太多或太少。';
        } else if (!tab || allTabs.indexOf(tab) === -1) {
            editError = '必须选择一个版块。';
        } else if (content === '') {
            editError = '内容不可为空';
        }
        // END 验证

        if (editError) {
            res.status(422);
            return res.render('topic/edit', {
                edit_error: editError,
                title: title,
                content: content,
                tabs: config.tabs
            });
        }

        topicService.newAndSave(title, content, tab/*, req.session.user._id*/).then();
    }
}