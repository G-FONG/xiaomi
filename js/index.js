/* header */
    (function () {
        // language=JQuery-CSS
        var $buy = $('#header .h-m-r-buy');
        var $buyA = $buy.find("a.buy");
        var $buyHide = $buy.find(".hide");
        //购物车
        $buyA.hover(function () {
            $buyA.addClass("hover");
            $buyHide.stop().slideDown();
        },function () {
            $buyHide.stop().slideUp(300,function () {
                $buyA.removeClass("hover");
            });
        });
    })();

/* nav-main */
(function () {
    var $product = $("#nav .n-main .product");
    var $hide = $("#nav .nav-hide");
    var $ul = $("#nav .nav-hide .n-h-main ul");
    //导航菜单
    $product.hover(function () {
        $hide.stop().slideDown();
        $ul.eq( $(this).index() ).show().siblings().hide();
    },function () {
        $hide.stop().slideUp();
    });
    //模块本身复加
    $hide.hover(function () {
        $(this).stop().slideDown();
    },function () {
        $(this).stop().slideUp();
    });
})();

/* nav-search */
(function () {
    var $input = $("#nav .n-search .n-s-input input");
    var $search = $("#nav .n-search");
    var $hide = $("#nav .n-search .n-s-input .hide");
    var $tip = $("#nav .n-search .n-s-input .tip");
    //文本框焦点
    $input.on("focus blur" , function () {
        $search.toggleClass("focus");
        $hide.fadeToggle(100);
        $tip.fadeToggle(200);
    });
})();

/* banner main */
(function () {
    var $main = $("#banner .b-main")
    var $pic = $("#banner .b-main .b-m-pic li");
    var $tab = $("#banner .b-main .b-m-tab li");
    var $btn = $("#banner .b-main .b-m-btn .btn");
    var lenght = $pic.length;
    var index = 0;
    var timer,nowTime = 0;
    //默认显示
    $pic.eq(0).show();
    $tab.eq(0).addClass("on");
    //圆点按钮
    $tab.click(function () {
        //防止循环点击和点击本身
        if ( new Date() - nowTime > 800 && index != $(this).index() ){
            nowTime = new Date();
            anim(function () {
                index = $(this).index();
            }.bind(this));
        }
    });
    //左右按钮
    $btn.click(function () {
        //防止循环点击
        if ( new Date() - nowTime > 800){
            var i = $(this).index();
            anim(function () {
                nowTime = new Date();
                if(i){
                    index++;
                    index %= lenght;
                }else{
                    index--;
                    if(index < 0) index = lenght-1;
                }
            });
        }
    });

    //鼠标移入停止自动轮播
    $main.hover(function () {clearInterval(timer);},auto);

    //自动轮播
    auto();
    function auto() {
        timer = setInterval(function () {
            anim(function () {
                index++;
                index %= lenght;
            });
        },3000)
    }
    //封装
    function anim( fn ) {
        $pic.eq(index).fadeOut(800);
        $tab.eq(index).removeClass("on");
        fn();
        $pic.eq(index).fadeIn(800);
        $tab.eq(index).addClass("on");
    }
})();

/* banner nav */
(function () {
    var $firstLi = $("#banner .b-nav .firstLi");
    var $info = $("#banner .b-nav .firstLi .info");
    //遍历info模块
    $info.each(function () {
        var $li = $(this).find("li");
        var length = $li.length;
        var width = $li.width();
        var height = $li.height();
        var col = Math.ceil( length / 6 );
        $(this).width( col * width);
        //遍历info模块li赋值
        $li.each(function (i) {
            var x = Math.floor(i / 6);
            var y = i % 6;
            $(this).css({
                left : x * width + "px",
                top : y * height + "px"
            });
        });
    });
    $firstLi.hover(function () {
        $(this).find(".info").show();
    },function () {
        $(this).find(".info").hide();
    });

})();