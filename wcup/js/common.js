$(function(){
    $('.bottomNav ul li').click(function(e){
        $('.bottomNav ul li').find('i').removeClass('on');
        // e.stopPropagation();
        // e.preventDefault();
        $(this).find('i').addClass('on');
    })
    $('.bottomNav ul li').focusout(function() {
        $('.bottomNav ul li').unbind();
    });
    
})