define(function(require, exports, module) {

    require('util');
    require('formatdate');

    $('.name').contentChange(function(v) {
        $('.info').html(v);
        $('.time').html($.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    });

});