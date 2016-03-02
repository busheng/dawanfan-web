var live_pic_cur=-1;
var live_pic_str='';
var live_pic_obj=null;
var live_pic_do=0;
var live_pic_handle=null;
var pic_base_path='';
var host_url='';
//window.onerror=function(){return true;}

$(function(){
	/*框登录*/
	$('.btn_login').live('click',function(){login_();return false;});
	$('.qq-login').live('click',function(){toQzoneLogin();return false;});//qq快捷登录
	$('.weibo_login').live('click',function(){toWeiboLogin();return false;});//微博快捷登录
	/*框注册*/
	$('.btn_register').live('click',function(){login_open();;return false;});	
	/*首页顶部效果*/
	$('.top_hover').hover(function(){$(this).children('a').addClass('hover');$(this).children('div').show();},function(){$(this).children('a').removeClass('hover');$(this).children('div').hide();});

	/*频道图片切换*/
    /*
	$('body').delegate('.bx_hover','mouseover',function(){
        var obj=$(this).find('img');
		if(!obj)return;
		var _class=obj.attr('class');
		   switch(_class){
		      case 'live_pic_change'://直播
			          if(live_pic_obj && live_pic_obj.attr('data-id')==obj.attr('data-id'))return;
			          if(live_pic_obj)change_live_pic_init(live_pic_obj);
					  live_pic_obj=obj;
					  live_pic_handle=setTimeout('change_live_img()',500);				  
			    break;
		   }
   });
   */
    $('.bx_hover').on({
        mouseenter:function(){
            clearTimeout(live_pic_handle);
            var obj=$(this).find('img');
              if(live_pic_obj && live_pic_obj.attr('data-id')==obj.attr('data-id'))return;
              if(live_pic_obj)change_live_pic_init(live_pic_obj);
              live_pic_obj=obj;
              change_live_img();
        },
        mouseleave:function(){
            clearTimeout(live_pic_handle);
        }
    })
   
/*关闭*/
/*  $('.close').live('click',function(){
    $(this).parent().fadeOut();
  });*/
  
  /*登录，注册切换*/
  $('#user_login').live('click',function(){
      $(this).parent().children('a').removeClass('ul_now');
	  $(this).addClass('ul_now');
	  $('#userLogin').show();
	  $('#userJoin').hide();  
	  return false;
  });
  
 $('#user_reg').live('click',function(){
     $(this).parent().children('a').removeClass('ul_now');
	  $(this).addClass('ul_now');
	  $('#userJoin').show();
	  $('#userLogin').hide(); 
	  return false;
 });
   /*登录，注册切换-----------end*/
  
  //$('.left_btn').click(function(){simple_left_toggle(0);return false;});
//  simple_toggle();
//  $('.btn_right').click(function(){right_toggle();return false;});
  $('.menu2 a').hover(function(){
      show_title($(this));
   },function(){
      $('#title_tips').remove();
   });
  send_client_info();
  $('body').delegate('.bx_hover','mouseover',function(){$(this).addClass('gradient');});
  $('body').delegate('.bx_hover','mouseout',function(){$(this).removeClass('gradient');});

 $('#live_left_nav_btn').click(function(){
    var _nav=$('#live_left_nav_list');
	    if(_nav.hasClass('hide')){
		  _nav.fadeOut('fast','',function(){_nav.removeClass('hide');});
		}else{
		  _nav.fadeIn('fast','',function(){_nav.addClass('hide');});
		}
 });
 
});

function change_live_img(){
	  obj=live_pic_obj;
	  obj.attr('orig-src',obj.attr('src'));
	   var cid=obj.attr('data-id');
	   $.get(host_url+'/index.php?c=livepic&a=shows&r='+Math.random(),{'cid':cid},function(result){
		   //alert(result);
		  var data=$.trim(result);
			  if(data=='')return;
			  live_pic_str=data;
			  live_pic_do=1;
			  change_live_pic();
	 });
}


//头部
var tt;
var curMenu;
function mouseover(th, menu) {
    if (tt) clearTimeout(tt);
    displayMenu(false);
    menu = document.getElementById('menu' + menu);
    curMenu = menu;
    displayMenu(true)
}
function mouseout() {
    tt = setTimeout('displayMenu(false)', 200)
}
function _mouseover() {
    if (tt) clearTimeout(tt);
    displayMenu(true)
}
function _mouseout() {
    displayMenu(false)
}
function displayMenu(display) {
    if (curMenu) {
        curMenu.style.display = display ? 'block' : 'none'
    }
}


function show_title(o){	
  var _this=o;
  var title;
   title=_this.attr('title')? _this.attr('title'):_this.attr('_title');
  if(!title)return;
  _this.removeAttr('title');
  _this.attr('_title',title);
  var str='<div id="title_tips"><span class="m2_t_b_i"></span><div class="m2_t_b_t">'+title+'</div></div>';
  $('body').append(str);
  var _h=_this.height()/2;
  var _w=_this.width()+20;
  var offset=_this.offset();
  var _top=offset.top+_h;
  var _left=offset.left+_w;
  $('#title_tips').css('top',_top).css('left',_left).fadeIn('fast');
}

function change_live_pic_init(o){
	 clearTimeout(live_pic_handle);
	 live_pic_str='';
	   o.attr('src',o.attr('orig-src'));
	   live_pic_cur=0;	
	   live_pic_do=0;
	  live_pic_obj=null;
}

function change_live_pic(){
	clearTimeout(live_pic_handle);
	if(!live_pic_do)return;
	var play_btn=live_pic_obj.parent().parent().parent().find('.play_btn');
	//alert(play_btn.css('display'));return;
	if(!play_btn || play_btn.css('display')=='none'){change_live_pic_init(live_pic_obj);return;}
   var pic_arr=live_pic_str.split('|');
   var k=pic_arr.length-1;
   live_pic_cur++;
   if(live_pic_cur>k)live_pic_cur=0;
   var pic=pic_arr[live_pic_cur];
   var a=new Image();
       a.src=pic;
	   a.onload=function(){
		   live_pic_obj.attr('src',pic);
		   live_pic_handle=setTimeout('change_live_pic()',500);	   
	   }

}

function change_vod_pic(){
	    var _this=live_pic_obj; 
 		var i_pub=_this.attr('i_pub');
		var v_len=_this.attr('v_len');
		var s_n=_this.attr('s');
  
	  live_pic_cur++;
	  
	 if(live_pic_cur>s_n)live_pic_cur=1;
	  var cur_src=pic_base_path+i_pub+'_'+live_pic_cur;	  			
	  var  Img = new Image(); 
		   Img.src = cur_src; 
		   _this.attr('src',cur_src); 
     live_pic_handle=setTimeout('change_vod_pic()',500);			
}

function msg(mess,t){
   if(!art.dialog){alert(mess);return;}
   var sj=2;
   switch(t){
	   case 1:
	      icn='succeed';
		  sj=1;
	     break;
		 
		case 2:
		   icn='question';
		  break; 
		  
		case 3:
		  icn='face-smile';
		  break;
		   
	   case 4:
	      icn='face-sad';
	     break;	 
		 
	   case 5:
	      icn='error';
	     break;

	   case 6:
		icn='warning';
	    	sj=200;
	    break;
		 
	   default:
		   icn='warning';
		 break; 
		 
	  	 
	}

   if(t == 6){

   art.dialog({drag: false, resize: false,content: mess, icon: icn, time: sj, lock: true, fixed: true});
   return;



   }


   art.dialog({
	  content: mess,
	  icon: icn,
	  fixed: true,
	  lock: true,
	   ok: null,
	  time: sj
  });
}

function tip_box_show(str){
	if(str=='')return false;
	if(!art.dialog){alert('art.dialog对象不存在！');return;}
	var _url='';
	switch(str){
	        case 'reg'://注册
		   _url=host_url+'/index.php?c=plugs&a=reg';
		  break;
		case 'login'://登录
		   _url=host_url+'/index.php?c=plugs&a=login';
		  break;	
                case 'is_email'://登录
                   _url=host_url+'/index.php?c=plugs&a=is_email';
                  break;
	}
	var dialog = art.dialog({id: 'ID369074',title: false,fixed:true,lock:true});
	$.ajax({
		url: _url,
		success: function (data) {
			dialog.content(data);
		},
		cache: false
	});
	return false;
}

function bx_show(id,_title){
 	if(id=='')return false;
	if(!art.dialog){alert('art.dialog对象不存在！');return;}
	if(_title=='')_title=false;
	var dialog = art.dialog({id: 'ID369058',title: _title,fixed:true,lock:false,drag: false});
	var data=$('#'+id).html();
	dialog.content(data);
	return false;
}

function logout(){//退出
	if(!confirm('确认退出？'))return false;
	$.post(host_url+"/index.php?c=ajax&a=user_do",{ac:"logout"},function(result){
				var data=$.trim(result);
				var objdata=eval("("+data+")");		
			   $('body').append(objdata.msg);
			   setTimeout(function(){window.location.reload();},50);
			}
		);
}

function register(){
	var name = $("#jq_reg_name").val();
	var passwd = $("#jq_reg_passwd").val();
	var passwd2 = $("#jq_reg_passwd2").val();
	var email=$("#jq_reg_email").val();
	var tips=$("#jq_reg_tips");
	var yzm=$('#jq_reg_code').val();
	var sex=$('input[name=sex]:checked').val();
	var reg_btn=$('#reg_btn');
	   tips.hide();
	
	if(!name){tips.text('请输入用户名！').show();$('#jq_reg_name').focus();return false;}
	if(!passwd || passwd.length<6){tips.text('请输入密码且不少于6个字符！').show();$('#jq_reg_passwd').focus();return false;}
	if(passwd != passwd2){tips.text('两次输入的密码不一致！').show();$('#jq_reg_passwd2').focus();return false;}
	if(!email){tips.text('请输入有效的Email！').show();$("#jq_reg_email").focus();return false;}	
	if(!yzm){tips.text('请输入验证码').show();$("#jq_reg_code").focus();return false;}
	if($('#service_agreen').attr('checked')!='checked'){tips.text('同意相关服务条款后方可注册！').show();return false;}
	tips.html('正在注册，请稍候...');
	 reg_btn.attr('disabled',true);
	$.post(host_url+"/index.php?c=ajax&a=user_do&r="+Math.random(),
            {
				'username':name,
				'password':passwd,
				'email':email,
				'sex'  :sex,
				'yzm'  :yzm,
				'ac':"register"
			},
			function(result){
				var data=$.trim(result);
				if(data==''){msg('注册失败！',4);reg_btn.val('立即注册').attr('disabled',false);return;}
				//alert(data);
				var objdata=eval("("+data+")");
				   if(objdata.err==0){
					   msg('恭喜您，账号注册成功！',1);
					   $('body').append(objdata.msg);
					   setTimeout(function(){window.location.reload();},1000);
					}else{
					  //msg(objdata.msg,4);
					  tips.text(objdata.msg).show();
					  reg_btn.val('立即注册').attr('disabled',false);
					  $('#yzm_code').attr('src',$('#yzm_code').attr('src')+'?');
					}
			}
		);
	return false;
}

function toQzoneLogin(){
	    var h=400,w=700;
		var t = (screen.height-h)/3; //离顶部距离
		var l = (screen.width-w)/2; //离左边距离	
	    var childWindow = window.open("http://www.huomaotv.cn/oauth/qqconnect","TencentLogin","width="+w+",height="+h+",menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1,top="+t+",left="+l);
} 

function toWeiboLogin(){
	    var h=400,w=700;
		var t = (screen.height-h)/3; //离顶部距离
		var l = (screen.width-w)/2; //离左边距离	
	    var childWindow = window.open("/oauth/weiboconnect","weiboconnect","width="+w+",height="+h+",menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1,top="+t+",left="+l);
} 

function alert(str){
  return msg(str,6);
}

function faq_save(){//问题反馈
  var tel=$('#tel');
  var content=$('#content');
  var tips = $('.tips');
      tips.hide();
	  $('input,textarea').removeClass('error');
	    
      if(tel.val()==''){
		 tips.text('请填写联系方式！').show();
		 tel.addClass('error').focus();
	    return false;	  
	  }
	  
      if(content.val()==''){
		 tips.text('请填写反馈的内容！').show();
		 content.addClass('error').focus();
	    return false;	  
	  }	  
	  
	 $.post(host_url+'/index.php?c=plugs&a=faq_save&r='+Math.random(),$('#add_faq_frm').serialize(),function(result){
	     var data=$.trim(result);
		 if(data=='ok'){
	         msg('提交成功！',1);
			 setTimeout('location=location',1000);
		  }else{
		     alert(data);
		  }
	  }); 
   return false;
}

//function simple_toggle(){
//  var len=$('#menu').length;
//  if(!len)return;	
//  simple_left_toggle(1);
//}


//function simple_left_toggle(t,_close){//左边切换 
//	  if(!t){
//	    var b=$('#menu').hasClass('simple');
//	  }else{
//	    var v=readCookie('left_toggle'); 
//		var b=v=='close'? 0:1;
//	  }
//	  if(_close)b=false;
//
//    // alert(readCookie('left_toggle'));
//   
//    if(b){
//	   $('#menu').removeClass('simple');
//	   $('.play').removeClass('ml50');
//	   //$('.m2_t_b').hide();
//	   $('.left_btn').removeClass('left_btn2').attr('title','点击收起左边菜单');
//	   if(!t)writeCookie('left_toggle','open');
//	}else{
//	   $('#menu').addClass('simple');
//	   $('.play').addClass('ml50');
//	    $('.left_btn').addClass('left_btn2').attr('title','点击打开左边菜单');
//	   if(!t)writeCookie('left_toggle','close');
//	}
//	
//	
//	if(!t && typeof(resize_list) == "function") {
//		resize_list();
//	}
//	if(typeof(chat_size_change) == "function") {
//		chat_size_change();
//	}	
//		
//	//$('#menu').show();
//	$('body').show();
//}


//function right_toggle(p,auto_close){//右边切换
//    var s=$('#sider');
//    var b=s.hasClass('hide');
//	var pay=$('#play');
//	var r=$('.btn_right');
//	var t=200;
//	if(p)b=false;
//	if(b){//打开
//	   thisMovie('StrobeMediaPlayback').hideChat();
//	   pay.animate({marginRight:'340px'},t);
//	   s.removeClass('hide').animate({width:'300px'},t);
//	   r.animate({right:'340px'},t,'',function(){
//		    r.removeClass('btn_right2').attr('title','隐藏右边内容');
//			if(typeof(chat_size_change) == "function" && !auto_close) {
//				chat_size_change();
//			}			
//		  });
//	
//	}else{//关闭
//	   thisMovie('StrobeMediaPlayback').showChat();
//	   pay.animate({marginRight:0},t);
//	   s.animate({width:0},t,'',function(){s.addClass('hide');
//			if(typeof(chat_size_change) == "function" && !auto_close) {
//				chat_size_change();
//			}else{
//				 var w_h=$(window).height();
//			     var swf_w=$('#player_box').width();
//				 var swf_h;
//				 if(swf_w){
//					swf_h=swf_w*9/16;
//					if(swf_h>w_h){swf_h=w_h-20;}
//					$('#player_box').height(swf_h);
//				 }			
//			}
//				   
//	   });
//	   r.animate({right:'0px'},t,'',function(){r.addClass('btn_right2')}).attr('title','打开右边内容');
//	 }
//
//}
function subs_do(uid,cid,o){//订阅
    if(!uid || !cid)return;
	var _this=$(o);
	$.post(host_url+'/index.php?c=ajax&a=subs_do&rnd='+Math.random(),{'cid':cid,'uid':uid},function(result){
	   var data=$.trim(result);
	   var dataobj=eval("("+data+")");
	   if(dataobj.err==0){
		   _this.text(dataobj.txt);
		   $('#subs_bx').text(dataobj.subs_count);
		   $('#subs_bx1').text(dataobj.subs_count);
		   //alert(dataobj.tp);
		   if(dataobj.tp=='qx'){
			   $('#subs_btn').removeClass('dy2').attr('title','点击订阅');
			}else{
			 $('#subs_btn').addClass('dy2').attr('title','点击退订');
			}
		     //msg(dataobj.msg,1);
		}else{
			if(dataobj.err==1){
			  tip_box_show('login');
			}else{
			  alert(dataobj.msg);
			}
		}
	});
}

function ck_subs(uid,channel_id){//检查订阅情况
    if(!uid || !channel_id)return;
	$.post(host_url+'/index.php?c=ajax&a=ck_subs&rnd='+Math.random(),{'uid':uid,'channel_id':channel_id},function(result){
	   var data=$.trim(result);
	   if(data=='')return;
	   var dataobj=eval("("+data+")");
	   $('#subs_bx').text(dataobj.count);
		$('#subs_bx1').text(dataobj.count);
	     if(dataobj.stat==1){
		     //$('#subs_btn').text('已订阅').attr('title','点击退订').addClass('dy2');
		     $('#subs_btn').attr('title','点击退订').addClass('dy2');
		 }
	});	
}

function writeCookie(name, value, hours)//写cookie
{
  var expire = "";
  if(hours != null)
  {
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }else{
     expire = new Date((new Date()).getTime() + 24 * 7 * 3600000);
     expire = "; expires=" + expire.toGMTString(); 
 }
  document.cookie = name + "=" + escape(value) + expire +';path=/';
}

function readCookie(name)//读cookie
{
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0)
  { 
    offset = document.cookie.indexOf(search);
    if (offset != -1)
    { 
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}

function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=readCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
} 
function send_client_info(){	
  var _time=readCookie('send_client_time')? Number(readCookie('send_client_time')):60;//1分钟检查一次
      _time--;
	 // alert(_time);
	  if(_time<=0 || !readCookie('send_client_time')){
		 writeCookie('send_client_time','60'); 
		 $.post(host_url+'/index.php?c=plugs&a=send_client_info&r='+Math.random(),{'act':'do'},function(result){
			//alert(result);
		 });
	  }else{
	   writeCookie('send_client_time',_time);	  
	  }
	 setTimeout('send_client_info()',1000);	  
}

function open_url(url,uploadpic,fpath){
	if(url=='')return false;
	if(!art.dialog){alert('art.dialog对象不存在！');return;}
	var dialog = art.dialog({id: 'ID369074',title: false,fixed:true,lock:true});
	$.ajax({
		url: url,
		success: function (data) {
			dialog.content(data);
			if(uploadpic){
			   webupload_init('filePicker',fpath);
			}
			
		},
		cache: false
	});
	return false;
}

function scrollup(o,d,c){
    if(d==c){
        var t=getFirstChild(o.firstChild).cloneNode(true);
        o.removeChild(getFirstChild(o.firstChild));
        o.appendChild(t);
        t.style.marginTop="0px";
    }else{
        c+=2;
        getFirstChild(o.firstChild).style.marginTop=-c+"px";
        window.setTimeout(function(){scrollup(o,d,c)},20);
    }
}
//解决firefox下会将空格回车作为节点的问题
function getFirstChild(node){
  while (node.nodeType!=1)
  {
         node=node.nextSibling;
  }
  return node;
}

function scrollleft(o,d){
        getFirstChild(o.firstChild).style.marginLeft=-d+"px";
        var t=getFirstChild(o.firstChild).cloneNode(true);
        o.removeChild(getFirstChild(o.firstChild));
        o.appendChild(t);
        t.style.marginLeft="0px";
}


function uaredirect(f) {
  try {
    if (document.getElementById("bdmark") != null) {
      return
    }
    var b = false;
    if (arguments[1]) {
      var e = window.location.host;
      var a = window.location.href;
      if (isSubdomain(arguments[1], e) == 1) {
        f = f + "/#m/" + a;
        b = true
      } else {
        if (isSubdomain(arguments[1], e) == 2) {
          f = f + "/#m/" + a;
          b = true
        } else {
          f = a;
          b = false
        }
      }
    } else {
      b = true
    } if (b) {
      var c = window.location.hash;
      if (!c.match("pc")) {
        if ((navigator.userAgent.match(/(iPhone|iPod|ipad|Android|mobile|blackberry|webos|incognito|webmate|bada|nokia|lg|ucweb|ios|skyfire)/i))) {
          location.replace(f)
        }
      }
    }
  } catch (d) {}
}

function isSubdomain(c, d) {
  this.getdomain = function(f) {
    var e = f.indexOf("://");
    if (e > 0) {
      var h = f.substr(e + 3)
    } else {
      var h = f
    }
    var g = /^www\./;
    if (g.test(h)) {
      h = h.substr(4)
    }
    return h
  };
  if (c == d) {
    return 1
  } else {
    var c = this.getdomain(c);
    var b = this.getdomain(d);
    if (c == b) {
      return 1
    } else {
      c = c.replace(".", "\\.");
      var a = new RegExp("\\." + c + "$");
      if (b.match(a)) {
        return 2
      } else {
        return 0
      }
    }
  }
};


var pathname = window.location.pathname;
var search = window.location.search;
var url = "http://m.huomaotv.cn" + pathname + search;
uaredirect(url);
