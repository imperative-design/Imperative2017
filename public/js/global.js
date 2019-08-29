

function init(){
    bindEvents();

    compensateHeaderHeight()

    if ($('.client-cases').length <= 0) { return }
    $('.client-cases').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        // appendArrows: '.case-studies',
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    dots: false,
                    slidesToShow: 1
                }
            }
        ]
    });
}

function compensateHeaderHeight(){
    const ctaHeight = String($('header').outerHeight()) + 'px';
    $('.ctas:first').css('marginTop', ctaHeight);
}

function bindEvents(){
    $('a.nav-toggle').on('click', toggleNav);
    $('.show-contact').on('click', toggleQuickContact);
    $('.email').on('click', scrollToContactForm);
    //$('.quick-contact .close').on('click', retractQuickContact);
    initProductGallery();

    if(typeof Rx !== 'undefined') bindCtaAnimations('.cta, .graphic.image');

    let form = document.querySelector('form.quick-contact');
    if (typeof Rx !== 'undefined' && form != null) {
        Rx.Observable.fromEvent(form, 'submit').subscribe(evt => {
            evt.preventDefault();
            
            //https://stackoverflow.com/questions/2600343/why-does-document-queryselectorall-return-a-staticnodelist-rather-than-a-real-ar
            //querySelectorAll returns a nodelist instead of an array, use the spread operator to convert it to an arry
            let formData = [...evt.target.querySelectorAll('input, textarea')]
                .reduce((formData, current_field) => {
                    let name = current_field.getAttribute('placeholder');
                    if(name === null) return formData;
                    formData[name] = current_field.value.trim();
                    return formData;
            }, {});
            
            Rx.Observable.ajax.post('/contact', formData)
            .subscribe( resp => {
                console.log(resp);
                if(resp.status === 200 && resp.response[0].status == 'sent') toggleSuccessMsg('.quick-contact form', '.quick-contact .success-msg');
            });
        });
    }
}

function toggleSuccessMsg(formSelector, successMsgSelector){
    $(formSelector).fadeOut(200, function(){
        $(successMsgSelector).fadeIn(200);
    });
}

function initProductGallery(){
    // const $gallery = $('.gallery');
    // if ($gallery.length < 1 || $('.slick-slide').length > 0) { return };

    if ($('.case-studies-wrapper').length <= 0) { return }
    if ($('#testimonials').length <= 0) { return }
    if ($('.case-studies-wrapper').width() > 450) { console.log('ignore slick on case studies'); return;}

    $('.case-studies-wrapper').slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerMode: false,
        adaptiveHeight: false,
    });

    $('#testimonials').slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerMode: false,
        adaptiveHeight: false,
    });
}

function toggleQuickContact(evt){
    evt.preventDefault();
    if($('form.quick-contact').hasClass('active')) return retractQuickContact();
    showQuickContact();
}

function showQuickContact(){
    $('.shade').addClass('active');
    window.setTimeout(function(){
        $('.quick-contact').addClass('active');
    }, 700);
}

function retractQuickContact(){
    $('.quick-contact').removeClass('active');
    window.setTimeout(function(){
        $('.shade').removeClass('active');
    }, 700);
}

function scrollToContactForm(evt){
    evt.preventDefault()
    $('html, body').animate({scrollTop:$(document).height()}, 1000);
    return false;
}

function toggleNav(evt){
    evt.preventDefault();
    var $nav = $('.nav');

    if(isHidden($nav)) { 
        showNav($nav)
    } else {
        hideNav($nav);
    }
}

function isHidden($nav){
    return ($nav.css('visibility') == 'hidden')
}

function showNav($nav){
    $nav.css('visibility', 'visible');
}

function hideNav($nav){
    $nav.css('visibility', 'hidden');
}

function bindCtaAnimations(sel){
    window.IdAnimations     = {};
    IdAnimations.$ctas      = $(sel);
    IdAnimations.remaining  = IdAnimations.$ctas.length;
    IdAnimations.count      = 0;

    //Rx Pipeline
    var windowMovement$ = Rx.Observable.fromEvent(document, 'scroll');
    windowMovement$
    .take(3)
    .takeWhile((evt, i) => i % 100 == 0).repeat()   //sample the event stream less frequently ( every 100 events )
    .map(doc => window.pageYOffset)
    .subscribe(scroll_pos => {
        // console.log(`scroll_pos: ${scroll_pos}`);
        window.IdAnimations.screen_height = screen.height;
        let $current_cta      = $(IdAnimations.$ctas[IdAnimations.count]);
        
        //Raw numbers
        let header_height     = $('header').height();
        let activation_point  = $current_cta.offset().top;
        let middle_threshold  = 150;
        
        //Calculations based on scroll direction of down
        let elem_current_pos  = activation_point - window.pageYOffset;

        /**
         *  Elem is on the screen
         *  - find the target elements' distance from top
         *  - when pageYoffset >= activation_point ( then subtract a threshold so it doesnt change as soon as its on the page )
         * 
         * Ex. 
         * activation point = 554;
         * 
         */
        let elem_is_on_screen = (window.pageYOffset >= (activation_point));
        let elem_is_near_middle_of_screen = ((elem_current_pos - middle_threshold) >= (screen.height / 2) || (elem_current_pos + middle_threshold) >= (screen.height / 2));
        
        /**
         * 1 - if we're working with the first one, activate it on mousemove
         * 2 - if were working on the rest
         *      - is the element on screen?
         *      - is the (element position - 100) or the (element position + 100) >= half of the screen height
         */

        if(IdAnimations.count == 0 && window.pageYOffset > 20){
            console.log(`first elem element is on screen and mouse moved`);
            // count cant pass 2 or it breaks               
            
            $current_cta.addClass('active');
            if(IdAnimations.count < 2) {
                IdAnimations.count++;
                IdAnimations.remaining--;
            }
        } else {
            // && elem_is_near_middle_of_screen
            if(elem_is_on_screen) {
                console.log(`element is on screen and near middle`);
                // count cant pass 2 or it breaks               
                $current_cta.addClass('active');
                if(IdAnimations.count < 2) {
                    IdAnimations.count++;
                    IdAnimations.remaining--;
                }      
            }
        }
    });
}

//Kickoff jQuery
$('document').ready(($) => {
    init();
});