$(function(){
     //tab 활성화시 bar 이동, active 
     $('.tabMenu a').click(function(){
        var tabOffset=$(this).offset();
        $('.tabMenu a').removeClass('active');
        $(this).addClass('active');
        $('.tabMenu .effect').css({
            left: tabOffset.left,
        })
        var id=$(this).attr('href');
        $('section .contents > div').css('display','none');
        $(id).css('display','block');

        // // 메세지창뜨게하기(attr속성이름 가져와서 해보기 지우지마)
        // var menuName=$(this).attr('href').substr(1);
        // // console.log(menuName);
        // if($(this).attr('href')=='#symptom'){
            
        //         $('.'+menuName+'Msg, .bg').show(); 
        // }
    })
    //메세지 - 증상 , 다신 안볼래요 버튼 눌렀을 때
      $( ".tabMenu li:nth-of-type(2)" ).click(function() {
        $( ".symptomMsg, .bg" ).show();
      });
      $( ".symptomMsg button" ).click(function() {
        $( ".tabMenu li:nth-of-type(2)" ).off("click");
      });


    //메세지- 생리컵 등록할게요 버튼 눌렀을 때
    $('.msg button').click(function(){
        $(this).parents('.msg').hide();
        $('.bg').hide();
    })


    $('.tabMenu a').click(function(){
        var tabOffset=$(this).offset();
        $('.tabMenu a').removeClass('active');
        $(this).addClass('active');
        $('.navWrap .effect').css({
            left: tabOffset.left,
        })
        var id=$(this).attr('href');
        $('section .contents > div').css('display','none');
        $(id).css('display','block');
    })
  
    //날짜 값 cal.js에서 가져오기
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    var date = getParameterByName('date');
    // console.log(date);
    $('.top>span').text(date);

    //기분
    $('.contents #feelings i').click(function() {
        $('.contents #feelings i').removeClass('on on2');
        var clicks = $(this).data('clicks');
        var des=$(this).children('span').text();
        if (clicks) { 
            $(this).addClass('on2');
            $(this).parents('#feelings').find('.textBox p').text('정말'+des);
        } else {
            $(this).addClass('on');
            $(this).parents('#feelings').find('.textBox p').text(des);
        }
        $(this).data("clicks", !clicks);
    });
    
    //증상

    //공통 더블클릭할 때 함수(this가 문제가 되므로 el로 받아준다.)
    function dbclick(el){
        var clicks = el.data('clicks');
        var des=el.children('span').text();
        if (clicks) { 
            el.addClass('on2');
            el.parents('#symptom').find('.textBox p').text('심한'+des);
        } else {
            el.addClass('on');
            el.parents('#symptom').find('.textBox p').text(des);
        }
        el.data("clicks", !clicks);
    }
    $('.contents #symptom i').click(function(){
        dbclick($(this));
      });

      //증상편집하기
      var iconK=[];
      var iconKIndex=0;
      var spanT=[];
      var spanTIndex=0;

      $('#symptom button').click(function(){
        //컬러 변하는 조건문
        $(this).toggleClass('active');
        if($(this).text()=='저장'){ 
            $(this).text('편집하기');
            $('#symptom .editBox').hide();
            $('#symptom .col').show();
        }else{ 
            $('#symptom .col').hide();
            $('#symptom .editBox').show();
            $(this).text('저장');
            $('#symptom i').removeClass('on on2 edit');
            $(this).prev('.textBox').children('p').text('');
        }        

        //선택한 거에 따라 변하는 조건문
        if($('#symptom button').text()=='저장'){ //편집(내가 자주나타나는 증상 선택)하고 있는 상태
            $('#symptom .col').empty();
            
            //편집인 상태일때 아이콘을 누르면 edit클래스스타일이 입혀지고, 클릭한 아이콘 변수에 저장
            $('#symptom .editBox').on('click','i',function(){
                $(this).removeClass('on on2').addClass('edit');
                iconK[iconKIndex++]=$(this).data('key');
                spanT[spanTIndex++]=$(this).children('span').text();
                // console.log(iconK, spanT);
            })
            //배열에 담은 거 다시 초기화 해주려면 다시 선언해준다.
            iconK=[];
            iconKIndex=0;
            spanT=[];
            spanTIndex=0;
            
            
            
        }else{ //편집완료하고 다시 증상 입력하는 상태
            //선택한 요소들만 div.col에 담기

            //중복요소 제거하기
            var uniqueIconK = [];
            $.each(iconK, function(i, el){
                if($.inArray(el, uniqueIconK) === -1) uniqueIconK.push(el);
            });
            for (const i in uniqueIconK) {
                $('#symptom .col').append(`
                    <i data-key="${uniqueIconK[i]}" class="icon icon-${uniqueIconK[i]}">
                        <span class="blind">${spanT[i]}</span>
                    </i>
                `)     
            }
            $(this).prev('.textBox').children('p').text('');
            //편집완료하고 다시 아이콘 클릭했을 때 다시 더블클릭 함수 불러오기
            $('#symptom .col').on('click','i',function(){
                dbclick($(this));
            })
        }
      })
  



      //생리양 탭(오늘의 생리컵 수정하기)
      $('#amount p > button').click(function(){
          $('.cupEdit, .bg').show();
      })

      //취소버튼 누르면 사라지는 기능
      $('#amount .cupEdit .bottomBtn2 .left, #amount .cupInput .bottomBtn2 .left').click(function(){
          $('.bg, .cupEdit, .cupInput, .cupInputTip').hide();
      })

      //확인버튼 누르면
      $('#amount .cupEdit .bottomBtn2 .right').click(function(){
            var cupName=$('#amount .cupEdit .selectBox select[name=cupName]').val();
            var cupSize=$('#amount .cupEdit .selectBox input[name=options]:checked').val();
            $('#amount p b').text(cupName);
            $('#amount p span').text(cupSize);
            $('.bg, .cupEdit, .cupInput').hide();
            //생리컵 수정한 메세지 뜨기
            $('.editMsg, .bg').show();
      })

    //생리양 탭(생리양 기록하기)
    $('#amount .plusBox > button').click(function(){
        $('.cupInput, .bg, .cupInputTip').show();
    })
    var cupN;
    $('#amount .cupInput .controlGroup').on('click',' button',function(){
        if($(this).hasClass('icon-plus')){
            if($(this).siblings('i').hasClass('icon-cup1G')){
                $(this).siblings('i').removeClass('icon-cup1G').addClass('icon-cup2G');
            }else if($(this).siblings('i').hasClass('icon-cup2G')){
                $(this).siblings('i').removeClass('icon-cup1G icon-cup2G').addClass('icon-cup3G');
            }
        }else{
            if($(this).siblings('i').hasClass('icon-cup3G')){
                $(this).siblings('i').removeClass('icon-cup3G').addClass('icon-cup2G');
            }else if($(this).siblings('i').hasClass('icon-cup2G')){
                $(this).siblings('i').removeClass('icon-cup3G icon-cup2G').addClass('icon-cup1G');
            }
        }
        cupN=$(this).siblings('i').attr('class').substr(5,10);
        // console.log('컵넘버',cupN);
    })

    //확인버튼 누르면 
    var cupIndex=0;
    $('#amount .cupInput .bottomBtn2 .right').on('click',function(){
        $('#amount .boxContents').prepend(`
            <div class="amountBox">
                <i class="icon2 ${cupN}B"></i>
                <span>${++cupIndex}</span>
            </div>
       `)
        $('.bg, .cupInput, .cupInputTip').hide();
        $('#amount .cupInput .controlGroup i').removeClass('icon-cup2G icon-cup3G').addClass('icon-cup1G');
    })

    //피임약    
    $('.drugInput .form .start button, .drugInput .form .end button').click(function(){
        console.log('삭제');
        $(this).prev('label').find('input').val('');
    })
    $('.drugInput .form .drugTime button').click(function(){
        console.log('삭제');
        $(this).prev('input').val('');
    })







    //메모
    $('#memo button.btnPlus').click(function(){
        $('#memo .wrap').append(`
        <div class="form item">
            <textarea class="autosize item-swipe" placeholder="메모를 작성해주세요."></textarea>
            <div class="item-back">
                <button class="action first btn-delete" type="button"><i class="icon icon-trash"></i></button>
            </div>
        </div>
        `)
    })

    //높이 조절 자동으로 되는 코드(지우지마)
    // $("#memo textarea.autosize").on('keydown keyup', function () {
    //     $(this).height(1).height( $(this).prop('scrollHeight')+12 );	
    // });

    $('.item-swipe').swipeTo({
		minSwipe: 100,
        angle: 10,
        selector:'.item-swipe',
		wrapScroll: '#memo',
		binder: true,
		swipeStart: function() {
			console.log('start');
		},
		swipeMove: function() {
			console.log('move');
		},
		swipeEnd: function() {
			console.log('end');
		},
	});	
	deleteItem();
	getIe();

})
var deleteItem = function() {
	var deleteItemFnc = $('#memo').on('click tap', '.btn-delete', function(e) {
		e.preventDefault();
		var that = $(this);
		that.parent().parent().fadeOut('500');
	})
}