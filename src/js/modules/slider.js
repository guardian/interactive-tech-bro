var d3 = Object.assign(
    {},
    require('d3-array'),
    require('d3-simple-slider'),
    require('d3-selection')
)

module.exports =  {
    init: function() {
       this.createSlider();
    },

    createSlider: function() {
        var slider = d3.select('.uit-slider')
            .append('svg')
            .attr('height', 200)
            .attr('width', 500)
            .append('g')
            .attr('transform', 'translate(30, 30)');

        slider.call(
            d3.sliderHorizontal()
                .min(1000)
                .max(100000)
                .width(300)
                .ticks(0)
                .displayValue(true)
                .on('onchange', function(val) {
                    
                })
            );
    }
};
