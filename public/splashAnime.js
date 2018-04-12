var logoEl = document.querySelector('.logo-animation');
var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
var innerWidth = window.innerWidth;
var maxWidth = 740;
var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
var logoTimeline = anime.timeline({
  direction: 'alternate',
  loop: true
  // duration: 800,
  // easing: 'easeOutExpo'

});

// logoEl.style.transform = 'translateY(50px) scale('+logoScale+')';

// for (var i = 0; i < pathEls.length; i++) {
//   var el = pathEls[i];
//   // el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
// }

logoTimeline
  .add({
  targets: ['#TopB', '#TopA'],
  translateY: [300, 0],

  opacity: { value: [0, 1], duration: 1500, easing: 'linear' },

  delay: function(el, i, t) { return 1500  + ( i * 40 ); },
  offset: 0
})
.add({
targets: ['#BackA ', '#BackB'],
translateY: [100, 0],

opacity: { value: [0, 1], duration: 300, easing: 'linear' },
 elasticity: 300,
delay: function(el, i, t) { return 1000 + ( i * 20 ); },
offset: 0,
logoTimeline
});


// <script type="text/javascript">
// function load()
// {
// window.location.href = "http://167.99.105.82:6969/";
//
// }
// </script>
