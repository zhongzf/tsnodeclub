import {Tools} from '../common/tools';
var tools = new Tools();

module.exports = function (schema) {
  schema.methods.create_at_ago = function () {
    return tools.formatDate(this.create_at, true);
  };

  schema.methods.update_at_ago = function () {
    return tools.formatDate(this.update_at, true);
  };
};
