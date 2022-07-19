var close = {}
close.interval = setInterval(function () {
    if (document.readyState == "complete") {
        close.button = $('.btn_win_close')[0];
        if (close.button !== undefined) {
            close.button.click()
            clearInterval(close.interval);
        }
    }
}, 100);