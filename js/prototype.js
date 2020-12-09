//
// for design prototype
//

const libraryList = $('.library_menu_list');
const headerGNB = $('#header');

//
// 사이드바 버전으로 바꾸면서 필요없어짐.
// headerGNB.on('click', '.item_library', function() {
//     libraryList.toggleClass('open');
// });
//
// headerGNB.on('click', '.btn_search', function() {
//     $('.search_area').toggleClass('open');
//     $(this).toggleClass('is_close');
//     if ($(this).hasClass('is_close')) {
//         $('input[type=search]').focus();
//     }
// });

//
// 아이템 더보기
//
$('.more_option').on('click', '.btn_option_now', function(e) {
    e.preventDefault();
    let posX = $(this).position().left,
        posY = $(this).position().top;
    let $this = $(this).next('.ly_option');
    $('.ly_option').not($this).hide();
    $this.css({
        position: 'fixed',
        left: e.pageX - posX,
        top: e.pageY - posY
    });
    $this.toggle();
});
$(document).on('scroll', function() {
    $('.ly_option').hide();
});

$('list_wrap_album_today .scroll_list').each(function() {
    let thisScroll = $(this);
    let buttonNext = '<button type="button" class="VueCarousel-navigation-next"><span class="blind">다음</span></button>';
    let buttonPrev = '<button type="button" class="VueCarousel-navigation-prev"><span class="blind">이전</span></button>';
    thisScroll.closest('div').after(buttonNext, buttonPrev);
});

// $('.today_section').on('click', 'button', function() {
//     let motherSection = $(this).closest('.today_section');
//     motherSection.find('.list_item:first-child').appendTo(motherSection.find('.scroll_list'));
// });

// 매거진 첫 thumb 카피후 백그라운드 블러 넣기
// let headlineThumb = $('.today_headline .thumb');
// headlineThumb.clone().removeClass('thumb').addClass('cover').prependTo('.content');

// $(window).scroll(function() {
//     $(window).scrollTop('0') ? headerGNB.removeClass('on-scroll') : headerGNB.addClass('on-scroll');
//     $('.today_section');
// });

//
//  스크롤 시 따라붙는 스티키 헤더
//
window.onscroll = function() { stickyNav() };

function stickyNav() {
    let navbar = $('#header');
    let scrollY = $(window).scrollTop();
    scrollY > 24 ? navbar.addClass('on_scroll') : navbar.removeClass('on_scroll');
}

$('a').each(function(){
    // 임시 하이퍼링크 제거
    $(this).removeAttr('href');
});

$('.list_wrap_track_rank').on('click', '.VueCarousel-navigation-next', function() {
    let carouselWrap = $(this).closest('div').find('.scroll_list');
    carouselWrap.css({
        left: '-=100%'
    });
});

$('.genre_wrap').on('click', '.btn_genre', function() {
    $('.genre_wrap').toggleClass('open');
});

$('.player_controller').on('click', '.btn_playlist', function() {
    $('#player').toggleClass('open');
});

$('.link_today').click(function(){
    location.href='./index_side.html';
});
$('.link_chart').click(function(){
    location.href='./chart.html';
});

$('.btn_shuffle, .btn_repeat').click(function(){
    $(this).toggleClass('disabled');
});