/*
 * 通用代码实现。
 */
(function ($) {
    function refreshImg(id){
        $("#"+id).get(0).src=$("#"+id).get(0).src+"?temp="+Math.random();
    }
    
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
        
    $.extend($, {
        cssPrefix: (function () {                                   //用户获取当前浏览器CSS3支持的前缀，如：$.cssPrefix.animationPrefix。
            var domStyle = document.createElement("div").style,
                animPrefix = ['a', "webkitA", "mozA", "OA", "msA"],
                tranPrefix = ['t', "webkitT", "mozT", "OT", "msT"],
                prefix = {};

            for (var i = 0; i < animPrefix.length; i++) {
                if (animPrefix[i] + "nimation" in domStyle) {
                    prefix.animationPrefix = animPrefix[i].substr(1);

                    break;
                }
            }

            for (var i = 0; i < tranPrefix.length; i++) {
                if (tranPrefix[i] + "ransition" in domStyle) {
                    prefix.transitionPrefix = tranPrefix[i].substr(1);

                    break;
                }
            }

            for (var i = 0; i < tranPrefix.length; i++) {
                if (tranPrefix[i] + "ransform" in domStyle) {
                    prefix.transformPrefix = tranPrefix[i].substr(1);

                    break;
                }
            }

            return prefix;
        })(),
        query: function () {                                        //实现jQuery能一次查询多个对象，如：$("body", "div")
            if (arguments.length) {
                var result = $(arguments[0]);

                for (var i = 1; i < arguments.length; i++) {
                    $.merge(result, $(arguments[i]));
                }

                return result;
            }

            return $();
        },
        zerofill: function (number, len) {                                     //对数字进行补零操作，如：$.zerofill(1, 4)返回"0001"
            len = len || 2;

            number = parseInt(number).toString();

            if (number.length < len) {
                for (var i = number.length; i < len; i++) {
                    number = "0" + number;
                }
            }

            return number;
        },
        limitNumber: function (tag, max, min) {
            min = min || 1;

            var val = tag.value,
                oldVal = $(tag).attr("data-old") || "";

            if (!val)
                return;

            if (!/^\d+$/.test(val)) {
                tag.value = oldVal;
            } else {
                val = parseInt(val);

                if (val > max)
                    val = max;
                else if (val < min)
                    val = min;

                $(tag).attr("data-old", val);

                tag.value = val;
            }
        },
        checkForm: function (containerID, promptFunction) {
            promptFunction = promptFunction || $.alert;

            var result = {};

            $("#" + containerID).find("*[data-regex]").not("*[readonly]").each(function () {
                var tag = $(this),
                    regexsStr = tag.attr("data-regex"),
                    allowEmpty = tag.attr("data-empty") == "true",
                    isTrim = tag.attr("data-trim"),
                    val = tag.val();

                isTrim = isTrim == null || isTrim == undefined ? true : isTrim !== "false";

                if (isTrim)
                    val = $.trim(val);

                if (regexsStr && (!allowEmpty || val)) {
                    var regexs = eval("(" + tag.attr("data-regex") + ")"),
                        prompts = eval("(" + tag.attr("data-prompt") + ")");

                    if (regexs && prompts && prompts.length === regexs.length) {
                        var isPrompt = false;

                        for (var i = 0; i < regexs.length; i++) {
                            if ($.type(regexs[i]) === "string")
                                isPrompt = $("#" + regexs[i]).val() != val;
                            else
                                isPrompt = !regexs[i].test(val);

                            if (isPrompt) {
                                promptFunction(prompts[i], function () {
                                    tag.focus();
                                });

                                result = null;

                                return false;
                            } else if (this.tagName !== "INPUT" || this.type !== "radio" || this.checked) {
                                result[tag.attr("name")] = val;
                            }
                        }
                    }
                } else if (this.tagName !== "INPUT" || this.type !== "radio" || this.checked) {
                    result[tag.attr("name")] = val;
                }
            });

            return result;
        },
        getProductResult: function (startNumber, stopNumber) {
            var result = stopNumber;

            while (stopNumber > startNumber) {
                result = result * (--stopNumber);
            }

            return result;
        },
        getRandomNumber: function (len, maxNumber, allowRepeat, minNumber) {
            if ($.type(allowRepeat) == "number") {
                var temp = minNumber;
                minNumber = allowRepeat;
                allowRepeat = temp;
            }

            allowRepeat = allowRepeat === undefined ? true : allowRepeat;
            minNumber = minNumber === undefined ? 0 : minNumber;

            if (minNumber > maxNumber) {
                var temp = minNumber;
                minNumber = maxNumber;
                maxNumber = temp;
            }

            var result = [];

            for (var i = 0; i < len; i++) {
                var rdVal = parseInt(Math.random() * (maxNumber - minNumber) + minNumber);

                if (!allowRepeat && result.indexOf(rdVal) > -1)
                    i--;
                else
                    result.push(rdVal);
            }

            return result.sort(function (item1, item2) {
                return parseInt(item2) < parseInt(item1);
            });
        },
        getSameCount: function (number1, number2, number3) {
            if (number1 == number2 && number1 == number3)
                return 3;

            if (number1 == number2 || number1 == number3 || number2 == number3)
                return 2;

            return 1;
        },
        moneyFormat: function (num, decimalLength) {
            var isNegative = num < 0;

            decimalLength = decimalLength === undefined ? 3 : decimalLength;

            num = Math.abs(num).toString().split('.');

            for (var i = num[0].length - 3; i > 0; i -= 3) {
                num[0] = num[0].substr(0, i) + "," + num[0].substr(i);
            }

            if (decimalLength == 0 && num.length > 1)
                num.pop();

            if (decimalLength > 0) {
                if (num.length == 1)
                    num.push("0");

                if (num[1].length < decimalLength) {
                    for (var i = num[1].length; i < decimalLength; i++) {
                        num[1] += "0";
                    }
                } else if (num[1].length > decimalLength) {
                    num[1] = num[1].substr(0, decimalLength);
                }
            }

            return (isNegative ? "-" : "") + num.join(".");
        }
    });

    $.extend($.fn, {
        animationEnd: function (callback, isUnbind) {
            if (!$.isFunction(callback))
                return this;

            isUnbind = arguments.length === 1 ? true : isUnbind;

            if (isUnbind) {
                var temp = callback;

                callback = function (e) {
                    $(this).unAnimationEnd(callback);

                    temp.call(this, e);
                };
            }

            return this.bind(!$.cssPrefix.animationPrefix ? "animationend" : $.cssPrefix.animationPrefix + "AnimationEnd", callback);
        },
        unAnimationEnd: function (callback) {
            if (!$.isFunction(callback))
                return this;

            return this.unbind(!$.cssPrefix.animationPrefix ? "animationend" : $.cssPrefix.animationPrefix + "AnimationEnd", callback);
        },
        transitionEnd: function (callback, isUnbind) {
            if (!$.isFunction(callback))
                return this;

            isUnbind = arguments.length === 1 ? true : isUnbind;

            if (isUnbind) {
                var temp = callback;

                callback = function (e) {
                    $(this).unTransitionEnd(callback);

                    temp.call(this, e);
                };
            }

            return this.bind(!$.cssPrefix.transitionPrefix ? "transitionend" : $.cssPrefix.transitionPrefix + "TransitionEnd", callback);
        },
        unTransitionEnd: function (callback) {
            if (!$.isFunction(callback))
                return this;

            return this.unbind(!$.cssPrefix.transitionPrefix ? "transitionend" : $.cssPrefix.transitionPrefix + "TransitionEnd", callback);
        },
        css3: function (name, value) {
            if (arguments.length === 1) {
                if ($.cssPrefix.animationPrefix && name.indexOf("animation") === 0)
                    return this.css($.cssPrefix.animationPrefix + name.replace("animation", $.cssPrefix.animationPrefix + "Animation"));
                else if ($.cssPrefix.transitionPrefix && name.indexOf("transition") === 0)
                    return this.css($.cssPrefix.transitionPrefix + name.replace("transition", $.cssPrefix.transitionPrefix + "Transition"));
                else if ($.cssPrefix.transformPrefix && name.indexOf("transform") === 0)
                    return this.css($.cssPrefix.transformPrefix + name.replace("transform", $.cssPrefix.transformPrefix + "Transform"));

                return this.css(name);
            } else {
                if ($.type(name) !== "string") {
                    for (var key in name) {
                        this.css3(key, name[key]);
                    }
                } else {
                    if ($.cssPrefix.animationPrefix && name.indexOf("animation") === 0)
                        return this.css($.cssPrefix.animationPrefix + name.replace("animation", $.cssPrefix.animationPrefix + "Animation"), value);
                    else if ($.cssPrefix.transitionPrefix && name.indexOf("transition") === 0)
                        return this.css($.cssPrefix.transitionPrefix + name.replace("transition", $.cssPrefix.transitionPrefix + "Transition"), value);
                    else if ($.cssPrefix.transformPrefix && name.indexOf("transform") === 0)
                        return this.css($.cssPrefix.transformPrefix + name.replace("transform", $.cssPrefix.transformPrefix + "Transform"), value);
                    else
                        return this.css(name, value);
                }
            }
        }
    });

    //隐藏右键菜单
    $("html,body").contextmenu(function (e) {
        e.preventDefault();
    }).mousedown(function (e) {
        if (e.which == 3)
            e.preventDefault();
    }).mouseup(function (e) {
        if (e.which == 3)
            e.preventDefault();
    });
})(jQuery);