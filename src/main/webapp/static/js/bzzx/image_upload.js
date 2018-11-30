(function () {
    function getRandomName(index) {
        if (window["__UPLOADCALLBACK__" + index])
            return getRandomName(index + 1);

        return "__UPLOADCALLBACK__" + index;
    }

    if (window.$) {
        $.fn.imageUpload = function (pars) {
            pars = pars || {};

            if (this && this.length) {
                this.each(function () {
                    var me = {},
                        frame = document.createElement("iframe"),
                        callback = getRandomName(1);

                    if (!$.isFunction(pars.callback))
                        return;

                    frame.scrolling = "no";
                    frame.frameBorder = "0";
                    frame.marginHeight = 0;
                    frame.marginWidth = 0;
                    frame.src = "/Data/ImageUpload?label=" + escape(pars.label) + "&img=" + escape(pars.defaultImage) + "&callback=" + callback + "&disabled=" + (pars.disabled === undefined ? "" : escape(pars.disabled));

                    $(this).append(frame);

                    window[callback] = pars.callback;
                });
            }
        };
    } else {
        window.top.$.closeLoading();

        var hidValue = document.getElementById("hidValue"),
            hidCallback = document.getElementById("hidCallback"),
            fileImage = document.getElementById("fileImage"),
            hidError = document.getElementById("hidError");

        if (!hidCallback || !hidCallback.value || !window.top[hidCallback.value])
            window.top.$.alert("上传图片出现异常，请刷新页面重试！");
        else if (hidError && hidError.value)
            window.top.$.alert(hidError.value);
        else if (hidValue && hidValue.value)
            window.top[hidCallback.value](hidValue.value);

        if (fileImage) {
            fileImage.onchange = function () {
                if (fileImage.value || (fileImage.files && fileImage.files.length)) {
                    window.top.$.loading("图片上传中");

                    document.getElementById("fileForm").submit();
                }
            };
        }
    }
})();