$(function(){
    //btnGroup
    //tooltip
    var tipBoxW=Number($('.tipBox').outerWidth());
    var tipBoxH=Number($('.tipBox').innerHeight());

    $('.btnGroup > a:nth-child(1)').click(function(){
        // console.log('안내정보');
        $('.tipBox').fadeToggle();
        $('.bg').show();
    })

    $('.card').click(function(){
        var windowH=$(window).height();
        var headerH=$('.ui-datepicker-header').height();
        var bottomNavH=$('.bottomNav').height();
        var cardH=windowH-(headerH+bottomNavH);
        if($('.card *').is('.col')){
           
            $('.card').css({
                'height':cardH 
            })
            $('.card, .ui-datepicker-header, .ui-widget-header, .ui-datepicker-title, .btnGroup, .ui-datepicker-prev, .ui-datepicker-next').addClass('swipe');
        }else{
             console.log('카드내용없음');
        }
       
    })

    $('.ui-datepicker-header, .ui-datepicker-title, .ui-widget-header, .ui-helper-clearfix').click(function(){
        $('.card').removeAttr('');
        $('.card').css({
            'height':'131px'
        })
        $('.card').removeClass('swipe');
        $('.ui-datepicker-header, .ui-widget-header, .ui-datepicker-title, .btnGroup, .ui-datepicker-prev, .ui-datepicker-next').removeClass('swipe');
    })

    
    $('.tabPop ul li i.icon-start').click(function(){
        var clickDay=$('tbody').find('td a.ui-state-active');
        console.log('생리시작함');
        console.log(clickDay);
        $(clickDay).addClass('start');
    })
    $('.tabPop ul li i.icon-love').click(function(){
        var clickDay=$('tbody').find('td a.ui-state-active');
        console.log('사랑함');
        $(clickDay).addClass('love');
    })
    $('.tabPop ul li i.icon-loveP').click(function(){
        var clickDay=$('tbody').find('td a.ui-state-active');
        console.log('사랑함피임');
        $(clickDay).addClass('loveP');
    })
    $('.tabPop ul li i.icon-drug').click(function(){
        var clickDay=$('tbody').find('td a.ui-state-active');
        console.log('약복용');
        $(clickDay).addClass('drug');
    })


    // setTimeout(function(){
        
    //     $('.btnGroup .tipBox').next('a').click(function(e){
    //         e.preventDefault();
    //         console.log('오늘클릭');
    //     })
    // },0);
});
