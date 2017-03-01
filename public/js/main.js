/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2016. MIT licensed.
 */
'use strict';

(function ($, window, document, undefined) {
    'use strict';
    $(function () {
        // Elements
        var demoAd = $('#demo-ad'),
            demoAdContents = $('#demo-ad-contents'),
            demoAdMocksite = $('#demo-ad-mocksite'),
            demoAdDevice = $('#demo-ad-device'),
            demoWidthSlider = $('#demoWidthSlider'),
            demoWidthValue = $('#demoWidthValue'),
            demoHeightSlider = $('#demoHeightSlider'),
            demoHeightValue = $('#demoHeightValue');
        var site = {
            setupAdDemo: function setupAdDemo() {
                var currentW, currentH, minW, minH, widthRange, heightRange, tabletWidth, phoneWidth;

                function setDefaults() {
                    currentW = demoAd.width();
                    currentH = demoAdContents.height();
                    minW = 300;
                    minH = 50;
                    widthRange = currentW - minW;
                    heightRange = currentH - minH;
                    tabletWidth = currentW * 0.75;
                    phoneWidth = currentW * 0.4;
                    console.log(phoneWidth);
                }

                function updateWidth() {
                    var currentV = demoWidthValue.val();
                    var newW = widthRange * (currentV / 10000) + minW;
                    demoAd.width(newW);
                    if (newW <= tabletWidth && newW > phoneWidth) {
                        demoAdDevice.attr("data-device", "tablet");
                    } else if (newW <= phoneWidth) {
                        demoAdDevice.attr("data-device", "phone");
                    } else {
                        demoAdDevice.attr("data-device", "desktop");
                    }
                }

                function updateHeight() {
                    var currentV = 10000 - demoHeightValue.val();
                    var newH = heightRange * (currentV / 10000) + minH;
                    var mocksiteH = currentH - newH;
                    demoAdContents.height(newH);
                    demoAdMocksite.height(mocksiteH);
                }
                setDefaults();
                $(window).on('resize', function () {
                    demoAd.width('');
                    demoAdContents.height('');
                    demoAdMocksite.height('');
                    demoWidthSlider.attr("data-initial-start", "10000");
                    Foundation.reInit(demoWidthSlider);
                    demoHeightSlider.attr("data-initial-start", "10000");
                    Foundation.reInit(demoHeightSlider);
                    setDefaults();
                });
                demoWidthSlider.on('moved.zf.slider', function () {
                    updateWidth();
                });
                demoHeightSlider.on('moved.zf.slider', function () {
                    updateHeight();
                });
            }
        };
        $(document).foundation();
        site.setupAdDemo();
    });
})(jQuery, window, document);
(function () {
    var menu = $('#layout_menu'),
        menuToggle = $('#layout_menu_toggle'),
        nav = $('body > main > nav'),
        article = $('body > main > article'),
        main = $('body > main'),
        dropdowns = $('.dropdown');
    menuToggle.click(function () {
        menu.toggleClass('showing');
        menuToggle.toggleClass('icon-close');
    });
    nav.click(function () {
        main.toggleClass('nav-showing');
    });
    article.click(function () {
        main.removeClass('nav-showing');
    });
    dropdowns.click(function (event) {
        var dropdown = $(this);
        var isOpen = dropdown.hasClass('dropdown-open');
        dropdowns.removeClass('dropdown-open');
        if (!isOpen) {
            dropdown.addClass('dropdown-open');
            event.stopPropagation();
            $(document).click(function () {
                dropdown.removeClass('dropdown-open');
            });
        }
    });
    dropdowns.children('ul').click(function () {
        var dropdown = $(this);
        dropdown.removeClass('dropdown-open');
    });
    dropdowns.children('ul').children('li').click(function () {
        var dropdownItem = $(this);
        dropdownItem.siblings().removeClass('dropdown-selected');
        dropdownItem.addClass('dropdown-selected');
    });
})();
jQuery(function ($) {
    $.fn.exists = function () {
        return $(this).length > 0;
    };
    // Global vars
    var window_width, window_height;
    // Construct the global window variables
    function window_var() {
        window_width = $(window).width();
        window_height = $(window).height();
    }
    // Init the window_var function
    window_var();
    // Reinit for resize event
    $(window).on('resize', window_var);
    window.specless = {
        $win: $(window),
        $doc: $(document),
        $hero: $('#section-hero'),
        $heroTop: $('#hero-top'),
        $heroBottom: $('#hero-bottom'),
        $publishers: $('#section-publishers'),
        $advertisers: $('#section-advertisers'),
        $richmedia: $('#section-richmedia'),
        $richmediaSpace: $('#rich-media-space'),
        $details: $('#section-details'),
        $team: $('#section-team'),
        $footer: $('#section-footer'),
        $demo: $('#demo-container'),
        $demoGlow: $('#demo-glow'),
        $demoGreenGlow: $('#demo-green-glow'),
        $demoFlare: $('#demo-flare'),
        $demoGraffiti: $('#graffiti'),
        $demoControls: $('#demo-controls'),
        $device: $('#device-demo'),
        $deviceGlare: $('#device-demo .device-glare'),
        $deviceAd: $('#device-demo .device-content-ad'),
        $tablet: $('#device-tablet'),
        $laptop: $('#device-laptop'),
        $header: $('#header'),
        $headline: $('#headline'),
        $subhead: $('#subhead'),
        $subheadMain: $('#subhead h2'),
        $subheadSub: $('#subhead h4'),
        $sliderWidth: $('#demo-controls-width'),
        $sliderWidthMessage: $('#demo-message-width'),
        $sliderWidthKnob: $('#demo-controls-width .slider-knob'),
        $sliderHeight: $('#demo-controls-height'),
        $sliderHeightMessage: $('#demo-message-height'),
        $sliderHeightKnob: $('#demo-controls-height .slider-knob'),
        $pubMockupPhone: $('#pub-mockup-phone'),
        $pubMockupBrowser: $('#pub-mockup-browser'),
        $heroAnimation: $('#hero-animation'),
        init: function init() {
            $(document).on('click', '.mobile--icon', specless.mobile_menu);
            $(document).on('click', '.modal--close', specless.modal_close);
            //$(document).foundation();
            //specless.setupAdDemo();
            //specless.setupHeroSection();
            specless.controlAnimation();
            specless.setupPubSection();
            specless.setupAdvSection();
            specless.swiper_carousel();
            specless.modal_control();
            specless.load_equal_height();
            specless.map_blocks();
            if ($('#rich-media-video').exists()) {
                specless.setupRichMediaSection();
            }
            if ($('.field__select').exists()) {
                $('.field__select select').uniform({
                    selectAutoWidth: false
                });
            }
            $('.features-menu a').on('click', function () {
                var feature_group = $(this).data('feature-filter');
                clicked_feature = $('.features-list').find('[data-feature*="' + feature_group + '"]');
                $('.features-menu a').not(this).removeClass('is-active');
                $(this).addClass('is-active');
                if ('all' === feature_group) {
                    $('.features-list').find('.features-group').removeClass('is-hidden').removeClass('is-visible').removeClass('is-first');
                } else {
                    $('.features-list').find('.features-group').addClass('is-hidden').removeClass('is-visible').removeClass('is-first');
                    $(clicked_feature).removeClass('is-hidden').addClass('is-visible');
                    $(clicked_feature).eq(0).addClass('is-first');
                }
            });
        },
        scrollPercent: function scrollPercent($element) {
            var self = this,
                scrollTop = self.$doc.scrollTop(),
                docHeight = self.$doc.height(),
                percent = 0;
            if ($element) {
                var height = $element.height(),
                    offset = $element.offset().top;
                if (scrollTop <= offset) {
                    percent = 0;
                } else if (scrollTop >= offset + height) {
                    percent = 1;
                } else {
                    percent = (scrollTop - offset) / height;
                }
            } else {
                percent = scrollTop / docHeight;
            }
            return percent;
        },
        controlAnimation: function controlAnimation() {
            var self = this,
                lastScroll;

            function updateTime() {
                var percent = self.scrollPercent(self.$heroTop),
                    nextPercent = self.scrollPercent(self.$richmediaSpace) * 1.15,
                    duration = 5,
                    nextDuration = 18.5,
                    time = duration * percent + 3,
                    nextTime = nextDuration * nextPercent + 10;
                animation = HYPE.documents.hero;
                if (nextPercent === 0) {
                    if (time <= duration + 3) {
                        animation.pauseTimelineNamed('Main Timeline');
                        animation.goToTimeInTimelineNamed(time, 'Main Timeline');
                    }
                    if (self.scrollPercent(self.$advertisers) > 0) {
                        animation.pauseTimelineNamed('Main Timeline');
                        animation.goToTimeInTimelineNamed(10, 'Main Timeline');
                    }
                    self.$heroAnimation.css('margin-top', 0);
                } else {
                    if (nextTime <= nextDuration + 10) {
                        animation.pauseTimelineNamed('Main Timeline');
                        animation.goToTimeInTimelineNamed(nextTime, 'Main Timeline');
                        self.$heroAnimation.css('margin-top', 0);
                    } else {
                        if (lastScroll) {
                            var distance = self.$doc.scrollTop() - lastScroll;
                            if (distance >= 0) {
                                self.$heroAnimation.css('margin-top', '-' + distance + 'px');
                            } else {
                                self.$heroAnimation.css('margin-top', 0);
                            }
                        } else {
                            lastScroll = self.$doc.scrollTop();
                        }
                    }
                }
            }

            function hypeReady(hypeDocument, element, event) {
                hypeDocument.startTimelineNamed('Main Timeline');
                self.$doc.scroll(updateTime);
                document.addEventListener('touchmove', updateTime);
                self.$win.resize(function () {
                    lastScroll = undefined;
                    updateTime();
                });
            }

            function init() {
                if ("HYPE_eventListeners" in window === false) {
                    window.HYPE_eventListeners = Array();
                }
                window.HYPE_eventListeners.push({
                    "type": "HypeDocumentLoad",
                    "callback": hypeReady
                });
            }
            init();
        },
        setupHeroSection: function setupHeroSection() {
            var self = this,
                newOffset,
                timelineTime = 0,
                scrollFinished = false,
                timeline = new TimelineLite({
                paused: true
            }),
                lastScroll,
                resizer = new TimelineLite({
                paused: true
            }),
                duration = 10,
                widthSlider = Draggable.create(self.$sliderWidthKnob, {
                type: "x",
                bounds: self.$sliderWidth
            })[0],
                heightSlider = Draggable.create(self.$sliderHeightKnob, {
                type: "y",
                bounds: self.$sliderHeight
            })[0];

            function createNewTimeline() {
                timelineTime = timeline.time();
                self.$doc.scrollTop(0);
                updateTransition();
                TweenMax.set(self.$demo, {
                    clearProps: "y,opacity"
                });
                TweenMax.set(self.$demo, {
                    opacity: 1
                });
                TweenMax.set(self.$device, {
                    clearProps: "y"
                });
                TweenMax.set(self.$subhead, {
                    clearProps: "all"
                });
                TweenMax.set(self.$subheadMain, {
                    clearProps: "opacity"
                });
                TweenMax.set(self.$subheadSub, {
                    clearProps: "opacity"
                });
                TweenMax.set(self.$headline, {
                    clearProps: "opacity"
                });
                TweenMax.set(self.$laptop, {
                    clearProps: "all"
                });
                TweenMax.set(self.$tablet, {
                    clearProps: "all"
                });
                TweenMax.set(self.$header, {
                    clearProps: "all"
                });
                TweenMax.set(self.$demoGraffiti, {
                    clearProps: "all"
                });
                TweenMax.set(self.$sliderWidth, {
                    clearProps: "all"
                });
                TweenMax.set(self.$sliderHeight, {
                    clearProps: "all"
                });
                timeline.clear();
                timeline.from(self.$device, 5, {
                    scale: 0.65
                }).to(self.$demo, 5, {
                    y: newOffset
                }, 0).to(self.$device, 5, {
                    ease: Back.easeOut.config(1.7),
                    y: '-24%'
                }, 0).to(self.$demoGlow, 7, {
                    opacity: 0.25
                }, 0)
                // .to(self.$demoFlare, 7, {
                // 	opacity: 0.25
                // }, 0)
                .to(self.$demoGlow, 5, {
                    height: '1000%',
                    width: '65%'
                }, 0).to(self.$demoFlare, 5, {
                    height: '10%',
                    //width: '250%',
                    ease: Circ.easeInOut,
                    rotation: 180,
                    transformOrigin: 'bottom 50%',
                    opacity: 0
                }, 0).to(self.$demoGreenGlow, 5, {
                    width: '30%',
                    height: '150%',
                    opacity: 0
                }, 0).from(self.$subhead, 5, {
                    css: {
                        top: '300px'
                    }
                }, 0).from(self.$subheadMain, 5, {
                    opacity: 0
                }, 0).from(self.$subheadSub, 1, {
                    opacity: 0
                }, 4).to(self.$headline, 0.75, {
                    opacity: 0
                }, 0).to(self.$laptop, 5, {
                    scale: 0.35,
                    x: '200%',
                    y: '-100%',
                    opacity: 0
                }, 0).to(self.$tablet, 5, {
                    scale: 0.35,
                    x: '-200%',
                    y: '-150%',
                    opacity: 0
                }, 0).to(self.$header, 5, {
                    css: {
                        paddingTop: '18px',
                        paddingBottom: '18px',
                        backgroundColor: 'rbga(0,0,0,0.75)'
                    }
                }, 0).from(self.$demoGraffiti, 5, {
                    y: '-10%',
                    opacity: 0
                }, 0).from(self.$sliderWidth, 3, {
                    y: '1000%',
                    opacity: 0
                }, 2).from(self.$sliderHeight, 3, {
                    x: '1000%',
                    opacity: 0
                }, 2).to(self.$sliderWidth, 0.5, {
                    opacity: 0
                }, 5).to(self.$sliderHeight, 0.5, {
                    opacity: 0
                }, 5).to(self.$demo, 1, {
                    // y: '-' + self.$win.height() + 'px',
                    opacity: 0
                }, 5);
                self.$doc.scrollTop(lastScroll);
                updateTransition();
            }

            function resizeHandler() {
                // 1.67 Width 0.59 height Aspect Ratio
                lastScroll = self.$doc.scrollTop();
                var offsetDevices = self.$demo.offset().top - self.$doc.scrollTop();
                var offsetHeadline = self.$headline.offset().top + self.$headline.height();
                var availableHeight = self.$win.height() - offsetHeadline;
                var width = availableHeight * 1.67;
                var top = offsetHeadline / self.$win.height() * 100;
                if (width > 1200) {
                    width = 1200;
                }
                var left = (self.$win.width() - width) / 2;
                self.$demo.css({
                    width: width + 'px',
                    left: left + 'px',
                    top: top + '%'
                });
                newOffset = (self.$win.height() - self.$demo.height()) / 2 - offsetHeadline;
                createNewTimeline();
            }
            resizeHandler();
            //createNewTimeline();
            // timeline.from(self.$device, 5, {scale: 0.65})
            // 		.to(self.$demo, 5, {y: newOffset}, 0)
            // 		.to(self.$device, 5, {ease: Back.easeOut.config(1.7), y: '-24%'}, 0)
            // 		.from(self.$subhead, 5, {css: {
            // 			top: '300px'
            // 		}}, 0)
            // 		.from(self.$subheadMain, 5, {opacity: 0}, 0)
            // 		.from(self.$subheadSub, 1, {opacity: 0}, 4)
            // 		.to(self.$headline, 0.75, {opacity: 0}, 0)
            // 		.to(self.$laptop, 5, {scale: 0.35, x: '200%', y: '-100%', opacity: 0}, 0)
            // 		.to(self.$tablet, 5, {scale: 0.35, x: '-200%', y: '-150%', opacity: 0}, 0)
            // 		.fromTo(self.$header, 5, {css: {
            // 			paddingTop: '40px',
            // 			paddingBottom: '30px',
            // 			backgroundColor: 'rbga(0,0,0,0)'
            // 		}}, {css: {
            // 			paddingTop: '24px',
            // 			paddingBottom: '15px',
            // 			backgroundColor: 'rbga(0,0,0,0.75)'
            // 		}}, 0)
            // 		.from(self.$demoGraffiti, 5, {y: '-10%', opacity: 0}, 0)
            // 		.from(self.$sliderWidth, 3, {y: '1000%', opacity: 0}, 2)
            // 		.from(self.$sliderHeight, 3, {x: '1000%', opacity: 0}, 2)
            // 		.to(self.$demo, 1, {ease: Power0.easeNone, opacity: 0}, 5)
            // 		.to(self.$device, 0.65, {opacity: 0}, 5)
            // 		//.to(self.$demoControls, 0.5, {opacity: 0}, 5);
            resizer.to(self.$device, 5, {
                ease: Power0.easeNone,
                css: {
                    width: '100%'
                }
            }, 0).to(self.$device, 2, {
                css: {
                    top: '-10vh'
                }
            }, 0).to(self.$deviceGlare, 2, {
                css: {
                    width: '80%',
                    height: '60%'
                }
            }, 0).to(self.$subhead, 0.6, {
                opacity: 0
            }, 0).to(self.$demoGlow, 1, {
                opacity: 0
            }, 0).to(self.$demoFlare, 1, {
                opacity: 0
            }, 0);

            function resizeDevice(percent) {
                var newDuration = duration / 2;
                var time = newDuration * percent;
                resizer.time(time);
            }

            function updateDevice() {
                var time = resizer.time(),
                    portrait = 0.7,
                    landscape = 1.55,
                    laptop = 3;
                if (time <= portrait) {
                    self.$device.addClass('device__phone');
                    self.$device.removeClass('device__tablet-portrait');
                    self.$device.removeClass('device__tablet-landscape');
                    self.$device.removeClass('device__laptop');
                } else if (time > portrait && time <= landscape) {
                    self.$device.addClass('device__tablet-portrait');
                    self.$device.removeClass('device__phone');
                    self.$device.removeClass('device__tablet-landscape');
                    self.$device.removeClass('device__laptop');
                } else if (time > landscape && time <= laptop) {
                    self.$device.addClass('device__tablet-landscape');
                    self.$device.removeClass('device__tablet-portrait');
                    self.$device.removeClass('device__phone');
                    self.$device.removeClass('device__laptop');
                } else if (time > laptop) {
                    self.$device.addClass('device__laptop');
                    self.$device.removeClass('device__tablet-portrait');
                    self.$device.removeClass('device__phone');
                    self.$device.removeClass('device__tablet-landscape');
                }
            }
            var lastSlidWidth = 0;
            var lastSlidHeight = 0;
            var lastTransitionTime = 0;

            function updateDeviceWidth(noSet) {
                var width = self.$sliderWidth.width();
                var knobWidth = self.$sliderWidthKnob.width();
                var knobPosition = self.$sliderWidthKnob.position().left;
                var percent = knobPosition / (width - knobWidth);
                if (!noSet) {
                    resizeDevice(percent);
                    lastSlidWidth = percent;
                }
                return {
                    width: width,
                    knobWidth: knobWidth,
                    knobPosition: knobPosition,
                    percent: percent
                };
            }

            function updateDeviceHeight(noSet) {
                var height = self.$sliderHeight.height();
                var knobHeight = self.$sliderHeightKnob.height();
                var knobPosition = self.$sliderHeightKnob.position().top;
                var percent = knobPosition / (height - knobHeight);
                if (!noSet) {
                    var percentCss = percent * 100 + '%';
                    self.$deviceAd.css('height', percentCss);
                    lastSlidHeight = percent;
                }
                return {
                    height: height,
                    knobHeight: knobHeight,
                    knobPosition: knobPosition,
                    percent: percent
                };
            }

            function updateWidthSlider(percent) {
                var sliderStats = updateDeviceWidth(true);
                var sliderPosition = (sliderStats.width - sliderStats.knobWidth) * percent;
                TweenMax.set(self.$sliderWidthKnob, {
                    x: sliderPosition
                });
                widthSlider.update();
                updateDeviceWidth();
            }

            function updateHeightSlider(perc) {
                var height = self.$sliderHeight.height();
                var knobHeight = self.$sliderHeightKnob.height();
                var sliderPosition = (height - knobHeight) * perc;
                TweenMax.set(self.$sliderHeightKnob, {
                    y: sliderPosition
                });
                heightSlider.update();
                var knobPosition = self.$sliderHeightKnob.position().top;
                var percent = knobPosition / (height - knobHeight);
                var percentCss = percent * 100 + '%';
                self.$deviceAd.css('height', percentCss);
            }
            updateHeightSlider(1);

            function updateTransition() {
                var percent = self.scrollPercent(self.$heroTop),
                    bottomPercent = self.scrollPercent(self.$heroBottom),
                    time = duration * percent / 2;
                if (time <= duration / 2) {
                    timeline.time(time);
                }
                var scrollPoint = self.$heroBottom.offset().top + self.$heroBottom.height();
                var currentScroll = self.$doc.scrollTop() + self.$win.height();
                if (currentScroll >= scrollPoint) {
                    // if (!scrollFinished) {
                    self.$heroBottom.addClass('scroll-completed');
                    // var demoOffset = self.$demo.height() + self.$demo.offset().top;
                    // var heroHeight = self.$hero.height();
                    // console.log(demoOffset, heroHeight);
                    // TweenMax.set(self.$demo, {clearProps: 'y', css: {bottom: demoOffset - heroHeight + newOffset}});
                    scrollFinished = true;
                    // }
                } else {
                        self.$heroBottom.removeClass('scroll-completed');
                        // TweenMax.set(self.$demo, {css: {bottom: 'auto'}});
                        scrollFinished = false;
                    }
                if (bottomPercent >= 0.32) {
                    var progress = (bottomPercent - 0.32) / 0.68;
                    timeline.time(5 + progress);
                }
                if (lastTransitionTime > time) {
                    var newWidthPosition = lastSlidWidth * percent;
                    var newHeightPosition = 1 - lastSlidHeight * percent;
                    updateWidthSlider(newWidthPosition);
                    updateHeightSlider(newHeightPosition);
                }
                if (time === 0) {
                    lastSlidWidth = 0;
                    lastSlidHeight = 0;
                }
                if (bottomPercent >= 0.03 && bottomPercent <= 0.2) {
                    self.$sliderWidthMessage.addClass("show");
                    self.$sliderHeightMessage.removeClass("show");
                } else if (bottomPercent > 0.2 && bottomPercent <= 0.5) {
                    self.$sliderHeightMessage.addClass("show");
                    if (bottomPercent > 0.35) {
                        self.$sliderWidthMessage.removeClass("show");
                    } else {
                        self.$sliderWidthMessage.addClass("show");
                    }
                } else {
                    self.$sliderWidthMessage.removeClass("show");
                    self.$sliderHeightMessage.removeClass("show");
                }
                lastTransitionTime = time;
                if (bottomPercent === 1) {
                    self.$demo.css('display', 'none');
                } else {
                    self.$demo.css('display', 'block');
                }
            }
            self.$subheadMain.fitText(1.3);
            self.$subheadSub.fitText(1.5);
            self.$sliderWidthKnob.mousedown(function () {
                self.$sliderWidthMessage.css('display', 'none');
            });
            self.$sliderHeightKnob.mousedown(function () {
                self.$sliderHeightMessage.css('display', 'none');
            });
            self.$sliderWidthKnob.on('touchstart', function () {
                self.$sliderWidthMessage.css('display', 'none');
            });
            self.$sliderHeightKnob.on('touchstart', function () {
                self.$sliderHeightMessage.css('display', 'none');
            });
            self.$doc.scroll(updateTransition);
            self.$win.resize(resizeHandler);
            resizer.eventCallback("onUpdate", updateDevice);
            widthSlider.addEventListener('drag', updateDeviceWidth);
            heightSlider.addEventListener('drag', updateDeviceHeight);
        },
        setupPubSection: function setupPubSection() {
            var self = this;
            var timeline = new TimelineLite({
                paused: true
            });
            timeline.from(self.$pubMockupPhone, 1, {
                x: '-500'
            }, 0).from(self.$pubMockupPhone, 0.5, {
                opacity: 0
            }, 0.5).from(self.$pubMockupBrowser, 1, {
                x: '500'
            }, 0).from(self.$pubMockupBrowser, 0.5, {
                opacity: 0
            }, 0.5);

            function animate() {
                var height = self.$publishers.height();
                var offset = self.$publishers.offset().top;
                var winHeight = self.$win.height();
                var currentScroll = self.$doc.scrollTop();
                var scrollPoint = 0.75;
                if (currentScroll + winHeight > offset) {
                    var percent = (currentScroll + winHeight - offset) / height;
                    percent = percent / scrollPoint;
                    if (percent < 0) {
                        percent = 0;
                    } else if (percent > 1) {
                        percent = 1;
                    }
                    timeline.time(percent);
                }
            }
            self.$doc.scroll(animate);
            document.addEventListener('touchmove', animate);
        },
        setupAdvSection: function setupAdvSection() {
            var self = this;
            var timeline = new TimelineLite({
                paused: true
            });
            timeline.set($(".browser.browser-1"), {
                scale: 1
            }).set($(".browser.browser-2"), {
                scale: 0.9
            }).set($(".browser.browser-3"), {
                scale: 0.8
            }).fromTo($(".browser.browser-1"), 1, {
                y: '-150',
                ease: Power0.easeNone
            }, {
                y: '30',
                ease: Power0.easeNone
            }, 0).fromTo($(".browser.browser-2"), 1, {
                y: '-100',
                ease: Power0.easeNone
            }, {
                y: '20',
                ease: Power0.easeNone
            }, 0).fromTo($(".browser.browser-3"), 1, {
                y: '-50',
                ease: Power0.easeNone
            }, {
                y: '10',
                ease: Power0.easeNone
            }, 0);

            function animate() {
                var height = self.$advertisers.height();
                var offset = self.$advertisers.offset().top;
                var winHeight = self.$win.height();
                var currentScroll = self.$doc.scrollTop();
                var scrollPoint = 1;
                if (currentScroll + winHeight > offset) {
                    var percent = (currentScroll + winHeight - offset) / height;
                    percent = percent / scrollPoint;
                    if (percent < 0) {
                        percent = 0;
                    } else if (percent > 1) {
                        percent = 1;
                    }
                    timeline.time(percent);
                }
            }
            self.$doc.scroll(animate);
            document.addEventListener('touchmove', animate);
        },
        swiper_carousel: function swiper_carousel() {
            var swiper_autoplay = window_width < 768 ? 500 : 0;
            $(window).resize(function () {
                if (window_width < 768) {
                    swiper_autoplay = 500;
                } else {
                    swiper_autoplay = 0;
                }
            });
            var swiper_args = {
                autoplay: swiper_autoplay,
                slidesPerView: 6,
                paginationClickable: false,
                //centeredSlides: false,
                //slideToClickedSlide: false,
                spaceBetween: 22,
                grabCursor: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                freeMode: true,
                preventClicks: false,
                loop: true,
                speed: 0,
                loopAdditionalSlides: 1,
                onClick: function onClick(swiper, event) {
                    var clicked_slide = swiper.clickedSlide,
                        $slide = $(clicked_slide),
                        slide_iframe = $slide.data('iframe');
                    if (undefined !== clicked_slide) {
                        $('.swiper-slide').not($slide).removeClass('is-clicked');
                        $slide.addClass('is-clicked');
                        specless.swiper_iframe(slide_iframe);
                    }
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 22
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 6
                    }
                }
            };
            if ($('.publishers-swiper').exists()) {
                var publishers_swiper = new Swiper('.publishers-swiper', swiper_args);
                publishers_swiper.slidePrev(true, 300);
                publishers_swiper.slideNext(true, 300);
            }
            if ($('.advertisers-swiper').exists()) {
                var advertisers_swiper = new Swiper('.advertisers-swiper', swiper_args);
                advertisers_swiper.slidePrev(true, 300);
                advertisers_swiper.slideNext(true, 300);
            }
            if ($('.team-swiper').exists()) {
                if (window_width < 1230) {
                    swiper_args.breakpoints = {
                        1230: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        }
                    };
                    var team_swiper = new Swiper('.team-swiper', swiper_args);
                }
            }
        },
        swiper_iframe: function swiper_iframe(newIframeSrc) {
            $('.mockup__iframe .iframe').each(function () {
                $(this).attr('src', newIframeSrc);
            });
        },
        setupRichMediaSection: function setupRichMediaSection() {
            var richMediaSection = $("#section-rich-media"),
                richMediaCreative = $("#rich-media-creative"),
                richMediaIcon = $("#rich-media-icon"),
                richMediaIconImage = $("#rich-media-icon-image"),
                richMediaCreativeContent = $("#rich-media-creative-content"),
                richMediaSpecs = $("#rich-media-specs"),
                richMediaFeatures = $("#rich-media-features");
            var iconStartWidth = 25,
                iconStartHeight = 75,
                iconWidthAmount = 100 - iconStartWidth,
                iconHeightAmount = 100 - iconStartHeight,
                creativeTranslate = -350,
                specsTranslate = -150;
            var video = document.getElementById('rich-media-video');
            $(document).scroll(function () {
                var viewport = $(window).height(),
                    startPoint = richMediaSection.offset().top - viewport / 3,
                    endPoint = richMediaFeatures.offset().top - viewport,
                    distance = $(document).scrollTop();
                if (distance <= startPoint) {
                    richMediaCreativeContent.css('opacity', 0);
                }
                if (distance > startPoint && distance < endPoint) {
                    var amount = (startPoint - distance) * -1,
                        percent = amount / (endPoint - startPoint),
                        creativeDistance = creativeTranslate + creativeTranslate * -1 * percent,
                        specsDistance = specsTranslate + specsTranslate * -1 * percent,
                        iconWidth = iconStartWidth + iconWidthAmount * percent,
                        iconHeight = iconStartHeight + iconHeightAmount * percent;
                    richMediaCreative.css('transform', 'translate( -50%, ' + creativeDistance + 'px ) rotateX( 10.6deg ) ');
                    richMediaSpecs.css("transform", "translate( -50%, " + specsDistance + "px ) rotateX( 10.6deg )");
                    richMediaIcon.css("width", iconWidth + "%");
                    richMediaIcon.css("height", iconHeight + "%");
                    richMediaCreativeContent.css("opacity", percent);
                    richMediaIconImage.css("display", "block");
                    $(video).css("display", "none");
                    video.pause();
                }
                if (distance >= endPoint) {
                    richMediaCreative.css("transform", "translate( -50%, 0px ) rotateX( 10.6deg )");
                    richMediaSpecs.css("transform", "translate( -50%, 0px ) rotateX( 10.6deg )");
                    richMediaIcon.css("width", "100%");
                    richMediaIcon.css("height", "100%");
                    richMediaIconImage.css("display", "none");
                    richMediaCreativeContent.css("opacity", 1);
                    $(video).css("display", "inline-block");
                    video.currentTime = 0;
                    video.play();
                }
            });
        },
        mobile_menu: function mobile_menu(event) {
            event.preventDefault();
            if ($(this).is('.is-active')) {
                $(this).removeClass('is-active');
                $('.page').removeClass('page--no-scroll');
                $('body').removeClass('menu-open');
                $('.menu__primary').removeClass('is-open');
            } else {
                $(this).addClass('is-active');
                $('.page').addClass('page--no-scroll');
                $('body').addClass('menu-open');
                $('.menu__primary').addClass('is-open');
            }
        },
        modal_control: function modal_control() {
            $('[data-modal]').on('click', function (event) {
                event.preventDefault();
                var target_modal = $(this).data('modal');
                $('body').addClass('menu-open');
                $(target_modal).addClass('is-open');
            });
        },
        modal_close: function modal_close(event) {
            event.preventDefault();
            $(this).parent('.modal').removeClass('is-open');
            $('body').removeClass('menu-open');
        },
        load_equal_height: function load_equal_height() {
            // Load equal height
            $(window).load(function () {
                specless.equal_height('.column--equal');
            });
            // Responsive Equal Height
            if (window_width >= 1025) {
                $(window).load(function () {
                    specless.equal_height('.column--equal-desktop');
                });
            }
            // Trigger equal height on resize
            $(window).resize(function () {
                specless.equal_height('.column--equal');
                if (window_width >= 1025) {
                    specless.equal_height('.column--equal-desktop');
                } else if (window_width <= 1024) {
                    $('.column--equal-desktop').css('height', '');
                }
            });
        },
        equal_height: function equal_height(container) {
            var tallest_column = 0,
                row_position = 0,
                row_columns = [],
                top_position = 0;
            $(container).each(function () {
                $this = $(this);
                $this.height('auto');
                top_position = $this.position().top;
                if (row_position != top_position) {
                    for (current_column = 0; current_column < row_columns.length; current_column++) {
                        row_columns[current_column].height(tallest_column);
                    }
                    row_columns.length = 0;
                    row_position = top_position;
                    tallest_column = $this.height();
                    row_columns.push($this);
                } else {
                    row_columns.push($this);
                    tallest_column = tallest_column < $this.height() ? $this.height() : tallest_column;
                }
                for (current_column = 0; current_column < row_columns.length; current_column++) {
                    row_columns[current_column].height(tallest_column).addClass('is-equal');
                }
            });
        },
        map_blocks: function map_blocks() {
            $('.map-block').each(function () {
                var map_id = $(this).find('.map-container').attr('id'),
                    geocoderContact,
                    mapContact,
                    geocoder,
                    map;

                function initialize_officemap() {
                    var latitude, latlong, longitude, uselatlong, temp;
                    geocoder = new google.maps.Geocoder();
                    if (document.getElementById(map_id) && $('#' + map_id).data('latlong')) {
                        uselatlong = $('#' + map_id).data('latlong');
                        temp = [];
                        latlong = uselatlong.split(',');
                        latitude = latlong[0];
                        longitude = latlong[1];
                    } else {
                        latitude = '-34.397';
                        longitude = '150.644';
                    }
                    var map_styles = [{
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": [{
                            "saturation": -100
                        }, {
                            "gamma": 0.5
                        }]
                    }];
                    var mapOptions = {
                        scrollwheel: false,
                        zoom: 17,
                        center: latlng,
                        styles: map_styles,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var latlng = new google.maps.LatLng(latitude, longitude);
                    if (document.getElementById(map_id)) {
                        var address = $('#' + map_id).data('address');
                        map = new google.maps.Map(document.getElementById(map_id), mapOptions);
                        codeAddress_officemap(address);
                    }
                    var currCenter = map.getCenter();
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(currCenter);
                }

                function codeAddress_officemap(address) {
                    geocoder.geocode({
                        'address': address
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            var mapMarker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                }
                initialize_officemap();
            });
        }
    };
    specless.init();
});
var Site = function Site() {
    var clientId,
        fullStoryLink,
        el = {
        $win: $(window),
        $doc: $(document),
        $header: $('#header'),
        $footer: $('#footer'),
        $hero: $('#section-hero'),
        $heroTop: $('#hero-top'),
        $heroVideo: $('#hero-video'),
        $heroAnimation: $('#hero-animation'),
        $publishers: $('#section-publishers'),
        $advertisers: $('#section-advertisers'),
        $richmedia: $('#section-richmedia'),
        $richmediaAnimation: $('#rich-media-animation'),
        $richmediaSpacer: $('#richmedia-spacer'),
        $details: $('#section-details'),
        $products: $('#section-products'),
        $interface: $('#section-interface'),
        $about: $('#section-about'),
        $icon: $('#details-icon'),
        $advModal: $('#advModal'),
        $leadForm: $('#leadForm'),
        $modalCloser: $('.modal .modal-close'),
        $leadTrigger: $('.lead-trigger')
    },
        scrollPercent = function scrollPercent($element) {
        var scrollTop = el.$doc.scrollTop(),
            docHeight = el.$doc.height(),
            percent = 0;
        if ($element.length) {
            var height = $element.height(),
                offset = $element.offset().top;
            if (scrollTop <= offset) {
                percent = 0;
            } else if (scrollTop >= offset + height) {
                percent = 1;
            } else {
                percent = (scrollTop - offset) / height;
            }
        } else {
            percent = scrollTop / docHeight;
        }
        return percent;
    },
        isPhone = function isPhone() {
        var isMobile = window.matchMedia("only screen and (max-width: 760px)");
        if (isMobile.matches) {
            return true;
        } else {
            return false;
        }
    },
        setupModals = function setupModals() {
        el.$modalCloser.click(function () {
            $(this).parent('.modal').removeClass('active');
        });
        el.$leadTrigger.click(showLeadForm);
    },
        showLeadForm = function showLeadForm() {
        el.$leadForm.addClass('active');
    },
        setupHero = function setupHero() {
        var updateTime = function updateTime() {
            var percent = scrollPercent(el.$heroTop),
                nextPercent = scrollPercent(el.$richmediaSpacer) * 1.15,
                duration = 5,
                nextDuration = 18.5,
                time = duration * percent + 3,
                nextTime = nextDuration * nextPercent + 10;
            animation = HYPE.documents.hero;
            if (!isPhone()) {
                if (nextPercent === 0) {
                    if (time <= duration + 3) {
                        animation.pauseTimelineNamed('Main Timeline');
                        animation.goToTimeInTimelineNamed(time, 'Main Timeline');
                        if (percent > 0.75) {
                            $('html').addClass('scroll-completed');
                            if (!$('#demo-ad-iframe').hasClass('no-bg')) {
                                $('#demo-ad-iframe').attr('src', 'https://specless.io/view_623?ad=cvqSTL');
                                $('#rich-media-iframe').attr('src', 'https://specless.io/view_623?ad=cvqSTL');
                                $('#demo-ad-iframe').addClass('no-bg');
                            }
                        } else {
                            $('html').removeClass('scroll-completed');
                            if ($('#demo-ad-iframe').hasClass('no-bg')) {
                                $('#demo-ad-iframe').attr('src', '');
                                $('#rich-media-iframe').attr('src', '');
                                $('#demo-ad-iframe').removeClass('no-bg');
                            }
                        }
                    }
                    if (scrollPercent(el.$publishers) > 0) {
                        animation.pauseTimelineNamed('Main Timeline');
                        animation.goToTimeInTimelineNamed(10, 'Main Timeline');
                        $('html').addClass('hide-controls');
                        // if (!$('#rich-media-iframe').hasClass('populated')) {
                        // 	$('#rich-media-iframe').attr('src', 'https://specless.io/view_623?ad=cvqSTL');
                        // 	$('#rich-media-iframe').addClass('populated');
                        // }
                    } else {
                            $('html').removeClass('hide-controls');
                            // if ($('#rich-media-iframe').hasClass('populated')) {
                            // 	$('html').removeClass('hide-controls');
                            // 	$('#rich-media-iframe').attr('src', undefined);
                            // 	$('#rich-media-iframe').removeClass('populated');
                            // }
                        }
                    if (time < 5.5) {
                        var $device = $('#device-demo');
                        $device.css('width', '100%');
                        $('#hero-headline-two > h2, #hero-headline-two > h4').css('opacity', 1);
                        $('#device-ad-slot').css('height', '100%');
                        $('#demo-slider-horizontal').val(0);
                        $('#demo-slider-vertical').val(0);
                        $('#demo-slider-horizontal').rangeslider('update', true);
                        $('#demo-slider-vertical').rangeslider('update', true);
                        if (!$device.hasClass('device__phone')) {
                            $device.addClass('device__phone');
                            $device.removeClass('device__laptop');
                            $device.removeClass('device__tablet-portrait');
                            $device.removeClass('device__tablet-landscape');
                        }
                    }
                } else {
                    if (scrollPercent(el.$products) > 0) {
                        animation.goToTimeInTimelineNamed(31, 'Main Timeline');
                    } else {
                        animation.goToTimeInTimelineNamed(28.5, 'Main Timeline');
                    }
                    if (nextTime <= nextDuration + 10) {
                        animation.pauseTimelineNamed('Main Timeline');
                        animation.goToTimeInTimelineNamed(nextTime, 'Main Timeline');
                        if (nextTime > 28) {
                            $('.scc-icon').addClass("scc-icon-visible");
                        } else {
                            $('.scc-icon').removeClass("scc-icon-visible");
                        }
                    }
                    var $adSlot = $('.rich-media-ad-slot'),
                        slotTop = $adSlot.offset().top - el.$doc.scrollTop() + $adSlot.height(),
                        detailsTop = el.$details.offset().top - el.$doc.scrollTop();
                    if (detailsTop - slotTop <= 0) {
                        el.$icon.addClass('details-icon-visible');
                        el.$icon.width($adSlot.width());
                        el.$icon.height($adSlot.height());
                        var scrollHeight = detailsTop - ($adSlot.offset().top - el.$doc.scrollTop());
                        if (scrollHeight <= $adSlot.height() / 2) {
                            scrollHeight = $adSlot.height() / 2;
                        }
                        el.$icon.css('margin-top', -1 * scrollHeight);
                    } else {
                        el.$icon.removeClass('details-icon-visible');
                    }
                }
            } else {
                animation.pauseTimelineNamed('Main Timeline');
                animation.goToTimeInTimelineNamed(3, 'Main Timeline');
            }
            //window.requestAnimationFrame(updateTime);
        },
            hypeReady = function hypeReady(hypeDocument, element, event) {
            if (hypeDocument.documentName() === "hero") {
                hypeDocument.startTimelineNamed('Main Timeline');
                //el.$doc.scroll(updateTime);
                el.$win.resize(updateTime);
                document.addEventListener('scroll', updateTime, {
                    passive: true
                });
                // document.addEventListener('touchmove', updateTime, {passive: true});
                //window.requestAnimationFrame(updateTime);
            }
        };
        if (!("HYPE_eventListeners" in window)) {
            window.HYPE_eventListeners = Array();
        }
        window.HYPE_eventListeners.push({
            "type": "HypeDocumentLoad",
            "callback": hypeReady
        });
        var sliderOptions = {
            polyfill: false,
            rangeClass: 'slider',
            disabledClass: 'slider-disabled',
            horizontalClass: 'slider-horizontal',
            verticalClass: 'slider-vertical',
            fillClass: 'slider-fill',
            handleClass: 'slider-knob',
            onSlide: function onSlide(position, value) {
                var $device,
                    portrait,
                    landscape,
                    laptop,
                    percent,
                    direction = 'horizontal',
                    width = 1000;
                if (this.$element.attr('data-orientation') === "vertical") {
                    percent = 100 - value + "%";
                    $('#device-ad-slot').css('height', percent);
                } else {
                    percent = value / 100;
                    $device = $('#device-demo');
                    portrait = 14;
                    landscape = 31;
                    laptop = 60;
                    if (value <= portrait) {
                        $device.addClass('device__phone');
                        $device.removeClass('device__tablet-portrait');
                        $device.removeClass('device__tablet-landscape');
                        $device.removeClass('device__laptop');
                    } else if (value > portrait && value <= landscape) {
                        $device.addClass('device__tablet-portrait');
                        $device.removeClass('device__phone');
                        $device.removeClass('device__tablet-landscape');
                        $device.removeClass('device__laptop');
                    } else if (value > landscape && value <= laptop) {
                        $device.addClass('device__tablet-landscape');
                        $device.removeClass('device__tablet-portrait');
                        $device.removeClass('device__phone');
                        $device.removeClass('device__laptop');
                    } else if (value > laptop) {
                        $device.addClass('device__laptop');
                        $device.removeClass('device__tablet-portrait');
                        $device.removeClass('device__phone');
                        $device.removeClass('device__tablet-landscape');
                    }
                    $device.css('width', 100 + value / 100 * 400 + '%');
                    if ($('#demo-slider-horizontal').val() > 4) {
                        $('#hero-headline-two > h2, #hero-headline-two > h4').css('opacity', 0);
                    } else {
                        $('#hero-headline-two > h2, #hero-headline-two > h4').css('opacity', 1);
                    }
                }
            }
        };
        $('input[type="range"]').rangeslider(sliderOptions);
        $('.slider-knob').mousedown(function () {
            if ($(this).parent().hasClass('slider-horizontal')) {
                $('#demo-message-width').css('opacity', 0);
            } else if ($(this).parent().hasClass('slider-vertical')) {
                $('#demo-message-height').css('opacity', 0);
            }
        });
    },
        setupHeader = function setupHeader() {
        var checkScroll = function checkScroll() {
            var percent = scrollPercent(el.$heroTop);
            if (percent >= 1) {
                el.$header.addClass('header-dark');
            } else {
                el.$header.removeClass('header-dark');
            }
        };
        el.$doc.scroll(checkScroll);
    },
        setupPublishers = function setupPublishers() {
        var pubSlider = new Swiper('#pub-slider', {
            slidesPerView: 7,
            spaceBetween: 8,
            breakpoints: {
                450: {
                    slidesPerView: 3
                },
                800: {
                    slidesPerView: 4
                },
                1400: {
                    slidesPerView: 5
                }
            }
        }),
            $pubSlides = $('#section-publishers .swiper-slide');
        $pubSlides.click(function () {
            $pubSlides.removeClass('swiper-slide-selected');
            $(this).addClass('swiper-slide-selected');
        });
        var hypeReady = function hypeReady(hypeDocument, element, event) {
            if (hypeDocument.documentName() === "formats") {
                $pubSlides.click(function () {
                    $pubSlides.removeClass('swiper-slide-selected');
                    $(this).addClass('swiper-slide-selected');
                    var time = $(this).attr('data-slide-click');
                    hypeDocument.goToTimeInTimelineNamed(+time, 'Main Timeline');
                    console.log(time);
                });
            }
        };
        if ("HYPE_eventListeners" in window === false) {
            window.HYPE_eventListeners = Array();
        }
        window.HYPE_eventListeners.push({
            "type": "HypeDocumentLoad",
            "callback": hypeReady
        });
    },
        setupAdvertisers = function setupAdvertisers() {
        var advSlider = new Swiper('#adv-slider', {
            slidesPerView: 7,
            spaceBetween: 8,
            breakpoints: {
                450: {
                    slidesPerView: 3
                },
                800: {
                    slidesPerView: 4
                },
                1400: {
                    slidesPerView: 5
                }
            }
        }),
            $advSlides = $('#section-advertisers .swiper-slide');
        $advSlides.click(function () {
            $advSlides.removeClass('swiper-slide-selected');
            $(this).addClass('swiper-slide-selected');
        });
        $('[data-ad]').each(function () {
            var ad = $(this).attr('data-ad');
            document.styleSheets[1].insertRule('[data-ad="' + ad + '"]::before { background-image: url(../images/ads/' + ad + '.png) }', 0);
        });
        $('[data-ad]').click(function () {
            var ad = $(this).attr('data-ad');
            var url = 'https://specless.io/view_623?ad=' + ad;
            el.$advModal.children('iframe').attr('src', url);
            el.$advModal.addClass('active');
        });
    },
        setupTracking = function setupTracking() {
        (function (i, s, o, g, r, a, m) {
            i.GoogleAnalyticsObject = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            };
            i[r].l = 1 * new Date();
            a = s.createElement(o);
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-41230543-4', 'auto');
        ga('send', 'pageview');
        ga(function (tracker) {
            clientId = tracker.get('clientId');
            FS.identify(clientId, {
                displayName: 'Site Visitor',
                siteVisitor: true
            });
            fullStoryLink = FS.getCurrentSessionURL().replace('https://', '');
            $('#leadForm > iframe').attr('src', 'https://specless.wufoo.com/forms/schedule-a-demo/def/field111=' + clientId + '&field112=' + fullStoryLink);
        });
        var hero = false,
            publishers = false,
            advertisers = false,
            richmedia = false,
            details = false,
            products = false,
            inrfce = false;
        el.$doc.scroll(function () {
            if (scrollPercent(el.$hero) > 0 && hero === false) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Sections',
                    eventAction: 'hero',
                    eventLabel: 'Scrolled To Hero Section'
                });
                hero = true;
            }
            if (scrollPercent(el.$publishers) > 0 && publishers === false) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Sections',
                    eventAction: 'publishers',
                    eventLabel: 'Scrolled To Publishers Section'
                });
                publishers = true;
            }
            if (scrollPercent(el.$advertisers) > 0 && advertisers === false) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Sections',
                    eventAction: 'advertisers',
                    eventLabel: 'Scrolled To Advertisers Section'
                });
                advertisers = true;
            }
            if (scrollPercent(el.$richmedia) > 0 && richmedia === false) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Sections',
                    eventAction: 'richmedia',
                    eventLabel: 'Scrolled To Rich Media Section'
                });
                richmedia = true;
            }
            if (scrollPercent(el.$details) > 0 && details === false) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Sections',
                    eventAction: 'details',
                    eventLabel: 'Scrolled To Details Section'
                });
                details = true;
            }
            if (scrollPercent(el.$products) > 0 && products === false) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Sections',
                    eventAction: 'products',
                    eventLabel: 'Scrolled To Products Section'
                });
                products = true;
            }
            if (scrollPercent(el.$interface) > 0 && inrfce === false) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Sections',
                    eventAction: 'interface',
                    eventLabel: 'Scrolled To Interface Section'
                });
                inrfce = true;
            }
        });
    },
        start = function start() {
        //setupVideoResize();
        setupHero();
        setupHeader();
        setupModals();
        setupPublishers();
        setupAdvertisers();
        setupTracking();
    };
    start();
};
var site = new Site();