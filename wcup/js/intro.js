$(function(){
    //로딩
    $('.loading i').click(function(){
        $('.loading').hide();
        $('.swiper-container').show();
    })



    // 스와이프
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 생리컵 등록
    $('.usercup-upload > button').click(function(){
        console.log('버튼클릭');
        $('.upload-pop').show();
    })
    $('.upload-pop > button').click(function(){
        $('.upload-pop').hide();
    })

    $('.upload-pop .wrap-body .btn-group label').click(function(){
        $('.upload-pop .wrap-body .btn-group label').removeClass('active');
        $(this).addClass('active');
        console.log('사이즈클릭');
    })
    // 등록했습니다. 알람뜨게 하기
    // $('.upload-pop .bottomBtn2')
})