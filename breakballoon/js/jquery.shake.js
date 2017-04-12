jQuery.fn.shake = function(times, offset, delay) { //次数,偏移,间隔
    this.stop(true, true).each(function() {
        var Obj = $(this);
        var marginLeft = parseInt(Obj.attr("data-left")); 
        delay = delay > 20 ? delay : 20;
        Obj.stop(true, true).animate({ 'left': marginLeft + offset }, delay, function() {
            Obj.stop(true, true).animate({ 'left': marginLeft }, delay, function() {
                times = times - 1;
                if (times > 0) {
                    Obj.shake(times, offset, delay);
                }
            });
        });
    });
};
