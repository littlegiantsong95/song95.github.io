$(function(){
    $('.tab-nav li a').click(function(){
        $('.tab-nav li a').removeClass('active');
        $(this).addClass('active');
        var id=$(this).attr('href');
        $('.tab-contents .contents').hide();
        $(id).show();

    })
})