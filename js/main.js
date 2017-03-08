$(function () {

    var scriptsExecuted = false;

    $('#scroll_page_start').click(function () {

        console.log('scroll_page_start', scriptsExecuted);

        var scrollSpeedDown = $('#scroll_speed_down').val();

        if (!scriptsExecuted) {

            scriptsExecuted = true;

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

                var tab = tabs[0];

                console.assert(typeof tab.url == 'string', 'tab.url should be a string');

                // https://github.com/ReeganExE/chrome-script-execution
                new ScriptExecution(tab.id)

                    .executeScripts('js/jquery-3.1.1.min.js', 'js/page-scroll.js')

                    .then(s => s.executeCodes('PageScroller.start(' + scrollSpeedDown + ');'));
            });
        }
        else {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

                var tab = tabs[0];

                console.assert(typeof tab.url == 'string', 'tab.url should be a string');

                chrome.tabs.executeScript(tab.id, {code: 'new PageScroller.start(' + scrollSpeedDown + ');'});
            });
        }

        return false;
    });

    $('#scroll_page_stop').click(function () {

        console.log('scroll_page_stop', scriptsExecuted);

        if (!scriptsExecuted) {

            scriptsExecuted = true;

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

                var tab = tabs[0];

                console.assert(typeof tab.url == 'string', 'tab.url should be a string');

                // https://github.com/ReeganExE/chrome-script-execution
                new ScriptExecution(tab.id)

                    .executeScripts('js/jquery-3.1.1.min.js', 'js/page-scroll.js')

                    .then(s => s.executeCodes('PageScroller.stop();'));
            });
        }
        else {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

                var tab = tabs[0];

                console.assert(typeof tab.url == 'string', 'tab.url should be a string');

                chrome.tabs.executeScript(tab.id, {code: 'PageScroller.stop();'});
            });
        }

        return false;
    });


});