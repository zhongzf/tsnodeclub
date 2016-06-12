"use strict";
const config = require('../config');
class Auth {
    constructor() {
        this.blockUser = function () {
            return function (req, res, next) {
                if (req.path === '/signout') {
                    return next();
                }
                if (req.session.user && req.session.user.is_block && req.method !== 'GET') {
                    return res.status(403).send('您已被管理员屏蔽了。');
                }
                next();
            };
        };
    }
    adminRequired(req, res, next) {
        if (!req.session.user) {
            return res.render('notify/notify', { error: '你还没有登录。' });
        }
        if (!req.session.user.is_admin) {
            return res.render('notify/notify', { error: '需要管理员权限。' });
        }
        next();
    }
    /**
     * 需要登录
     */
    userRequired(req, res, next) {
        if (!req.session || !req.session.user || !req.session.user._id) {
            return res.status(403).send('forbidden!');
        }
        next();
    }
    gen_session(user, res) {
        var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
        var opts = {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            signed: true,
            httpOnly: true
        };
        res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
    }
    authUser(req, res, next) {
        // Ensure current_user always has defined.
        res.locals.current_user = null;
        return next();
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map