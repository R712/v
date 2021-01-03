//
//  Script for Design prototype
//  디자인 facelift 시연용으로 작성된 스크립트
//
//  - 대부분 시연을 위한 스크립트로 실 개발용은 해당 기능에 상응하게 작성되어야 합니다.
//  - 기존 작업된 마크업과 클래스명을 고치지 않고 디자인을 변경 및 제안하는 과정에서 필요에 의해 작성된 부분이 많습니다.
//  - 특히 carousel UI의 경우 실제로는 [vue-carousel] 을 이용하는 것으로 보여 그에 맞게 주의해주세요.
//

//  고정 레이아웃 요소
const libraryList = $('.library_menu_list');
const headerGNB = $('#header');
const appContent = $('#content');
const vibePlayer = $('#player');

//
//  아이템 옵션 레이어
//
$('.content').on('click', '.btn_option_now, .btn_option, .btn_drop_menu', function(e) {
    e.preventDefault();
    let elm = $(this);
    let elmNav = elm.next('.ly_option, .layer_drop_menu');
    $('.ly_option, .layer_drop_menu').not(elmNav).hide();
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
$('.layer_drop_menu').on('click', 'a', function() {
    let selectedItem = $(this).html();
    $(this).closest('.dropdown_wrap').find('.btn_drop_menu').html(selectedItem);
});
headerGNB.on('click', '.profile_area .profile', function(e) {
    e.preventDefault();
    let elm = $(this);
    let elmNav = elm.next('.ly_option');
    $('.ly_option').not(elmNav).hide();
    elmNav.toggle();
});

// 서브 탭 메뉴
$('.tab_menu').on('click', '.tab_item', function() {
    let motherTab = $(this).closest('.tab_menu');
    motherTab.find('.tab_item').removeClass('selected');
    $(this).addClass('selected');
});

//
//  일정량 스크롤 시에만 열린 레이어메뉴 닫기
//
$(window).on('scroll', function(e) {
    e.preventDefault();
    $(document).scrollTop() > 200 ? $('.ly_option').hide() : false;
});

//
//  gnb nav control
//  유저 메뉴 레이어 토글, 현재 메뉴 스타일링
//
headerGNB.on('click', '.profile_m, .profile_area .profile', function(e) {
    e.preventDefault();
    $('.profile_m .ly_option').toggle();
}).on('click', '.link_menu, .link_sub_menu', function() {
    headerGNB.find('.link_menu, .link_sub_menu').removeClass('on');
    $(this).addClass('on');
});

//
//  gnb mobile
//

//  모바일에서 검색 화면을 위해 스크립트로 구조를 변경했으나, 마크업에서 직접 변경하면 필요없는 코드
let searchHtml = headerGNB.find('.search_area').clone();
headerGNB.find('.btn_search').after(searchHtml);
//  여기까지

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
//  Carousel preview (미리보기용이므로 실제 개발 상황에는 필요없습니다.)
//
$('.content').on('click', '.VueCarousel-navigation-next', function() {
    let motherSection = $(this).parent('div').find('.scroll_list');
    let sumWidth = 0;
    motherSection.find('.list_item').each(function() {
        sumWidth += parseInt($(this).width());
    });
    motherSection.animate({ left: '-=' + parseInt(motherSection.closest('div').width() + 20, 10) + 'px' }, 150);
    let motherPosition = motherSection.position();
    let motherX = (parseInt(motherPosition.left) * -1) + motherSection.closest('div').width();
    if (sumWidth <= motherX) {
        motherSection.animate({ left: '0' }, 250)
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

//
//  트랙리스트에서 체크박스 클릭시 마다 숫자 카운팅 후 반영
//
$('.tracklist').on('click', 'input', function() {
    $('.tracklist').find(':checked').length ? appContent.addClass('on-checked') : appContent.removeClass('on-checked');
    let selectedTrack = $('.tracklist').find(':checked').length;
    $('.count_track').html(selectedTrack + '곡 선택');
});

//
//  전체 선택 체크박스 클릭시
//
$('#chk_all, .label_check').click(function() {
    if ($('#chk_all').is(':checked')) {
        $('.tracklist').find(':checkbox').prop('checked', true);
        let selectedTrack = $('.tracklist').find(':checked').length;
        $('.count_track').html(selectedTrack + '곡 선택');
    } else {
        $('.tracklist').find(':checkbox').prop('checked', false);
        appContent.removeClass('on-checked');
    }
});

//  선택된 곡 있을때 보이는 플로팅 레이어 닫기
$('.floating_select').on('click', '.btn_close', function() {
    $('.tracklist').find(':checked').prop('checked', false);
    appContent.removeClass('on-checked');
});

//
//  검색창에서 키입력시 최근 검색어 목록 호출
//
$('.search_area').on('keydown', 'input', function() {
    $('.recent_keyword_area').slideDown(100);
}).on('focusout', 'input', function() {
    $('.recent_keyword_area').slideUp(100);
});

//
//  바이브 뮤직 플레이어 미리보기 제어
//
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
//  ON/OFF 상태를 보유한 버튼 제어
//
$('.btn_like, .btn_add').click(function() {
    $(this).toggleClass('on');
});
//  보관함에서 좋아하는 아티스트 취소
$('.thumb_area').on('click', '.btn_like', function() {
    $(this).closest('.list_item').addClass('dislike').fadeOut(200);
});

//
//  미리보기용 URL 연결
//  +
//  임시 하이퍼링크 제거
//  미리보기시 기존 html코드의 수많은 각기 다른 url연결로 방해가 되어 제거 후 별도 연결
//
$('a').each(function() {
    $(this).removeAttr('href');
});
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
$('.link_monthly').click(function() {
    location.href = './monthly.html';
});
$('.album, .link_album').click(function() {
    location.href = './album.html';
});
$('.artist, .link_artist, .link_sub_title').click(function() {
    location.href = './artist.html';
});
$('.link_library, .library_menu .menu_item:first-child').on('click', function() {
    location.href = './archive.html';
});
$('.library_menu .menu_item:nth-child(2)').on('click', function() {
    location.href = './archive-song.html';
});
$('.library_menu .menu_item:nth-child(3)').on('click', function() {
    location.href = './archive-artist.html';
});
$('.library_menu .menu_item:nth-child(4)').on('click', function() {
    location.href = './archive-album.html';
});
$('.library_menu .menu_item:nth-child(5)').on('click', function() {
    location.href = './archive-playlist.html';
});
$('.library_menu .menu_item:nth-child(6)').on('click', function() {
    location.href = './archive-received.html';
});
$('.library_menu .menu_item:last-child').on('click', function() {
    location.href = './archive-paid.html';
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
    //  미리보기용으로 during이 임의로 들어가있기때문에 클릭하면 닫히게 만듦
$('.loading_vibe').on('click', function() {
    document.querySelector('.loading_vibe').style.display = 'none';
    document.getElementById('container').style.display = 'block';
});

//  배너 닫기
$('.admin_banner_section, .banner_area').on('click', '.btn_close', function() {
    $('.admin_banner_section').hide();
});

//  플레이리스트 추가 팝업 모달 레이어 제어
$('.btn_add_item').click(function() {
    $('.modal').fadeIn(200);
});
$('.ly_btn_area').on('click', 'a[role=button]:not(.point)', function() {
    $('.modal').fadeOut(200);
}).on('click', 'a.point', function() {
    const motherModal = $(this).closest('.modal');
    let newPlaylist = motherModal.find('input#new_playlist');
    let bodyPlaylist = `<li class="list_item added__now">
    <div>
        <div class="thumb_area">
            <a class="link">
                <img src="img/album-dummy.jpg" class="thumb" alt="` + newPlaylist.val() + ` 플레이리스트 커버" />
            </a>
            <a role="button" aria-haspopup="dialog" class="btn_play_now"><span class="blind">재생하기</span></a>
            <div class="more_option only">
                <div class="dropdown_wrap">
                    <a role="button" aria-haspopup="menu" aria-expanded="false" class="btn_option_now"><span class="blind">옵션 보기</span></a>
                    <div role="menu" class="ly_option">
                        <a role="button" class="ly_item"><span>보관함에서 삭제</span></a>
                        <a role="button" class="ly_item">바로 다음에 추가</a>
                        <a role="button" class="ly_item">맨 아래에 추가</a>
                        <a class="ly_item">MP3 구매</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="info">
            <a class="title"><span class="text">` + newPlaylist.val() + `</span><span class="blind">페이지로 이동</span></a>
            <div class="artist"><span>0곡</span>
            </div>
        </div>
    </div>
</li>`;
    if (newPlaylist.val()) {
        $('.sub_list .list_item:first-child').after(bodyPlaylist);
        motherModal.fadeOut(200);
    } else if (!$('.form-alert').length) {
        let errorMsg = `<p class="form-alert">플레이리스트 이름을 확인해주세요.</p>`;
        newPlaylist.after(errorMsg);
        $('.form-alert').fadeIn(100);
    }
});
$('.ly_popup').on('keydown', 'input[type=text]', function() {
    ($(this).val()) ? $('.form-alert').fadeOut(100): false;
});

//  미리보기용 owlcarousel2
//  vue-carousel 대용
$(document).ready(function() {
    const owl = $('.owl-carousel');
    let startPosition = false;
    if (owl.has('.menu_item.on')) {
        startPosition = owl.find('.menu_item.on').index();
    }
    owl.owlCarousel({
        margin: 20,
        startPosition: startPosition,
        mouseDrag: true,
        touchDrag: true,
        autoWidth: true
    });
});