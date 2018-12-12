(function(){
    // inspired by https://codepen.io/AlexTaietti/pen/JXmpKz

    var firstGauge = document.querySelector('.gauge-container .progress');
    var firstTarget = parseInt(firstGauge.getAttribute('data-target'));
    var firstGaugeReadout = document.querySelector('.gauge-container .percentage > .value');

    var gaugeR = parseInt(document.querySelectorAll('circle')[0].getAttribute('r'));
    var gaugeC = gaugeR * Math.PI * 2;
    var animationDuration = 1.5;

    var circles = document.querySelectorAll('circle');
    var gauges = document.querySelectorAll('.progress');
    TweenMax.set(circles, {
    strokeDashoffset: gaugeC
    });

    TweenMax.set(gauges, {
    attr: {
    'stroke-dasharray': gaugeC + ' ' + gaugeC
    }
    });

    function calculateOffset(t, c) {
    return c - (c * t) / 100;
    }

    new TimelineMax().to(firstGauge, animationDuration, {
    strokeDashoffset: calculateOffset(firstTarget, gaugeC),
    ease: Bounce.easeOut,
    onUpdate: function() {
    var currentStrokeOffset = parseInt(firstGauge.style.strokeDashoffset);
    firstGaugeReadout.textContent = Math.round(100 - (currentStrokeOffset * 100) / gaugeC);
    }
    });
})();