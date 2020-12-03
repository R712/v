//
// for design prototype
//

const libraryList = $('.library_menu_list');
const headerGNB = $('#header');

headerGNB.on('click', '.link_menu', function() {
    if (!$(this).hasClass('on')) {
        headerGNB.find('.link_menu').removeClass('on');
        $(this).addClass('on');
    }
    $('.item_library').hasClass('on') ? libraryList.addClass('open') : libraryList.removeClass('open');
});

headerGNB.on('click', '.btn_search', function() {
    $('.search_area').toggleClass('open');
    $(this).toggleClass('is_close');
    if ($(this).hasClass('is_close')) {
        $('input[type=search]').focus();
    }
});

$('.more_option').on('click', '.btn_option_now', function() {
    $(this).next('.ly_option').toggle();
});

let headlineThumb = $('.today_headline .thumb');
headlineThumb.clone().removeClass('thumb').addClass('cover').prependTo('.today_headline');

// $(window).scroll(function() {
//     $(window).scrollTop('0') ? headerGNB.removeClass('on-scroll') : headerGNB.addClass('on-scroll');
//     $('.today_section');
// });

window.onscroll = function() { stickyNav() };


function stickyNav() {
    let navbar = $('#header');
    let scrollY = $(window).scrollTop();
    scrollY > 0 ? navbar.addClass('on_scroll') : navbar.removeClass('on_scroll');
    // $('.today_headline, .today_section').addClass('anima_bounceIn');
}