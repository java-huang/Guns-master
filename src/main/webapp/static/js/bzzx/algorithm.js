(function ($, tools) {
    $.extend(tools, {
        getSelectedCount: function (selectedBalls) {
            if (!selectedBalls)
                return 0;

            var groups,
                selectedCount = 0;

            switch (tools.baseLotteryType) {
                case "Ssc":
                    switch (tools.bettingType) {
                        case "wx_zx":
                        case "wx_tx":
                        case "hs_sxzx":
                        case "zs_sxzx":
                        case "qs_sxzx":
                        case "ex_zx":
                        case "yx_bz":
                            var groupCount = 5,
                                groups = selectedBalls.split("|");

                            selectedCount = 1;

                            switch (tools.bettingType) {
                                case "hs_sxzx":
                                case "zs_sxzx":
                                case "qs_sxzx":
                                    groupCount = 3;
                                    break;
                                case "ex_zx":
                                    groupCount = 2;
                                    break;
                                case "yx_bz":
                                    groupCount = 1;
                                    break;
                            }

                            if (groups.length != groupCount)
                                return 0;

                            for (var i = 0; i < groupCount; i++) {
                                var balls = groups[i].split(",");

                                if (!balls.length || !balls[0])
                                    return 0;

                                selectedCount *= balls.length;
                            }
                            break;
                        case "hs_sxbd":
                        case "zs_sxbd":
                        case "qs_sxbd":
                            groups = selectedBalls.split(",");

                            if (!groups.length || !groups[0])
                                return 0;

                            selectedCount = groups.length;
                            break;
                        case "hs_sxhz":
                        case "zs_sxhz":
                        case "qs_sxhz":
                            groups = selectedBalls.split(',');

                            if (!groups.length || !groups[0])
                                return 0;

                            for (var i = 0; i < groups.length; i++) {
                                if (!/^\d{1,2}$/.test(groups[i]))
                                    return 0;

                                var ball = parseInt(groups[i]);

                                if (ball > 27 || ball < 0)
                                    return 0;

                                if (ball < 10)
                                    selectedCount += (ball + 1) * (ball + 2) / 2;
                                else if (ball < 20)
                                    selectedCount += 3 + (ball - 5) * (22 - ball);
                                else
                                    selectedCount += (28 - ball) * (29 - ball) / 2;
                            }
                            break;
                        case "hs_zsbh":
                        case "zs_zsbh":
                        case "qs_zsbh":
                            groups = selectedBalls.split(',');

                            if (groups.length < 2 || !groups[0] || !groups[1])
                                return 0;

                            selectedCount = groups.length * (groups.length - 1);
                            break;
                        case "hs_zlbh":
                        case "zs_zlbh":
                        case "qs_zlbh":
                            groups = selectedBalls.split(',');

                            if (groups.length < 3 || !groups[0] || !groups[1] || !groups[2])
                                return 0;

                            selectedCount = $.getProductResult(groups.length - 2, groups.length) / 6;
                            break;
                        case "ex_zux":
                            groups = selectedBalls.split(',');

                            if (groups.length < 2 || !groups[0] || !groups[1])
                                return 0;

                            selectedCount = groups.length * (groups.length - 1) / 2;
                            break;
                        case "hs_zszx":
                        case "zs_zszx":
                        case "qs_zszx":
                            groups = selectedBalls.split('|');

                            if (groups.length != 2 || !groups[0] || !groups[1])
                                return 0;

                            var doubleSelectedBalls = groups[0].split(','),
                                signleSelectedBalls = groups[1].split(',');

                            if (doubleSelectedBalls.length > 1 || signleSelectedBalls.length > 1 || doubleSelectedBalls[0][0] != signleSelectedBalls[0]) {
                                for (var i = 0; i < doubleSelectedBalls.length; i++) {
                                    for (var j = 0; j < signleSelectedBalls.length; j++) {
                                        if (doubleSelectedBalls[i][0] != signleSelectedBalls[j])
                                            selectedCount++;
                                    }
                                }
                            }
                            break;
                        case "ex_hz":
                            groups = selectedBalls.split(',');

                            for (var i = 0; i < groups.length; i++) {
                                if (!/^\d{1,2}$/.test(groups[i]))
                                    return 0;

                                var ball = parseInt(groups[i]);

                                if (ball > 18 || ball < 0)
                                    return 0;

                                if (ball < 10)
                                    selectedCount += ball + 1;
                                else
                                    selectedCount += 19 - ball;
                            }
                            break;
                        case "dxds_bz":
                            groups = selectedBalls.split('|');

                            if (groups.length == 2 && groups[0] && groups[1])
                                selectedCount = groups[0].split(',').length * groups[1].split(',').length;
                            break;
                        case "hs_zsdt":
                        case "zs_zsdt":
                        case "qs_zsdt":
                            groups = selectedBalls.split('#');

                            if (groups.length != 2 || !groups[0] || !groups[1])
                                return 0;

                            selectedCount = groups[1].split(',').length * 2;
                            break;
                        case "hs_zldt":
                        case "zs_zldt":
                        case "qs_zldt":
                            groups = selectedBalls.split('#');

                            if (groups.length != 2 || !groups[0] || !groups[1])
                                return 0;

                            var mainSelectedBalls = groups[0].split(','),
                                otherSelectedBalls = groups[1].split(',');

                            if (mainSelectedBalls.length > 1 || otherSelectedBalls.length > 1) {
                                if (mainSelectedBalls.length > 1)
                                    selectedCount = otherSelectedBalls.length;
                                else
                                    selectedCount = (otherSelectedBalls.length - 1) * otherSelectedBalls.length / 2;
                            }
                            break;
                    }
                    break;
                case "Pls":
                    switch (tools.bettingType) {
                        case "zx_bz":
                            groups = selectedBalls.split('|');

                            if (groups.length != 3)
                                return 0;

                            selectedCount = 1;

                            for (var i = 0; i < groups.length; i++) {
                                var balls = groups[i].split(",");

                                if (!balls[0])
                                    return 0;

                                selectedCount *= groups[i].split(',').length;
                            }
                            break;
                        case "zx_hz":
                            groups = selectedBalls.split(',');

                            for (var i = 0; i < groups.length; i++) {
                                if (groups[i]) {
                                    var selectedBall = parseInt(groups[i]);

                                    if (selectedBall < 10)
                                        selectedCount += (selectedBall + 1) * (selectedBall + 2) / 2;
                                    else if (selectedBall < 20)
                                        selectedCount += 3 + (selectedBall - 5) * (22 - selectedBall);
                                    else
                                        selectedCount += (28 - selectedBall) * (29 - selectedBall) / 2;
                                }
                            }
                            break;
                        case "zs_zx":
                            groups = selectedBalls.split('|');

                            if (groups.length != 2 || !groups[0] || !groups[1])
                                return 0;

                            var doubleSelectedBalls = groups[0].split(','),
                                signleSelectedBalls = groups[1].split(',');

                            if (doubleSelectedBalls.length > 1 || signleSelectedBalls.length > 1 || doubleSelectedBalls[0][0] != signleSelectedBalls[0]) {
                                for (var i = 0; i < doubleSelectedBalls.length; i++) {
                                    for (var j = 0; j < signleSelectedBalls.length; j++) {
                                        if (doubleSelectedBalls[i][0] != signleSelectedBalls[j])
                                            selectedCount++;
                                    }
                                }
                            }
                            break;
                        case "zs_bh":
                            groups = selectedBalls.split(',');

                            if (groups.length > 1)
                                selectedCount = groups.length * (groups.length - 1);
                            break;
                        case "zl_bh":
                            groups = selectedBalls.split(',');

                            if (groups.length > 2)
                                selectedCount = $.getProductResult(groups.length - 2, groups.length) / 6;
                            break;
                        case "zs_hz":
                            groups = selectedBalls.split(',');

                            var zuSanHeZhi = [1, 2, 1, 3, 3, 3, 4, 5, 4, 5, 5, 4, 5];

                            for (var i = 0; i < groups.length; i++) {
                                if (groups[i]) {
                                    var selectedBall = parseInt(groups[i]);

                                    if (selectedBall <= 13 && selectedBall >= 1)
                                        selectedCount += zuSanHeZhi[selectedBall - 1];
                                    else if (selectedBall > 13 && selectedBall < 27)
                                        selectedCount += zuSanHeZhi[26 - selectedBall];
                                }
                            }
                            break;
                        case "zl_hz":
                            groups = selectedBalls.split(',');

                            for (var i = 0; i < groups.length; i++) {
                                if (groups[i]) {
                                    var selectedBall = parseInt(groups[i]);

                                    if (selectedBall == 3 || selectedBall == 4 || selectedBall == 23 || selectedBall == 24)
                                        selectedCount += 1;
                                    else if (selectedBall > 4 && selectedBall < 9)
                                        selectedCount += selectedBall - 3;
                                    else if (selectedBall > 18 && selectedBall < 23)
                                        selectedCount += 24 - selectedBall;
                                    else if (selectedBall > 11 && selectedBall < 16)
                                        selectedCount += 10;
                                    else if (selectedBall > 8 && selectedBall < 12)
                                        selectedCount += selectedBall - 2;
                                    else if (selectedBall > 15 && selectedBall < 19)
                                        selectedCount += 25 - selectedBall;
                                }
                            }
                            break;
                        case "zl_dt":
                            groups = selectedBalls.split('#');

                            if (groups.length != 2 || !groups[0] || !groups[1])
                                return 0;

                            var mainSelectedBalls = groups[0].split(','),
                                otherSelectedBalls = groups[1].split(',');

                            if (mainSelectedBalls.length > 1 || otherSelectedBalls.length > 1) {
                                if (mainSelectedBalls.length > 1)
                                    selectedCount = otherSelectedBalls.length;
                                else
                                    selectedCount = (otherSelectedBalls.length - 1) * otherSelectedBalls.length / 2;
                            }
                            break;

                    }
                    break;
                case "Syxw":
                    switch (tools.bettingType) {
                        case "rxe_bz":
                        case "rxs_bz":
                        case "rxsi_bz":
                        case "rxw_bz":
                        case "rxl_bz":
                        case "rxq_bz":
                        case "rxb_bz":
                        case "qy_bz":
                        case "qe_zx":
                        case "qs_zx":
                            groups = selectedBalls.split(',');

                            var minSelectedCount = 1;

                            switch (tools.bettingType) {
                                case "qy_bz":
                                    minSelectedCount = 1;
                                    break;
                                case "rxe_bz":
                                case "qe_zx":
                                    minSelectedCount = 2;
                                    break;
                                case "rxs_bz":
                                case "qs_zx":
                                    minSelectedCount = 3;
                                    break;
                                case "rxsi_bz":
                                    minSelectedCount = 4;
                                    break;
                                case "rxw_bz":
                                    minSelectedCount = 5;
                                    break;
                                case "rxl_bz":
                                    minSelectedCount = 6;
                                    break;
                                case "rxq_bz":
                                    minSelectedCount = 7;
                                    break;
                                default:
                                    minSelectedCount = 8;
                                    break;
                            }

                            if (groups.length < minSelectedCount || !groups[0])
                                return 0;

                            if (groups.length >= minSelectedCount) {
                                if (minSelectedCount == 1)
                                    return groups.length;
                                    
                                return $.getProductResult(groups.length - minSelectedCount + 1, groups.length) / $.getProductResult(1, minSelectedCount);
                            }
                            break;
                        case "qe_bz":
                            groups = selectedBalls.split('|');

                            if (groups.length == 2 && groups[0] && groups[1]) {
                                var myriabitSelectedBalls = groups[0].split(','),
                                    kilobitSelectedBalls = groups[1].split(',');

                                if (myriabitSelectedBalls.length == 1 && kilobitSelectedBalls.length == 1 && myriabitSelectedBalls[0] == kilobitSelectedBalls[0])
                                    return 0;

                                for (var i = 0; i < myriabitSelectedBalls.length; i++) {
                                    for (var j = 0; j < kilobitSelectedBalls.length; j++) {
                                        if (myriabitSelectedBalls[i] != kilobitSelectedBalls[j])
                                            selectedCount++;
                                    }
                                }

                                return selectedCount;
                            }

                            return 0;
                        case "qs_bz":
                            groups = selectedBalls.split('|');

                            if (groups.length == 3 && groups[0] && groups[1] && groups[2])
                            {
                                var myriabitSelectedBalls = groups[0].split(','),
                                    kilobitSelectedBalls = groups[1].split(','),
                                    hundredbitSelectedBalls = groups[2].split(',');

                                for (var i = 0; i < myriabitSelectedBalls.length; i++) {
                                    for (var j = 0; j < kilobitSelectedBalls.length; j++) {
                                        for (var k = 0; k < hundredbitSelectedBalls.length; k++) {
                                            if (myriabitSelectedBalls[i] != kilobitSelectedBalls[j] && myriabitSelectedBalls[i] != hundredbitSelectedBalls[k] && kilobitSelectedBalls[j] != hundredbitSelectedBalls[k])
                                                selectedCount++;
                                        }
                                    }
                                }

                                return selectedCount;
                            }
                            break;
                    }
                    break;
                case "Ks":
                    switch (tools.bettingType) {
                        case "hz_bz":
                        case "sthdx_bz":
                        case "ethfx_bz":
                            groups = selectedBalls.split(',');

                            if (groups.length && groups[0])
                                selectedCount = groups.length;
                            break;
                        case "sthtx_bz":
                        case "slhtx_bz":
                            if (selectedBalls)
                                selectedCount = 1;
                            break;
                        case "ethdx_bz":
                            groups = selectedBalls.split('|');

                            if (groups.length == 2 && groups[0] && groups[1]) {
                                var doubleBalls = groups[0].split(","),
                                    singleBalls = groups[1].split(",");

                                for (var i = 0; i < doubleBalls.length; i++) {
                                    for (var j = 0; j < singleBalls.length; j++) {
                                        if (doubleBalls[i][0] != singleBalls[j])
                                            selectedCount++;
                                    }
                                }
                            }
                            break;
                        case "sbth_bz":
                        case "ebth_bz":
                            var len = tools.bettingType == "sbth_bz" ? 3 : 2;

                            groups = selectedBalls.split(',');

                            if (groups.length >= len)
                                selectedCount = $.getProductResult(groups.length - len + 1, groups.length) / $.getProductResult(1, len);
                            break;
                        case "sbth_dt":
                        case "ebth_dt":
                            groups = selectedBalls.split('#');

                            if (groups.length == 2 && groups[0] && groups[1]) {
                                var fiexdBalls = groups[0].split(","),
                                    otherBalls = groups[1].split(",");

                                if (fiexdBalls.length && otherBalls.length && (tools.bettingType == "ebth_dt" || fiexdBalls.length > 1 || otherBalls.length > 1)) {
                                    if (tools.bettingType == "ebth_dt" || fiexdBalls.length > 1)
                                        selectedCount = otherBalls.length;
                                    else
                                        selectedCount = $.getProductResult(otherBalls.length - 1, otherBalls.length) / 2;
                                }
                            }
                            break;
                    }
                    break;
                case "Pks":
                    groups = selectedBalls.split("|");
                    switch (tools.bettingType) {
                        case "gyj_bz":
                            if (groups.length != 2)
                                return 0;

                            groups[0] = groups[0].split(",");
                            groups[1] = groups[1].split(",");

                            for (var i = 0; i < groups[0].length; i++) {
                                for (var j = 0; j < groups[1].length; j++) {
                                    if (groups[0][i] != groups[1][j]) {
                                        selectedCount++;
                                    }
                                }
                            }
                            break;
                        case "qsm_bz":
                            if (groups.length != 3)
                                return 0;

                            groups[0] = groups[0].split(",");
                            groups[1] = groups[1].split(",");
                            groups[2] = groups[2].split(",");

                            for (var i = 0; i < groups[0].length; i++) {
                                for (var j = 0; j < groups[1].length; j++) {
                                    for (var k = 0; k < groups[2].length; k++) {
                                        if (groups[0][i] != groups[1][j] && groups[0][i] != groups[2][k] && groups[1][j] != groups[2][k]) {
                                            selectedCount++;
                                        }
                                    }
                                }
                            }
                            break;
                        case "qsim_bz":
                            if (groups.length != 4)
                                return 0;

                            groups[0] = groups[0].split(",");
                            groups[1] = groups[1].split(",");
                            groups[2] = groups[2].split(",");
                            groups[3] = groups[3].split(",");

                            for (var i = 0; i < groups[0].length; i++) {
                                for (var j = 0; j < groups[1].length; j++) {
                                    for (var k = 0; k < groups[2].length; k++) {
                                        for (var l = 0; l < groups[3].length; l++) {
                                            if (groups[0][i] != groups[1][j] && groups[0][i] != groups[2][k] && groups[0][i] != groups[3][l] && groups[1][j] != groups[2][k] && groups[1][j] != groups[3][l] && groups[2][k] != groups[3][l]) {
                                                selectedCount++;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "dxds_bz":
                            for (var i = 0; i < groups.length; i++) {
                                if (groups[i]) {
                                    var tempGroup = groups[i].split(',');

                                    for (var j = 0; j < tempGroup.length; j++) {
                                        if (tempGroup[j]) {
                                            selectedCount++;
                                        }
                                    }
                                }
                            }
                            break;
                        default:
                            if (groups.length != 1)
                                return 0;

                            return groups[0].split(",").length;
                    }
            }

            return selectedCount;
        }
    });
    $.extend($, {
        luhmCheck: function (bankno) {
            bankno += '';

            if (!bankno || bankno.length < 16 || bankno.length > 19)
                return false;

            var lastNum = bankno.substr(bankno.length - 1, 1),
                arrJiShu = new Array(),
                arrJiShu2 = new Array(),
                arrOuShu = new Array(),
                jishu_child1 = new Array(),
                jishu_child2 = new Array(),
                sumJiShu = sumOuShu = sumJiShuChild1 = sumJiShuChild2 = sumTotal = key = 0,
                first15Num = bankno.substr(0, bankno.length - 1),
                newArr = new Array();

            for (var i = first15Num.length - 1; i > -1; i--) {
                newArr.push(first15Num.substr(i, 1));
            }

            for (var j = 0; j < newArr.length; j++) {
                if ((j + 1) % 2 == 1) {
                    if (parseInt(newArr[j]) * 2 < 9)
                        arrJiShu.push(parseInt(newArr[j]) * 2);
                    else
                        arrJiShu2.push(parseInt(newArr[j]) * 2);
                } else {
                    arrOuShu.push(newArr[j]);
                }
            }

            for (var h = 0; h < arrJiShu2.length; h++) {
                jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
                jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
            }

            for (var m = 0; m < arrJiShu.length; m++) {
                sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
            }

            for (var n = 0; n < arrOuShu.length; n++) {
                sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
            }

            for (var p = 0; p < jishu_child1.length; p++) {
                sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
                sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
            }

            //计算总和
            sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

            //计算Luhm值
            key = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;

            return lastNum == 10 - key;
        }
    });
})(jQuery, window.buyingTools);