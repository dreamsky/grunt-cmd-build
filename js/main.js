define(function(require, exports, module) {

    // 分发器
    var $dispatcher = $("#dispatcher");

    // 适配器
    var adapter = function(module, debug) {
        var debugMode = false;
        var prefix = $('#seajsFile').attr('src');
        prefix = prefix.split('js/');
        prefix = prefix[0] || './';
        if (debug) {
            debugMode = true;
        } else {
            var params = top.location.search.substr(1).split('&');
            if (params && params[params.length - 1] === "debug")
                debugMode = true;
        }
        var dir = debugMode ? 'js/pages/' : 'js/pages-pub/';
        seajs.use(prefix + dir + module);
    };

    // 调用模块
    adapter($dispatcher.val());
});