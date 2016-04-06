function leftmenu(){
    var leftH = $(window).height();
    $('.sroll').height(leftH - 350);
    $('.hm-menu').height(leftH - 80);
    listgame(0);
    listlive(0);
}

function listgame(start) {
    var li_width = $('#list').width() / Math.ceil($('#list').width() / 234) - 34;

    $("#list ul > li").slice(start).each(function(){
        $(this).width(li_width);
        var img_width = li_width - 10;
        var img_height = img_width / 190 * 260;
        $(this).find("img").width(img_width).height(img_height);
        $(this).find("span").width(img_width);
        $(this).find('a').width(img_width);
        $(this).find("em").width(li_width-6).height(img_height+50);
    });
}
function listlive(start) {
    var li_width = $('#live-list').width() / Math.ceil($('#live-list').width() / 328) - 30;
    var li_width = Math.floor(li_width);
    //console.log(li_width);
    $("#live-list ul > li").slice(start).each(function(){
        $(this).width(li_width);
        var img_width = li_width - 8;
        var img_height = img_width / 16 * 9;
        $(this).find("img").width(img_width).height(img_height);
        $(this).find("a").width(img_width);
        $(this).find('i').width(img_width).height(img_height);

        var _top = img_height / 2;
        var _left = img_width / 2;
        var _top2 = img_height - 20;
        var _width = img_width - 10;
        $(this).find("em").css({top : _top - 20 + 'px', left : _left});
        $(this).find("b").css({top : _top - 6.5 + 'px', left : _left - 45 + 'px'});
        $(this).find('.type').css({width:_width});
    });
}


$(function(){
    /*频道图片切换*/
    $('.hm-live li a').on({
        mouseenter:function(){
            var obj=$(this).find('img');
            
        },
        mouseleave:function(){
            //clearTimeout(live_pic_handle);
            //live_pic_cur=-1;
          }
    });
    leftmenu();
    $(window).resize(function(){
        leftmenu();
    });
}); 
searchbox($(".list-search :input"));
window.onload = function(){
     leftmenu();
  window.addEventListener('resize', function(event){
    leftmenu();
  });
}