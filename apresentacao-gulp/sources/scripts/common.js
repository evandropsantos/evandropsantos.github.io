Common = function() {

    function init() {

        navigationAnchor();

        console.log('Init all functions.');
    }

    function navigationAnchor() {

        $('a[href*="#"]:not([href="#"])').click(function() {
            
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                if (target.length) {

                    $('html, body').animate({ scrollTop: target.offset().top -75 }, 1000);
                }
            }
        });
    }

    return init();
};

window.common = new Common();