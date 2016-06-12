var path = require('path');
var config = {
    // debug 为 true 时，用于本地调试
    debug: true,
    get mini_assets() { return !this.debug; },
    name: 'TSNodeclub',
    description: 'Typescript NodeJS BBS',
    keywords: 'nodejs, node, express, connect, socket.io',
    // 添加到 html head 中的信息
    site_headers: [],
    site_logo: '/public/images/cnodejs_light.svg',
    site_icon: '/public/images/cnode_icon_32.png',
    // 右上角的导航区
    site_navs: [
        // 格式 [ path, title, [target=''] ]
        ['/about', '关于']
    ],
    // cdn host，如 http://cnodejs.qiniudn.com
    site_static_host: '',
    // 社区的域名
    host: 'localhost',
    // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
    google_tracker_id: '',
    // 默认的cnzz tracker ID，自有站点请修改
    cnzz_tracker_id: '',
    // mongodb 配置
    db: 'mongodb://127.0.0.1/node_club_dev',
    session_secret: 'ts_node_club_secret',
    auth_cookie_name: 'ts_node_club',
    // 程序运行的端口
    port: 3001,
    // 话题列表显示的话题数量
    list_topic_count: 20,
    // admin 可删除话题，编辑标签。把 user_login_name 换成你的登录名
    admins: { user_login_name: true },
    // 文件上传配置
    // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    },
    file_limit: '1MB',
    // 版块
    tabs: [
        ['all', 'All'],
        ['share', '分享'],
        ['ask', '问答'],
        ['job', '招聘'],
    ],
    create_post_per_day: 1000,
    create_reply_per_day: 1000,
    visit_per_day: 1000,
};
module.exports = config;
//# sourceMappingURL=config.js.map