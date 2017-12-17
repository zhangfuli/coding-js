$(function (argument) {
	$(window).on('scroll',function(){
		if($(window).scrollTop()>100){
			$('.header').removeClass('larger').addClass('small');
		}else{
			$('.header').removeClass('small').addClass('larger');
		}
	});
});