//
//  Script for Design prototype
//  디자인 facelift 시연용으로 작성된 스크립트
//
//  - 대부분 시연을 위한 스크립트로 실 개발용은 해당 기능에 상응하게 작성되어야 합니다.
//  - 기존 작업된 마크업과 클래스명을 고치지 않고 디자인을 변경 및 제안하는 과정에서 필요에 의해 작성된 부분이 많습니다.
//  - 특히 carousel UI의 경우 실제로는 [vue-carousel] 을 이용하는 것으로 보여 그에 맞게 주의해주세요.
//


    //  고정 레이아웃 요소
    const headerGNB = $('#header');
    const appContainer = $('.home');
    const vibePlayer = $('#player');
    
    //
    //  스크롤된 상황인지 체크하여 UI 통 제어
    //
    appContainer.on('scroll', function() {
        let scrollY = appContainer.scrollTop();
        console.log(scrollY);
        scrollY >= 64 ? appContainer.addClass('is_scroll') : appContainer.removeClass('is_scroll');
    });

    //
    //  페이지 로더 미리보기용
    //
    let vibeApp;
    
    function showPage() {
        $('.loading_vibe').hide();
        $('#container').show();
    }
    function loadingCheck() {
        vibeApp = setTimeout(showPage, 1800);
    }
    window.onload = function() {
        loadingCheck();
    }
    
    //
    //  아이템 옵션 레이어
    //
    $('.btn_option_now, .btn_option, .btn_drop_menu').click(function(e) {
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
        }
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
    $('.VueCarousel-navigation-next').click(function() {
        let motherSection = $(this).parent('div').find('.scroll_list');
        let sumWidth = 0;
        motherSection.find('.list_item').each(function() {
            sumWidth += parseInt($(this).width());
        });
        motherSection.animate({ left: '-=' + parseInt(motherSection.closest('div').width() + 20, 10) + 'px' }, 150);
        let motherPosition = motherSection.position();
        let motherX = (parseInt(motherPosition.left) * -1) + motherSection.closest('div').width();
        if (sumWidth <= motherX) {
            motherSection.animate({ left: '0' }, 250);
        }
    });
    
    //
    //  바이브 뮤직 플레이어 미리보기 제어
    //
    vibePlayer.on('click', '.btn_playlist', function() {
        vibePlayer.hasClass('open') ? vibePlayer.removeClass('open') : vibePlayer.addClass('open');
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

    //
    //  ON/OFF 상태를 보유한 버튼 제어
    //
    $('a.btn_like').click(function() {
        $(this).toggleClass('on');
    });

    $('.summary_thumb').clone().prependTo('.floating_bar .title');
    $('.floating_bar').prependTo('.content');
    $('.floating_select').appendTo('.floating_bar');

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
            appContainer.removeClass('on_checked');
        }
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
                    <img src="img/album_dummy.jpg" class="thumb" alt="` + newPlaylist.val() + ` 플레이리스트 커버" />
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

    // 썸네일 크기에 맞춰서 화살표 위치 맞추기
    $('.VueCarousel-navigation-next, .VueCarousel-navigation-prev').each(function() {
        thisNavH = parseInt($(this).outerHeight());
        thisThumbH = parseInt($(this).parent().find('img').parent().outerHeight());
        navPosition = "";

        if ($(this).parent().is('.list_wrap_track_rank')) {
            thisThumbH = parseInt($(this).parent().outerHeight());
        }
        navPosition = parseInt((thisThumbH / 2) - (thisNavH / 4));
        
        // 캐로셀 높이 값의 절반에서 화살표 높이의 1/4 값 빼기
        $(this).css({ top: navPosition });
        console.log(navPosition);
    });

    //
    //  트랙리스트에서 체크박스 클릭시 마다 숫자 카운팅 후 반영
    //
    $('.tracklist').on('click', 'input', function() {
        $('.tracklist').find(':checked').length ? appContainer.addClass('on_checked') : appContainer.removeClass('on_checked');
        let selectedTrack = $('.tracklist').find(':checked').length;
        $('.count_track').html(selectedTrack + '곡 선택');
    });

    //  선택된 곡 있을때 보이는 플로팅 레이어 닫기
    $('.floating_select').on('click', '.btn_close', function() {
        $('.tracklist').find(':checked').prop('checked', false);
        appContainer.removeClass('on_checked');
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
    //  차트 - 장르보기 펼치기
    //
    $('.end_section').on('click', '.btn_more_list', function() {
        $(this).prev('.list_wrap_genre').toggleClass('open');
    });

    //
    //  보관함에서 좋아하는 아티스트 취소
    //
    $('.subend_section').on('click', '.btn_like', function() {
        $(this).closest('.list_item').addClass('dislike').fadeOut(200);
        $(this).closest('tr').addClass('dislike').fadeOut(200);
    });

    //
    //  컨텐츠 제일 처음 배너가 있는지 체크 후 has_banner 클래스 주기
    //  모바일에서 배너가 있을 때 헤더 위치가 달라져야함.
    //
    if ($('#content > .admin_banner_section:first-child').is(':visible')) {
        appContainer.addClass('has_banner');
    }

    if ($('.today_headline').is(':visible')) {
        appContainer.addClass('is_gradation');
    }

    //  배너 닫기
    $('.admin_banner_section, .banner_area').on('click', '.btn_close', function() {
        if ($(this).closest('.admin_banner_section').is(':first-child')) {
            $('.home').removeClass('has_banner');
        }
        $('.admin_banner_section').hide();
    });

    //
    //  매거진 헤드라인 썸네일 카피해서 백그라운드 넣기
    //
    if ($('.today_headline')) {
        let copyThumb = $('.today_headline').find('img').attr('src');
        $('.today_headline .link_wrap').css('background-image', 'url("'+ copyThumb +'")');
    }

    //
    //  모달 - 팝업 레이어
    //  가사 아이콘 클릭, 보관함-플레이리스트 추가시
    //
    $('a.btn_lyrics').click(function() {
        $('.modal_lyrics').fadeIn(200);
    });

    $('.sub_list').on('click', '.btn_add_item', function() {
        console.log('클릭했음');
        $('.modal_playlist').fadeIn(200);
    });

    $('.modal').on('click', '.ly_close', function() {
        $(this).closest('.modal').fadeOut(200);
    });
    
    //  미리보기용 owlcarousel2
    //  vue-carousel 대용으로 가져왔음.
    //  원본 dom에서 on class를 가지는 현재 위치 메뉴의 index값을 기억하고
    //  recover된 owl에서 그 index값으로 x좌표 이동시키기
    if ($('.menu_list.owl-carousel').length) {
        let onPosition = $('.menu_item.on').parent().index();
        $('.menu_list.owl-carousel').owlCarousel({
            margin: 20,
            startPosition: onPosition,
            mouseDrag: true,
            touchDrag: true,
            autoWidth: true,
            nav: true,
            dots: false
        });
    }
    if ($('.list_wrap_genre .owl-carousel').length) {
        $('.list_wrap_genre .owl-carousel').owlCarousel({
            mouseDrag: true,
            touchDrag: true,
            nav: true,
            dots: false,
            responsive:{
                0: {
                    items: 2
                },
                767: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1280: {
                    items: 5
                }
            }
        });
    }
