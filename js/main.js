$(function(){
   // Menu settings
   $('#menuToggle').on('click', function(){
      // $('#menuToggle').toggleClass('active');
      // $('body').toggleClass('body-push-toleft');
      $('.menu').toggleClass('open');
      $(this).find('i').toggleClass('fa-bars fa-angle-double-right');

   });

   //profile
   $('#profile .card button').on({
      mouseenter:function(){
         $('#profile .card').toggleClass('rotate');
         $(this).addClass('trans');
      },
      mouseleave:function(){
         $('#profile .card').toggleClass('rotate');
         $(this).removeClass('trans');
      }
   })
  
   //skills
   $('#skills .col').slice(0,3).show();
   $('#skills button.btn-add').click(function(){
      if($(this).text()=='More'){
         $(this).text('Fold');
         $('#skills .col:hidden').slice(0,3).slideDown();
         // $('#skills .more-skills').stop(true).slideDown(5000);
         // $('#skills .more-skills').stop(true).slideDown(1000);
      }else {
         $(this).text('More');
         $('#skills .col').slice(3,6).slideUp();
         // $('#skills .more-skills').stop(true).slideUp(1000);
      }
   })


   //portfolio
   //isotope 초기화
   var $grid=$('.portfolio-contents').isotope({
      itemSelector:'.portfolio'
   })

   //버튼 클릭할 때 해당 클래스를 가진 요소만 보여주기
   $('.portfolio-list ul li a').click(function(e){
      e.preventDefault();
      $('.portfolio-list ul li a').removeClass('active');
      $(this).addClass('active');

      //선택한 메뉴탭에서 해당 포폴 필터링해주기
      var selector=$(this).data('filter');
      console.log(selector);
      $grid.isotope({
         filter:selector
      })
   })

     
})