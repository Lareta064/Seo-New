document.addEventListener("DOMContentLoaded", function () {
	
	/*==========slick slider========== */
	$('.catalogy-slider').slick({
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		responsive: [
			{
				breakpoint: 1919,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					
				}
			},
			{
				breakpoint: 1699,
				settings: {
				
					slidesToShow: 3,
					slidesToScroll: 1,
					
				}
			},
			{
				breakpoint: 1365,
				settings: {
				
					slidesToShow: 3,
					
				}
			},
			{
				breakpoint: 1199,
				settings: {
				
					slidesToShow: 2,
					slidesToScroll: 1,
					
				}
			},
			{
				breakpoint: 1024,
				settings: {
				
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true,
				}
			},
			{
				breakpoint: 767,
				settings: {
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					
				}
			},
		]

		});
	
	 
	// Расчет ширины для .slick-dots li
    function setDotsWidth() {
        const dots = $('.slick-dots');
        const dotItems = dots.find('li');
        const totalWidth = dots.width();
        const numberOfDots = dotItems.length;

        // Рассчитываем ширину для каждого .slick-dots li
        const dotWidth = totalWidth / numberOfDots;

        // Устанавливаем ширину
        dotItems.css('width', dotWidth);
    }

    // Устанавливаем ширину точек при загрузке и изменении размера окна
    setDotsWidth();
    $(window).resize(setDotsWidth);
});