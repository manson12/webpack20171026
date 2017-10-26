/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// var $=require('./jquery.min.js')
var Carousel2=__webpack_require__(1)
var goTop=__webpack_require__(2)
var waterFall=__webpack_require__(3)



Carousel2.init($('.banner')) 
new waterFall() 

/***/ }),
/* 1 */
/***/ (function(module, exports) {


Carousel2 = (function () {
    function Carousel(ct) {
        this.ct = ct
        this.init()
        this.bind()
        this.animation()


    }

    Carousel.prototype.init = function () {
        var banImg = this.banImg = this.ct.find('.banner-img')
        var allLi = this.allLi = this.ct.find('.banner-img li');
        var banWidth = this.banWidth = this.ct.find('.banner-img').width();
        var liWidth = this.liWidth = this.ct.find('.banner-img li').width();
        var liLength = this.liLength = this.ct.find('.banner-img li').length;
        var next = this.next = this.ct.find('.next')
        var prev = this.prev = this.ct.find('.prev')
        var bullet = this.bullet = this.ct.find('.bullet li')

        this.pageIndex = 0
        this.isAnimate = false
        banImg.append($('.banner-img li').first().clone())
        banImg.prepend(allLi.last().clone())
    }


    Carousel.prototype.bind = function () {
        var _this = this

        _this.next.click(function () {

            _this.left(1)                 //改造成构造函数以后，这里就应该改为this.left  而不是left,但这里的this并不是carousel的this，而是按钮的this，所以应该在外层声明_this=this

        })
        this.prev.click(function () {

            _this.right(1)

        })

        this.bullet.click(function () {

            var index = $(this).index()

            if (index > _this.pageIndex) {
                console.log(_this.pageIndex)
                _this.left(index - _this.pageIndex)
            } else if (index < _this.pageIndex) {

                _this.right(_this.pageIndex - index)
                console.log(_this.pageIndex)
            }

        })
    }

    Carousel.prototype.left = function (len) {

        var _this = this
        if (this.isAnimate) return;   //防止重复点击
        this.iisAnimate = true

        this.banImg.animate({
            left: '-=' + len * _this.liWidth,
        }, function () {

            _this.pageIndex += len
            if (_this.pageIndex === _this.liLength) {
                _this.pageIndex = 0
                _this.banImg.css('left', -(_this.liWidth))

            }
            _this.isAnimate = false
            _this.setBullet()



        })
    }
    Carousel.prototype.right = function (len) {

        var _this = this
        if (this.isAnimate) return;
        this.isAnimate = true
        this.banImg.animate({

            left: '+=' + len * _this.liWidth,

        }, function () {
            _this.pageIndex -= len
            if (_this.pageIndex < 0) {

                _this.pageIndex = _this.liLength - 1
                _this.banImg.css('left', -(_this.liLength * _this.liWidth))

            }
            _this.isAnimate = false
            _this.setBullet()

        })

    }

    Carousel.prototype.setBullet = function () {

        var _this = this
        this.bullet.removeClass('active').eq(this.pageIndex).addClass('active')

    }


    Carousel.prototype.animation = function () {
        var _this = this
        _this.time = setInterval(function () { _this.left(1) }, 4000)
        //设置定时器
        this.ct.hover(function () {
            clearInterval(_this.time);
        }, function () {
            _this.time = setInterval(function () { _this.left(1) }, 4000)   //鼠标移动到banner上，停止动画，移开后，又继续动画 
        })
    }

    return {                                       //封装后，暴露一个出口
        init: function ($ct) {
            $ct.each(function (index, node) {
                new Carousel($(node))

                
            })
        }
         
       
    }
})()

module.exports=Carousel2
         //通过 Carousel2.init()来启动效果


/***/ }),
/* 2 */
/***/ (function(module, exports) {




function GoTop(){

    this.init()
    this.click()
    this.stop()

}

GoTop.prototype.init=function(){
    this.obtn=document.getElementById('btn');
    //获取页面可视区域高度
    this.clientHeight=document.documentElement.clientHeight;
    this.timer=null;
    this.istop=true;

    // this.ostop=document.documentElement.scrollTop || document.body.scrollTop;
    

}

GoTop.prototype.stop=function(){
    var _this=this;
    //滚动中执行
    
    window.onscroll=function(){
        
        if(_this.ostop>=_this.clientHeight){          
            _this.obtn.style.display='block';
           
        }
        // }else{
        //    console.log('消失')
        //     _this.obtn.style.display='none';
        // }
        if(!_this.istop){
            clearInterval(_this.timer)
        }	
        _this.istop=false;
        
       }  
    

}

GoTop.prototype.click=function(){
    var _this=this
    this.obtn.onclick=function(){
        //设置定时器
        
     _this.timer=setInterval(function(){
        var ostop=document.documentElement.scrollTop || document.body.scrollTop;
          //获取滚动条距离顶部高度       
            _this.ispeed=Math.floor(-ostop/5)
              document.documentElement.scrollTop=document.body.scrollTop=ostop+_this.ispeed;
              
              _this.istop=true;
          if(ostop==0){
              clearInterval(_this.timer);
          }
      },30)
                   
  }
}
var GoTop=new GoTop()

module.exports=GoTop



    
   	



/***/ }),
/* 3 */
/***/ (function(module, exports) {

// 1.获取数据   2.把数据变为Dom，拼接HTML  3.通过瀑布流方式放到页面   4.当滚动到底部时加载。\




    function WaterFall() {
        this.init()
        this.start()
       this.moreClick()
        
        
        
    }

    WaterFall.prototype = {

        init: function () {
            this.page = 1;
            this.pageCount = 10;
            this.arrHeight = []
            this.colCount = Math.floor($('.pic-wall').width() / $('.item').outerWidth(true))
            this.nodeWidth = $('.item').outerWidth(true)
            for (var i = 0; i < this.colCount; i++) {
                this.arrHeight[i] = 0
            }
        },
        
        //瀑布流            
        waterfall:function(node) {
            
            var _this=this

        var idx = 0;
        var minHeight = _this.arrHeight[0];
        for (var i = 0; i < _this.arrHeight.length; i++) {  
               
            if (_this.arrHeight[i] <minHeight) {
                
                idx = i;
                minHeight = _this.arrHeight[i];

            }
        }
       
        node.css({
            top: minHeight,
            left:_this.nodeWidth * idx,
            opacity: 1
        })
        _this.arrHeight[idx] = node.outerHeight(true) + _this.arrHeight[idx]
        $('.pic-wall').height(Math.max.apply(null, _this.arrHeight))

    },
    
    //ajax获取数据
     getData:function(callBack) {
        
         var _this=this
        
            $.ajax({
                url: 'https://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',     //预期服务器返回的数据类型    
                jsonp: 'jsoncallback',  //在一个jsonp请求中重写回调函数的名字
                data: {                     //发送到服务器的数据。将自动转换为请求字符串格式
                    app_key: '1271687855',
                    num: _this.pageCount,
                    page: _this.page
                }
                
    
            }).done(function (ret) {
                
                if (ret && ret.status && ret.status.code === "0") {
                   
                   callBack(ret.data)     //如果数据没有问题，生成节点摆好位置
                   
                    _this.page++
                 
                } else {
                    console.log('get error data')
                }
    
            })
            
        },

    //添加
     start:function(){
         var _this=this
        this.getData(function (newsList) {

            $.each(newsList, function (index, news) {
                var node =_this.getNode(news)
                node.find('img').load(function () {   //每当图片加载时，就把拼接好的HTML添加到ul里面
                    $('.pic-wall').append(node)
                    _this.waterfall(node)


                })

            })
        })
        

    },
        //拼接HTML
        getNode:function (item) {
            var html = ''
            html += '<li class="item">';
            html += ' <a href="' + item.url + '" class="link"><img src="' + item.img_url + '" alt=""></a>'
            html += '<h4 class="title">' + item.short_name + '</h4>'
            html += '<p class="text">' + item.short_intro + '</p>'
            html += '</li>'
            return $(html)
    
        },
        moreClick:function(){
            var _this=this
            $('#load a').click(function () {
                _this.start()
            })
        }
        
    }

    // return new WaterFall()

    module.exports =WaterFall


/***/ })
/******/ ]);