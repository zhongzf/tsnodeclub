import * as MarkdownIt from 'markdown-it';
import * as _ from 'lodash';
import * as jsxss from 'xss';
import * as validator from 'validator';
import * as config from '../config';

export class RenderHelper {
    md: MarkdownIt;
    myxss;

    constructor() {
        this.md = new MarkdownIt();
        this.md.set({
            html: true,        // Enable HTML tags in source
            xhtmlOut: false,        // Use '/' to close single tags (<br />)
            breaks: false,        // Convert '\n' in paragraphs into <br>
            linkify: true,        // Autoconvert URL-like text to links
            typographer: true,        // Enable smartypants and other sweet transforms
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
var renderHelper = new RenderHelper();
exports.markdown = renderHelper.markdown;
exports.staticFile = renderHelper.staticFile;
exports.tabName = renderHelper.tabName;
