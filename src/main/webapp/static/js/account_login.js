$.initLoginBox("divLoginBox", "button", function () {
    location.href = $.queryString("source") || "/";
});