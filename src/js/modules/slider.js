var fetch = require('unfetch');

var d3 = Object.assign(
    {},
    require('d3-array'),
    require('d3-simple-slider'),
    require('d3-selection')
)

var sliderValue = 50000;

module.exports =  {
    init: function() {
        this.bindings();
        this.createSlider();
    },

    bindings: function() {
        $(window).resize(function() {
            this.createSlider();
        }.bind(this));

        $('.uit-slider__button').click(function() {
            this.submitAnswer();
            this.getResults();
        }.bind(this));
    },

    createSlider: function() {
        var width = $('.uit-slider').width();
        var min = 1000;
        var max = 100000;

        $('.uit-slider svg').remove();

        var slider = d3.select('.uit-slider')
            .append('svg')
            .attr('height', 240)
            .attr('width', width)
            .append('g')
            .attr('transform', 'translate(0, 190)');

        // create slider
        slider.call(
            d3.sliderHorizontal()
                .min(min)
                .max(max)
                .width(width)
                .ticks(100)
                .default(sliderValue)
                .on('onchange', function(val) {
                    d3.select('.uit-slider__number--created').text(Math.round(val).toLocaleString());
                    d3.select('.uit-slider__number--cost').text(this.costPerJob(val));
                    d3.select('.parameter-value').attr('val', Math.round(val));
                    sliderValue = Math.round(val);
                }.bind(this))
            );

        // double height of ticks
        slider.selectAll('.axis .tick line')
            .attr('y2', 12);

        // add start and end lines
        slider.append('line')
            .attr('class', 'uit-slider__rules')
            .attr('x1', 1)
            .attr('x2', 1)
            .attr('y1', -10)
            .attr('y2', 10);

        slider.append('line')
            .attr('class', 'uit-slider__rules')
            .attr('x1', width)
            .attr('x2', width)
            .attr('y1', -10)
            .attr('y2', 10);

        // add range text
        slider.append('text')
            .attr('class', 'uit-slider__range uit-slider__range--start')
            .attr('y', 30)
            .attr('x', 0)
            .text(min.toLocaleString() + ' jobs');

        slider.append('text')
            .attr('class', 'uit-slider__range uit-slider__range--end')
            .attr('y', 30)
            .attr('x', width)
            .text(max.toLocaleString());

        // style the actual slider nub
        var nub = slider.select('.parameter-value')
            .attr('val', Math.round(sliderValue));

        nub.select('path')
            .remove();

        nub.select('text')
            .remove();

        nub.append('ellipse')
            .attr('class', 'uit-slider__nub-circle')
            .attr('cx', 0)
            .attr('cy', -100)
            .attr('rx', 80)
            .attr('ry', 80);

        nub.append('polygon')
            .attr('class', 'uit-slider__triangle')
            .attr('points', '-20,-40 20,-40 0,-8')

        // this is appended first because simple-slider looks for the first text element
        nub.append('text')
            .attr('class', 'uit-slider__number uit-slider__number--created')
            .attr('y', -107)
            .text(Math.round(sliderValue).toLocaleString())

        nub.append('text')
            .attr('class', 'uit-slider__label uit-slider__label--created')
            .attr('y', -140)
            .text('Jobs created')

        nub.append('text')
            .attr('class', 'uit-slider__label uit-slider__label--cost')
            .attr('y', -78)
            .text('Cost per job')

        nub.append('text')
            .attr('class', 'uit-slider__number uit-slider__number--cost')
            .attr('y', -45)
            .text(this.costPerJob(sliderValue))
    },

    costPerJob: function(val) {
        var foxconnCost = 4031400000;
        var perJobInThousands = (foxconnCost / val) / 1000;
        var perJob;
        var suffix = 'k'

        if (50 > perJobInThousands) {
            perJob = perJobInThousands.toFixed(1)
        } else if (perJobInThousands > 1000) {
            perJob = (perJobInThousands / 1000).toFixed(1);
            suffix = 'm';
        } else {
            perJob = Math.round(perJobInThousands);
        }

        return '$' + perJob + suffix;
    },

    submitAnswer: function() {
        var answer = parseInt($('.parameter-value').attr('val'));

        fetch('https://interactive.guardianapis.com/projects/tech-bro-slider/', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'applicantion/json'
            },
            body : JSON.stringify(answer)
        });
    },

    getResults: function() {
        return fetch('https://interactive.guim.co.uk/quiz-server/test/tech-bro-slider.json')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            $('.uit-slider__response--answer').text(data.toLocaleString());
        })
    }
};
