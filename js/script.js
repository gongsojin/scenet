// main_banner

var swiper = new Swiper(".mb", {
    navigation: {
        nextEl: ".mb_btn_next",
        prevEl: ".mb_btn_prev",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
});
$('.mb .swiper-slide').hover(function(){
  swiper.autoplay.stop();
}, function(){
  swiper.autoplay.start();
});
// section_2(product)

let swiperInstances = {};

function initSwiperForSlider($slider) {
  const sliderId = $slider.data('slider');

  if (window.innerWidth < 600) {
    if (swiperInstances[sliderId]) {
      swiperInstances[sliderId].destroy(true, true);
      delete swiperInstances[sliderId];
    }
  } else {
    if (!swiperInstances[sliderId]) {
      swiperInstances[sliderId] = new Swiper($slider[0], {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 30,
        watchOverflow: false,
        breakpoints: {
          599: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        // navigation 제거 (버튼 이벤트 직접 연결 예정)
        // navigation: {...}
      });
    }
  }
}

// 버튼 클릭 시 활성 탭 슬라이더만 조작하도록
$('.tab_btn_next').on('click', () => {
  const activeSliderId = $('.tab-content-slider.swiper-container:visible').data('slider');
  if (swiperInstances[activeSliderId]) {
    swiperInstances[activeSliderId].slideNext();
  }
});
$('.tab_btn_prev').on('click', () => {
  const activeSliderId = $('.tab-content-slider.swiper-container:visible').data('slider');
  if (swiperInstances[activeSliderId]) {
    swiperInstances[activeSliderId].slidePrev();
  }
});


function initOrDestroyAllSwipers() {
  $('.tab-content-slider').each(function () {
    initSwiperForSlider($(this));
  });
}

$(document).ready(function () {
  // 탭 클릭 처리
  $('.tab').on('click', function () {
    const tabId = $(this).data('tab');

    $('.tab').removeClass('active');
    $(this).addClass('active');

    $('.tab-content-slider').hide();
    const $targetSlider = $('.tab-content-slider[data-slider="' + tabId + '"]');
    $targetSlider.show();

    initSwiperForSlider($targetSlider);
  });

  // 초기화
  initOrDestroyAllSwipers();

  $(window).on('resize', function () {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(initOrDestroyAllSwipers, 150);
  });
});




