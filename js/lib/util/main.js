define(function(require, exports, module) {

    $.fn.extend({
        /* detect the change of input element */
        contentChange: function(callback) {
            var me = $(this);
            if (!me.length)
                return this;
            // solve the ie9 bug: input and propertychange not trigger while press backspace, delete key.
            (checkIE9 = document.createElement("b")).innerHTML = "<!--[if IE 9]><i></i><![endif]-->";
            var isIE9 = checkIE9.getElementsByTagName("i").length == 1;
            if (isIE9) {
                // ie9 use keyup event instead
                me.on("keyup", function(event) {
                    if (callback)
                        callback.call(this, $.trim($(this).val()));
                });
            } else {
                me.on("input propertychange", function(event) {
                    var ev = event.originalEvent;
                    var isIE = '\v' == 'v';
                    /* IE <= 8 */
                    if (isIE && (ev.propertyName && ev.propertyName.toLowerCase() !== "value"))
                        return;
                    if (callback)
                        callback.call(this, $.trim($(this).val()));
                });
            }
            return this;
        }
    });

});