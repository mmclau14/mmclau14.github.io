var Site=function(){var e={$win:$(window),$doc:$(document),$header:$("#header"),$footer:$("#footer"),$hero:$("#section-hero"),$heroTop:$("#hero-top"),$heroAnimation:$("#hero-animation"),$publishers:$("#section-publishers"),$advertisers:$("#section-advertisers"),$richmedia:$("#section-richmedia"),$richmediaSpacer:$("#richmedia-spacer"),$details:$("#section-details"),$interface:$("#section-interface"),$about:$("#section-about"),$icon:$("#details-icon")},i=function(i){var s=e.$doc.scrollTop(),n=e.$doc.height(),o=0;if(i){var a=i.height(),t=i.offset().top;o=t>=s?0:s>=t+a?1:(s-t)/a}else o=s/n;return o},s=function(){var e=window.matchMedia("only screen and (max-width: 760px)");return!!e.matches};setupHero=function(){var n,o=function(){var n=i(e.$heroTop),o=1.15*i(e.$richmediaSpacer),a=5,t=18.5,r=a*n+3,d=t*o+10;if(animation=HYPE.documents.hero,s())animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(3,"Main Timeline");else if(0===o)a+3>=r&&(animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(r,"Main Timeline")),i(e.$advertisers)>0&&(animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(10,"Main Timeline")),e.$heroAnimation.css("margin-top",0);else{t+10>=d&&(animation.pauseTimelineNamed("Main Timeline"),animation.goToTimeInTimelineNamed(d,"Main Timeline"),d>28?$(".scc-icon").addClass("scc-icon-visible"):$(".scc-icon").removeClass("scc-icon-visible"));var c=$(".rich-media-ad-slot"),l=c.offset().top-e.$doc.scrollTop()+c.height(),m=e.$details.offset().top-e.$doc.scrollTop();if(0>=m-l){e.$icon.addClass("details-icon-visible"),e.$icon.width(c.width()),e.$icon.height(c.height());var h=m-(c.offset().top-e.$doc.scrollTop());h<=c.height()/2&&(h=c.height()/2),e.$icon.css("margin-top",-1*h)}else e.$icon.removeClass("details-icon-visible")}},a=function(i,s,n){"hero"===i.documentName()&&(i.startTimelineNamed("Main Timeline"),e.$doc.scroll(o),e.$win.resize(o),document.addEventListener("touchmove",o))},t=function(){"HYPE_eventListeners"in window==!1&&(window.HYPE_eventListeners=Array()),window.HYPE_eventListeners.push({type:"HypeDocumentLoad",callback:a})};t()},setupHeader=function(){var s=function(){var s=i(e.$heroTop);s>=1?e.$header.addClass("header-dark"):e.$header.removeClass("header-dark")};e.$doc.scroll(s)},setupPublishers=function(){var e=new Swiper("#pub-slider",{slidesPerView:7,spaceBetween:8,breakpoints:{450:{slidesPerView:3},800:{slidesPerView:4},1400:{slidesPerView:5}}}),i=$("#section-publishers .swiper-slide");i.click(function(){i.removeClass("swiper-slide-selected"),$(this).addClass("swiper-slide-selected")});var s=function(e,s,n){"formats"===e.documentName()&&i.click(function(){i.removeClass("swiper-slide-selected"),$(this).addClass("swiper-slide-selected");var s=$(this).attr("data-slide-click");e.goToTimeInTimelineNamed(+s,"Main Timeline"),console.log(s)})};"HYPE_eventListeners"in window==!1&&(window.HYPE_eventListeners=Array()),window.HYPE_eventListeners.push({type:"HypeDocumentLoad",callback:s})},setupAdvertisers=function(){var e=new Swiper("#adv-slider",{slidesPerView:7,spaceBetween:8,breakpoints:{450:{slidesPerView:3},800:{slidesPerView:4},1400:{slidesPerView:5}}}),i=$("#section-advertisers .swiper-slide");i.click(function(){i.removeClass("swiper-slide-selected"),$(this).addClass("swiper-slide-selected")})},start=function(){setupHero(),setupHeader(),setupPublishers(),setupAdvertisers()},start()},site=new Site;