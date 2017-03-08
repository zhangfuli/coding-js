$(function  () {
	$('.according ul li').mouseenter(function(){
		$('.according ul li').stop().animate({
			width: '110px'
		},300);
		$('.according li img').css('opacity','.5');
		$(this).stop().animate({
			width : '540px'
		},300).find('img').css('opacity' ,'1');
	})

})