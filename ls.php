    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="keywords" content="游戏直播,直播,直播信息整合,直播整合，全部直播">
<meta name="renderer" content="webkit">
<title>大碗饭-当前热门炉石传说直播</title>
<link href="css/base.css" rel="stylesheet">
<link rel="shortcut icon"href="img/favicon.ico"> 
<link href="css/lefthead.css" rel="stylesheet">
<link href="http://static.huomaotv.cn/static/new2015/css/list.css" rel="stylesheet">
<link href="http://static.huomaotv.cn/static/new2015/css/Scrollbar.css" type="text/css" rel="stylesheet" />
<script src="http://static.huomaotv.cn/static/hm2015/public/js/jquery-1.7.1.min.js"></script>
<div style="display:none;">
    <!--<script src="http://s11.cnzz.com/z_stat.php?id=1255309289&web_id=1255309289" language="JavaScript"></script>-->
    <script type="text/javascript">
        document.write("<scr"+"ipt src=\"http://s11.cnzz.com/z_stat.php?id=1255309289&web_id=1255309289\"></sc"+"ript>")
    </script>
</div>
    <style>
        .hm-w1000 .wp{width: auto;}
        .hm-w1200 .wp{width: auto;}
            /*1000宽*/
        .hm-w1000{padding-top: 70px;}
        .hm-w1000 .hm-header{height: 70px;}
        .hm-w1000 .hm-header h1{padding-top: 15px;}
        .hm-w1000 .hm-header .hm-nav{margin-left: 25px;width: 270px;}
        .hm-w1000 .hm-header .hm-nav>li>a{font-size: 18px;height: 67px;line-height: 67px;}
        .hm-w1000 .hm-header .hm-user>li{padding-top: 22px;height: 48px;}
        .hm-w1000 .hm-header .hm-user>li>a>span{max-width: 110px;}
        .hm-w1000 .hm-header .hm-search{padding-top: 15px;}
        .hm-w1000 .hm-live-btn{margin-top: 19px;margin-left: 15px;}
        .hm-w1000 .hm-header .hm-no-login{margin-top: 22px;padding-left: 15px;}
    </style>
</head>

<body>
    <!--    off-->

<?php include('left-menu.html'); 
      include('header-menu.html');
      include('php/function.php');
?>

<script type="text/javascript">
    var ajaxurl = '/home/ajax/get_game_list.html';
    var jingyan = '0';

</script>



<script src="http://static.huomaotv.cn/static/new2015/js/jquery-1.7.1.min.js"></script>
<script>
$(document).ready(function(){
    if(readCookie('qq_first')==1){
        window.location.href='/index.php?c=plugs&a=bind_mess';
    }
});

function valite(){
var decToHex = function(str) {
var res=[];
for(var i=0;i < str.length;i++)
res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
return "\\u"+res.join("\\u");
}
var str = decToHex($.trim($('#search_kw').val()));
window.location.href="/search?kw="+str+"&orderby="+$("#search_orderby").val()+"&from=topbanner";
return false;
}
</script>

<div class="hm-box">
    <!--<h2>所有直播</h2>-->
    <h2>炉石传说</h2><!--<span class="title_tips"> 个主播正在直播</span>-->
    <div id="live-list">
        <ul class="hm-live clearfix">

        <?php 
            loadlive("ls", "cate");
        ?>
        </ul>
        <div class="hm-live-more tac" id="listdata"><a href="javascript:;">点击加载更多</a></div>
        <div class="hm-live-more tac" id="loading" style='display:none;'><a href="javascript:;"><img src="http://static.huomaotv.cn/static/new2015/images/new/loading.gif" width="16" height="16">数据加载中...</a></div>
    </div>
</div>


<script>document.domain='huomaotv.cn';</script>
<script src="http://static.huomaotv.cn/static/hm2015/public/js/jquery-1.7.1.min.js"></script>
<script src="http://static.huomaotv.cn/static/hm2015/public/art/jquery.artDialog.js"></script>
<script src="http://static.huomaotv.cn/static/hm2015/public/art/artDialog.source.js?skin=default"></script>
<link href="/static/default/style/login.css" rel="stylesheet">
<div style= "display:none;">
<!--<script src="http://s4.cnzz.com/z_stat.php?id=1255309280&web_id=1255309280" language="JavaScript">-->
<script type="text/javascript">
document.write("<scr"+"ipt src=\"http://s4.cnzz.com/z_stat.php?id=1255309280&web_id=1255309280\"></sc"+"ript>")
</script>
<!--</script>-->
</div>

<!--[if lte IE 6]>
<script src="http://static.huomaotv.cn/static/hm2015/public/js/DD_belatedPNG_0.0.8a-min.js"></script>
<script type="text/javascript"> 
DD_belatedPNG.fix('div, ul, img, li, input , a, .png_bg'); 
</script> 
<![endif]-->

<script src="http://static.huomaotv.cn/static/new2015/js/base.js?v=20150828001"></script>
<script src="http://static.huomaotv.cn/static/new2015/js/Scrollbar.js"></script>
<script src="http://static.huomaotv.cn/static/new2015/js/list.js"></script>
<script src="http://static.huomaotv.cn/static/new2015/js/adaptation.js"></script>
<script src="http://static.huomaotv.cn/static/new2015//js/btongji.js?v="></script>
<script type="text/javascript">
var async_url = 'http://www.huomaotv.cn';
var page=1;
var psize=60;
var default_pic = 'http://static.huomaotv.cn/static/default/images/default_thumb.png';//默认图片
$(function(){
  $('#listdata a').click(function(){
      page++;
      $('#listdata').hide();$('#loading').show();
      $.get('?ajax=1&r='+Math.random(),{'p':page,'gid':'23'},function(result){
            var list=$.trim(result);
            if(list=='null' || list==''){$('#loading').html('木有了！=.=!');return;}
            var obj=eval("("+list+")");
            var len=obj.length? obj.length:0;
            var html_data='';
            var html_saishi='';
            var html_live='';
            count=$('.hm-live li').length;
            $.each(obj,function(index,item){
            
            //if(item.is_live>0)html_data+=' <a href="javascript:;" class="live_Now">正在直播</a>';
            if(item.is_match<1){
                html_saishi=' <i></i><em></em> <dfn>赛事</dfn>';
            }else{
                if(item.is_live == 1){
                    html_saishi=' <i></i><em></em> <div class="dnf">直播</div>';
                }else{
                    html_saishi = '';
                }
            }
            if(item.is_live<1)html_live=' <i class="off"></i><b>主播正在休息</b>';
            else html_live='<i></i><em></em>';

             html_data+='<li><a href="'+item.url+'?from=channel" target="_blank"><img src='+item.img+' onerror="this.src='+item.err_img+';this.onerror=null;" data-id="'+item.id+'" data-src="'+item.img+'"><h4>'+item.channel+'</h4><p><span class="type fr">'+item.gname+'</span><span class="username">'+item.username+'</span><span class="view">'+item.views+'</span></p>'+html_saishi+' '+html_live+'</a></li>';
           
            $('.hm-live').append(html_data);
            html_data='';
            listgame(count);
            listlive(count);
           
            //if(len<psize){$('#loading').html('木有了！=.=!');return;}
            $('#loading').hide();
            $('#listdata').show();     
        });
      });
   });
  var count=$('.hm-live li').length;
  if(!count){$('.hm-live').append('<li>暂无相关直播频道</li>');$('#listdata').hide();}else{ if(count>=psize)$('#listdata').show();listlive(0);}
  $('.hm-live li').find('a').each(function(index){
     $(this).attr('href',$(this).attr('href')+'?from=channel');
  });
//  if(readCookie('left_on')!='on'){
//    $(document.body).addClass('mini');
//  }
});
</script>
<script src="/static/v2/js/jquery.lazyload.min.js"></script>
<script type="text/javascript">
    $(function () {
        $("img.lazy").lazyload({threshold : 300});
    });
</script>
</body>
</html>