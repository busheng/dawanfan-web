<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="keywords" content="直播整合,直播平台整合,直播信息整合,直播综合，直播综合平台，全部直播">
<meta name="renderer" content="webkit">
<link href="css/base.css" rel="stylesheet">
<link rel="shortcut icon"href="img/favicon.ico"> 
<link href="css/lefthead.css" rel="stylesheet">
<link href="css/list.css" rel="stylesheet">
<link href="css/Scrollbar.css" type="text/css" rel="stylesheet" />

<div style="display:none;">
    <!--<script src="http://s11.cnzz.com/z_stat.php?id=1255309289&web_id=1255309289" language="JavaScript"></script>-->

    <script type="text/javascript">
        document.write("<scr"+"ipt src=\"http://s11.cnzz.com/z_stat.php?id=1255309289&web_id=1255309289\"></sc"+"ript>")
    </script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-73060540-1', 'auto');
  ga('send', 'pageview');

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
<title>大碗饭TV - 重置密码</title>

</head>


<body onload="codeAddress();">
  <?php 
      require_once('php/function.php');
      require_once('php/api/config.php');
      include('header-menu.html');
      include('left-menu.html');      
?>


<script>

$(document).ready(function(){
    $('#reset-form').on('submit', function(e) {

    var email = document.forms["reset-form"]["email"].value;
    var error = "";
    if (email == null || email == "") {
        document.getElementById("error_reset").innerHTML = "邮箱不能为空呦～";
        return false;
    }
    
    if (!validateEmail(email)){
        document.getElementById("error_reset").innerHTML = "邮箱好像填错啦～";
        return false;
    }
    $.post('php/api/email_check.php',{ email: email }, function(data) {
        if(data != "not_available"){ 
            $('#error_reset').text("这个邮箱是个空号＝.＝");
            return false;
        }
    });
    var data = $(this).serialize();
    var thisform = $(this);

        $.ajax({
            type: 'get',
            url: $(this).attr('action'),
            data: data  ,
            success:function(data) {
               if (data == "reset_send") {
                    $('#error_reset').text("重置密码邮件已经发出，请查看自己的邮箱！");
                    thisform.hide();
               } else {
                  alert(data);
               }
            }
        });
        e.preventDefault();
    });
});





</script>

    <!--    off-->
<div class="hm-box">
    <!--<h2>所有直播</h2>-->

<div class="container">

    <div class="row">
   <h2>重置密码</h2>
                                          <p id ="error_reset" class="bg-danger"></p>

            <form id = "reset-form" role="form" method="post" action="php/api/reset_check.php" autocomplete="off">
            <div class="row js-input">
            <input type="text" name="email" class="inputs input required" data-type="account" placeholder="Email">
          </div>
                <div class="row">
                    <div class="col-xs-6 col-md-6"><input type="submit" name="submit" value="发送邮件重置密码" class="btn btn-primary btn-block btn-lg" tabindex="2"></div>
                </div>
            </form>
    </div>


</div>

</div>
<!--[if lte IE 6]>
<script src="http://static.huomaotv.cn/static/hm2015/public/js/DD_belatedPNG_0.0.8a-min.js"></script>
<script type="text/javascript"> 
DD_belatedPNG.fix('div, ul, img, li, input , a, .png_bg'); 
</script> 
<![endif]-->

<script src="js/base.js"></script>
<script src="http://static.huomaotv.cn/static/new2015/js/Scrollbar.js"></script>
<script src="js/list.js"></script>
<script src="http://static.huomaotv.cn/static/new2015/js/adaptation.js"></script>
<script src="http://static.huomaotv.cn/static/new2015//js/btongji.js?v="></script>

<script type="text/javascript">
var async_url = 'http://www.huomaotv.cn';
var page=1;
var psize=60;
var default_pic = 'http://static.huomaotv.cn/static/default/images/default_thumb.png';//默认图片
</script>
</body>
</html>
