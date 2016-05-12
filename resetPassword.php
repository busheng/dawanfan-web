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

$stmt = $db->prepare('SELECT resetToken, resetComplete FROM members WHERE resetToken = :token');
$stmt->execute(array(':token' => $_GET['key']));
$row = $stmt->fetch(PDO::FETCH_ASSOC);

//if no token from db then kill the page
if(empty($row['resetToken'])){
  $stop = '这个链接好像对你无效～';
} elseif($row['resetComplete'] == 'Yes') {
  $stop = '密码已经修改过啦';
}
?>



<script>

$(document).ready(function(){
    $('#resetpwd-form').on('submit', function(e) {
    e.preventDefault();
    var passwordConfirm = document.forms["resetpwd-form"]["passwordConfirm"].value;
    var password = document.forms["resetpwd-form"]["password"].value;
    var error = "";

    if (password == null || password == "") {
        document.getElementById("error_resetpwd").innerHTML = "密码不能为空～～～！";
        return false;
    }

    if (password.length < 6){
        document.getElementById("error_resetpwd").innerHTML = "密码长度至少为6，长才有安全感！";
        return false;
    }     

    if (passwordConfirm == null || passwordConfirm == "") {
        document.getElementById("error_resetpwd").innerHTML = "请在输入一次密码～";
        return false;
    }
    if (password != passwordConfirm) {
        document.getElementById("error_resetpwd").innerHTML = "两次密码不一致！";
        return false;
    }
        var data = $(this).serialize();
        var key = '<?php Print($_GET['key']); ?>';
         $.ajax({
            type: 'get',
            url: $(this).attr('action'),
            data: data + "&keys=" + key,
            success:function(data) {
               if (data == "reset_success") {
                    alert("修改密码成功！点击确定自动跳转到主页。");
                setTimeout(function(){
                  window.location.href = "http://www.dawanfantv.com";
                }, 100); 
               } else {
                  alert(data);
               }
            }
        });

    });
});





</script>


<script>

$(document).ready(function(){

    $('#resetpwd-form').on('submit', function(e) {
      alert("123");
    var passwordConfirm = document.forms["resetpwd-form"]["passwordConfirm"].value;
    var password = document.forms["resetpwd-form"]["password"].value;
    var error = "";

    if (password == null || password == "") {
        document.getElementById("error_resetpwd").innerHTML = "密码不能为空～～～！";
        return false;
    }

    if (password.length < 6){
        document.getElementById("error_resetpwd").innerHTML = "密码长度至少为6，长才有安全感！";
        return false;
    }     

    if (passwordConfirm == null || passwordConfirm == "") {
        document.getElementById("error_resetpwd").innerHTML = "请在输入一次密码～";
        return false;
    }
    if (password != passwordConfirm) {
        document.getElementById("error_resetpwd").innerHTML = "两次密码不一致！";
        return false;
    }

    var data = $(this).serialize();
        $.ajax({
            type: 'get',
            url: $(this).attr('action'),
            data: data  ,
            success:function(data) {
               if (data == "reset_success") {
                    alert(密码修改成功～3秒后即将刷新跳转到到主页);
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

      <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">


        <?php if(isset($stop)){

          echo "<p class='bg-danger'>$stop</p>";

        } else { ?>
        <h2>修改密码</h2>
                                            <p id ="error_resetpwd" class="bg-danger"></p>
        <form id = "resetpwd-form" role="form" method="post" action="php/api/resetpwd" autocomplete="off">

         <div class="row js-input">
            <input type="password" name="password" class="input inputs required" id="password-input" data-type="password" placeholder="请输入密码"/>  
          </div>
          <div class="row js-input">
            <input type="password" name="passwordConfirm" class="input inputs required" id="password-input" data-type="password" placeholder="再次输入密码"/>            </div>
          <div class="row">
            <div class="col-xs-6 col-md-6"><input type="submit" name="submit" value="修改密码" class="btn btn-primary btn-block btn-lg" tabindex="3"></div>
          </div>
        </form>

      <?php } ?>
    </div>
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
