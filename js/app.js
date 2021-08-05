WebFontConfig = {
    google: { families: ['Inter:400,600,700,900&display=swap'] }
};

(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);


//loader function
var Loader = function() {}
Loader.prototype = {
    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.defer = true;
        s.src = src;
        s.addEventListener('load', function(e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
}


var l = new Loader();
l.require([
        "./js/slider.js",
        "./js/lazy-load.js"
    ],
    function() {

        let mySiema = new Siema({
            selector: '.slider-content',
            duration: 400,
            easing: 'ease-out',
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 90,
            loop: false,
            rtl: false,
            perPage: {
                480: 1,
                764: 2,
            },
        });
        let prev = document.querySelector('.prev');
        let next = document.querySelector('.next');

        prev.addEventListener('click', () => mySiema.prev());
        next.addEventListener('click', () => mySiema.next());


    });


document.addEventListener("DOMContentLoaded", function(event) {
    let slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            //alert("!");
        }, duration);
    }

    let slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    }
    var slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration);
        } else {
            return slideUp(target, duration);
        }
    }


    let books = document.querySelectorAll('.leaning-button')
    books.forEach(function(book) {
        book.addEventListener('click', function(event) {
            if (event.target.closest('.leaning-el').classList.contains('active-el')) {
                slideUp(event.target.closest('.leaning-el').querySelector('.hidden-list'), 300);
                event.target.closest('.leaning-el').classList.remove('active-el');
            } else {
                if (document.querySelector('.active-el')) {
                    slideToggle(document.querySelector('.active-el .hidden-list'), 300);
                    document.querySelector('.active-el').classList.toggle('active-el');
                }
                slideDown(event.target.closest('.leaning-el').querySelector('.hidden-list'), 300);
                event.target.closest('.leaning-el').classList.add('active-el');

            }

        })
    })


    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }


    var modals = document.querySelectorAll('[data-modal-open]');
    var modalOverlay = document.querySelector('.modal-overley');

    function openModal(modal) {
        modalOverlay.classList.add('overley-active')
        let modalWindow = document.querySelector('[data-modal=' + modal.getAttribute('data-modal-open') + ']')
        modalWindow.classList.add('modal-open');
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.classList.add('bodylock');
            document.body.style.paddingRight = getScrollbarWidth() + 'px';
            document.querySelector('.header').style.paddingRight = getScrollbarWidth() + 'px';
        }
        if (modal.getAttribute('data-modal-open') == 'testimonial') {
            let text = modal.getAttribute('data-descr')
            let photo = modal.closest('.slider-slide').querySelector('.persone-photo img')
            let name = modal.closest('.slider-slide').querySelector('.persone-name')
            let role = modal.closest('.slider-slide').querySelector('.persone-role')
            document.querySelector('.full-testimonial').innerHTML = text;
            modalWindow.querySelector('.persone-photo img').setAttribute('src', photo.getAttribute('src'));
            modalWindow.querySelector('.persone-name').textContent = name.textContent;
            modalWindow.querySelector('.persone-role').textContent = role.textContent;

        }
        if (modal.getAttribute('data-modal-open') == 'video') {
            let videoSrc = modalWindow.querySelector('.m-video').getAttribute('data-video');
            modalWindow.querySelector('.m-video').innerHTML = '<iframe src="' + videoSrc + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

        }

    }


    var stopVideo = function(element) {
        var iframe = element.querySelector('iframe');
        iframe.remove()
    };


    function closeModal(modal) {
        modal.classList.add('modal-will-close');
        if (modal.getAttribute('data-modal') == 'video') {
            stopVideo(document.querySelector('.m-video'))
        }

        modal.addEventListener("animationend", function() {
            if (modal.classList.contains('modal-will-close')) {
                modalOverlay.classList.remove('overley-active')
                this.classList.remove('modal-open');
                this.classList.remove('modal-will-close');
                if (document.body.offsetHeight > window.innerHeight) {
                    document.body.classList.remove('bodylock');
                    document.body.style.paddingRight = '0px';
                    document.querySelector('.header').style.paddingRight = '0px'
                }
            }
        });


    }


    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            event.preventDefault();

            openModal(modal);


        });
    });





    var modalCloseButtons = document.querySelectorAll('.close-modal')
    if (modalCloseButtons) {
        modalCloseButtons.forEach(function(modalCloseButton) {
            modalCloseButton.addEventListener('click', function(event) {
                event.preventDefault();
                closeModal(modalCloseButton.closest('.modal'))
            });
        });
    }

    document.querySelector('.modal').addEventListener('click', function(event) {
        if (!event.target.matches('.modal-open')) return
        closeModal(this);
    });



});