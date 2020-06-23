$(function(){
    // nav 탭 메뉴 바꾸는 것
    $('.nav ul li').click(function(){
        $('.nav ul li').removeClass('active');
        $(this).addClass('active');
        
        // contents내용 바꾸고 bar 움직이기
        var id=$(this).find('a').attr('href');
        $('.tab-contents > div').hide();
        $(id).show();
        if(id=='#tab2'){
            $('.nav span').css('margin-left','50%');
        }else{
            $('.nav span').css('margin-left','0');
        }
    })

    // 오늘날짜 불러오기 html-date 
    var dt = new Date();
    var day=dt.toISOString().substring(2,10).replace(/-/g,'.');
    console.log(day);
    $('#today').val(day);
    
    //login popup
    $('.login-text span').click(function(){
        var userName=$(this).text();
        if(userName=='Login'){
            $('.login-pop').show();
        }else{
            $('.login-pop').hide();
        }
    })

    //닫기버튼 누르면
    $('.login-pop > button').click(function(){
        $('.login-pop').hide();
    })


    //로그인 버튼 누르면
    $('.login-wrap input:nth-child(3)').click(function(e){
        e.preventDefault();
        var id=$('.login-wrap #id').val();
        var pw=$('.login-wrap #pw').val();
        $('.login-wrap .message').remove();
        
        if(id==''){
            $('.login-wrap input:nth-child(3)').after('<p class="message">아이디를 입력하세요.</p>').focus();
        }else if(pw==''){
            $('.login-wrap input:nth-child(3)').after('<p class="message">비밀번호를 입력하세요.</p>').focus();
        }else{
            // console.log('로그인제출');
            $('.login-text a').show();
            $('.login-text > span').text(id + '님');
            $('.login-text > span').css('color','#8bcbc8');
            $('.login-icon').addClass('on');
            $('.login-icon i').removeClass('icon-logout').addClass('icon-login');
            $('.login-pop').hide();
        }
    })

    //로그아웃 버튼 누르면
    $('#logout-btn').click(function(){
        $('.login-text a').hide();
        $('.login-icon').removeClass('on');
        $('.login-text > span').text('Login');
        $('.login-text > span').css('color','#c1c1c1');
        $('.login-icon i').removeClass('icon-login').addClass('icon-logout');
    })

    //탭1 생리컵 
    $('.tab-contents #tab1 .btn-plus').on('click',function(){
        $('.upload-pop').show();
    })
    $('.upload-pop > button').click(function(){
        $('.upload-pop').hide();
    })
    var cupName;
    var cupSize;
    var cupVal;
    // 팝업창에서 cup 선택 시 변화
    $('#cupName').on('change',function(){
        // alert(this.value);
        cupName=$("#cupName option:selected").text();
        cupVal=$(this).val();
        var cupImage_src="img/cup_"+cupVal+".jpg";
        $('.upload-pop .cup-image img').attr("src",cupImage_src);
    })

    // 팝업창에서 cup 사이즈 선택 시 변화
    $('.selectBox .wrap .btn-group-toggle input[name=options]').on('change',function(){
        // alert(this.value);
        cupSize=$(this).val();
    })

    // 팝업창 등록 클릭 시
    $('.upload-pop .bottomBtn2').click(function(){
        $('.tab-contents #tab1').prepend(`
            <div class="wrap">
                <img src="img/cup_${cupVal}.jpg" alt="등록해주세요.">
                <span>사용중</span>
                <div class="info">
                    <dl>
                        <dt>${cupName}</dt>
                        <dd>${cupSize}</dd>
                        <dd>${day}~</dd>
                    </dl>
                    <span class="icon icon-wcupB dropbtn"></span>
                    
                </div>
            </div>
        `)
        $('.upload-pop').hide();
    })

    // 
    $('#tab1 .wrap .dropbtn').click(function(){
        alert('클릭');
    })
    // $('#tab1 .wrap .dropbtn').on('click',function(){
    //     alert('클릭');
    // })

    //사이즈 선택 시 효과
    $('.upload-pop .wrap-body .btn-group label').click(function(){
        $('.upload-pop .wrap-body .btn-group label').removeClass('active');
        $(this).addClass('active');
        // console.log('사이즈클릭');
    })


    // 동적으로 생성된 카드 오른쪽 아이콘 선택 시 - 드롭다운
    $(document).on("click", ".dropbtn", function(){
        if($('#tab1 .info span div').hasClass('dropdown')){
            $('div.dropdown').remove();
        }else{
            $(this).prepend(`
                <div class="dropdown">
                    <div class="dropdown-content">
                        <a href="#">사용완료</a>
                        <a href="#">삭제하기</a>
                    </div>
                </div>
             `)
             // console.log('w컵 아이콘 버튼클릭');
        }
    });
    $(document).on("click",".dropdown-content a:nth-child(1)",function(){
        $(this).parents('.wrap').children('span').text('사용완료');
        $(this).parents('.wrap').children('span').addClass('finish');
        // console.log('사용완료클릭');
    })
    $(document).on("click",".dropdown-content a:nth-child(2)",function(){
        $(this).parents('.info').parent('.wrap').remove();
        // console.log('삭제하기클릭');
    })



    //탭2 나의 건강 
    var weight;
    var tem;
    $('#tab2 #weight').change(function(){
        weight=$("label #weight").find('option:selected').val();
        // var index= $(this).find('option').index($("option:selected"));
    })
    $('#tab2 #tem').change(function(){
        tem=$("label #tem").find('option:selected').val();
    })
    $('#tab2 .add button').on('click',function(){
        if(!weight=='' && !tem==''){
            $('#tab2 .record #input').prepend(`
                <div class="wrap list">
                    <div class="form item">
                        <div class="autosize item-swipe" placeholder="메모를 작성해주세요.">
                            <span>${day}</span>
                            <span>${weight}kg</span>
                            <span>${tem}℃</span>
                            <i class="icon icon-pen"></i>    
                        </div>
                        <div class="item-back">
                            <button class="action first btn-delete" type="button"><i class="icon icon-trash"></i></button>
                        </div>
                    </div>
                </div>
            `)
            // 입력해주세요 칸 사라지기
            $('.record > .wrap').hide();
        }else{
            alert('입력값이 없습니다.')
        }
        
    })
    $('.item-swipe').swipeTo({
		minSwipe: 100,
        angle: 10,
        selector:'.item-swipe',
		wrapScroll: '#input',
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
	var deleteItemFnc = $('#input').on('click tap', '.btn-delete', function(e) {
		e.preventDefault();
		var that = $(this);
		that.parent().parent().fadeOut('500');
	})
}