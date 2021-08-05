// WebFontConfig = {
//     custom: {
//         families: ['Graphik'],
//         urls: ['/wp-content/themes/newitcommunity/css/font.css']
//     }
// };

(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);


document.addEventListener("DOMContentLoaded", function(event) {

    var v = document.querySelector('.video-about-inner video');
    var vButton = document.querySelector('.play-stope');
    v.addEventListener(
        'play',
        function() {
            v.play();
            vButton.classList.add('button-hide');
        },
        false);

    v.onclick = function() {
        if (v.paused) {
            v.play();
            vButton.classList.add('button-hide');
        } else {
            v.pause();

            vButton.classList.remove('button-hide');
        }

        return false;
    };

    vButton.addEventListener(
        'play',
        function() {
            v.play();
            vButton.classList.add('button-hide');
        },
        false);

    vButton.onclick = function() {
        if (v.paused) {
            v.play();
            vButton.classList.add('button-hide');
        } else {
            v.pause();

            vButton.classList.remove('button-hide');
        }

        return false;
    };



    document.addEventListener('wpcf7submit', function(event) {
        console.log(event.detail.contactFormId)
        if ('6' == event.detail.contactFormId) {

            slideUp(document.querySelector('.cantact-form .form-inner'), 300)
            slideToggle(document.querySelector('.cantact-form .sucsess-msg'), 300)
        }
        if ('29' == event.detail.contactFormId) {

            slideUp(document.querySelector('.action-message-inner'), 300)
            slideToggle(document.querySelector('.action-message .sucsess-msg'), 300)
        }
    }, false);

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



    var r = new Loader();
    r.require([
            "/wp-content/themes/newitcommunity/js/slider.js",
            "/wp-content/themes/newitcommunity/js/scroll.js"

        ],
        function() {


            class SiemaWithDots extends Siema {

                addDots() {
                    // create a contnier for all dots
                    // add a class 'dots' for styling reason
                    this.dots = document.createElement('div');
                    this.dots.classList.add('dots');

                    // loop through slides to create a number of dots
                    for (let i = 0; i < this.innerElements.length; i++) {
                        // create a dot
                        const dot = document.createElement('button');

                        // add a class to dot
                        dot.classList.add('dots__item');

                        // add an event handler to each of them
                        dot.addEventListener('click', () => {
                            this.goTo(i);
                        })

                        // append dot to a container for all of them
                        this.dots.appendChild(dot);
                    }

                    // add the container full of dots after selector
                    this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
                }

                updateDots() {
                    // loop through all dots
                    for (let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
                        // if current dot matches currentSlide prop, add a class to it, remove otherwise
                        const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
                        this.dots.querySelectorAll('button')[i].classList[addOrRemove]('dots__item--active');
                    }

                }
                curentShowSlide() {
                    return this.currentSlide;

                }
            }



            var work = new SiemaWithDots({
                selector: '.work-slider',
                duration: 400,
                easing: 'ease-out',
                startIndex: 0,
                draggable: true,
                multipleDrag: true,
                threshold: 90,
                loop: false,
                rtl: false,
                perPage: {
                    664: 1,
                    1024: 3,
                },
                onInit: function() {
                    this.addDots();
                    this.updateDots();
                },
                onChange: function() {
                    this.updateDots();
                }

            });

            document.querySelector('.work-next').addEventListener('click', function(e) {
                work.next();
            })

            document.querySelector('.work-prev').addEventListener('click', function(e) {
                work.prev();
            })

        });


    function offset(el) {
        var rect = el.getBoundingClientRect();
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return (rect.top - window.innerHeight / 3)
    }


    var header = document.querySelector(".header"),
        isScrolling = !1;

    function throttleScroll(e) {
        0 == isScrolling && window.requestAnimationFrame(function() {
                scrolling(e),
                    isScrolling = !1
            }),
            isScrolling = !0

    }
    window.addEventListener("scroll", throttleScroll, !1),
        document.addEventListener("DOMContentLoaded", scrolling, !1);
    var listItems = document.querySelectorAll(".animate");


    function scrolling(e) {
        for (var t = 0; t < listItems.length; t++) {
            var o = listItems[t];
            if (o.getAttribute('data-anim')) {
                isFullyVisible(o) && o.classList.add(o.getAttribute('data-anim'))
            } else {
                isFullyVisible(o) && o.classList.add("animate-active")
            }

        }



    }

    function isPartiallyVisible(e) {
        var t = e.getBoundingClientRect(),
            o = t.top,
            n = t.bottom,
            a = t.height;
        return o + a >= 0 && a + window.innerHeight >= n
    }

    function isFullyVisible(e) {
        var t = e.getBoundingClientRect(),
            o = t.top,
            n = t.bottom;
        return o >= 0 && n <= window.innerHeight;
    }


    function contains(arr, elem) {
        return arr.indexOf(elem) != -1;
    }








    var videoOpen = document.querySelector('.about-video');
    var modal = document.querySelector('.modal');
    var closeModal = document.querySelector('.close-modal');

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

    function hideModal() {
        if (modal.classList.contains('visible')) {
            modal.classList.remove('visible');

            if (modal.querySelector('video')) {
                modal.querySelector('video').pause();
            }

            if (document.body.clientHeight > window.innerHeight) {
                setTimeout(function() {
                    modal.classList.remove('modal-will-active');
                    document.body.style.overflow = 'auto';
                    document.body.style.paddingRight = 0 + 'px';
                }, 150)
            }

        }
    }
    if (videoOpen) {

        videoOpen.addEventListener('click', function(e) {
            e.preventDefault();
            if (!modal.classList.contains('modal-will-active')) {
                modal.classList.add('modal-will-active')
            }
            setTimeout(function() {
                modal.classList.add('visible');
            }, 10);


            if (document.body.clientHeight > window.innerHeight) {
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = getScrollbarWidth() + 'px';
            }
        })

        modal.addEventListener('click', function(event) {
            if (event.target !== event.currentTarget) return;
            hideModal();
        })

        closeModal.addEventListener('click', function(e) {
            hideModal();
        })

        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                hideModal();
            }
        };
    }




    let heroAnims = document.querySelectorAll('.stack-el');
    heroAnims.forEach(function(heroAnim) {
        heroAnim.classList.add(heroAnim.getAttribute('data-anim'));
        heroAnim.style.animationDelay = heroAnim.getAttribute('data-delay') + 'ms';
    })



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

    let vacancys = document.querySelectorAll('.vacancy-descr')
    vacancys.forEach(function(vacancy) {
        vacancy.addEventListener('click', function() {
            slideToggle(vacancy.closest('.vacancy-block').querySelector('.vacancy-descr-all'), 700)
            this.classList.toggle('descr-all-visible')
        })
    })

    let vacancyFilters = document.querySelectorAll('.vacancy-filter-el')
    let vacancyEls = document.querySelectorAll('.vacancy-block')
    vacancyFilters.forEach(function(vacancyFilter) {
        vacancyFilter.addEventListener('click', function() {
            let vacancyName = this.textContent

            if (document.querySelector('.vacancy-filter-el-active')) {
                document.querySelector('.vacancy-filter-el-active').classList.remove('vacancy-filter-el-active')
            }
            this.classList.add('vacancy-filter-el-active')
            document.querySelector('.clear-filters').classList.add('clear-filters-active')


            console.log(vacancyName)
            vacancyEls.forEach(function(vacancyEl) {
                vacancyEl.classList.remove('filter-active')
                vacancyEl.classList.remove('unfiltered')
                if (vacancyEl.getAttribute('data-vac') == vacancyName) {
                    vacancyEl.classList.add('filter-active')
                } else {
                    vacancyEl.classList.add('unfiltered')
                }
            })
            if (document.querySelector('.clear-filters-active')) {
                document.querySelector('.clear-filters-active').addEventListener('click', function() {
                    console.log('click')
                    this.classList.remove('clear-filters-active')
                    vacancyEls.forEach(function(vacancyEl) {
                        vacancyEl.classList.remove('filter-active')
                        vacancyEl.classList.remove('unfiltered')
                    })
                })
            }


        })
    })




})