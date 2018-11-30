$.query("#btnChangePassword", "#btnChangeCapitalPassword").click(function () {
    var formData = $.checkForm(this.id == "btnChangePassword" ? "divChangePassword" : "divChangeCapitalPassword");

    if (formData) {
        $.ajax("/Data/Index?c=Account&m=" + (this.id == "btnChangePassword" ? "ChangePassword" : "ChangeCapitalPassword"), formData, function (response) {
            $.alert(response.message);
        });
    }
});