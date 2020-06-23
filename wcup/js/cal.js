$(function() {
  const array = Array(300).fill(null).map(()=>Array()); // 생리 날짜가 기록되어 있는 배열
  var arrCount = 0;
  var currentDay = -1; // 클릭한 날짜 day값
  var startDay = -1,
    remStart = -1; // 기억하기 위한 변수
  endDay = -1;
  mySelectDay = -1;
  //btnGroup
  //tooltip

  // cal,tabmore 에 있던 코드를 옮겨왔음

  function IsInArr(date) {
    // 생리주기 날짜 리스트에 안에 포함되어있는 날짜인지 확인하는 함수
    var className = '';
    for (var i = 0; i <= arrCount; i++) {
      if (date.getTime() >= array[i][0] && date.getTime() <= array[i][1]) {
        className = 'date-range-selected'
        return className;
      }
    }
    return className;
  }


  function Painting(clickDay, days, mode) {
    // console.log(array);
    var clickDay2 = clickDay;
    var weekEnd = $(clickDay.parents('tr').find('td:last'));

    if (mode == 0) {
      for (var i = 0; i < days; i++) {
        if (i == 0 && clickDay2.text() != weekEnd.text()) {
          clickDay2 = $(clickDay2).parent().next();
        } else if (clickDay2.text() == weekEnd.text()) {
          clickDay2 = clickDay2.parents('tr').next().find('td:first');
        } else {
          clickDay2 = $(clickDay2).next();
        }
        $(clickDay2).addClass('date-range-selected');
      }
    } else if (mode == 1) { // 지우는거
      if (days == 0) {
        clickDay.parent().removeClass('date-range-selected');
      }

      if ($(clickDay).parent().text() == weekEnd.text()) {
        clickDay2 = $(clickDay).parent().parents('tr').next().find('td:first');
        weekEnd = $(clickDay2.parents('tr').find('td:last'));
      } else {
        clickDay2 = $(clickDay).parent().next();
      }
      // console.log(clickDay2.children().text());
      // console.log(clickDay.parent().next().children().text());
      clickDay2.removeClass('date-range-selected');

      console.log(days);
      for (var i = 0; i < days; i++) {
        if (clickDay2.text() == weekEnd.text()) {
          clickDay2 = clickDay2.parents('tr').next().find('td:first');
          weekEnd = $(clickDay2.parents('tr').find('td:last'));
        } else {
          clickDay2 = $(clickDay2).next();
        }
        clickDay2.removeClass('date-range-selected');
      }

    } else { // 색칠하는거
      clickDay.parent().addClass('date-range-selected');
      weekEnd = $(clickDay.parents('tr').find('td:first'));

      for (var i = 0; i < days - 5; i++) {
        if (i == 0 && clickDay2.text() != weekEnd.text()) {
          clickDay2 = $(clickDay2).parent().prev();
        } else if (clickDay2.text() == weekEnd.text()) {
          clickDay2 = clickDay2.parents('tr').prev().find('td:last');
          weekEnd = $(clickDay2.parents('tr').find('td:first'));
        } else {
          clickDay2 = $(clickDay2).prev();
        }
        $(clickDay2).addClass('date-range-selected');
      }
    }
  }

  // 생리주기 날짜 리스트에 추가, 만약에 있는날짜 중복 클릭시 취소기능
  function AddStart(mySelectDay, clickDay) {
    startDay = clickDay.text();
    //두번 누르면 색칠된거 사라짐
    for (var i = 0; i <= arrCount; i++) {
      if (array[i][0] == mySelectDay) {
        var t = (array[i][1] - array[i][0]) / (3600 * 24 * 1000)
        clickDay.parent().removeClass('date-range-selected');

        Painting(clickDay, t, mode = 1)
        delete array[i][0]

        if(array[i][1] != null){
          delete array[i][1]
        }
        return;
      }
    }
    // 5일 표시하기
    var clickDay2 = clickDay;
    $(clickDay2).addClass('start');
    Painting(clickDay, 4, 0) //5일 표시하기

    array[arrCount][0] = mySelectDay;
    array[arrCount][1] = mySelectDay + (3600 * 24 * 1000 * 4);
    arrCount++;

    remStart = clickDay;
  }

  //끝나는 날짜 리스트 추가
  function AddEnd(mySelectDay, clickDay) {
    --arrCount;
    endDay = clickDay.text();
    var t = endDay - startDay; // 생리시작 - 생리끝 날짜

    array[arrCount][1] = mySelectDay;
    arrCount++;

    if (t < 5) {
      Painting(clickDay, 5-t, mode = 1); // 5일이내에 끝났으면 나머지 색칠된거 지우기
    } else {
      Painting(clickDay, t, mode = 2); // 5일이 넘어가면 넘어가는 날짜만큼 더 색칠해주기
    }
  }

  $.datepicker.setDefaults({

    // beforeShowDay는 이벤트가 발생하기전에 처리하는 함수, 날짜들 하나씩 하나씩 검사하면서
    // 조건이 true 일때 클래스네임을 추가해준다.
    beforeShowDay: function(date) {
      return [true, IsInArr(date)];
    },

    onSelect: function(dateText, inst) {
      //클릭한 날짜에 대한 값 ex)1580914800000 (초)이런식으로 나옴
      mySelectDay = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();

      var exSelectDay = null;
      var count = 0;
      var dateOffset;
      var el = $(this);

      setTimeout(function() {
        dateOffset = el.find('.ui-datepicker-current-day').offset();
        currentDay = el.find('.ui-datepicker-current-day').text();
        // console.log('선택한 날짜 좌표값:',dateOffset);
        if ((currentDay !== exSelectDay) || ((count + 1) % 2 === 0)) {
          count = 0;
          //console.log("뜰때 : ", count);
          // console.log('선택한 날짜:',currentDay);
          $('.tabPop').css({
            'top': dateOffset.top + 35,
          });
          $('.tabPop').addClass('open');
          //초기화
          $('.tabPop').show();
          $('header .top>span').text(currentDay);
          exSelectDay = el.find('.ui-datepicker-current-day').text();
        } else { // 똑같은 날짜를 짝수번 누르면 탭바가 사라짐
          count++;
          //console.log("안뜰때 : ", count);
          $('.tabPop').hide();
        }
      })
    }
  });

  var tipBoxW = Number($('.tipBox').outerWidth());
  var tipBoxH = Number($('.tipBox').innerHeight());

  $('.btnGroup > a:nth-child(1)').click(function() {
    // console.log('안내정보');
    $('.tipBox').fadeToggle();
    $('.bg').show();
  })

  $('.card').click(function() {
    var windowH = $(window).height();
    var headerH = $('.ui-datepicker-header').height();
    var bottomNavH = $('.bottomNav').height();
    var cardH = windowH - (headerH + bottomNavH);
    if ($('.card *').is('.col')) {

      $('.card').css({
        'height': cardH
      })
      $('.card, .ui-datepicker-header, .ui-widget-header, .ui-datepicker-title, .btnGroup, .ui-datepicker-prev, .ui-datepicker-next').addClass('swipe');
    } else {
      console.log('카드내용없음');
    }
  })

  $('.ui-datepicker-header, .ui-datepicker-title, .ui-widget-header, .ui-helper-clearfix').click(function() {
    $('.card').removeAttr('');
    $('.card').css({
      'height': '131px'
    })
    $('.card').removeClass('swipe');
    $('.ui-datepicker-header, .ui-widget-header, .ui-datepicker-title, .btnGroup, .ui-datepicker-prev, .ui-datepicker-next').removeClass('swipe');
  })


  $('.tabPop ul li i.icon-start').click(function() {
    var clickDay = $('tbody').find('td a.ui-state-active');
    console.log('생리시작함');
    // console.log(clickDay);
    AddStart(mySelectDay, clickDay); //여기안에 기능 다 넣어놨음
    // console.log('count : ' + arrCount,'\nStartDay : ' + arrStartDay[arrCount],'\nEndDay :' + arrEndDay[arrCount])
  })


  $('.tabPop ul li i.icon-end').click(function() {
    var clickDay = $('tbody').find('td a.ui-state-active');
    console.log('생리끝남');
    AddEnd(mySelectDay, clickDay);
    // console.log('Startday : ' + arrStartDay[arrCount], '\nEndday :' + arrEndDay[arrCount])
  })


  $('.tabPop ul li i.icon-love').click(function() {
    var clickDay = $('tbody').find('td a.ui-state-active');
    console.log('사랑함');
    $(clickDay).addClass('love');
  })


  $('.tabPop ul li i.icon-loveP').click(function() {
    var clickDay = $('tbody').find('td a.ui-state-active');
    console.log('사랑함피임');
    $(clickDay).addClass('loveP');
  })


  $('.tabPop ul li i.icon-drug').click(function() {
    var clickDay = $('tbody').find('td a.ui-state-active');
    console.log('약복용');
    $(clickDay).addClass('drug');
  })


  $('.ui-datepicker-calendar tr td').click(function() {
    console.log('click');
  })


  $('.tabPop li:last-child a').click(function(e) {
    e.preventDefault();
    location.href = 'tabMore.html?date=' + currentDay;
  })


  $('html').click(function(e) {
    if (!$(e.target).is('.tabPop, .tabPop *')) {
      $('.tabPop').removeClass('open');
    }
  })

  // setTimeout(function(){

  //     $('.btnGroup .tipBox').next('a').click(function(e){
  //         e.preventDefault();
  //         console.log('오늘클릭');
  //     })
  // },0);
});

