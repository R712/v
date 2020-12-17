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
$('.content').on('click', '.btn_option_now, .btn_option', function(e) {
    e.preventDefault();
    let elm = $(this);
    let elmNav = elm.next('.ly_option');
    $('.ly_option').not(elmNav).hide();
    elmNav.css({
        position: 'fixed',
        left: e.clientX - 60,
        top: e.clientY + 20
    });
    elmNav.toggle();
});
headerGNB.on('click', '.profile_area .profile', function(e) {
    e.preventDefault();
    let elm = $(this);
    let elmNav = elm.next('.ly_option');
    $('.ly_option').not(elmNav).hide();
    elmNav.toggle();
});
$(window).on('scroll', function(e) {
    e.preventDefault();
    $('.ly_option').hide();
});

//
// gnb nav control
// 유저 메뉴 레이어 토글, 현재 메뉴 스타일링
//
headerGNB.on('click', '.profile_m', function(e) {
    e.preventDefault();
    $('.profile_m .ly_option').toggle();
}).on('click', '.link_menu, .link_sub_menu', function(){
    headerGNB.find('.link_menu, .link_sub_menu').removeClass('on');
    $(this).addClass('on');
});

$('list_wrap_album_today .scroll_list').each(function() {
    let thisScroll = $(this);
    let carouselButtons = `<button type="button" class="VueCarousel-navigation-next"><span class="blind">다음</span></button>
    <button type="button" class="VueCarousel-navigation-prev"><span class="blind">이전</span></button>`;
    thisScroll.closest('div').after(carouselButtons);
});

$('.scroll_list').on('click', '.VueCarousel-navigation-next', function() {
    let motherSection = $(this).closest('.scroll_list');
    // motherSection.find('.list_item:first-child').appendTo(motherSection.find('.scroll_list'));
    motherSection.animate({left: '-=100%'}, 200);
});

$('.end_section').on('click', '.VueCarousel-navigation-next', function() {
    let motherSection = $(this).closest('.end_section');
    // motherSection.find('.list_item:first-child').appendTo(motherSection.find('.scroll_list'));
    motherSection.find('.scroll_list').animate({left: '-=50%'}, 300);
});

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
// window.onscroll = function() { stickyNav() };
// function stickyNav() {
//     let navbar = $('#header');
//     let scrollY = $(window).scrollTop();
//     scrollY > 24 ? navbar.addClass('on_scroll') : navbar.removeClass('on_scroll');
// }
//

$('a').each(function(){
    // 임시 하이퍼링크 제거
    $(this).removeAttr('href');
});

$('.search_area').on('keydown', 'input', function(){
    $('.recent_keyword_area').slideDown(100);
}).on('focusout', 'input', function(){
    $('.recent_keyword_area').slideUp(100);
});

headerGNB.on('click', '.sub_menu_title', function(){
    $(this).next('ul').slideToggle(100);
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
    $('body').toggleClass('noscroll');
});

$('.btn_shuffle, .btn_repeat').click(function(){
    $(this).toggleClass('disabled');
});

$('.link_today, .link_logo').click(function(){
    location.href='./index.html';
});
$('.link_chart').click(function(){
    location.href='./chart.html';
});
$('.album').click(function(){
    location.href='./album.html';
});
$('.item_library, .library_menu').on('click', 'li:first-child', function(){
    location.href='./archive.html';
}).on('click', 'li:nth-child(2)', function(){
    location.href='./archive-song.html';
});