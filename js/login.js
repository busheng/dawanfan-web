/**
 * @author xsx
 * @time 2014-11-06
 */

var Itemlogin = {
    //初始化提示
     Init:function(){
       	//$("#ck_email").html('');
      	//$("#ck_pwd").html('');
       	//$("#ck_pwd2").html('');
       //	$("#ck_name").html('');
      	//$("#ck_vcode").html('');
        $(".t_error").html('');
        $(".t_ok").hide(); 
        $("#_er_title").hide(); 
      },

    //打开窗口
    Open:function(type){
       if(!art.dialog)
        {
       	  alert('art.dialog对象不存在！');
       	  return;
        }
		var _url='';
		switch(type){
		    case 'login':   
			   _url=host_url +'/index.php?c=plugs&a=login';
			  break;
	   	    case 'reg':
			   _url=host_url +'/index.php?c=plugs&a=reg';
			  break;	
	            case 'mobile':
	                   _url=host_url +'/index.php?c=plugs&a=mobile';
                          break;
	            case 'is_email':
	                   _url=host_url +'/index.php?c=plugs&a=email_edit';
	                  break;
		}
		var dialog = art.dialog({id:'TVlogin',title:false,fixed:true,lock:true});
		$.ajax({
			url: _url,
			cache: false,
			success:function (data) {
				dialog.content(data);
			}
		}); 	
       return true;
    },
    
    //关闭窗口
    Shut:function(){
       art.dialog({id:'TVlogin'}).close();
       return true;
    },
 
    
    //长度验证
    check_length:function(type,name){
    	if(!name) return false;
    	var len = name.length;
    	if(type == 1){
    		if(len >= 8 && len <= 14){
    			return true;
    		}else{
    			return false;
    		}
    	}
    	if(type == 2){
    		if(len >= 4 && len <= 15){
    			return true;
    		}else{
    			return false;
    		}
    	}
    },
        
    //邮箱重复验证
    check_email_one:function(mail){
       if(!mail) return false;
       var status = false;
    	$.ajax({
		   type: "POST",
                   async:false,
		   url:  "/index.php?c=plugs&a=flag_email",
		   data: "email="+mail,
		   success: function(data){
		     if(data == "ok"){
		     	status = true;
		     }else{
		     	status = false;
		     }
		   }
		});
      return status;
    },

    //用户名验证
    check_name:function(name){
       if(!name) return false;
       var status = false;
      $.ajax({
       type: "POST",
       async:false,
       url:  "/index.php?c=ajax&a=is_checkname",
       data: "name="+name,
       success: function(data){
         status = data;
       }
    });
      return status;
    },
      //用户名验证脏词
    check_name_zc:function(name){
       if(!name) return false;
       var status = false;
      $.ajax({
       type: "POST",
       async:false,
       url:  "/index.php?c=ajax&a=is_checkname_zc",
       data: "name="+name,
       success: function(data){
          status = data;
       }
    });
      return status;
    },
    
    check_list:function(type,name){
    	if(!type || !name) return false;
    	var filter ="";
    	switch(type){
		case 'email':   
			   filter = /([a-z0-9]*[-_.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[.][a-z]{2,3}([.][a-z]{2})?/i;
			  break;
		case 'pwd':
			   filter = /^(?![a-z]+$)(?!\d+$)[a-z0-9_]{8,14}$/i;
			  break;	
	        case 'vcode':
	           filter =  /^[a-zA-Z0-9_]{4}$/;
	          break;	
	        case 'otp':
	           filter = /^\d{7}$/;
	          break;
	        case 'int':
	           filter = /^[0-9]*$/;
	          break;
          case 'mobile':
                   filter = /^0{0,1}(13[0-9]|15[0-9]|145|147|17[0-9]|18[0-9])[0-9]{8}$/;
                  break;
            case 'word':
            	filter = /^[A-Za-z]+$/;
		}
	   if(filter.test(name)){
    	      return true;
		   }else{
			  return false;
		   }
     },
     check_verify:function(value){
		if(!value) return false;
		$.ajax({
			type: "POST",
			async:false,
			url:  "/index.php?c=ajax&a=is_check_code&r="+Math.random(),
			data: "code="+value,
			success: function(data){
				var k=eval("("+data+")");
               Itemlogin.status_ajax(k.err,k.msg,value);
			}
		});
		return true;
     },
      login_otp:function(data){
        if(!data) return false;
         $.ajax({
                    type: "POST",
                    async:false,
                    dataType:"json",
                    url:  "/index.php?c=ajax&a=check_mobile&r="+Math.random(),
                    data: data,
                    success: function(k){
                    alert(k);
                    }
                 });
         return true;
     }, 
   //注册提交
    submit:function(data){
       if(!data) return false;
       $.post("/index.php?c=ajax&a=new_user_do", data,
          function(data1){
               var k=eval("("+data1+")");
               Itemlogin.status_ajax(k.err,k.msg,data);
         });
	    return true;
    },
    //登录提交
    loginsubmit:function(data){
       if(!data) return false;
       $.post("/index.php?c=ajax&a=user_do", data,
          function(data1){
          	delCookie('min_money');
               var k=eval("("+data1+")");
               Itemlogin.status_ajax(k.err,k.msg,data);
         });
	    return true;
    },
    submit_mobile:function(mobile,mcode,pwd){ 
    	if(!mobile || !mcode || !pwd) return false;
    	var data={mobile:mobile,mcode:mcode,pwd:pwd};
    	$.post("/index.php?c=ajax&a=mobile_bind", data,
          function(data1){
               var k=eval("("+data1+")");
               Itemlogin.status_ajax(k.err,k.msg,data);
         });
	    return true;
    },
    status_ajax:function(type,msg,data){
    	var str=msg.replace(/[^\x00-\xff]/g, 'xx');
    	switch(type){
         case 1:
                    send_email_reg(data.tv_email);
                    break;
		 case 2:  
		 			window.location.href="/";
		 			//show_sign(data.tv_email);
		   			break;
		case 3:
					$("#email_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
					$("#email_login").focus(function(){
						$("#email_login").siblings('div').hide();
					});
		   			break;
	    case 4:
	    			$("#yzm_id").attr("src","/home/public/verify.html");
	    			$("#pwd_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
	    			$("#pwd_login").focus(function(){
						$("#pwd_login").siblings('div').hide();
					});
	          		break;
	    case 5:
	    			$("#yzm_id").attr("src","/home/public/verify.html");
	    			$("#pwd_login2").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
	    			$("#pwd_login2").focus(function(){
						$("#pwd_login2").siblings('div').hide();
					});
	          		break;
	    case 6:
	    			$("#yzm_id").attr("src","/home/public/verify.html");
	    			$("#vcode_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
	    			$("#vcode_login").focus(function(){
						$("#vcode_login").siblings('div').hide();
					});
	    			break;
	    case 7:
	    			$("#mobile_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
	    			$("#mobile_login").focus(function(){
						$("#mobile_login").siblings('div').hide();
					});
	    			break;
        case 8:
        			$("#check_title").css({'outline':'1px solid #eb3c28'});
        			break;
        case 9:
        			setTimeout(function(){window.location.reload();},50);
        			break;
        case 10:
        			$("#re_login_account").val($("#email_login").val());
        			$(".exp").show().html(msg+' , <a href="javascript:;" onclick="send_email(\''+data.username+'\');">重发验证邮件</a>');
        			break;
        case 11:
        			$("#yzm_id").attr("src","/home/public/verify.html");
        			$("#vcode_login").parent("div").show().children('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
        			$("#is_login_num").val("1");
        			$("#vcode_login").focus(function(){
						$("#vcode_login").siblings('div').hide();
					});
        			break;
	    case 18:
	    			show_mobile(data); 
	    			break;
	    case 31:
	    			window.location.href="/";
	    			break;
               
		}
    } 
    
    
};

function login_(){
      Itemlogin.Open("login");
      $(document).keypress(function(e) {  
      if(e.which == 13) {
      	if($("#intelligent-regName").css("display")=="block"){
        		return false;
        }else{
          jQuery("#new_login").click();
        } 
         }  
      }); 
}
function login_open(){
	Itemlogin.Open("reg");
        $(document).keypress(function(e) {
        if(e.which == 13) {
        	if($("#intelligent-regName").css("display")=="block"){
        		return false;
        	}else{
           		jQuery("#reg_login").click();
           	}       
          }                
         }); 
}
function login_close(){
	Itemlogin.Shut();
}


function  show_sign(mail){
    if(!mail) return false;
    _url=host_url +'/index.php?c=plugs&a=show_sign';
    var dialog = art.dialog({id: 'TVlogin',title:false,fixed:true,lock:true});
    $.ajax({
            url: _url,
            type: "POST",
            async:false,
            data: "email="+mail,
            cache: false,
            success:function (data) {
                    dialog.content(data);
            }
    });
 }
function  show_mobile(data){
    if(!data) return false;
    _url=host_url +'/index.php?c=plugs&a=mobile';
    var dialog = art.dialog({id: 'TVlogin',title:false,fixed:true,lock:true});
    $.ajax({
            url: _url,
            type: "POST",
            async:false,
            data: data,
            cache: false,
            success:function (data1) {
                dialog.content(data1);
            }
    });
 }

//注册验证 
function login_list(sum,type,modac){
	var email = $("#email_login").val();
	var pwd   = $("#pwd_login").val();
	var pwd2  = $("#pwd_login2").val();
	var vcode = $("#vcode_login").val();
	var otp   = $("#mobile_login").val();
	var ac   = '';

	var status = 0;
	var is_mobile_vode = 0;
	if(sum==1 || modac=='mobile'){
		ac='mobile';
		if(email != ""){
			var is_mobile = Itemlogin.check_list('mobile',email);
			var is_email2 = Itemlogin.check_email_one(email);
			if(!is_mobile || email.length<11){
				status = 1;
				$("#email_login").addClass('err').siblings('div').css({'width':((10*14)+40)+'px'}).show().children('div').eq(1).html('请输入11位大陆手机号');
				$("#email_login").focus(function(){
					$("#email_login").siblings('div').hide();
				});
				return status;
			}else{
				if(!is_email2){
					status = 1;
					$("#email_login").siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('该手机号码已存在');
					$("#email_login").focus(function(){
						$("#email_login").siblings('div').hide();
					});
					return status;
				}else{
					status = 0;
					$("#email_login").removeClass('err').siblings('div').hide();
				}
			}
		}else{
			if(modac=='mobile'){
				$("#email_login").addClass('err').siblings('div').css({'width':((12*14)+40)+'px'}).show().children('div').eq(1).html('请输入11位正确的手机号码');
			}
			status = 1;
			$("#email_login").focus(function(){
				$("#email_login").siblings('div').hide();
			});
			return status;
		}
	}
	if(sum==2 || modac=='email'){
		ac='email';
		if(email != ""){
			var is_email1 = Itemlogin.check_list('email',email);
			var is_email2 = Itemlogin.check_email_one(email);
			if((/[\u4E00-\u9FA5]/g.test(email))){
				status = 1;
				$("#email_login").addClass('err').siblings('div').css({'width':((6*14)+40)+'px'}).show().children('div').eq(1).html('邮箱输入错误');
				$("#email_login").focus(function(){
					$("#email_login").siblings('div').hide();
				});
				return status;
			}else if((/\s/g.test(email))){
				status = 1;
				$("#email_login").addClass('err').siblings('div').css({'width':((5*14)+60)+'px'}).show().children('div').eq(1).html('不允许有空格');
				$("#email_login").focus(function(){
					$("#email_login").siblings('div').hide();
				});
				return status;
			}
			if(!is_email1){
				status = 1;
				$("#email_login").addClass('err').siblings('div').css({'width':((6*14)+40)+'px'}).show().children('div').eq(1).html('邮箱格式错误');
				$("#email_login").focus(function(){
					$("#email_login").siblings('div').hide();
				});
				return status;
			}else{
				if(!is_email2){
					status = 1;
					$("#email_login").addClass('err').siblings('div').css({'width':((5*14)+40)+'px'}).show().children('div').eq(1).html('邮箱已注册');
					$("#email_login").focus(function(){
						$("#email_login").siblings('div').hide();
					});
					return status;
				}else{
					status = 0;
					$("#email_login").removeClass('err').siblings('div').hide();
				}
			}
		}else{
			if(modac=='email'){
				$("#email_login").addClass('err').siblings('div').css({'width':((5*14)+40)+'px'}).show().children('div').eq(1).html('请输入邮箱');
			}
			status = 1;
			$("#email_login").focus(function(){
				$("#email_login").siblings('div').hide();
			});
			return status;
		}
	}
	if(sum==3 || modac=='username'){
		ac='username';
		if(email != ""){
			var is_int = Itemlogin.check_list('int',email);
			var is_email2 = Itemlogin.check_email_one(email);
			var is_username1 = Itemlogin.check_name(email);
			var is_username2 = Itemlogin.check_name_zc(email);
			var str=email.replace(/[^\x00-\xff]/g, 'xx');
			if((/^[0-9]{1}/g.test(email))){
				status = 1;
				$("#email_login").addClass('err').siblings('div').css({'width':((11*14)+40)+'px'}).show().children('div').eq(1).html('首个不能是数字');
				$("#email_login").focus(function(){
					$("#email_login").siblings('div').hide();
				});
				return status;
			}else if((/^[_]{3}/g.test(email))){
				status = 1;
				$("#email_login").addClass('err').siblings('div').css({'width':((9*14)+40)+'px'}).show().children('div').eq(1).html('不支持连续的下划线');
				$("#email_login").focus(function(){
					$("#email_login").siblings('div').hide();
				});
				return status;
			}else if((/\s+|[\%\,\?\.\,\'\;\`\~\!\^\(\)\+\#\$\-\=\|\[\]\{\}\:\*\"\s\<\>\&]|[@]|\xA1\xA1|\xAC\xA3|^Guest|^\xD3\xCE\xBF\xCD|\xB9\x43\xAB\xC8/g.test(email)) || str.length<6 || str.length>15){

				status = 1;
				$("#email_login").addClass('err').siblings('div').css({'width':'280px'}).show().children('div').eq(1).html('仅限6~15个字符，不包括空格等特殊字符');
				$("#email_login").focus(function(){
					$("#email_login").siblings('div').hide();
				});
				return status;
			}else{
				if(is_username2 || is_username1==3){
					status = 1;
					$("#email_login").addClass('err').siblings('div').css({'width':((9*14)+40)+'px'}).show().children('div').eq(1).html('该用户名涉及敏感词');
					$("#email_login").focus(function(){
						$("#email_login").siblings('div').hide();
					});
					return status;
				}else{
					if(is_username1==2){
						status = 1;
						$("#email_login").addClass('err').siblings('div').css({'width':((7*14)+40)+'px'}).show().children('div').eq(1).html('该用户名已存在');
						$("#email_login").focus(function(){
							$("#email_login").siblings('div').hide();
						});
						return status;
					}else if(is_username1==1){
						status = 0;
						$("#email_login").removeClass('err').siblings('div').hide();
					}
				}
			}
		}else{
			if(modac=='username'){
				$("#email_login").addClass('err').siblings('div').css({'width':((6*14)+40)+'px'}).show().children('div').eq(1).html('请输入用户名');
			}
			status = 1;
			$("#email_login").focus(function(){
				$("#email_login").siblings('div').hide();
			});
			return status;
		}
	}
	if(sum==4 || sum==0){  
		if(pwd != ""){
		     var is_pwd1 = Itemlogin.check_length(1,pwd);
		     var is_pwd2 = Itemlogin.check_list('pwd',pwd);
		     var is_pwd3 = Itemlogin.check_list('int',pwd);
		     var is_pwd4 = Itemlogin.check_list('word',pwd);
		if((/[\u4E00-\u9FA5]/g.test(pwd))){
			status = 1;
			$("#pwd_login").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许纯数字');
		     $("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
			return status;
		}else if((/\s/g.test(pwd))){
			status = 1;
			$("#pwd_login").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许有空格');
		     $("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
			return status;
		}else{
			status = 0;
			$("#pwd_login").removeClass('err').siblings('div').hide();
		}
		if(!is_pwd1){
		     status = 1;
		     $("#pwd_login").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许纯数字');
		     $("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
		     return status;
		  }else if(is_pwd3){
		     status = 1;
		     $("#pwd_login").addClass('err').siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('不允许纯数字密码');
		     $("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
		     return status;
		  }else if(is_pwd4){
		     status = 1;
		     $("#pwd_login").addClass('err').siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('不允许纯字母密码');
		     $("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
		     return status;
		  }else if(pwd.length<8 || pwd.length>14){
		     status = 1;
		     $("#pwd_login").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许纯数字');
		     $("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
		     return status;
		  }else{
		  	 status = 0;
		  	 $("#pwd_login").removeClass('err').siblings('div').hide();        
		  }
		       
		}else{
			if(sum==0){
				$("#pwd_login").addClass('err').siblings('div').css({'width':((6*14)+40)+'px'}).show().children('div').eq(1).html('密码不能为空');
			}
			status = 1;
			$("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
			return status;
		}
    }
    if(sum==5 || sum==0){ 
		if(pwd2 != ""){
		    var is_pwd2_1 = Itemlogin.check_length(1,pwd2);
		    var is_pwd2_2 = Itemlogin.check_list('pwd',pwd2);
		    var is_pwd2_3 = Itemlogin.check_list('int',pwd2);
		    var is_pwd2_4 = Itemlogin.check_list('word',pwd2);
		    if((/[\u4E00-\u9FA5]/g.test(pwd2))){
				status = 1;
				$("#pwd_login2").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许纯数字');
				return status;
			}else if((/\s/g.test(pwd2))){
				status = 1;
				$("#pwd_login2").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许有空格');
				return status;
			}else{
		    	status = 0;
		    	$("#pwd_login2").removeClass('err').siblings('div').hide();
		    }

		    if(pwd != pwd2){
		        status = 1;
		        $("#pwd_login2").addClass('err').siblings('div').css({'width':((5*14)+40)+'px'}).show().children('div').eq(1).html('密码不一致');
				$("#pwd_login2").focus(function(){
					$("#pwd_login2").siblings('div').hide();
				});
		        return status;
			}else if(!is_pwd2_1){
				status = 1;
				$("#pwd_login2").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许纯数字');
				$("#pwd_login2").focus(function(){
					$("#pwd_login2").siblings('div').hide();
				});
				return status;
			}else if(is_pwd2_3){
				status = 1;
				$("#pwd_login2").addClass('err').siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('不允许纯数字密码');
				$("#pwd_login2").focus(function(){
					$("#pwd_login2").siblings('div').hide();
				});
				return status;
			}else if(is_pwd2_4){
				status = 1;
				$("#pwd_login2").addClass('err').siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('不允许纯字母密码');
				$("#pwd_login2").focus(function(){
					$("#pwd_login2").siblings('div').hide();
				});
				return status;
			}else if(pwd2.length<8 || pwd2.length>14){
				status = 1;
				$("#pwd_login2").addClass('err').siblings('div').css({'width':((14*14)+40)+'px'}).show().children('div').eq(1).html('仅限8-14位字符，不允许纯数字');
				$("#pwd_login2").focus(function(){
					$("#pwd_login2").siblings('div').hide();
				});
				return status;
			}else{
				status = 0;
				$("#pwd_login2").removeClass('err').siblings('div').hide();
			}
		      
		}else{
			if(sum==0){
				$("#pwd_login2").addClass('err').siblings('div').css({'width':((6*14)+40)+'px'}).show().children('div').eq(1).html('密码不能为空');
			}
			status = 1;
			$("#pwd_login2").focus(function(){
				$("#pwd_login2").siblings('div').hide();
			});
			return status;
		}
    } 
       
    // 普通验证码验证
    if((sum==6 || sum==0) && modac!='mobile'){
		if(vcode != ""){
			var is_vcode = Itemlogin.check_list('vcode',vcode);
			//var is_vcode_true = Itemlogin.check_verify(vcode);
			if(!is_vcode){
				status = 1;
				$("#vcode_login").addClass('err').siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('验证码格式不正确');
				$("#vcode_login").focus(function(){
					$("#vcode_login").siblings('div').hide();
				});
				return status;
			}else{
				$("#vcode_login").focus(function(){
					$("#vcode_login").siblings('div').hide();
				});
			}
		}else{
			if(sum==0){
				$("#vcode_login").addClass('err').siblings('div').css({'width':((7*14)+40)+'px'}).show().children('div').eq(1).html('验证码不能为空');
			}
			status = 1;
			$("#vcode_login").focus(function(){
				$("#vcode_login").siblings('div').hide();
			});
			return status;
        }
	}
    //手机验证码验证
	if((sum==7 || sum==0) && modac=='mobile'){
		var  m_code = $("#is_mobile_check").val();
        if(m_code == 1){
            if(otp  == ""){
				status = 1;
				$("#mobile_login").addClass('err').siblings('div').css({'width':((7*14)+40)+'px'}).show().children('div').eq(1).html('验证码不能为空');
				$("#mobile_login").focus(function(){
					$("#mobile_login").siblings('div').hide();
				});
				return status;
            }else{
				$("#mobile_login").focus(function(){
					$("#mobile_login").siblings('div').hide();
				});
			}
         }else{
         	if(otp  == ""){
         		if(sum==0){
	         		$("#mobile_login").addClass('err').siblings('div').css({'width':((7*14)+40)+'px'}).show().children('div').eq(1).html('验证码不能为空');
	         	}
				status = 1;
				$("#mobile_login").focus(function(){
					$("#mobile_login").siblings('div').hide();
				});
				return status;
			}else{
				$("#mobile_login").addClass('err').siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('请发送手机验证码');
				status = 1;
				$("#mobile_login").focus(function(){
					$("#mobile_login").siblings('div').hide();
				});
				return status;
			}
		}
     }


    var s = $("#check_title:checkbox:checked").length;
    if( s == 0){
    	status = 1;
    	$("#check_title").css({'outline':'1px solid #eb3c28'});
		return status;
    }else{
    	status = 0;
    	$("#check_title").css({'outline':'none'});
    }

    if(status == 0){
      var new_login = {
            tv_email:email,
            tv_pwd  :pwd,
            tv_name :name,
            tv_vcode:vcode,
            tv_mobile:otp,
            tv_agr:s,
            state:type,
            ac:ac
            };
      return new_login;
  	}else{
        return false;
  	}
}
//注册
function login_submit(){

        var status = $("#is_mobile_check").val();
        var list   = "";
        var ac     = $("#ac").val();
        var sum =0;
        if(status == 1){
           list = login_list(sum,'from',ac);
        }else{
           list = login_list(sum,'vcode',ac);
        }
         if(list && list != 1){
              Itemlogin.submit(list);
         }else{
                return false;
         }
      }
//登录验证
function login_sub_list(sum,type){
	var email = $("#email_login").val();
	var pwd   = $("#pwd_login").val();
	var vcode = $("#vcode_login").val();

	var status = 0;
	if(sum==1 || sum==0){
		if(email != ""){
			if($("#re_login_account").val()!=email){
				$(".exp").hide();
				$("#email_login").removeClass('err');
			}else if($("#re_login_account").val()==email && Itemlogin.check_list('email',email)){
				$(".exp").show();
			}else{
				$("#email_login").removeClass('err');
			}
			$("#email_login").focus(function(){
				$("#email_login").siblings('div').hide();
			});
		}else{
			if(sum==0){
				$("#email_login").addClass('err').siblings('div').css({'width':((5*14)+40)+'px'}).show().children('div').eq(1).html('请输入账号');
			}
			status = 1;
			$("#email_login").focus(function(){
				$("#email_login").siblings('div').hide();
			});
		}
	}
	if(sum==2 || sum==0){  
		if(pwd != ""){
			$("#pwd_login").removeClass('err');
			$("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});	       
		}else{
			if(sum==0){
				$("#pwd_login").addClass('err').siblings('div').css({'width':((6*14)+40)+'px'}).show().children('div').eq(1).html('密码不能为空');
			}
			status = 1;
			$("#pwd_login").focus(function(){
				$("#pwd_login").siblings('div').hide();
			});
		}
    }
       
    // 普通验证码验证
    if(type=='vcode'){
		if(vcode != ""){
			var is_vcode = Itemlogin.check_list('vcode',vcode);
			if(!is_vcode){
				status = 1; 
				$("#vcode_login").addClass('err').siblings('div').css({'width':((8*14)+40)+'px'}).show().children('div').eq(1).html('验证码格式不正确');
				$("#vcode_login").focus(function(){
					$("#vcode_login").siblings('div').hide();
				});
				return status;
			}else{
				$("#vcode_login").siblings('div').hide();
			}
		}else{
			if(sum==0){
				status = 1;
				$("#vcode_login").addClass('err').siblings('div').css({'width':((7*14)+40)+'px'}).show().children('div').eq(1).html('验证码不能为空');
				$("#vcode_login").focus(function(){
					$("#vcode_login").siblings('div').hide();
				});
        	}
		}
	}

	var remember= $('#remember_me').attr('checked')=='checked'? 1:0;

    if(status == 0){
      var new_login = {
            username:email,
            password  :pwd,
            vcode:vcode,
            state:type,
            remember:remember,
            ac:"login"
            };
      return new_login;
  	}else{
        return false;
  	}
}
//登录
function login(){
        var status = $('#is_login_num').val();
        var list   = "";
        var sum =0;
        
        if(status == 1){
           list = login_sub_list(sum,'vcode');
        }else{
           list = login_sub_list(sum,'from');
        }
         if(list && list != 1){
              Itemlogin.loginsubmit(list);
         }else{
                return false;
         }
      }
//注册模式切换
function get_reg_info(mod){
	$.ajax({
	    type: "GET",
	    url:'/index.php?c=ajax&a=get_reg_info&model='+mod+'&r='+Math.random(),
	    dataType: 'jsonp',
	    jsonp:'callback',
	    success:function(result){
	        $('#reg_mod').html(result.val);
	    }
	});
}

function login_mobile(){
		var mobile=$('#email_login').val();
		var mcode=$('#mobile_login').val();
		var pwd=$('#pwd_login').val();
        Itemlogin.submit_mobile(mobile,mcode,pwd);
      }

function login_otp(){
     var email = $("#email_login").val();
     var pwd   = $("#pwd_login").val();
     var name  = $("#name_login").val();
     var moblie = $("#moblie_login").val();
     var otp    = $("#otp_login").val();
     var agr    = $("#agr").val();
     var is_otp = Itemlogin.check_list('mobile',moblie);
     if(!moblie){ $("#t_mobile").html('手机号不能为空');return false;}
     if(!otp){ $("#t_otp").html('验证码不能为空');return false;}
     if(!is_otp){
          $("#t_mobile").html('手机号格式不正确');
          return false;
       }
     var data = {
          tv_email:email,
          tv_pwd  :pwd,
          tv_name :name,
          tv_mobile:moblie,
          tv_otp:otp,
          tv_agr:agr,
          state:'otp'
         };         
     if(!data) return false;
        $.post("/index.php?c=ajax&a=new_user_do", data,
           function(data1){
                var k=eval("("+data1+")");
                 if(k.err == 21 ){
		    	 $("#t_mobile").html(k.msg).show();
		    }else if(k.err == 20 ){
		    	 $("#t_mobile").html(k.msg).show();
		    }else if(k.err == 11 ){
		    	 $("#t_mobile_otp").html(k.msg).show();
		    }else if(k.err == 12 ){
		    	 $("#t_mobile_otp").html(k.msg).show();
		    }else if(k.err == 0 ){
                         show_sign(data.tv_email);
                    }else{
		    	  $("#t_mobile").html("网络繁忙，请稍后再试");
		    }
          });
         return true;

  
    }

function time1(o,wait,type) {
	if (wait == 0) {
		o.removeAttribute("disabled");			
		o.value ="重新发送";
		wait = 60;
        o.className ="SMS60";
        o.style.cursor="pointer";
        o.onclick = function()
        {
          if(type ==1){
             send_post();
           }else{
             send_mobile();
          }
        };
	} else {
		o.setAttribute("disabled", true);
                o.className ="SMS60 nclick";
		o.value ="" + wait + "秒后重发";
		wait--;
		setTimeout(function(){time1(o,wait);},1000,1);
	}
}

function  send_post(){
     $("#t_mobile").html('').hide();
     var moblie = $("#moblie_login").val();
     if(!moblie){ $("#t_mobile").html('手机号不能为空').show();return false;}
     var is_otp = Itemlogin.check_list('mobile',moblie);
     if(!is_otp){
          $("#t_mobile").html('手机号格式不正确').show();
          return false;
       }
    _url = host_url +'/index.php?c=ajax&a=send_moblie';
    $.ajax({
            url: _url,
            type: "POST",
            async:false,
            data: "tv_otp="+moblie,
            cache: false,
            success:function (data) {
                       var k=eval("("+data+")");
                       if(k.err == 9){
                            time1(document.getElementById("send_otp"),60);
                         }else if(k.err = 9 ){
                            $("#t_mobile").html(k.msg).show();
                         }
                  }
    });
 }

function send_mobile(){

   var tel = $("#email_login").val();
	var tel_code = $("#vcode_login").val();
   var _url = host_url +'/index.php?c=plugs&a=mobile_post';
   $.ajax({
            url: _url,
            type: "POST",
            async:false,
            //data: "tv_otp="+tel,
	   		data: "tv_otp="+tel+"&tel_code="+tel_code,
            cache: false,
            success:function (data) {
                       var k=eval("("+data+")");
                       if(k.err == 6){
                            $("#is_mobile_check").val(1);
                            time1(document.getElementById("mobile_s"),60,2);
							$("#vcode_login").val('');
						   $("#vcode_login").siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(k.msg);
						   $("#yzm_id").attr("src","/home/public/verify.html");
						   $("#vcode_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
						   $("#vcode_login").focus(function(){
							   $("#vcode_login").siblings('div').hide();
						   });
                       }else if(k.err == 7){
                         	var msg=k.msg;
                         	var str=msg.replace(/[^\x00-\xff]/g, 'xx');
						   $("#vcode_login").siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(k.msg);
						   $("#yzm_id").attr("src","/home/public/verify.html");
						   $("#vcode_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
						   $("#vcode_login").focus(function() {
							   $("#vcode_login").siblings('div').hide();
						   });
                       }else if(k.err == 8){
						   var msg=k.msg;
						   var str=msg.replace(/[^\x00-\xff]/g, 'xx');
						   $("#vcode_login").siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(k.msg);
						   $("#yzm_id").attr("src","/home/public/verify.html");
						   $("#vcode_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
						   $("#vcode_login").focus(function(){
							   $("#vcode_login").siblings('div').hide();
						   });
					   }else{
						   var msg=k.msg;
						   var str=msg.replace(/[^\x00-\xff]/g, 'xx');
						   $("#email_login").siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(k.msg);
						   $("#yzm_id").attr("src","/home/public/verify.html");
						   //$("#vcode_login").addClass('err').siblings('div').css({'width':((str.length*7)+40)+'px'}).show().children('div').eq(1).html(msg);
						   $("#vcode_login").focus(function(){
							   $("#vcode_login").siblings('div').hide();
						   });
					   }
                  }
    }); 
}

var emailSurfixArray = ['@sina.com', '@163.com', '@qq.com', '@126.com', '@vip.sina.com', '@sina.cn', '@hotmail.com', '@gmail.com', '@sohu.com', '@139.com', '@wo.com.cn', '@189.cn', '@21cn.com'];

function moreName(event) {
    var sval = this.value;
    event = event ? event : window.event;
    var keyCode = event.keyCode;
    var vschool = $('#intelligent-regName');
    
    if (keyCode == 40 || keyCode == 38 || keyCode == 13) {
        var tipindex = $("#hnseli").val() == "" ? -1 : $("#hnseli").val();
        var fobj;
        if (keyCode == 40) {
            tipindex++;
            if (tipindex == vschool.find("li").length) {
                tipindex = 0;
                vschool.find("li").eq(vschool.find("li").length - 1).css("background-color", "");
            }
            fobj = vschool.find("li").eq(tipindex);
            vschool.find("li").eq(tipindex - 1).css("background-color", "");
            fobj.css("background-color", "#EEEEEE");
            $("#email_login").val(fobj.html().replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
            $("#schoolid").val(fobj.attr("value"));
            $("#hnseli").val(tipindex);
            return;
        } else if (keyCode == 38) {
        	tipindex--;
            if (tipindex <= -1) {
                tipindex = vschool.find("li").length - 1;
                vschool.find("li").eq(0).css("background-color", "");
            }
            vschool.find("li").eq(tipindex + 1).css("background-color", "");
            fobj = vschool.find("li").eq(tipindex);
            fobj.css("background-color", "#EEEEEE");
            if (fobj.html() != null) {
                $("#email_login").val(fobj.html().replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
                $("#schoolid").val(fobj.attr("value"));
            }
            $("#hnseli").val(tipindex);
            return;
        } else if (keyCode == 13) {

        	$("#hnseli").val("-1");
            if ($("#email_login").val().length >= 1) {
                var combinedValue = vschool.find("li").eq(tipindex).html();
                if (combinedValue != null) {
                    $("#email_login").val(combinedValue.replace(/<(\S*?)[^>]*>|<.*? \/>/g, ""));
                }
                vschool.empty().hide();
                if ($("#schoolid").val() != "") {
                    $("#hnschool").val("1");
                    $("#hnschool").attr("sta", 2);
                    $("#email_login").focus();
                    $('#intelligent-regName').hide();
                } else {
                    $("#hnschool").val("-1");
                    $("#hnschool").attr("sta", 0);
                    $("#regNamel_error").html("");
                    $("#regName_succeed").removeClass("succeed");
                }
            }
            return false;
        }
    } else {
        //hide morePin
        //$("#morePinDiv").removeClass().addClass("intelligent-error hide");

        if (sval != "") {
            var userinput = sval;
            var oldSval = "";
            var pos = sval.indexOf("@");
            var count;
           	var reg="/@/gi";    //查找时忽略大小写
			reg=eval(reg);
			if(sval.match(reg)==null){
			       count=0;
			}else{
			       count=sval.match(reg).length;
			}
            if (pos >= 0 && count == 1) {
                oldSval = sval.substring(0, pos);

	            $("#schoolid").val("");
            	$("#hnseli").val("-1");
	            var html = "";
	            if (/[\u4E00-\u9FA5]/g.test(sval)) {
	                html = "<li>" + sval + "</li>";
	            } else {
	                if (oldSval != '') {
	                    sval = oldSval;
	                }
	                if (userinput.indexOf("@") == 0) {
	                    sval = "";
	                }
	                
	                var partSurfix = initEmailSurfixArray(userinput);
	                if (partSurfix != null) {
	                    for (var i = 0; i < partSurfix.length; i++) {
	                        html += "<li>" + sval + partSurfix[i] + "</li>";
	                    }
	                }
	            }
	            if(html){
	            	if (sval.length > 25) {
		                $('#intelligent-regName').hide();
		            } else {
		                $('#intelligent-regName').show();
		                $('#intelligent-regName').html(html).find("li").mousedown(function () {
		                    $("#email_login").val($(this).html());
		                    $('#intelligent-regName').hide();
		                    $("#schoolid").val($(this).attr("value"));
		                    $("#hnseli").val("-1");
		                });
		            }
		        }else{
		        	$('#intelligent-regName').hide();
		        }
	        } else {
	            $('#intelligent-regName').hide();
	            $("#schoolid").val("");
	            $("#hnseli").val("-1");
	        }
	    	return;
	    }
    }
}

function initEmailSurfixArray(str) {
    var pos = str.indexOf("@");
    if (pos < 0 || pos == (str.length - 1)) {
        return emailSurfixArray;
    }
    var inputSurfix = str.substring(pos, str.length);
    var suitableSurfixArray = [];
    var j = 0;
    for (var i = 0; i < emailSurfixArray.length; i++) {
        if (emailSurfixArray[i].indexOf(inputSurfix) == 0) {
            suitableSurfixArray[j] = emailSurfixArray[i];
            j++;
        }
    }

    return suitableSurfixArray;
}

$("#intelligent-regName li").live("mouseover",function () {
    var vi = $(this).attr("dex");
    var tipindex = $("#hnseli").val() == "" ? -1 : $("#hnseli").val();
    if (tipindex <= 0) {
        tipindex = 0;
    }
    $('#intelligent-regName').find("li").eq(tipindex).css("background-color", "");
    $(this).css("background-color", "#EEEEEE");
    $("#hnseli").val($(this).attr("dex"));
}).live("mouseleave", function () {
        var tipindex = $("#hnseli").val() == "" ? -1 : $("#hnseli").val();
        if (tipindex <= 0) {
            tipindex = 0;
        }
        $(this).css("background-color", "");
        $("#hnseli").val("-1");
    });
$("#email_login").live('keyup',moreName);
$("#email_login").live('focus',moreName);
$("#email_login").live('blur',function(){
							$('#intelligent-regName').hide();
						});
$("#email_login").blur(function () {
    setTimeout(function () {
        if ($("#schoolid").val() == "") {
            $("#schoolinput").val("");
            $("#hnschool").val("-1");
            $("#hnschool").attr("sta", 0);
            $("#schoolinput_succeed").removeClass("succeed");
        } else {
            $("#hnschool").val("1");
            $("#hnschool").attr("sta", 2);
            $("#schoolinput_error").html("");
            $("#schoolinput_succeed").addClass("succeed");
        }
        $('#intelligent-school').hide().empty();
        $("#hnseli").val("-1");
    }, 200)
})

function send_email(email){
   $.post('/index.php?c=plugs&a=send_email&r='+Math.random(),{'email':email},function(result){
	   var data=$.trim(result);
	   if(data=='ok'){
	   	window.location.href="/index.php?c=site&a=reg_email&email="+email;
	   		//alert('邮件发送成功!');
		 }else{
		   alert('邮件发送失败:\r请确认邮箱'+email+'是否可用或重试！');
		   
		}
	});
}

function send_email_reg(email){
   $.post('/index.php?c=plugs&a=send_email&r='+Math.random(),{'email':email},function(result){
	   window.location.href="/index.php?c=site&a=reg_email&email="+email;
	});
}
//密码修改验证
function pwd_list_lucky(id,value){
	var status = 0;
	if(value != ""){
		var is_pwd1 = Itemlogin.check_length(1,value);
		//var is_pwd2 = Itemlogin.check_list('pwd',value);
		var is_pwd3 = Itemlogin.check_list('int',value);
		var is_pwd4 = Itemlogin.check_list('word',value);
		if((/\s/g.test(value))){
			status = 2;
			$("#"+id).siblings('span').show().html('仅限8-14位字符，不允许有空格');
			return status;
		}
		if((/[\u4E00-\u9FA5]/g.test(value))){
			status = 3;
			$("#"+id).siblings('span').show().html('仅限8-14位字符，不允许纯数字');
			return status;
		}
		if(!is_pwd1){
			status = 4;
			$("#"+id).siblings('span').show().html('仅限8-14位字符，不允许纯数字');
			return status;
		}else if(is_pwd3){
			status = 5;
			$("#"+id).siblings('span').show().html('不允许纯数字密码');
			return status;
		}else if(is_pwd4){
			status = 6;
			$("#"+id).siblings('span').show().html('不允许纯字母密码');
			return status;
			/*}else if(!is_pwd2){
			 status = 0;
			 $("#"+id).siblings('span').show().html('仅限8-14位字符，不允许纯数字');
			 return status;*/
		}else{
			status = 1;
			$("#"+id).siblings('span').hide();
		}
	}else{
		status = 0;
		$("#"+id).focus(function(){
			$("#"+id).siblings('span').hide();
		});
		return status;
	}
	return status;
}
function pwd_list(id,value){
	var status = 0;
	if(value != ""){
	     var is_pwd1 = Itemlogin.check_length(1,value);
	     //var is_pwd2 = Itemlogin.check_list('pwd',value);
	     var is_pwd3 = Itemlogin.check_list('int',value);
	     var is_pwd4 = Itemlogin.check_list('word',value);
	    if((/\s/g.test(value))){
			status = 0;
		     $("#"+id).siblings('span').show().html('仅限8-14位字符，不允许有空格');
		     $("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
		     return status;
		}
		if((/[\u4E00-\u9FA5]/g.test(value))){
			status = 0;
			$("#"+id).siblings('span').show().html('仅限8-14位字符，不允许纯数字');
		     $("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
			return status;
		}
		if(!is_pwd1){
		     status = 0;
		     $("#"+id).siblings('span').show().html('仅限8-14位字符，不允许纯数字');
		     $("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
		     return status;
		  }else if(is_pwd3){
		     status = 0;
		     $("#"+id).siblings('span').show().html('不允许纯数字密码');
		     $("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
		     return status;
		  }else if(is_pwd4){
		     status = 0;
		     $("#"+id).siblings('span').show().html('不允许纯字母密码');
		     $("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
		     return status;
		  /*}else if(!is_pwd2){
		     status = 0;
		     $("#"+id).siblings('span').show().html('仅限8-14位字符，不允许纯数字');
		     return status;*/
		  }else{
		  	 status = 1;
		  	 $("#"+id).siblings('span').hide();        
		  }
	}else{
		status = 0;
		$("#"+id).focus(function(){
			$("#"+id).siblings('span').hide();
		});
		return status;
	}
	return status;
}
//email验证 
function email_list(id,value){
	var status = 0;
	if(value != ""){
		var is_email1 = Itemlogin.check_list('email',value);
		var is_email2 = Itemlogin.check_email_one(value);
		if((/[\u4E00-\u9FA5]|\s/g.test(value))){
			status = 0;
			$("#"+id).siblings('span').show().html('邮箱格式错误');
			$("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
			return status;
		}
		if(!is_email1){
			status = 0;
			$("#"+id).siblings('span').show().html('邮箱格式错误');
			$("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
			return status;
		}else{
			if(!is_email2){
				status = 0;
				$("#"+id).siblings('span').show().html('邮箱已注册');
				$("#"+id).focus(function(){
					$("#"+id).siblings('span').hide();
				});
				return status;
			}else{
				status = 1;
				$("#"+id).siblings('span').hide();
			}
		}
	}else{
		status = 0;
		$("#"+id).focus(function(){
			$("#"+id).siblings('span').hide();
		});
		return status;
	}
	return status;
}

//vode验证 
function yzm_list(id,value){
	var status = 0;
	if(value != ""){
		var is_vcode = Itemlogin.check_list('vcode',value);
		if(!is_vcode){
			status = 0;
			$("#"+id).siblings('span').show().html('验证码格式不正确');
			$("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
			return status;
		}else{
			status = 1;
			$("#"+id).siblings('span').hide();
		}
	}else{
			status = 0;
			$("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
    }
	return status;
}
//手机验证码验证 
function opt_list(id,value){
	var status = 0;
	var  m_code = $("#is_mobile_check").val();
    if(m_code == 1){
        if(value  == ""){
			status = 0;
			$("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
			return status;
        }else{
        	$("#"+id).siblings('span').hide();
        	status = 1;
		}
     }else{
     	if(value  == ""){
			status = 0;
			$("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
			return status;
		}else{
			status = 1;
			$("#"+id).siblings('span').hide();
		}
	}
	return status;
}

//手机号码验证 
function mobile_list(id,value){
	var status = 0;
	if(value != ""){
		var is_mobile = Itemlogin.check_list('mobile',value);
		var is_email2 = Itemlogin.check_email_one(value);
		if(!is_mobile || value.length<11){
			status = 0;
			$("#"+id).siblings('span').show().html('请输入11位大陆手机号');
			$("#"+id).focus(function(){
				$("#"+id).siblings('span').hide();
			});
			return status;
		}else{
			if(!is_email2){
				status = 0;
				$("#"+id).siblings('span').show().html('该手机号码已存在');
				$("#"+id).focus(function(){
					$("#"+id).siblings('span').hide();
				});
				return status;
			}else{
				status = 1;
				$("#"+id).siblings('span').hide();
			}
		}
	}else{
		status = 0;
		$("#"+id).focus(function(){
			$("#"+id).siblings('span').hide();
		});
		return status;
	}
	return status;
}