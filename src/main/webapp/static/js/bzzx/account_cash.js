$("#btnSubmit").click(function () {
    var formData = $.checkForm("divCashForm");

    if (formData) {
        var minCashMoney = parseInt($("#lblMinCashMoney").text());

        if (parseInt(formData.money) < minCashMoney) {
            $.alert("单笔提现最少不得低于" + minCashMoney + "元！");

            return;
        }

        $.ajax("/Data/Index?c=Account&m=Cash", formData, function (response) {
            if (response.state == 200) {
                $.alert("提现申请成功！", function () {
                    location.href = "/Account/CashRecord";
                });
            } else {
                $.alert(response.message);
            }
        });
    }
});