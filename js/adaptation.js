function AutoWrap(){
    var WinWidth = $(window).width()||$(document).width();
    if(WinWidth < 1400){
        $('body').removeClass('hm-w1200');
        $('body').addClass('hm-w1000');
    }
    else{
        $('body').removeClass('hm-w1000');
        $('body').addClass('hm-w1200');
    };

    if(WinWidth <=1200){
        $('.sroll-top').hide();
    }else{
        $('.sroll-top').show();
    }
}
AutoWrap();
$(window).resize(function(){
    AutoWrap();
});