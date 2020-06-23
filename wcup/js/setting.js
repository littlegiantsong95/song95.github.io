$(function(){
    //reset
    $('.set-menu .reset').click(function(){
        $('.reset-popup').css('display',"block");
    })

    $('.reset-popup button').click(function(){
        $('.reset-popup').css('display',"none");
    })

    // 2depth question 자주질문 드롭다운 업
    $(".toggle").hide();
    $(".trigger").click(function(){
        $(this).next(".toggle").slideToggle("slow");
        $(".trigger").removeClass('active');
        $(this).toggleClass('active');
        $(this).find('button').toggleClass('icon-dropdownG icon-dropup');

        // 다시 탭 했을 때는 active 클래스 없애기 : height로 불러오기
        var doubleTab=$(this).next('.toggle').height()>1;
        if(doubleTab == true){
            // console.log('두번 탭');
            $(this).removeClass('active'); 
        }
    });

    // 문의하기 팝업
    $('.bottomBtn').click(function(){
        $('.message').show();
    })
    $('.message form button').click(function(){
        $('.message').hide();
    })


})