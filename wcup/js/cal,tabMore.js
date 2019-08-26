$(function(){
    //캘린더
   
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
        yearSuffix: '년'
        
    });
    //단일
    $('#datepicker, #datepicker2, #datepicker3').datepicker();
    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }

        return date;
    }
    
   
    //bg클릭 시
    $('.bg').click(function(){
        if($('.tipBox, .cupEdit, .cupInput, .cupInputTip, .msg').show()){
            $(this).hide();
            $('.tipBox, .cupEdit, .cupInput, .cupInputTip, .msg').hide();
            
        }else{
            $(this).show();
        }
    })


     //날짜선택 시 
    var currentDay;
    $('#datepicker').change(function(){   
        var dateOffset; 
        var el=$(this);
        setTimeout(function(){
            dateOffset=el.find('.ui-datepicker-current-day').offset(); 
            // console.log('선택한 날짜 좌표값:',dateOffset);
            currentDay=el.find('.ui-datepicker-current-day').text();
            // console.log('선택한 날짜:',currentDay);
            $('.tabPop').css({
                'top':dateOffset.top+35,
            });
            $('.tabPop').addClass('open');   
            //초기화
            $('.tabPop').show();
            $('header .top>span').text(currentDay);
        },0);     
    })
    //링크 이동하면서 값 가져오기
    $('.tabPop li:last-child a').click(function(e){
        e.preventDefault();
        location.href='tabMore.html?date='+currentDay;
    })
    
   
    

    $('html').click(function(e){   
        if(!$(e.target).is('.tabPop, .tabPop *')){
            $('.tabPop').removeClass('open');       
        }

    })
   
    //날짜선택 후 tabPop에서 변화
    // console.log(date);
    

    $('.tabPop li a i:not(.icon-plus)').click(function(){
        // console.log('클릭');
        
        $('.tabPop').hide();
        var trIndex=$('.ui-state-active').parents('tr').index();
        var tdIndex=$('.ui-state-active').parent('td').index();
        var date=$('.ui-state-active').parent('td').text();

        //클릭할 때 한글자 숫자에 0붙여서 카드 레이아웃 맞추기
        function addZeros(date) {
            return (date < 10)? '0' + date : (date < 100)? '' + date : '' + date;
        }
        
        var icon=$(this).attr('class');
        var iconT=$(this).next('span').text();
        $('tr'[trIndex]).find('td'[tdIndex]).append(icon);
       
        //초기화 
        $('.tabPop').removeClass('open'); 
        //card변화

        $('.card').children('span').after(`
            <div class="col">
                <span>${addZeros(date)}</span>
                <div class="box">
                    <div>
                        <i class="${icon}Small"></i>
                        <span>${iconT}</span>
                    </div>
                    <div class="cupRecord">
                        <i class="icon icon-cup1"></i>
                        <i class="icon icon-cup2"></i>
                        <i class="icon icon-cup3"></i>
                    </div>
                    <div class="conRecord">
                        <i class="icon2 icon-2appetite"></i>
                        <i class="icon2 icon-2fever"></i>
                        <i class="icon2 icon-2chestPain"></i>
                    </div>  
                </div>
            </div>
        `);
    })

    //json에 담기 
    var plusContents={"symptom":[]};
    var getPlusContents;
    var objPlusContents;
    var putCard;
    
    $('#symptom .col i').click(function(){
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
        var jsonPlusContents=JSON.stringify(plusContents);
        localStorage.setItem('plusContents',jsonPlusContents);
        getPlusContents=localStorage.getItem('plusContents');
        objPlusContents=JSON.parse(getPlusContents);
        putCard=objPlusContents.symptom;
       
    })

    $('.top a:nth-of-type(2)').click(function(e){
        e.preventDefault();
        parent.location.href='cal.html?cardCon='+objPlusContents;     
    })
})