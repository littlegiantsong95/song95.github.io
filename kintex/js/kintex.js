$(function(){
    //언어변환 (#btn-lang) 
    $('#btn-lang').on({
        click:function(e){
            e.preventDefault();
            if($(this).hasClass('icon-eng')){
                $(this).removeClass('icon-eng').addClass('icon-kor');
                $('nav .btn-group .btn-tooltip').text('한국어버전');
            }else{
                $(this).removeClass('icon-kor').addClass('icon-eng');
                $('nav .btn-group .btn-tooltip').text('English ver.');
            }
        },
        mouseenter:function(){
            if($(this).hasClass('icon-kor')){ //현재 영어버전일 때 아이콘은 태극기이고, 한국어버전으로 바꾸고 싶은 사람이 호버하면
                $('nav .btn-group .btn-tooltip').show().text('한국어버전');
            }else{ 
                $('nav .btn-group .btn-tooltip').show().text('English ver.');
            }
        },
        mouseleave:function(){
            $('nav .btn-group .btn-tooltip').hide();
        }
    })



    //메인페이지swipe
    var swiper = new Swiper('.main-slide .swiper-container', {
        navigation: {
            nextEl: '.icon-80rightarrow',
            prevEl: '.icon-80leftarrow',
        },
        pagination: {
            el: '.main-slide .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: true,
        },
    });
    //pc <->모바일 이미지 소스 변경
    $(window).resize(function(e){
        e.preventDefault();
        var windowW=$(this).width();
        var slideImg=[];
        if(windowW<768){
            slideImg=['img/main_slide1_m.jpg','img/main_slide2_m.jpg','img/main_slide3_m.jpg']
        }else{//pc 일 때
            slideImg=['img/main_slide1.jpg','img/main_slide2.jpg','img/main_slide3.jpg']
        }
        // console.log(slideImg);

        //반복문으로 소스 변경
        $('.swiper-slide').each(function(i){
            $(this).find('img').attr('src',slideImg[i]);
        })
    }).resize();


    //이달의 전시

      var places={
          place1:[
            {
                imgSrc:'img/display1_3.jpg',
                dt:'홀가분 베이비페어',
                dd:'8.1(월)~8.10(수)'
            },
            {
                imgSrc:'img/display1_1.jpg',
                dt:'PREMIUM PET SHOW 반려동물박람회',
                dd:'8.12(금)~8.14(일)'
            },
            {
                imgSrc:'img/display1_2.jpg',
                dt:'코베 베이비페어',
                dd:'8.1(월)~8.10(수)'
            },
            {
                imgSrc:'img/display1_4.jpg',
                dt:'2019 KPCA 쇼',
                dd:'8.24(수)~8.26(금)'
            },
            {
                imgSrc:'img/display1_5.jpg',
                dt:'KOREA 화학기구박람회',
                dd:'8.1(월)~8.10(수)'
            }
          ],
        place2:[
        {
            imgSrc:'img/display2_1.jpg',
            dt:'2019 캠핑 & 피크닉페어',
            dd:'8.12(금)~8.14(일)'
        },
        {
            imgSrc:'img/display2_2.jpg',
            dt:'코리아빌드 하우징 박람회',
            dd:'8.1(월)~8.10(수)'
        },
        {
            imgSrc:'img/display2_3.jpg',
            dt:'리빙디자인박람회',
            dd:'8.1(월)~8.10(수)'
        },
        {
            imgSrc:'img/display2_4.jpg',
            dt:'베베로그 유아용품 페어',
            dd:'8.24(수)~8.26(금)'
        },
        {
            imgSrc:'img/display2_5.jpg',
            dt:'여름 크리스마스 디자인페어',
            dd:'8.1(월)~8.10(수)'
        }
        ]
      }
      //처음 화면 넣기
      var swiper2; 
      swiperUpdate('place1');
      function swiperUpdate(id){
        for (let index1 in places[id]){
            $('.contents .swiper-wrapper').append(`                    
                <li class="swiper-slide">
                    <div class="wrap">
                        <img src="${places[id][index1].imgSrc}" alt="">
                        <span class="icon icon-hot"></span>
                        <div class="over">
                            <dl>
                                <dt>${places[id][index1].dt}</dt>
                                <dd>${places[id][index1].dd}</dd>
                            </dl>
                        </div>
                    </div>
                </li>
            `);            
        }                
        
        if(swiper2!=undefined){
            console.log('초기화');       
            swiper2.destroy();     
        }  
        swiper2 = new Swiper('.latest-display .swiper-container', {
            slidesPerView: 3,
            spaceBetween: 10,
            mousewheel: false,
            loop: true,
            navigation: {
                nextEl: '.icon-arrow-next',
                prevEl: '.icon-arrow-prev',
            },
            grabCursor: true,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
               
                768: {
                  slidesPerView: 1,
                //   spaceBetween: 30,
                },
               
              }
        });
    }
    
    //라디오버튼 클릭
    $('.latest-display .radio label').click(function(){
        var id=$(this).attr('for');            
            
        $('.latest-display .contents .swiper-wrapper').empty();
        swiperUpdate(id);
        //다른 전시장 눌렀을 때 다시 일시정지버튼(시각적) 나오게 한다. 
        $('#btn-play-top').removeClass('icon-arrow-play').addClass('icon-arrow-stop');
    })
    //controller
    $('#btn-play-top').click(function(){     
        console.log('클릭');
        if($(this).hasClass('icon-arrow-stop')){ //재생중일 때(버튼이 일시정지버튼)
            swiper2.autoplay.stop();
            $(this).removeClass('icon-arrow-stop').addClass('icon-arrow-play');
        }else{
            swiper2.autoplay.start();
            $(this).removeClass('icon-arrow-play').addClass('icon-arrow-stop');
        }
        
    })
                
      
    
    //주요서비스
    $('.service .text-box button').on({
        mouseenter:function(){
            $(this).parents('.wrap').find('span').css({
                'transform': 'translateY(-30px) scale(1.1)',
                'transition': '0.3s',
            })
            if($(this).text()=='전시행사'){   
                $('.service .group').removeClass('center').addClass('both');
                $('.service .group>.line1').addClass('Lturn');
            }else if($(this).text()=='문화행사'){
                $('.service .group').removeClass('both').addClass('center');
                $('.service .group>.line1').addClass('Rturn');
                $('.service .group>.line2').addClass('Lturn');
            }else{
                $('.service .group').removeClass('center').addClass('both');
                $('.service .group>.line2').addClass('Rturn');
            }
        },
        mouseleave:function(){            
            $('.service .group>span ').removeClass('Lturn Rturn');
            $(this).parents('.wrap').find('span').removeAttr('style');
        }
    })

    var play=setInterval(move, 2000);
    function move(){
        $('.bar .on .wrap ul').animate({
            'margin-top':-60
        },function(){
            $('.bar .on .wrap ul li').first().appendTo('.bar .on .wrap ul');
            $('.bar .on .wrap ul').css('margin-top', 0); 
        })
    }

    $(window).resize(function(e){
        e.preventDefault();
        var windowW=$(window).width();  
        $('.bar .bars').off('mouseenter mouseleave');
        if(windowW<768){
            $('.bar .bars').removeAttr('style');
            clearInterval(play);
        }else{
            clearInterval(play);
            play=setInterval(move, 2000);
            $('.bar .bars').on({
                mouseenter:function(){
                    if(!$(this).hasClass('on')){ //on이 있으면 마우스 올렸을 때 롤링이 일단 멈춰야함.
                         //on이 없는 거에 마우스 올리면 일단 펼져진다음(on을 준다음) 롤링이 멈췄다가 마우스를 떼었을 때 플레이 되어야함.
                        $('.bar .bars').removeClass('on');

                        $(this).addClass('on');                        
                    }
                    clearInterval(play);
                },
                mouseleave:function(){
                    if($(this).hasClass('on')){ //on이 있는 곳에서 마우스를 떼면 롤링되어야 함
                        clearInterval(play);
                        play=setInterval(move, 2000);
                    }
                }
            })
        }
    }).resize();    
    
    //갤러리를 보여주기위한 전역변수 설정
    var start=0;
    var imgLength=0;
          
    $(window).resize(function(){
        var windowW=$(window).width();                
        if(windowW>992){ //갤러리 pc
            start=4;
            imgLength=4;
        }else if(windowW>768){//갤러리 tablet
            start=6;
            imgLength=3;
        }else{//갤러리 mobile   
            start=2;
            imgLength=2;
        }
        $('.gallery .contents ul li').hide();
        $('.gallery .contents ul li').slice(0,start).show();
    }).resize();

    $('.gallery button').click(function(e){
        e.preventDefault();
        if($(this).hasClass('icon-dropupw')){ //버튼이 위로올라가기 버튼이면
            $('.gallery .contents ul li').hide().slice(0,imgLength).show(); //초기상태
            $(this).removeClass('icon-dropupw').addClass('icon-60wplus');
        }else{// 더보기버튼이면
            $('.gallery .contents ul li:hidden').slice(0,imgLength).slideDown();
            if($('.gallery .contents ul li:hidden').length==0){
                $(this).removeClass('icon-60wplus').addClass('icon-dropupw');
            }
        }
    })

    

    //갤러리 팝업 - 스크롤, 열고 닫기
    // var windowH=$(window).height();
    // var galleryS=$('.gallery-pop h3').innerHeight();
    // console.log('화면 높이',windowH);
    // console.log('제목높이', galleryS);

    //갤러리 이미지
    // $('.gallery-pop').height(windowH-galleryS);

    $('.gallery ul li .over').click(function(e){
       
        e.preventDefault();
        $('.gallery-pop, .popup-bg').fadeIn();
        var alt=$(this).prev().attr('alt');//gallery - 제목 불러오기
        $('.gallery-pop h3').text(alt);// gallery pop 에 담기
        //gallery - 이미지 불러오기
        // var imgOrder=$(this).parents('li').index(); 
        var imgOrder=$(this).parents('li').index(); 
        console.log('몇번째 갤러리 선택?',imgOrder);
        var galleryG=[
            ['gallery_pop1','gallery_pop2','gallery_pop3','gallery_pop4','gallery_pop5','gallery_pop6','gallery_pop7','gallery_pop8','gallery_pop9','gallery_pop10','gallery_pop11','gallery_pop12'],
            ['illust1','illust2','illust3','illust4','illust5','illust6','illust7','illust8','illust9'],
            ['kakao_1','kakao_2','kakao_3','kakao_4','kakao_5','kakao_6','kakao_7','kakao_8','kakao_9','kakao_10','kakao_11','kakao_12'],
            ['IT1','IT2','IT3','IT4','IT5'],
            ['matis1','matis2','matis3','matis4','matis5','matis6','matis7','matis8','matis9','matis10'],
            ['school1','school2','school3'],
            ['matis1','matis2','matis3','matis4','matis5','matis6','matis7','matis8','matis9','matis10'],            
            ['cat1','cat2','cat3','cat4','cat5','cat6','cat7','cat8','cat9'],
            ['gallery_pop1','gallery_pop2','gallery_pop3','gallery_pop4','gallery_pop5','gallery_pop6','gallery_pop7','gallery_pop8','gallery_pop9','gallery_pop10','gallery_pop11','gallery_pop12'],
            ['illust1','illust2','illust3','illust4','illust5','illust6','illust7','illust8','illust9'],
            ['kakao_1','kakao_2','kakao_3','kakao_4','kakao_5','kakao_6','kakao_7','kakao_8','kakao_9','kakao_10','kakao_11','kakao_12'],            
            ['matis1','matis2','matis3','matis4','matis5','matis6','matis7','matis8','matis9','matis10']           
        ]
        // console.log(galleryG[2]); // 배열에 담은 소스 잘 나오나 확인
        var gCount=galleryG[imgOrder].length;
        $('.gallery-pop .contents figure').remove(); //다시 클릭하면 이미지 리스트 초기화
        for(i=0; i< gCount; i++){
            // console.log(galleryG[i]);
            
            // $(this).each(function(){
                // $('.gallery-pop ul').append('<li><img src="img/'+galleryG[imgOrder][i]+'.jpg"></li>');
                $('.gallery-pop .contents').append('<figure><img src="img/'+galleryG[imgOrder][i]+'.jpg"></figure>');
            // })
        }
    })
    $('.gallery-pop button').click(function(e){
        e.preventDefault();
        $('.gallery-pop, .popup-bg').fadeOut();
    })

    //scroll 하면 header스타일변경(화면이 gallery 위치에 있을 때 다시 변화하게)
    $('header').off('scroll');
                
    $(window).scroll(function(){
        var scrollTop=$(this).scrollTop();
        // console.log(scrollTop);
        // console.log($('.gallery').position().top);
        var galleryY=$('.gallery').position().top;
        if(scrollTop>200 && scrollTop<galleryY-1){
            $('header').addClass('scroll');
        }else if(scrollTop<0 && scrollTop>galleryY){
            $('header').removeClass('scroll');
        }else{
            $('header').removeClass('scroll');
        }
    })
    // pc & 모바일============================================================
    $(window).resize(function(){
        var windowW=$(window).width();
        $('.gnb li').off('mouseover');
        $('.gnb li').off('mouseleave');
        $('nav .gnb > li').off('hover');
        $('#btn-search-open, nav > button, .gnb li, header nav .gnb > li a').off('click');
        $('.gnb').removeAttr('style');
        if(windowW>992){ //pc
            // console.log('992이상');
            //네비게이션
            $('.gnb li').mouseover(function(e){
                e.preventDefault();
                // console.log('클릭했음')
                $('header .bg, header nav .banner, header .gnb ul').stop().slideDown();
            })
            $('.gnb li').mouseleave(function(){
                $('header .bg, header nav .banner, header .gnb ul').stop().slideUp();
            })
            //네비게이션 메뉴에 호버시 왼쪽 배너 변환
            $('nav .gnb > li').hover(
                function(){
                    if($(this).children('a').text()=='행사일정'){
                        // console.log('행사일정 배너');
                        $('nav .banner').css({
                            'background':'url(img/nav-menu-img1.png)',
                        });
                    }else if($(this).children('a').text()=='시설안내'){
                        // console.log('시널안내 배너');
                        $('nav .banner').css({
                            'background':'url(img/nav-menu-img2.png)',
                        });
                    }else if($(this).children('a').text()=='킨텍스임대'){
                        // console.log('킨텍스임대 배너');
                        $('nav .banner').css({
                            'background':'url(img/nav-menu-img3.png)',
                        });
                    }else if($(this).children('a').text()=='홍보센터'){
                        // console.log('홍보센터 배너');
                        $('nav .banner').css({
                            'background':'url(img/nav-menu-img1.png)',
                        });
                    }else if($(this).children('a').text()=='고객센터'){
                        // console.log('고객센터 배너');
                        $('nav .banner').css({
                            'background':'url(img/nav-menu-img2.png)',
                        });
                    }else{
                        // console.log('킨텍스소식 배너');
                        $('nav .banner').css({
                            'background':'url(img/nav-menu-img3.png)',
                        });
                    }
                }
            )
            //검색
            $('#btn-search-open').click(function(e){
                e.preventDefault();               
                $(this).toggleClass('icon-40close icon-bsearch');
                $('nav form').toggleClass('open');
            })
        }else if(windowW>768 && windowW<992){
            
        }
        else{ //mobile
            // console.log('mobile');
            $('nav > button').click(function(e){
                e.preventDefault();
                //오른쪽 메뉴바 나오기 & 아이콘바꾸기 & 왼쪽으로 밀기
                $(this).toggleClass('on');
                $('header nav').toggleClass('open');
                $('header, section, footer, .quick').toggleClass('open');

                //메뉴버튼 누르면 swipe 자동플레이 , 정지하기
                if($(this).hasClass('on')){
                    swiper.autoplay.stop();
                }else{
                    swiper.autoplay.start();
                }
            })
            $('header nav .gnb > li a').click(function(){
                // $('.gnb > ul')slideUp();
                $(this).next('ul').stop().slideToggle();
                $(this).find('i').toggleClass('icon-dropup icon-dropdown');
            })      
            //scroll만들기 위해 nav 높이 구하기
            var formH=$('header form').innerHeight();
            var appH=$('nav .app').height();
            var navH=$('header nav').height();
            // console.log('폼높이:',formH,'앱높이:',appH, '네비게이션 전체높이',navH);
            $('header nav .gnb').height(navH-(formH+appH));
        }
    }).resize();
    
    //로그인 팝업 띄우기
    $('nav .btn-group .icon-blogin').click(function(e){
        e.preventDefault();
        $('.login-pop #id, .login-pop #pw').val('');

        if($(this).hasClass('login')){
            $(this).append('<button class="logout">로그아웃하기</button>');
        }else{
            $('.login-pop, .popup-bg').fadeIn();
        }
    })

    //닫기버튼 누를 때 
    $('.login-pop .icon-40close').click(function(e){
        e.preventDefault();
        $('.login-pop, .popup-bg').fadeOut();
    })

    //최종 로그인버튼 누르면
    $('.login-pop #id, .login-pop #pw').val('');
    $('.input button').click(function(e){
        e.preventDefault();
        var id=$('.login-pop #id').val();
        var pw=$('.login-pop #pw').val();
        $('.message').remove();

        if(id==''){
            $('.login-pop #id').after('<p class="message">아이디를 입력하세요.</p>').focus();
        }else if(pw==''){
            $('.login-pop #pw').after('<p class="message">패스워드를 입력하세요.</p>').focus();
        }else{
            var id=$('.login-pop #id').val();
            // alert('환영합니다.');
            $('nav .btn-group a:nth-child(1)').addClass('login');
            $('nav>.btn-group a .user-name').show().text(id);
            $('.login-pop, .popup-bg').fadeOut();
        }
        $('nav .btn-group a:nth-child(1)').addClass('login');

    })

    //동적으로 생성된 로그아웃버튼 누르면
    $('nav .btn-group').on('click', '.logout',function(e){
        e.preventDefault();
        if($('nav>.btn-group .user-name').hasClass('login')){ //배지가 있다면
            $(this).remove().removeClass('login');  // 없애고
        }else{ //다시 없어졌다면
            $('nav>.btn-group .user-name').addClass('login'); //넣어준다.
        }
        $('nav>.btn-group button').remove(); //동적 생성된 로그아웃 메세지 지우기
        $('nav .btn-group .icon-blogin').removeClass('login'); //로그아웃한 상태에서 다시 누르면 로그인팝업열기

    })

   

   
})


