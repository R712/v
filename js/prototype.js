//
// for design prototype
//

const libraryList = $('.library_menu_list');
const headerGNB = $('#header');

headerGNB.on('click', '.item_library', function() {
    libraryList.toggleClass('open');
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

$('.scroll_list').each(function() {
    let thisScroll = $(this);
    let buttonNext = '<button type="button" class="VueCarousel-navigation-next"><span class="blind">다음</span></button>';
    let buttonPrev = '<button type="button" class="VueCarousel-navigation-prev"><span class="blind">이전</span></button>';
    thisScroll.closest('div').after(buttonNext, buttonPrev);
});

// $('.today_section').on('click', 'button', function() {
//     let motherSection = $(this).closest('.today_section');
//     motherSection.find('.list_item:first-child').appendTo(motherSection.find('.scroll_list'));
// });

let headlineThumb = $('.today_headline .thumb');
headlineThumb.clone().removeClass('thumb').addClass('cover').prependTo('.content');

// $(window).scroll(function() {
//     $(window).scrollTop('0') ? headerGNB.removeClass('on-scroll') : headerGNB.addClass('on-scroll');
//     $('.today_section');
// });

window.onscroll = function() { stickyNav() };

function stickyNav() {
    let navbar = $('#header');
    let scrollY = $(window).scrollTop();
    scrollY > 24 ? navbar.addClass('on_scroll') : navbar.removeClass('on_scroll');
}