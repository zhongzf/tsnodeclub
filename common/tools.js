"use strict";
const bcrypt = require('bcryptjs');
const moment = require('moment');
class Tools {
    constructor() {
        // 格式化时间
        this.formatDate = function (date, friendly) {
            date = moment(date);
            if (friendly) {
                return date.fromNow();
            }
            else {
                return date.format('YYYY-MM-DD HH:mm');
            }
        };
        this.validateId = function (str) {
            return (/^[a-zA-Z0-9\-_]+$/i).test(str);
        };
        this.bhash = function (str, callback) {
            bcrypt.hash(str, 10, callback);
        };
        this.bcompare = function (str, hash, callback) {
            bcrypt.compare(str, hash, callback);
        };
        moment.locale('zh-cn'); // 使用中文       
    }
}
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map