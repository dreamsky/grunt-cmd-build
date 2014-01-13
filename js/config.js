seajs.config({
    map: [
         [ /^(.*\.(?:css|js))$/i, '$1?v=1.0' ]
    ],
    alias: {
        'jquery': 'lib/jquery/jquery-1.10.1.min',
        'util': 'lib/util/main',
        'formatdate': 'lib/formatDate/main'
    },
    preload: ["jquery"],
    charset: 'utf-8'
});
