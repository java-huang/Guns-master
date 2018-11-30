$("#btnSubmit").click(function () {
    var formData = $.checkForm("divRegisterBox");

    if (formData) {
        if ($("#cboRegisterAgreement").length && !$("#cboRegisterAgreement")[0].checked) {
            $.alert("请阅读并同意注册协议！");

            return false;
        }

        formData.exclusiveCode = $.queryString("ec");
        formData.agentCode = $.queryString("li");


        if ($.queryString("ip"))
            formData.ip = $.queryString("ip");

        $.ajax("/registerUser", formData, function (response) {
            var xx = getUrlParam('regCode');
            alert(xx);
            if (response.state == 200) {
                $.alert(response.message, function () {
                    location.href = jsonData.result.data;
                });
            } else {
                $.alert(response.message);
            }
        });
    }
});

$("#imgVercode").click(function () {
    this.src = "/validateCode?temp=" + new Date().getTime();
});