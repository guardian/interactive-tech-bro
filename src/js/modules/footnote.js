module.exports =  {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        $('.uit-header__asterisk').hover(function() {
            $(this).addClass('is-hover');
        }, function() {
            $(this).removeClass('is-hover');
        })

        $('.uit-header__asterisk').click(function(e) {
            this.showOnClick(e.currentTarget);
        }.bind(this));
    },

    showOnClick: function(el) {
        $(el).addClass('is-hover');

        setTimeout(function() {
            $(el).removeClass('is-hover');
        }, 10000);
    }
};
