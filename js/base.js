var url = window.location.pathname;
var from =  url.split('/');
var re = from[1].split('?');

function menu(id,show,o){
    var timer = null;
    id.hover(function(){
        $(o).removeClass('show');
        clearTimeout(timer);
        $(this).find(show).addClass('show');
        $(this).addClass('cur');
        id.find('.msgtips').first().css('display','none');
    },function(){
        that = $(this);
        timer = setTimeout(function(){
            that.find(show).removeClass('show');
            id.find('.msgtips').first().css('display', 'inline-block');
        },200);
        that.removeClass('cur');
    });
}

function showmenu(id){
    id.hover(function(){
        $(this).addClass('show');
    },function(){
        $(this).removeClass('show');
    });
}
//showmenu($('.dropbox'));

// 选项卡
function Tab(nav, con, tag) {
    var nav, con, tag;
    nav.on('click', function() {
        var n = $(this).index();
        nav.removeClass(tag);
        $(this).addClass(tag);
        con.hide();
        con.eq(n).show();
    });
    nav.eq(0).addClass(tag);
    con.hide();
    con.eq(0).show();
}
function searchbox(id){
    id.focus(function(){
        $(this).parent().addClass('on');
        $(this).parent().siblings('.searchbox').removeClass('show');
    }).blur(function(){
        $(this).parent().removeClass('on');
        $(this).parent().siblings('.searchbox').removeClass('show');
    });
}

function isSafari(id,css,num){
    var userAgent = navigator.userAgent;
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1 ;
    if(isSafari){
        id.css(css, '-'+ num + 'px');
    }
}
//禁用document滚动条

var firefox = navigator.userAgent.indexOf('Firefox') != -1;
function MouseWheel(e) {
///对按下鼠标滚路，阻止视窗滚动
    e = e || window.event;
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
}

function nosroll(id,value){
    var box = id;
    if(value){
        firefox ? box.addEventListener('DOMMouseScroll', null, false) : (box.onmousewheel = null);
    }else{
        firefox ? box.addEventListener('DOMMouseScroll', MouseWheel, false) : (box.onmousewheel = MouseWheel);
    }
}
if($('#menusroll').length>0){
    nosroll(document.getElementById('menusroll'),false);
}


var i;
$(document).ready(function(){
    leftmenu();
    $.ajax({
        type: "GET",
        url:async_url + '/index.php?c=ajax&a=get_user_info&t=new2015&r='+Math.random(),
        dataType: 'jsonp',
        jsonp:'callback',
        success:function(result){

            $('#user_info').html(result.val);
            //
            menu($('.hm-user .dropdown:eq(0)'),'.dropbox','.dropbox');
            menu($('.hm-user .dropdown:eq(1)'),'.dropbox','.dropbox');
            isSafari($('.hm-header .hm-user li a i'),'top',3);
            isSafari($('.hm-rss a p'),'margin-top',0);
            searchbox($(".hm-search :input"));
            menu($('.hm-nav .dropdown'),'.dropbox','.dropbox');
            menu($('.minimenu li'),'.dropbox','.dropbox');
        }
    });

    $('.list-nav>a:eq(2)').hover(function() {
        $('#listrss').addClass('show');
    }, function() {
        i = setTimeout(doRemove, 1000);
       // $('#listrss').removeClass('show');
    });

    // $('.hm-menu').hover(function(){
    //     $('.hm-close').show();
    // },function(){
    //     $('.hm-close').hide();
    // });
});

function doRemove(){
    $('#listrss').removeClass('show');
}


function clearTime(){
    $('#listrss').hover(function(){
        clearTimeout(i);
    }, function() {
         $('#listrss').removeClass('show');
    })
}

function clearCss(){
    $('#listrss').removeClass('show');
}
function indexnav(){
    if(re[0]==''){
        $('.hm-nav').each(function(index){
            $(this).find('li').eq(0).addClass('on').siblings('li').removeClass('on');
        });
    }else if(re[0]=='channel'){
        $('.hm-nav').each(function(index){
            $(this).find('li').eq(1).addClass('on').siblings('li').removeClass('on');
        });
    }else if(re[0]=='game'){
        $('.hm-nav').each(function(index){
            $(this).find('li').eq(2).addClass('on').siblings('li').removeClass('on');
        });
    }
}
indexnav();

function show_on(){
    var url = window.location.pathname;
    var from =  url.split('/');
    var re = from[1].split('?');
   if(readCookie('left_on')=='on'){
        if(re[0]=='channel' ){
            $('.list-nav').each(function(index){
                $(this).find('a').eq(0).addClass('on').siblings('a').removeClass('on');
            });   
        }else if(re[0]=='game'){
            $('.list-nav').each(function(index){
                $(this).find('a').eq(1).addClass('on').siblings('a').removeClass('on');
            });      
        }else if(from[2]=='sub'){
            $('.list-nav').each(function(index){
                $(this).find('a').eq(2).addClass('on').siblings('a').removeClass('on');
            });     
        }
    }else{
        if(re[0]=='channel' ){
            $('.minimenu').each(function(index){
                $(this).find('li').eq(1).addClass('on').siblings('li').removeClass('on');
            });   
        }else if(re[0]=='game'){
            $('.minimenu').each(function(index){
                $(this).find('li').eq(2).addClass('on').siblings('li').removeClass('on');
            });      
        }else if(from[2]=='sub'){
            $('.minimenu').each(function(index){
                $(this).find('li').eq(3).addClass('on').siblings('li').removeClass('on');
            });     
        }
    } 
}
show_on();

//用户经验弹层显示位置
/*
if(jingyan){
    if(jingyan<=20){
        $('.user-lv>span').css('left', '20%');
    }else if(jingyan>=80){
        $('.user-lv>span').css('left', '80%');
    }else{
        $('.user-lv>span').css('left', jingyan+'%');
    }
}*/

//贷币 - 增加:num>0 / 减少:num<0
var money_change = function(num, type){
    var cash_count = 0;
    var offset_left = "30px";
    var id = null;
    if( type === 1 ){//仙豆
        offset_left = "30px";
        id = $(".user-money #money");
        cash_count = id.html();
        var total =  parseFloat(cash_count) + parseFloat(num);
    }else if( type === 2 ){//M币
        offset_left = "95px";
        id = $(".user-money #maobi");
        cash_count = id.html();
        var total = parseFloat( parseFloat(cash_count) + parseFloat(num) + 0.001 );
        total = total.toFixed(2);
    }else if( type === 3 ){//猫豆
        offset_left = "175px";
        id = $(".user-money #maodou");
        cash_count = id.html();
        var total =  parseFloat(cash_count) + parseFloat(num);
    }else{
        return false;
    }
    //送礼左侧栏数量变化
    id.html(total);

    //提示
    $(".allmenu .money-tips").css("left", offset_left);
    if( num > 0 ){
        num = "+" + num.toString();
    }
    $(".allmenu .money-tips").html( num ).show();
    setTimeout(function(){
        $('.allmenu .money-tips').fadeOut().html('')
    }, 1500);

    change_cash_var(total, type);

    return true;
}
//贷币 - 改变全局变量
var change_cash_var = function(count, type){
    if( type === 1 ){//仙豆
        cash_xd = parseFloat(count);
    }else if( type === 2 ){//M币
        cash_mb = parseFloat(count);
    }else if( type === 3 ){//猫豆
        cash_md = parseFloat(count);
    }

    return true;
}
//粉丝名
var fan_name_len = function(str){
    var str_fan_name = str || '粉丝';
    str_fan_name = str_fan_name.toString();
    var str_len = str_fan_name.length;

    if( str_len === 1 ){
        return str_fan_name;
    }
    if( str_len === 2 ){
        return str_fan_name;
    }
    if( str_len === 3 ){
        return str_fan_name;
    }

    return str_fan_name;
}

$('#fans_tips').hover(function(){
    $('#fan_show').css('display','block');
},function(){
    $('#fan_show').css('display','none');
})