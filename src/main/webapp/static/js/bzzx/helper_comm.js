(function () {
    var currentTag, 
        tagArgs = $.queryString("tag");

    window.doQuestion = function (tag) {
        if (tag) {
            $(tag).next().toggle();

            if (tag != currentTag)
                $(currentTag).next().hide();

            currentTag = tag;
        }
    }

    if (tagArgs)
        window.doQuestion(document.getElementById("tag" + tagArgs));
})();