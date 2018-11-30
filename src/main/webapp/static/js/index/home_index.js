/*
 * 首页Banner滚动轮播实现。
 */
(function () {
    var container = $("#ulImageBanner"), indicators = container.next().children(),
        currentIndex = 0, maxIndex = indicators.length - 1, timeoutID = -1,
        intervalTime = 3000, winWidth = $(window).width();

    if (maxIndex < 0)
        return;

    indicators.click(function () {
        clearTimeout(timeoutID);

        gotoIndex(parseInt($(this).text()) - 1);

        startAutoRun(intervalTime + 500);
    })

    function gotoIndex(i) {
        if (i < 0)
            i = maxIndex;
        else if (i > maxIndex)
            i = 0;

        currentIndex = i;

        if (!$.browser.msie || parseFloat($.browser.version) > 10) {
            container.css3("transform", "translate3d(" + currentIndex * -winWidth + "px,0,0)");
        } else {
            container.stop().animate({
                left: currentIndex * -winWidth + "px"
            });
        }

        indicators.removeClass("active").eq(currentIndex).addClass("active");
    }

    function startAutoRun(time) {
        timeoutID = setTimeout(function () {
            gotoIndex(currentIndex + 1);

            startAutoRun();
        }, time || intervalTime);
    }

    startAutoRun();
})();

/*
 * 首页的TabBox实现。
 */
$("#divResultBox").tabBox();

/*
 * 首页快速购彩代码实现。
 */
(function () {
    $("#divQuickBuyings").children().each(function () {
        $(this).find(".group-head li").mouseover(handler).click(handler);
    });

    function handler() {
        $(this).addClass("active").siblings().removeClass("active");

        $(this).parent().parent().next().children().eq($(this).index()).show().siblings().hide();
    }
})();

/*
 * 合买TabBox代码实现。
 */
(function () {
    $("#divChippedTabBox").tabBox(function () {
        $("#divChippedTabBox").children().eq(1).load("/Buying/ChippedList/" + this.attr("data-type"));
    });
})();

/*
 * 最新中奖滚动代码。
 */
(function () {
    var winningUserDom = $("#divWinningUsers"),
        listDom = winningUserDom.children("ul"),
        listHeight = listDom.height(),
        containerHeight = winningUserDom.height(),
        direction = false;

    if (listHeight + 35 > containerHeight) {
        setInterval(function () {
            listDom.animate({
                marginTop: (direction ? "+=" : "-=") + (listHeight + 35 - containerHeight) + "px"
            });

            direction = !direction;
        }, 7000);
    }
})();