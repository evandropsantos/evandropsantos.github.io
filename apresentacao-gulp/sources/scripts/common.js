Common = function() {

    function init() {

        navigationAnchor();
        closeModal();

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

    function closeModal() {

        document.querySelector('.btn-close').addEventListener('click', function( event ) {

            event.preventDefault();

            document.querySelector('.who-am-i').classList.add('hidden');

        });
    }

    return init();
};

window.common = new Common();