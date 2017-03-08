window.PageScroller = (function () {

    return {

        scrollingStarted: false,

        start: function (inSpeedDown) {

            var page = $('html, body');

            var speedUp = 5000;

            var speedDown = inSpeedDown === undefined ? 100000 : inSpeedDown * 100000;


            var scrollHeight = $(document).height() - document.body.clientHeight;

            var scrollPosition = scrollHeight + $(window).scrollTop();


            var relativePosition = ((scrollPosition - scrollHeight) / scrollHeight);

            // lower the faster
            var durationDown = speedDown - (speedDown * relativePosition);
            //var durationDown = speedDown * (1 + relativePosition);


            page.clearQueue();

            page.stop();

            if (relativePosition === 1) {
                console.log('page.animate({ scrollTop: 0 }, ' + speedUp + ');');

                page.animate({ scrollTop: 0 }, speedUp, 'linear');
            }
            else{
                console.log('page.animate({ scrollTop: $(document).height() }, ' + durationDown + ')');

                page.animate({ scrollTop: $(document).height() }, durationDown, 'linear');
            }


            scrollingStarted = true;


            $(window).scroll(function (e) {

                var scrollHeight = $(document).height() - document.body.clientHeight;

                var scrollPosition = scrollHeight + $(window).scrollTop();

                var relativePosition = ((scrollPosition - scrollHeight) / scrollHeight);

                // lower the faster
                var durationDown = speedDown - (speedDown * relativePosition);

                console.log('scrollingStarted, document.body.clientHeight, $(window).scrollTop(), $(window).height(), $(document).height(), relativePosition');
                console.log(scrollingStarted, document.body.clientHeight, $(window).scrollTop(), $(window).height(), $(document).height(), relativePosition);

                if (!scrollingStarted) {

                    page.clearQueue();

                    page.stop();

                    console.log('scrollingStarted off');

                    return true;
                }
                else {
                    // at the top start going down
                    if (relativePosition === 0) {

                        console.log('page.animate({ scrollTop: $(document).height() }, ' + durationDown + ')');

                        page.clearQueue();

                        page.stop();

                        page.animate({ scrollTop: $(document).height() }, durationDown, 'linear');

                        return false;
                    }

                    else if (relativePosition === 1) {
                        console.log('page.animate({ scrollTop: 0 }, ' + speedUp + ');');

                        page.clearQueue();

                        page.stop();

                        page.animate({ scrollTop: 0 }, speedUp, 'linear');

                        return false;
                    }
                }
            });
        },

        stop: function () {

            var page = $('html, body');

            page.clearQueue();

            page.stop();

            console.log('scrollStop');

            scrollingStarted = false;
        }
    };
})();