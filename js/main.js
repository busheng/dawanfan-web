  $(document).ready(function(){
    $('#reg, .regist-link').click(function(){
    document.getElementById("registerIbox").style.display = "block";
     document.getElementById("userLoginBox").style.display = "none";
    });

    $('#login, .login-link').click(function(){
    document.getElementById("userLoginBox").style.display = "block";
    document.getElementById("registerIbox").style.display = "none";

    });
    $('.ibox-close').click(function(){
    document.getElementById("userLoginBox").style.display = "none";
    document.getElementById("registerIbox").style.display = "none";
    });
    $('.inputs').bind('input', function() {
        if(this.value != '') {
            $(this).next().hide();
        } else {
            $(this).next().show();
        }

    });


    $('.subscribe').click(function(){
        var $ele = $(this);
        $.ajax({
            type: 'get',
            url: 'php/api/subscribe.php',
            data: {cate : $ele.attr("cate"), zhubo: $ele.attr("zhubo")},
            success:function(data) {
                if(data=="unlogin") {
                    alert("客官请先登入～");
                    document.getElementById("registerIbox").style.display = "none";
                    document.getElementById("userLoginBox").style.display = "block";
                } else {
                  $ele.hide();
                  $ele.next().next().show().fadeOut(500);
                  var $this = $ele.next().next();
                  setTimeout(function(){
                  $this.next().fadeIn(500);
                  }, 500);
                }
            }
        });

    });
    $('.unsubscribe').click(function(){
        $(this).hide();
        $(this).prev().prev().show().fadeOut(500);
        var $this = $(this).prev().prev();
        setTimeout(function(){
            $this.prev().fadeIn(500);
        }, 500); 

        var $ele = $(this);
        $.ajax({
            type: 'get',
            url: 'php/api/unsubscribe.php',
            data: {cate : $ele.attr("cate"), zhubo: $ele.attr("zhubo")},
            success:function(data) {
            }
        });
    });



  });

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).ready(function() {
    var x_timer;    
    $("#username").keyup(function (e){
        clearTimeout(x_timer);
        var user_name = $(this).val();
        if (user_name.length == null || user_name == "" || user_name.length < 3) {
            $("#user-result").html('<img src="img/not-available.png" />');
        } else {
          x_timer = setTimeout(function(){
              check_username_ajax(user_name);
          }, 1000);
        }
    }); 

function check_username_ajax(username){
    $("#user-result").html('<img src="img/ajax-loader.gif" />');
    $.post('php/api/nickname_check.php', {'username':username}, function(data) {
      if (data == "not_available") {
        $("#user-result").html('<img src="img/not-available.png" />');
      } else {
        $("#user-result").html('<img src="img/available.png" />');
      } 
    });
}
});

$(document).ready(function(){
    $('#yp-box-form').on('submit', function(e) {
        var data = $(this).serialize();
        $.ajax({
            type: 'get',
            url: $(this).attr('action'),
            data: data,
            success:function(data) {
              if(data == "lgoin_success") {
                  document.getElementById("userLoginBox").style.display = "none";
                  document.getElementById("registerIbox").style.display = "none";
                  location.reload(true);
              } else {
                alert("密码帐号不匹配～");
              }

            }
        });
        e.preventDefault();
    });
});

$(document).ready(function(){
    $('#reg-form').on('submit', function(e) {

    var email = document.forms["reg_form"]["email"].value;
    var name = document.forms["reg_form"]["username"].value;
    var passwordConfirm = document.forms["reg_form"]["passwordConfirm"].value;
    var password = document.forms["reg_form"]["password"].value;
    var error = "";

    if (email == null || email == "") {
        document.getElementById("error_part").innerHTML = "邮箱不能为空呦～";
        return false;
    }
    
    if (!validateEmail(email)){
        document.getElementById("error_part").innerHTML = "邮箱好像填错啦～";
        return false;
    }
    
    $.post('php/api/email_check.php',{ email: email }, function(data) {
        if(data == "not_available"){ 
            $('#error_part').text("这个邮箱已经被注册过了呦～");
            return false;
        } 
    });
    
    if (name == null || name == "") {
        document.getElementById("error_part").innerHTML = "用户名不能为空呀～";
        return false;
    }
    if (name.length < 3){
        document.getElementById("error_part").innerHTML = "用户名长度至少为3哦～";
        return false;
    }     
    $.post('php/api/nickname_check.php',{ username: name }, function(data) {
         if(data == "not_available"){ 
              $('#error_part').text("用户名已经被人用啦，请换一个用户名吧～");
              return false;
          } 
    });
    if (password == null || password == "") {
        document.getElementById("error_part").innerHTML = "密码不能为空～～～！";
        return false;
    }

    if (password.length < 6){
        document.getElementById("error_part").innerHTML = "密码长度至少为6，长才有安全感！";
        return false;
    }     

    if (passwordConfirm == null || passwordConfirm == "") {
        document.getElementById("error_part").innerHTML = "请在输入一次密码～";
        return false;
    }
    if (password != passwordConfirm) {
        document.getElementById("error_part").innerHTML = "两次密码不一致！";
        return false;
    }
    if($("#login_check").prop('checked') == false){
        document.getElementById("error_part").innerHTML = "必须确认用户协议啊～";
        return false;
    }
  
    var data = $(this).serialize();
        $.ajax({
            type: 'get',
            url: $(this).attr('action'),
            data: data,
            success:function(data) {
               if (data == "reg_success") {
                    location.reload(true);
               } else {
                  alert(data);
               }
            }
        });
        e.preventDefault();
    });
});



function logout() {
  if(confirm('客官确认要退出登录吗～？')) {
      $.ajax({
            type: 'get',
            url: 'php/api/logout.php',
            success:function(data) {
               window.location.href = data;
            }
      });
  }
}
 $(document).ready(function(){
    $('#left_my_subscrite').click(function(){
        $.ajax({
            type: 'get',
            url: 'php/api/is_login.php',
            success:function(data) {
              if(data == "unlogin") {
                    alert("客官请先登入～");
                    document.getElementById("registerIbox").style.display = "block";
                    document.getElementById("userLoginBox").style.display = "none";
              } else {
                    window.location.replace("user_love");

              }

            }
        });
    });

});
