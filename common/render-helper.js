"use strict";
const MarkdownIt = require('markdown-it');
const _ = require('lodash');
const jsxss = require('xss');
const validator = require('validator');
const config = require('../config');
class RenderHelper {
    constructor() {
        this.md = new MarkdownIt();
        this.md.set({
            html: true,
            xhtmlOut: false,
            breaks: false,
            linkify: true,
            typographer: true,
        });
        this.md.renderer.rules.code_block = function (tokens, idx /*, options*/) {
            var token = tokens[idx];
            return '<pre class="prettyprint">'
                + '<code>' + validator.escape(token.content) + '</code>'
                + '</pre>';
        };
        this.myxss = new jsxss.FilterXSS({
            onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
                // 让 prettyprint 可以工作
                if (tag === 'pre' && name === 'class') {
                    return name + '="' + jsxss.escapeAttrValue(value) + '"';
                }
            }
        });
    }
    markdown(text) {
        return '<div class="markdown-text">' + this.myxss.process(this.md.render(text || '')) + '</div>';
    }
    staticFile(filePath) {
        if (filePath.indexOf('http') === 0 || filePath.indexOf('//') === 0) {
            return filePath;
        }
        return config.site_static_host + filePath;
    }
    tabName(tab) {
        var pair = _.find(config.tabs, function (pair) {
            return pair[0] === tab;
        });
        if (pair) {
            return pair[1];
        }
    }
}
exports.RenderHelper = RenderHelper;
var renderHelper = new RenderHelper();
exports.markdown = renderHelper.markdown;
exports.staticFile = renderHelper.staticFile;
exports.tabName = renderHelper.tabName;
//# sourceMappingURL=render-helper.js.map