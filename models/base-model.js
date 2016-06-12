"use strict";
const tools_1 = require('../common/tools');
var tools = new tools_1.Tools();
module.exports = function (schema) {
    schema.methods.create_at_ago = function () {
        return tools.formatDate(this.create_at, true);
    };
    schema.methods.update_at_ago = function () {
        return tools.formatDate(this.update_at, true);
    };
};
//# sourceMappingURL=base-model.js.map