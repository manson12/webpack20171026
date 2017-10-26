// var $=require('./jquery.min.js')
var Carousel2=require('./carousel.js')
var goTop=require('./top.js')
var waterFall=require('./waterfall.js')


new goTop()
Carousel2.init($('.banner')) 
new waterFall() 