$(function() {
  //캘린더
  // var cur = -1, prv = -1;

  $.datepicker.setDefaults({
    dateFormat: 'yy년mm월dd일',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년',
    showOtherMonths: true, // 여백 날짜 표기
  });

  //단일
  $('#datepicker, #datepicker2, #datepicker3').datepicker();

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }
    return date;
  }

  //bg클릭 시
  $('.bg').click(function() {
    if ($('.tipBox, .cupEdit, .cupInput, .cupInputTip, .msg').show()) {
      $(this).hide();
      $('.tipBox, .cupEdit, .cupInput, .cupInputTip, .msg').hide();

    } else {
      $(this).show();
    }
  })

  $('.tabPop li a i:not(.icon-plus)').click(function(event) {
    // console.log('클릭');

    // $('.tabPop li a .icon-start').click(function() {
    $('.tabPop').hide();
    var trIndex = $('.ui-state-active').parents('tr').index();
    var tdIndex = $('.ui-state-active').parent('td').index();
    var date = $('.ui-state-active').parent('td').text();

    var icon = $(this).attr('class'); // 해당 아이콘
    var iconT = $(this).next('span').text(); // 해당 텍스트
    $('tr' [trIndex]).find('td' [tdIndex]).append(icon);

    //초기화
    $('.tabPop').removeClass('open');

    //생리시작 혹은 생리끝 입력했을때
    // if ($(event.target).is('.icon-start') || $(event.target).is('.icon-end')) {
    if ($(event.target).is('.icon-start')) {
      //클릭할 때 한글자 숫자에 0붙여서 카드 레이아웃 맞추기
      function addZeros(date) {
        return (date < 10) ? '0' + date : (date < 100) ? '' + date : '' + date;
      }

      var isCheck = 0;
      var bool = true;

      isCheck = $('section .card .col>span:contains(' + addZeros(date) + ')').text();
      bool = (isCheck == 0) ? true : false;
      //카드 생성
      if (bool) {
        $('.card').children('span').after(`
            <div class="col">
                <span>${addZeros(date)}</span>
                <div class="box">
                    <div>
                        <i class="${icon}Small"></i>
                        <span>${iconT}</span>
                    </div>
                    <div class="cupRecord">
                     
                    </div>
                    <div class="conRecord">
                       
                    </div>
                </div>
            </div>
        `);
      }
      else{
        var log = '';
        log = $('section .card .col>span:contains(' + addZeros(date) + ')').parent();
        log.remove();
      }
    }
  })

  //json에 담기
  var plusContents = {
    "symptom": []
  };
  var getPlusContents;
  var objPlusContents;
  var putCard;

  $('#symptom .col i').click(function() {
    // var uniquePlusContents = [];
    // $.each(plusContents, function(i, el){
    //     if($.inArray(el, uniquePlusContents) === -1) uniquePlusContents.push(el);
    // });

    // uniquePlusContents.symptom.push($(this).data('key'));
    // var jsonPlusContents=JSON.stringify(uniquePlusContents);
    // localStorage.setItem('uniquePlusContents',jsonPlusContents);
    // getPlusContents=localStorage.getItem('uniquePlusContents');
    // objPlusContents=JSON.parse(getPlusContents);
    // putCard=objPlusContents.symptom;

    plusContents.symptom.push($(this).data('key'));
    var jsonPlusContents = JSON.stringify(plusContents);
    localStorage.setItem('plusContents', jsonPlusContents);
    getPlusContents = localStorage.getItem('plusContents');
    objPlusContents = JSON.parse(getPlusContents);
    putCard = objPlusContents.symptom;

  })

  $('.top a:nth-of-type(2)').click(function(e) {
    e.preventDefault();
    parent.location.href = 'cal.html?cardCon=' + objPlusContents;
  })
})
