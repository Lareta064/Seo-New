document.addEventListener("DOMContentLoaded", function () {
    const resultSlider = new Swiper('.result-slider', {
        
        speed: 800,
        pagination: {
            el: ".result-slider-pagination",
			clickable: true,
        },
    });

    resultSlider.on('slideChange', function () {
        // Получаем индекс активного слайда
        const activeIndex = resultSlider.activeIndex;

        // Находим все элементы .company-card
        const companyNames = document.querySelectorAll('.company-card');

        // Удаляем класс 'active' у всех .company-name
        companyNames.forEach(name => name.classList.remove('active'));

        // Добавляем класс 'active' элементу с текущим индексом
        if (companyNames[activeIndex]) {
			companyNames[activeIndex].classList.add('active');
        }
    });

    // technoSlider
    let technoSlider;
    function toggleSlider() {
        const screenWidth = window.innerWidth;
    
        if (screenWidth < 768) {
            if (!technoSlider) {
                
                technoSlider = new Swiper('.technology-slider', {
                    slidesPerView: 'auto',
                    spaceBetween: 35, // Пример настройки отступов между слайдами
                    grid:{
                        rows: 3
                    },
                    pagination: {
                        el: '.technology-pagination',
                        clickable: true,
                    },
                });
            }
        } else {
            if (technoSlider) {
                // Уничтожаем слайдер, если экран больше 768px
                technoSlider.destroy(true, true);
                technoSlider = null; // Сбрасываем переменную
            }
        }
    }
    
    // Вызываем функцию при загрузке страницы
    toggleSlider();
    
    // Добавляем слушатель для события изменения размера экрана
    window.addEventListener('resize', toggleSlider);
   
     // teamSlider;

    let teamSlider;

    function toggleTeamSlider() {
        const screenWidth = window.innerWidth;
    
        const teamSwiperElement = document.querySelector('.team-swiper'); // Проверяем наличие элемента
    
        if (teamSwiperElement) {
            if (screenWidth < 768) {
                if (!teamSlider) {
                    // Инициализация слайдера
                    teamSlider = new Swiper('.team-swiper', {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        grid: {
                            rows: 2
                        },
                        speed: 800,
                        pagination: {
                            el: '.team-pagination',
                            clickable: true,
                        },
                    });
                }
            } else {
                if (teamSlider) {
                    // Уничтожение слайдера
                    teamSlider.destroy(true, true);
                    teamSlider = null;
                }
            }
        } else {
            console.warn('Элемент .team-swiper не найден.');
        }
    }
    
    // Убедимся, что DOM и стили полностью загружены
    window.addEventListener('load', () => {
        toggleTeamSlider(); // Инициализация при загрузке страницы
    
        // Добавляем слушатель для изменения размера экрана
        window.addEventListener('resize', toggleTeamSlider);
    });
    //======= ====
    let clientsSlider;

    function toggleClientsSlider() {
        const screenWidth = window.innerWidth;
    
        const clientsSwiperElement = document.querySelector('.clients-swiper'); // Проверяем наличие элемента
    
        if (clientsSwiperElement) {
            if (screenWidth < 768) {
                if (!clientsSlider) {
                    // Инициализация слайдера
                    clientsSlider = new Swiper('.clients-swiper', {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        grid: {
                            rows: 3
                        },
                        pagination: {
                            el: '.clients-pagination',
                            clickable: true,
                        },
                    });
                }
            } else {
                if (clientsSlider) {
                    // Уничтожение слайдера
                    clientsSlider.destroy(true, true);
                    clientslider = null;
                }
            }
        } else {
            console.warn('Элемент .clients-swiper не найден.');
        }
    }
    
    // Убедимся, что DOM и стили полностью загружены
    window.addEventListener('load', () => {
        toggleClientsSlider(); // Инициализация при загрузке страницы
       
        // Добавляем слушатель для изменения размера экрана
        window.addEventListener('resize', toggleClientsSlider);
    });
  
    let portfolioSlider = new Swiper('.portfolio-slider', {
        effect: "cards",
        grabCursor: true,
        pagination: {
            el: '.portfolio-pagination',
            clickable: true,
        },
        speed: 1000,
    });
    // reviewSwiper
    let reviewSwiper;

    function initReviewSwiper() {
         const screenWidth = window.innerWidth;
        // Уничтожаем Swiper, если он уже существует
        if (reviewSwiper) {
            reviewSwiper.destroy(true, true);
            reviewSwiper = null;
        }
    
        // Создаем Swiper для экрана до 768px
        if (screenWidth < 768) {
            reviewSwiper = new Swiper('.review-swiper', {
                effect: "cards",
                grabCursor: true,
                pagination: {
                    el: '.review-pagination',
                    clickable: true,
                },
            });
        } 
        // Создаем Swiper для экрана от 768px и выше
        else {
            reviewSwiper = new Swiper('.review-swiper', {
                slidesPerView: screenWidth < 1024 ? 3 : 4,
                spaceBetween: 25,
                navigation: screenWidth >= 1024 ? {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                } : false,
                pagination: {
                    el: '.review-pagination',
                    clickable: true,
                },
                speed: 800,
            });
        }
    }
    
    // Инициализация при загрузке страницы
    initReviewSwiper();
    
    // Отслеживание изменения размера экрана
    window.addEventListener('resize', initReviewSwiper);
});