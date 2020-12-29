//
// for design prototype
//

const libraryList = $('.library_menu_list');
const headerGNB = $('#header');
const appContent = $('#content');
const vibePlayer = $('#player');

//
// script로 html include 시키기. 미리보기용.
//
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("vibe-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "페이지 호출에 실패한 것 같습니다."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("vibe-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

includeHTML();

//
// 아이템 더보기
//
$('.content').on('click', '.btn_option_now, .btn_option', function(e) {
    e.preventDefault();
    let elm = $(this);
    let elmNav = elm.next('.ly_option');
    $('.ly_option').not(elmNav).hide();
    if (e.clientX + 150 > $(window).width()) {
        elmNav.css({
            position: 'fixed',
            left: 'inherit',
            right: $(window).width() - e.clientX,
            top: e.clientY + 20
        });
    } else {
        elmNav.css({
            position: 'fixed',
            left: e.clientX - 50,
            top: e.clientY + 25
        });
    };
    elmNav.toggle();
});
headerGNB.on('click', '.profile_area .profile', function(e) {
    e.preventDefault();
    let elm = $(this);
    let elmNav = elm.next('.ly_option');
    $('.ly_option').not(elmNav).hide();
    elmNav.toggle();
});
//
//  일정량 스크롤 시에만 열린 레이어메뉴 닫기
//
$(window).on('scroll', function(e) {
    e.preventDefault();
    $(document).scrollTop() > 200 ? $('.ly_option').hide() : false;
});

//
// gnb nav control
// 유저 메뉴 레이어 토글, 현재 메뉴 스타일링
//
headerGNB.on('click', '.profile_m, .profile_area .profile', function(e) {
    e.preventDefault();
    $('.profile_m .ly_option').toggle();
}).on('click', '.link_menu, .link_sub_menu', function() {
    headerGNB.find('.link_menu, .link_sub_menu').removeClass('on');
    $(this).addClass('on');
});

//
// gnb mobile
//
let searchHtml = headerGNB.find('.search_area').clone();
headerGNB.find('.btn_search').after(searchHtml);

headerGNB.on('click', '.btn_menu', function() {
    if (headerGNB.find('.search_area').hasClass('on')) {
        headerGNB.find('.btn_search').removeClass('on');
        headerGNB.find('.search_area').removeClass('on');
    }
    $('body').toggleClass('noscroll');
    $(this).toggleClass('on');
    headerGNB.toggleClass('on');
});

headerGNB.on('click', '.btn_search', function() {
    if (headerGNB.hasClass('on')) {
        $('body').removeClass('noscroll');
        headerGNB.find('.btn_menu').removeClass('on');
        headerGNB.removeClass('on');
    }
    $(this).toggleClass('on');
    headerGNB.find('.search_area').toggleClass('on').find('input').focus();
});

//
// Carousel preview (미리보기용)
//
$('.content').on('click', '.VueCarousel-navigation-next', function() {
    let motherSection = $(this).parent('div').find('.scroll_list');
    let sumWidth = 0;
    let itemCount = motherSection.find('.list_item').length;
    if (itemCount <= 10) {
        motherSection.find('.list_item').clone().appendTo(motherSection);
    }
    motherSection.find('.list_item').each(function() {
        sumWidth += parseInt($(this).width());
    });
    motherSection.animate({ left: '-=' + parseInt(motherSection.closest('div').width() + 20, 10) + 'px' }, 60);
    let motherPosition = motherSection.position();
    let motherX = (parseInt(motherPosition.left) * -1) + motherSection.closest('div').width();
    if (sumWidth <= motherX) {
        motherSection.animate({ left: '0' }, 100)
    }
});

//
//  스크롤 시 따라붙는 스티키 헤더
//
window.onscroll = function() { stickyNav() };

function stickyNav() {
    let scrollY = $(window).scrollTop();
    scrollY >= 150 ? appContent.addClass('on-scroll') : appContent.removeClass('on-scroll');
}

$('.tracklist').on('click', 'input', function() {
    $('.tracklist').find(':checked').length ? appContent.addClass('on-checked') : appContent.removeClass('on-checked');
    let selectedTrack = $('.tracklist').find(':checked').length;
    $('.count_track').html(selectedTrack + '곡 선택');
});

$('#chk_all, .label_check').click(function() {
    if($('#chk_all').is(':checked')) {
        $('.tracklist').find(':checkbox').prop('checked', true);
        let selectedTrack = $('.tracklist').find(':checked').length;
        $('.count_track').html(selectedTrack + '곡 선택');
    } else {
        $('.tracklist').find(':checkbox').prop('checked', false);
        appContent.removeClass('on-checked');
    }
});

$('.floating_select').on('click', '.btn_close', function() {
    $('.tracklist').find(':checked').prop('checked', false);
    appContent.removeClass('on-checked');
});

$('a').each(function() {
    // 임시 하이퍼링크 제거
    $(this).removeAttr('href');
});

$('.btn_like, .btn_add').on('click', function() {
    $(this).toggleClass('on');
});

$('.lyrics').on('click', function() {
    $(this).toggleClass('hide');
});

$('.search_area').on('keydown', 'input', function() {
    $('.recent_keyword_area').slideDown(100);
}).on('focusout', 'input', function() {
    $('.recent_keyword_area').slideUp(100);
});

vibePlayer.on('click', '.btn_playlist', function() {
    if (vibePlayer.hasClass('open')) {
        vibePlayer.removeClass('open');
        $('body').removeClass('noscroll');
    } else {
        vibePlayer.addClass('open');
        $('body').addClass('noscroll');
    }
});
vibePlayer.on('click', '.control_area .btn_now', function() {
    $(this).toggleClass('play');
});
vibePlayer.on('click', '.btn_shuffle, .btn_repeat', function() {
    $(this).toggleClass('disabled');
});
vibePlayer.on('click', '.btn_volume', function() {
    $(this).toggleClass('mute');
});

$('.summary_thumb').clone().prependTo('.floating_bar .title');
$('.floating_bar').prependTo('.content');
$('.floating_select').appendTo('.floating_bar');

//
//  미리보기용 URL 연결
//
$('.link_today, .link_logo').click(function() {
    location.href = './index.html';
});
$('.link_chart').click(function() {
    location.href = './chart.html';
});
$('.btn_lyrics, .song').click(function() {
    location.href = './song-lyrics.html';
});
$('.link_djstation, .link_dj').click(function() {
    location.href = './djstation.html';
});
$('.album, .link_album').click(function() {
    location.href = './album.html';
});
$('.artist, .link_artist, .link_sub_title').click(function() {
    location.href = './artist.html';
});
$('.link_library').on('click', function() {
    location.href = './archive.html';
});
$('.library_menu .menu_item:nth-child(2)').on('click', function() {
    location.href = './archive-song.html';
});
$('.membership_menu .item:first-child, .link_membership').on('click', function() {
    location.href = './subscription.html';
});
$('.membership_menu .item:nth-child(2)').on('click', function() {
    location.href = './mymembership.html';
});
$('.membership_menu .item:nth-child(3)').on('click', function() {
    location.href = './listening.html';
});
$('.membership_menu .item:nth-child(4)').on('click', function() {
    location.href = './giftcard.html';
});

//
//  페이지 로더 미리보기용
//
let vibeApp;

function showPage() {
    document.querySelector('.loading_vibe').style.display = 'none';
    document.getElementById('container').style.display = 'block';
}

function loadingCheck() {
    vibeApp = setTimeout(showPage, 1800);
}

window.onload = function() {
    loadingCheck();
}

$('.loading_vibe').on('click', function() {
    document.querySelector('.loading_vibe').style.display = 'none';
    document.getElementById('container').style.display = 'block';
});


// 배너 지우기
$('.admin_banner_section').on('click', '.btn_close', function() {
    $('.admin_banner_section').hide();
});