$(function(){
    var swiper = new Swiper('.swiper1', {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable : true,
        },
      });

    // 스와이프가 두개일 때 하는 방법
    var swiper = new Swiper('.swiper2', {  
    });

    //nav 
    $('.nav ul li').click(function(e){
        e.preventDefault();
        $('.nav ul li').removeClass('active');
        $(this).addClass('active');

        var id=$(this).find('a').attr('href');
        $('.nav-contents > div').hide();
        console.log(id);
        $(id).show();

        //bar 이동
        if($(this).find('a').attr('href')=='#nav2'){
          $('.nav span').css('margin-left','33.33%');
        }else if($(this).find('a').attr('href')=='#nav3'){
          $('.nav span').css('margin-left','66.66%');
        }else{
          $('.nav span').css('margin-left','0');
        }
    })
})