import * as bcrypt  from 'bcryptjs';
import * as moment  from 'moment';

export class Tools {

    constructor() {
        moment.locale('zh-cn'); // 使用中文       
    }

    // 格式化时间
    formatDate = function (date, friendly) {
        date = moment(date);

        if (friendly) {
            return date.fromNow();
        } else {
            return date.format('YYYY-MM-DD HH:mm');
        }
    }

    validateId = function (str) {
        return (/^[a-zA-Z0-9\-_]+$/i).test(str);
    }

    bhash = function (str, callback) {
        bcrypt.hash(str, 10, callback);
    }

    bcompare = function (str, hash, callback) {
        bcrypt.compare(str, hash, callback);
    }
}