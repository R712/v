# 바이브 웹 PC facelift 마크업 가이드

- - -

## <a id="guidemap" href="#guidemap">🧭</a> 목차 
해당 섹션의 제목 옆 🧭 클릭시 이 곳으로 돌아옵니다.

🌍 [미리보기](#preview)   
0. [안녕하세요](#prologue)
1. [HTML 기본](#html-base)
    * [HTML 부가 요소](#html-add)
    * [유틸리티 클래스](#html-uitility)
    * [스티키 플로팅 바](#exp-sticky)
2. [CSS 가이드](#css-rule)
    * [전역 변수 사용법](#css-config)
    * [자주 사용된 CSS 트릭](#css-trick)
    * [SVG 마스크 제어](#css-mask)
    * [가상 요소를 이용한 꾸밈](#css-deco)
    * [그라데이션 덮기](#css-gradation)
    * [0.5px 만드는 법](#css-half-border)

- - -

## 🌍 미리보기 <a id="preview" href="#preview"></a> [🧭](#guidemap)

* GNB
   - 홈 투데이 https://r712.github.io/v/
   - 차트 https://r712.github.io/v/chart.html
   - DJ스테이션 https://r712.github.io/v/djstation.html
   - 이달의노래 https://r712.github.io/v/monthly.html
   - 그 외 검색 및 플로팅 레이어등
* 싱글페이지
   - 앨범 https://r712.github.io/v/album.html
   - 아티스트 https://r712.github.io/v/artist.html
   - 노래가사 https://r712.github.io/v/song-lyrics.html
* 멤버십
   - 멤버십구독 https://r712.github.io/v/subscription.html
   - 내멤버십 https://r712.github.io/v/mymembership.html
   - 내감상량 https://r712.github.io/v/listening.html
   - 기프트카드 https://r712.github.io/v/giftcard.html
* 보관함
   - 믹스테잎 https://r712.github.io/v/archive.html
   - 노래 https://r712.github.io/v/archive-song.html
   - 아티스트 https://r712.github.io/v/archive-artist.html
   - 앨범 https://r712.github.io/v/archive-album.html
   - 플레이리스트 https://r712.github.io/v/archive-playlist.html
   - 받은노래 https://r712.github.io/v/archive-received.html
   - 구매한노래 https://r712.github.io/v/archive-paid.html
   
### 확인사항
- 모바일 해상도 및 중간 태블릿 해상도 반응형 대응.
- 모던브라우저 지원. (IE10 이하 미지원)
- 실 개발에서는 Vue-carousel을 쓴 것으로 보이는 부분을 구현할 수 없어 owl-carousel로 대치해 두었음. ex) 보관함 모바일 해상도 메뉴
- 대부분의 jquery, javascript는 비교적 쉬운 웹 프로토타입 시연을 위해 간단히 작성되었으며 사용을 권하지 않습니다.
- 웹폰트 Noto Sans를 가져옵니다.
- 사진 및 library 대부분을 외부 CDN에 의존하고 있고, github pages를 이용한 미리보기라 느릴 수 있습니다.
   


- - -

## 안녕하세요 <a id="prologue" href="#prologue"></a> [🧭](#guidemap)

* 뼈대가 되는 마크업은 라이브 서버의 브라우저상에서 가져온 HTML입니다. 따라서 프론트엔드 개발 내부 설정과 프로세스에 따라 컴파일 과정을 유추하는데 한계가 있는 배경에서 디자이너 겸 퍼블리셔에 의해 작성된 내용입니다.
* 위 내용때문에 class명과 html구조 전반적으로 기존 개발팀에서 작성한 내용을 따랐습니다.
* 작업자 본인은 바이브팀이 아닌 외부에서 개발 세팅과 스펙에 대한 이해없이 작업하는 환경이었기에, 이후 작업자에게 유연한 대처 및 추가 문의가 필요할 수 있습니다.
* 관련하여 소폭 A/S는 라인메신저로 직접 연락주시거나, 이메일로 모아서 보내주시면 확인후 회신토록 하겠습니다.
> 작성자: 한아름   
> 라인메신저: @road712  
> 이메일: armful.r@gmail.com   
> 작업기간 : 2020년 12월 - 1월 5일   
> 가이드 마지막 업데이트 : 2020년 12월 31일

- - -

## HTML 기본 <a id="html-base" href="#html-base"></a> [🧭](#guidemap)

기본적으로 아래와 같은 구조로 레이아웃이 구성되어 있습니다.

```html
<body>
    <!-- 앱 wrapper -->
    <div id="app" class="wrap">
        <div class="home">
            <!-- 헤더 header/GNB -->
            <header id="header" class="header">...</header>
            <!-- 컨테이너 및 컨텐츠 container/content -->
            <div id="container" class="container">
                <div id="content" class="content">...</div>
            </div>
            <!-- 푸터 footer -->
            <footer class="footer">...</footer>
            <!-- 부가요소 -->
            < 요소: 프리로더, 토스트, 레이어 등>
            <!-- 플레이어 player-->
            <div id="player">
                <!-- 플레이어 컨트롤러 player controller bar -->
                <div class="player_controller">...</div>
                <!-- 플레이어 재생목록 player playlist -->
                <div class="ly_playlist">...</div>
            </div>
        </div>
    </div>
</body>
```

- - -

## HTML 부가 요소 <a id="html-add" href="#html-add"></a> [🧭](#guidemap)

**프리로더** pre-loader
```html
<div class="loading_vibe">
```
**플로팅 바** floating bar
```html
<div class="floating_bar">
```
**검색창 보조 레이어** recent keyword area
```html
<div class="recent_keyword_area">
```
**아이템 더보기 옵션 레이어** more option layer
```html
<div class="dropdown_wrap">
    <a role="button" class="btn_option">
        <span class="blind">옵션 보기</span>
    </a>
    <div role="menu" class="ly_option">
        <a role="button" class="ly_item"><span>좋아요</span></a>
        <a role="button" class="ly_item"><span>구독</span></a>
    </div>
</div>
```

- - -

## 유틸리티 클래스 <a id="html-utility" href="#html-utility">.</a> [🧭](#guidemap)

아래는 바이브 웹 전역에서 사용중인 클래스명입니다.

### `class="blind"`
HTML에서 유의미하나 시각적으로 숨기거나, 대치되어야하는 요소는 `.blind` 클래스를 부여합니다. 목차 [가상 요소를 이용한 꾸밈](#css-deco) 예시에도 포함된 케이스입니다.

### `class="on"`
ON/OFF와 같이 상태를 표시해야 하는 경우 `.on` 클래스를 추가합니다.

**해당되는 예시**
* 좋아요 버튼
* 보관함 추가 버튼

아래와 같이 `class="on"`을 중첩 토글하여 사용하며, 스크립트로 클래스를 제어합니다.
```html
<a class="btn_like">좋아요</a>
<a class="btn_like on">좋아함</a>
```

### `PC/모바일 대치 요소`
배너와 같은 이미지의 경우 PC용과 모바일용을 모두 HTML에 포함하여 작성한 후, css media query를 이용하여 때에 따라 다른 이미지를 보여줍니다. 다만, class명이 통일되어있진 않은 것으로 확인됩니다. 아래 예문의 class명을 확인해주세요.
```html
<a class="banner_area">
    <img src="pc.png" class="img_pc" />
    <img src="mobile.png" class="img_m" />
</a>
<a class="banner_area">
    <img src="pc.png" class="image_pc" />
    <img src="mobile.png" class="image_mobile" />
</a>
```

## 스티키 플로팅 바 <a id="exp-sticky" href="#exp-sticky">.</a> [🧭](#guidemap)

**해당되는 예시 페이지**
* 보관함 - 노래
* 앨범 상세 페이지
* 노래(가사) 상세 페이지

페이지 위에 떠있으며, 스크롤시 따라 붙는 스티키 요소는 `class="floating_bar"` 클래스를 추가하시고, script에서 스크롤 중임을 확인하고 레이아웃 요소중 `<div id="content">`에 `class="on-scroll"`를 토글하여 보완합니다. CSS의 `position: sticy` 를 이용하여 스크롤에 따라붙도록 작성되어 있습니다.

```html
<div id="content">
    <!-- 평상시에는 숨어있다가, 스크롤시에만 내용을 보여줍니다. -->
    <div class="floating_bar">...</div>
</div>
```
```javascript
const appContent = $('#content');

window.onscroll = function() { stickyNav() };

function stickyNav() {
    let scrollY = $(window).scrollTop();
    scrollY >= 150 ? appContent.addClass('on-scroll') : appContent.removeClass('on-scroll');
}
```

- - -

## CSS 가이드 <a id="css-rule" href="#css-rule">#</a> [🧭](#guidemap)

이 작업은 `VScode`에서 `SCSS`를 이용하여 작성한 후, `Live Sass Compiler` 플러그인을 이용하여 최종 컴파일 된 CSS를 사용합니다. 작업자 기준 상황에 따라 유연한 선에서 아래를 지키며 작성되었습니다.

### **Property 순서**
* 위치와 상태를 표현 `z-index, position, left, top`
* 디스플레이 타입 및 관련 보조 `display, align-items, justify-content`
* 바깥부터 안쪽으로의 규격 `margin, padding, width, height`
* 바깥부터 안쪽으로의 선/배경/색 `border, background, color`
* 폰트 `font-xxx, line-height`
* 정렬 `text-align, vertical-align`
* 브라우저별 선언 필요한 property `-webkit-, -moz-, -ms-, -o-`
    - 모양의 마감/변형 `border-radius, box-shadow, transform`
    - 애니메이션 `animation, transition`

```scss
.sample {
    z-index: 5;
    position: absolute;
    left: 0;
    top: 50%;
    display: flex;
    align-items: center;
    padding: 20px;
    width: 50px;
    height: 50px;
    border: 1px solid var(--v-c-border);
    color: var(--v-c-black);
    font-size: var(--v-font-s);
    border-radius: var(--v-radius);
    transform: translateY(-50%);
}
```

- - -

## 전역 변수 사용법 <a id="css-config" href="#css-config">#</a> [🧭](#guidemap)

반복되어서 사용되는 컬러, 사이즈 등은 CSS의 최상단에 전역 설정인 `:root {...}` 를 이용해 아래처럼 사용할 수 있습니다. 기본적으로 보통의 개발언어에서 변수를 사용하는 법과 같습니다.   

기존의 방법대로 값을 하나하나 넣어서 작성하셔도 문제는 없지만, 아시다시피 디자인 가이드와 밀접하며 통일되어야하는 부분을 편리하게 유지보수 하기 위함입니다.

> 내부 개발 컴파일 전에 이미 다른 룰을 사용한 경우, 기존 방법으로 작성해주셔야 합니다.

```scss
:root {
    //
    //  color rule
    //
    --v-c-black: #000;
    --v-c-gray: #8E8E93;
    --v-c-white: #FFF;
    --v-c-border: #2C2C2E;
    --v-c-border-light: #151515;
    --v-c-input: #1C1C1E;
    --v-c-point: #FF0050;
    //
    //  layout and style rule
    //
    --v-min-width: 319px;
    --v-max-width: 1800px;
    --v-radius-l: 10px;
    --v-radius: 0;
    --v-radius-s: 3px;
    //
    //  font size rule
    //
    --v-font-xl: 20px;
    --v-font-l: 17px;
    --v-font-m: 15px;
    --v-font-s: 13px;
    --v-font-xxxxl: 34px;
    --v-font-xxxl: 28px;
    --v-font-xxl: 22px;
    --v-font-xs: 12px;
}
// 사용시에는 아래와 같습니다.
.button {
    color: var(--v-c-point);
    font-size: var(--v-font-m);
    border-radius: var(--v-radius-s);
}
```

- - -

## 자주 사용된 CSS 트릭 <a id="css-trick" href="#css-trick">#</a> [🧭](#guidemap)

**일반적인 방법으로 중앙 정렬 잡기 어려울 때**
> 요소의 높이값이 고정인 경우 transform 대신에 margin값을 빼서 작성하여도 되나, 해상도마다 다른 크기여서 하나하나 작성하는 번거로움을 줄이면서 규격이 고정이지 않은 경우 용이합니다.

```scss
// 가로로 중앙
.centoring {
    position: relative; // 또는 absolute, fixed
    left: 50%; // 부모 요소 중앙부터 시작이 되서 오른쪽으로 치우칩니다.
    transform: translateX(-50%); // 요소크기의 50%만큼 X값을 옮겨 치우침을 교정합니다.
}
// 세로로 중앙
.centoring {
    position: relative; // 또는 absolute, fixed
    top: 50%; // 부모 요소 중앙부터 시작이 되서 아래쪽으로 치우칩니다.
    transform: translateY(-50%); // 요소크기의 50%만큼 Y값을 옮겨 치우침을 교정합니다.
}
```

**부모요소의 너비보다 큰 자식요소가 필요할 때**
> 배너, 특수 컨텐츠와 같이 해상도를 적극 활용해 시원한 뷰가 필요한 경우

```scss
.banner {
    margin: 0 -20px; // 필요한 좌우 단일 여백을 빼줍니다.
    width: calc(100% + 40px); // 여백의 합을 더합니다.
}
```

- - -

## SVG 마스크 제어 <a id="css-mask" href="#css-mask">#</a> [🧭](#guidemap)

현재 반복되어 사용되는 단일컬러의 SVG는 컬러 제어가 필요한 경우 두가지 이상의 같은 모양의 아이콘을 사용하지 않고, 단일 파일과 CSS의 `mask` 속성을 사용해 작성되었습니다. CSS의 `background` 사용법과 동일하지만 아래와 같이 다름을 유의해주세요.

```scss
/* 기존 방식. 문제는 없으나 배경으로 넣은 svg의 컬러를 바꿀 수가 없음. */
.normal-case {
    background: #000 url('icon.svg') no-repeat center;
}
/*
    기존 background 작성법과 유사하나
    mask: 로 작성 후에
    background-color: 를 제어해야합니다.
    명시상으론 배경색이지만 svg의 모양만큼 반전시켜 마스크를 입히기 때문에
    보여져야하는 svg icon의 fill color를 작성하는 원리입니다.
*/
.smart-svg-mask-case {
    mask: url('icon.svg') no-repeat center;
    background-color: #FFF;
}
/*
    마우스오버시 변경시킬 경우
    아래와 같이 background-color: 만을 제어합니다.
*/
.smart-svg-mask-case {
    mask: url('icon.svg') no-repeat center;
    background-color: #FFF;
    &:hover {
        background-color: #000;
    }
}
```

- - -

## 가상 요소를 이용한 꾸밈 <a id="css-deco" href="#css-deco">#</a> [🧭](#guidemap)

현재 바이브의 전반적인 마크업 구조는 꾸밈요소인 아이콘을 CSS에서 가상요소를 만들어 스타일을 입힙니다. 이와 같은 방식으로 명료한 텍스트 라벨링인 [MP3 구매하기]와 시각적 아이콘 디자인을 분리할 수 있습니다.

```html
<a class="link_buy_mp3"><span class="blind">MP3 구매하기</span></a>
```
```scss
.link_buy_mp3::before {
    content: 'MP3';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 18px;
    background: var(--v-c-border);
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    font-size: 10px;
    border-radius: var(--v-radius-s);
}
```

- - -

## 그라데이션 덮기 <a id="css-gradation" href="#css-gradation">#</a> [🧭](#guidemap)

앨범 아트 등 썸네일에는 마우스오버시 그라데이션이 덮입니다. 아래와 같은 스타일로 작성되어 있습니다.

```scss
.thumbnail {
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    }
}
```

- - -

## 0.5px 만드는 법 <a id="css-half-border" href="#css-half-border">#</a> [🧭](#guidemap)
디자이너의 시안과 레티나 디스플레이 등에선 0.5px를 표현이 가능합니다.   
다만 현재 표준 브라우저들의 대부분은 1px이 최소값이므로 섬세한 표현이 꼭 필요한 경우 아래와 같은 원리로 표현할 수 있습니다.
* 현재 GNB 영역의 seperator 참고

```scss
// 기존 방식
.original {
    border-top: 1px solid var(--v-c-border);
}
// 번거롭지만 0.5px를 표현할 수 있는 방식
.half-border {
    position: relative; // 포지션의 상속위치 선언
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0; // 보여질 선의 위치는 position으로 제어
        width: 100%;
        height: 1px; // 요소의 높이 또는 넓이를 1px 선언
        background: var(--v-c-border); // 선 컬러를 배경색으로 선언
        transform: scaleY(0.5); // scaleX, scaleY를 이용하여 0.5배율로 축소
    }
}
```

- - -
