document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.pm-header');
    const mainBlock = document.querySelector('.pm-main-block');

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                // mainBlock не видно → добавить класс фиксированного хедера
                if (!header.classList.contains('pm-header--fixed')) {
                    header.classList.add('pm-header--fixed');
                    header.classList.remove('slide-up');
                }
            } else {
                // mainBlock виден → проиграть анимацию исчезания
                if (header.classList.contains('pm-header--fixed')) {
                    header.classList.add('slide-up');
                    // удалить класс после окончания анимации
                    header.addEventListener('animationend', function handler() {
                        header.classList.remove('pm-header--fixed', 'slide-up');
                        header.removeEventListener('animationend', handler);
                    });
                }
            }
        },
        { root: null, threshold: 0 }
    );

    if(mainBlock){
        observer.observe(mainBlock);
    }
});

//кнопка наверх

document.addEventListener('DOMContentLoaded', () => {
    const goUpBtn = document.getElementById('goUpBtn');

    if (goUpBtn){
        goUpBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
        window.addEventListener('scroll', () => {
            const sectionBottom = featuresSection.offsetTop + featuresSection.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight;

            if (scrollPosition >= sectionBottom) {
                goUpBtn.classList.add('visible');
            } else {
                goUpBtn.classList.remove('visible');
            }
        });
    }
});

//слайдер с рилсами 

document.addEventListener('DOMContentLoaded', () => {
    const mediaSliderContainer = document.querySelector('.pm-media__wrapper');
    if (mediaSliderContainer){
        const reelsSlider = new Swiper('.pm-media-slider', {
            spaceBetween: 16,
            slidesPerView: 'auto',
            navigation: {
                nextEl: document.querySelector('.pm-media__wrapper')?.querySelector('.pm-popular__next-btn'),
                prevEl: document.querySelector('.pm-media__wrapper')?.querySelector('.pm-popular__prev-btn'),
            },
        });
    }

    const reelsPopup = document.getElementById('reelsPopup');
    const reelsVideo = reelsPopup.querySelector('video');
    const reelsSource = reelsPopup.querySelector('source');
    const closeReelsPopup = reelsPopup.querySelector('#closeReelsPopup');

    document.querySelectorAll('.pm-media-reel').forEach(slide => {
        slide.addEventListener('click', (e) => {
            // чтобы клик по кнопке не ломал логику свайпа
            e.stopPropagation();

            const videoSrc = slide.dataset.video;
            if (!videoSrc) return;

            reelsSource.src = videoSrc;
            reelsVideo.load();

            reelsPopup.classList.add('active');
            document.body.classList.add('lock');
            reelsVideo.play();
        });
    });

    if (reelsPopup){
        reelsPopup.addEventListener('click', (e) => {
            if (e.target === reelsPopup) {
                document.body.classList.remove('lock');
                reelsPopup.classList.remove('active');
                reelsVideo.pause();
                reelsVideo.currentTime = 0;
            }
        }); 
    }

    if (closeReelsPopup){
        closeReelsPopup.addEventListener('click', (e) => {
                document.body.classList.remove('lock');
                reelsPopup.classList.remove('active');
                reelsVideo.pause();
                reelsVideo.currentTime = 0;
        });
    }
});

//слайдер в событиях
document.addEventListener('DOMContentLoaded', () => {
    const eventsSliderContainer = document.querySelector('.pm-events-slider');
    if (eventsSliderContainer){
        const eventsSlider = new Swiper('.pm-events-slider', {
            spaceBetween: 16,
            slidesPerView: 'auto',
            centeredSlides: true,
            initialSlide: 2,
            freeMode: true,
            speed: 400,
            pagination: {
                el: document.querySelector('.pm-events__wrapper')?.querySelector('.pm-popular-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: document.querySelector('.pm-events__wrapper')?.querySelector('.pm-popular__next-btn'),
                prevEl: document.querySelector('.pm-events__wrapper')?.querySelector('.pm-popular__prev-btn'),
            },
            breakpoints: {
                601: {
                    freeMode:false,
                }
            }
        });
    }
    // Кейсы (теперь просто список, но оставляем на случай если пользователь передумает)
    // const casesSlider = document.querySelector('.pm-gas-cases__slider');

    // Решения слайдер
    const solutionsSlider = document.querySelector('.pm-gas-solutions__slider');
    if (solutionsSlider) {
        var solutionsSwiper = new Swiper(solutionsSlider, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            speed: 600,
            grabCursor: true,
            watchSlidesProgress: true,
            navigation: {
                prevEl: '.pm-gas-solutions__prev-btn',
                nextEl: '.pm-gas-solutions__next-btn',
            },
            pagination: {
                el: '.pm-gas-solutions-pagination',
                clickable: true,
            },
            breakpoints: {
                1701: {
                    enabled: false,
                }
            },
            on: {
                init: function () {
                    console.log('Solutions Swiper initialized');
                }
            }
        });
    }
});

//слайдер в лайтбоксе с наградами

document.addEventListener('DOMContentLoaded', () => {
    const rewardsSliderContainer = document.querySelector('.pm-rewards-slider');
    if (rewardsSliderContainer){
        const rewardsSlider = new Swiper('.pm-rewards-slider', {
            spaceBetween: 16,
            slidesPerView: 'auto',
            pagination: {
                el: document.querySelector('.pm-rewards__wrapper')?.querySelector('.pm-popular-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: document.querySelector('.pm-rewards__wrapper')?.querySelector('.pm-popular__next-btn'),
                prevEl: document.querySelector('.pm-rewards__wrapper')?.querySelector('.pm-popular__prev-btn'),
            },
            breakpoints: {
                1182: {
                    slidesPerView: 6
                },
                1476: {
                    slidesPerView: 7
                },
            }
        });
    }

    const slides = document.querySelectorAll('.pm-rewards-slider .swiper-slide');
    const mainWrapper = document.querySelector('.pm-lightbox-slider .swiper-wrapper');
    const thumbsWrapper = document.querySelector('.pm-lightbox-thumbs .swiper-wrapper');

    if (slides){
        slides.forEach(slide => {
            const img = slide.querySelector('img');

            // основной слайд (большая картинка)
            const mainSlide = document.createElement('div');
            mainSlide.classList.add('swiper-slide');

            const mainImg = img.cloneNode(true);
            mainImg.classList.add('pm-lightbox-img');

            mainSlide.appendChild(mainImg);

            // миниатюра
            const thumbSlide = document.createElement('div');
            thumbSlide.classList.add('swiper-slide');

            const container = slide.querySelector('.pm-reward__img-container').cloneNode(true);
            thumbSlide.appendChild(container);

            mainWrapper.appendChild(mainSlide);
            thumbsWrapper.appendChild(thumbSlide);
        });
    }

    const lightboxThumbsContainer = document.querySelector('.pm-lightbox-thumbs');
    if (lightboxThumbsContainer){
        const lightboxThumbs = new Swiper('.pm-lightbox-thumbs', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            watchSlidesProgress: true,
        });
    }

    const lightboxSliderContainer = document.querySelector('.pm-lightbox-slider');
    if (lightboxSliderContainer){
        const lightboxSlider = new Swiper('.pm-lightbox-slider', {
            loop: true,
            effect: "fade",
            navigation: {
                nextEl: '.pm-lightbox .swiper-button-next',
                prevEl: '.pm-lightbox .swiper-button-prev',
            },
            thumbs: {
                swiper: lightboxThumbs,
            },
        });
    }

    const lightbox = document.getElementById('rewardsLightbox');

    document.querySelectorAll('.pm-rewards-slider .swiper-slide')
        .forEach((slide, index) => {
            slide.addEventListener('click', () => {
                lightbox.classList.add('active');
                document.body.classList.add('lock');

                lightboxSlider.slideTo(index);
                lightboxThumbs.slideTo(index);
            });
        });

    const lightBoxClose = document.querySelector('.pm-lightbox__close');
    if (lightBoxClose){
        document.querySelector('.pm-lightbox__close').addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                document.body.classList.remove('lock');
            }, 200)
        });
    }

    const lightBoxOverlay = document.querySelector('.pm-lightbox__overlay');
    if (lightBoxOverlay){
        document.querySelector('.pm-lightbox__overlay').addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('lock');
        });
    }
});

//переключение проектов-->
document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.querySelector('.pm-projects__main-content');

    if (projectContainer){
        const projectNavItems = projectContainer.querySelectorAll('.pm-menu-nav__main-item');
        const projectContents = projectContainer.querySelectorAll('.pm-project-content');

        if (projectNavItems){
            function setActive(item) {
                const id = item.dataset.projectid;

                // убираем активные
                projectNavItems.forEach(el => el.classList.remove('active'));
                projectContents.forEach(el => el.classList.remove('active'));

                // ставим новые
                item.classList.add('active');
                projectContainer.querySelector(`.pm-project-content[data-projectid="${id}"]`)?.classList.add('active');
            }

            projectNavItems.forEach(item => {
                item.addEventListener('mouseenter', () => setActive(item));
                item.addEventListener('click', () => {
                    setActive(item);
                });
            });
        }
    }
});


//слайдеры в преимуществах + видео -->

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pm-benefit-container').forEach(container => {

        const thumbsEl = container.querySelector('.benefit-thumbs-slider');
        const sliderEl = container.querySelector('.benefit-slider');
        const nextEl = container.querySelector('.pm-benefit-btn-next');
        const prevEl = container.querySelector('.pm-benefit-btn-prev');

        const thumbsSwiper = new Swiper(thumbsEl, {
            loop: false,
            spaceBetween: 2,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
        });

        const mainSwiper = new Swiper(sliderEl, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: nextEl,
                prevEl: prevEl,
            },
            thumbs: {
                swiper: thumbsSwiper,
            },
        });

        const firstSlide = container.querySelector('.benefit-slide');
        const video = firstSlide?.querySelector('video');
        const control = firstSlide?.querySelector('.pm-video-control');

        if (video && control) {

            video.loop = true;

            const circle = control.querySelector('circle');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;

            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = 0;

            function updateProgress() {
                const percent = video.currentTime / video.duration;
                circle.style.strokeDashoffset = circumference * percent;

                if (!video.paused) {
                    requestAnimationFrame(updateProgress);
                }
            }

            // клик
            control.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    updateProgress();
                    control.querySelector('.pm-video-control--play').classList.add('hidden');
                    control.querySelector('.pm-video-control--pause').classList.remove('hidden');
                } else {
                    video.pause();
                    control.querySelector('.pm-video-control--play').classList.remove('hidden');
                    control.querySelector('.pm-video-control--pause').classList.add('hidden');
                }
            });

            video.addEventListener('ended', () => {
                circle.style.strokeDashoffset = 0;
            });

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.paused && !video.ended) {
                            video.play();
                            updateProgress();
                            control.querySelector('.pm-video-control--play').classList.add('hidden');
                            control.querySelector('.pm-video-control--pause').classList.remove('hidden');
                        }
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(container);
        }

    });
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.pm-tab-item');
    const contents = document.querySelectorAll('[data-tab-content]');

    const popularSliders = document.querySelectorAll('.pm-popular-slider');
    const swipers = [];

    if (popularSliders){
        // инициализация свайперов
        popularSliders.forEach(slider => {
            const instance = new Swiper(slider, {
                spaceBetween: 16,
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                speed: 1200,
                pagination: {
                    el: slider.querySelector('.pm-popular-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: slider.querySelector('.pm-popular__next-btn'),
                    prevEl: slider.querySelector('.pm-popular__prev-btn'),
                },
                breakpoints: {
                    1025: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        speed: 800,
                    },
                    1681: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    }
                },
            });

            swipers.push({
                el: slider,
                instance
            });
        });
    }


    if (tabs) {
        // табы
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const id = tab.dataset.tab;

                // активный таб
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                contents.forEach(c => c.classList.remove('active'));

                const activeContent = document.querySelector(`[data-tab-content="${id}"]`);
                activeContent.classList.add('active');

                // обновление нужного swiper
                const current = swipers.find(s => s.el === activeContent);
                if (current) {
                    current.instance.update();
                }
            });
        });
    }

    document.querySelectorAll('.pm-card-images').forEach(container => {
        const images = container.querySelectorAll('img');
        const dotsContainer = container.parentElement.querySelector('.pm-card-dots');

        images.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('span');

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;

            const index = Math.min(
                Math.floor(percent * images.length),
                images.length - 1
            );

            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            images[index].classList.add('active');
            dots[index].classList.add('active');
        });

        container.addEventListener('mouseleave', () => {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            images[0].classList.add('active');
            dots[0].classList.add('active');
        });
    });

    // Слайдер ГПУ — центрированный с блюром соседних
    const gpuSlider = document.querySelector('.pm-gas-gpu__slider');
    if (gpuSlider) {
        var gpuSwiper = new Swiper(gpuSlider, {
            slidesPerView: 1.5,
            centeredSlides: true,
            spaceBetween: 16,
            speed: 600,
            loop: true,
            grabCursor: true,
            slideToClickedSlide: true,
            breakpoints: {
                // На мобилках делаем компактнее (больше слайдов в видимости)
                320: {
                    slidesPerView: 2.5,
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 12
                },
                // На десктопе крупнее (меньше слайдов в видимости)
                1025: {
                    slidesPerView: 1.5,
                    spaceBetween: 16
                }
            }
        });
    }

    // Слайдер кейсов на мобилке (до 1024px)
    const casesSliderMobile = document.querySelector('.pm-gas-cases__slider-mobile');
    if (casesSliderMobile && typeof Swiper !== 'undefined') {
        var casesSwiperMobile = new Swiper(casesSliderMobile, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            grabCursor: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                1025: {
                    enabled: false
                }
            },
            on: {
                init: function () {
                    console.log('Cases mobile slider initialized');
                }
            }
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pm-input-wrapper').forEach(container => {
        const input = container.querySelector('.pm-input');

        // При фокусе добавляем класс
        input.addEventListener('focus', () => {
            container.classList.add('active');
        });

        // При blur убираем класс, если инпут пустой
        input.addEventListener('blur', () => {
            if (!input.value) {
                container.classList.remove('active');
            }
        });

        // Если инпут уже заполнен при загрузке, показываем активное состояние
        if (input.value) {
            container.classList.add('active');
        }
    });

    // const phoneInput = document.querySelector('.pm-input-wrapper--phone .pm-input');
    // console.log(phoneInput);
    // if (phoneInput){
    document.querySelectorAll('.pm-input-wrapper--phone .pm-input').forEach(container => {
        IMask(container, {
            mask: '(000) 000-00-00'
        });
    });

    const form = document.querySelector('#feedbackForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let hasError = false;

            const inputs = form.querySelectorAll('.pm-input, .pm-checkbox');

            inputs.forEach(input => {
                const container = input.closest('.pm-input__container');
                const errorEl = container.querySelector('.pm-input__error');

                // сбрасываем состояние
                container.classList.remove('error');
                errorEl.textContent = '';

                if (input.type === 'checkbox') {
                    if (!input.checked) {
                        container.classList.add('error');
                        errorEl.textContent = 'Заполните это поле';
                        hasError = true;
                    }
                    return;
                }

                const value = input.value.trim();

                // обязательные поля
                if (input.required && !value) {
                    container.classList.add('error');
                    errorEl.textContent = 'Заполните это поле';
                    hasError = true;
                    return;
                }

                // проверка email
                if (input.type === 'email' && value) {
                    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    if (!emailValid) {
                        container.classList.add('error');
                        errorEl.textContent = 'Некорректный формат';
                        hasError = true;
                        return;
                    }
                }

                // проверка телефона (10 цифр)
                if (input.type === 'tel' && value) {
                    const digits = value.replace(/\D/g, '');
                    if (digits.length !== 10) {
                        container.classList.add('error');
                        errorEl.textContent = 'Некорректный формат';
                        hasError = true;
                        return;
                    }
                }
            });

            if (!hasError) {
                feedbackPopup.classList.add('success');
                form.reset();
            }
        });
    }

    const serviceForm = document.querySelector('#serviceForm');

    if (serviceForm) {
        serviceForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let hasError = false;

            const inputs = serviceForm.querySelectorAll('.pm-input, .pm-checkbox');

            inputs.forEach(input => {
                const container = input.closest('.pm-input__container');
                const errorEl = container.querySelector('.pm-input__error');

                // сбрасываем состояние
                container.classList.remove('error');
                errorEl.textContent = '';

                if (input.type === 'checkbox') {
                    if (!input.checked) {
                        container.classList.add('error');
                        errorEl.textContent = 'Заполните это поле';
                        hasError = true;
                    }
                    return;
                }

                const value = input.value.trim();

                // обязательные поля
                if (input.required && !value) {
                    container.classList.add('error');
                    errorEl.textContent = 'Заполните это поле';
                    hasError = true;
                    return;
                }

                // проверка email
                if (input.type === 'email' && value) {
                    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    if (!emailValid) {
                        container.classList.add('error');
                        errorEl.textContent = 'Некорректный формат';
                        hasError = true;
                        return;
                    }
                }

                // проверка телефона (10 цифр)
                if (input.type === 'tel' && value) {
                    const digits = value.replace(/\D/g, '');
                    if (digits.length !== 10) {
                        container.classList.add('error');
                        errorEl.textContent = 'Некорректный формат';
                        hasError = true;
                        return;
                    }
                }
            });

            if (!hasError) {
                servicePopup.classList.add('success');
                serviceForm.reset();
            }
        });
    }

    const inputs = document.querySelectorAll('.pm-input, .pm-checkbox');

    if (inputs) {
        inputs.forEach(input => {
            const container = input.closest('.pm-input__container');
            const errorEl = container.querySelector('.pm-input__error');

            // для текстовых инпутов
            input.addEventListener('input', () => {
                container.classList.remove('error');
                errorEl.textContent = '';
            });

            // для чекбокса
            if (input.type === 'checkbox') {
                input.addEventListener('change', () => {
                    container.classList.remove('error');
                    errorEl.textContent = '';
                });
            }
        });
    }

    const openFeedbackBtn = document.querySelector('#openFeedbackPopup');
    const feedbackPopup = document.getElementById('feedbackPopup');
    if (openFeedbackBtn){
        openFeedbackBtn.addEventListener('click', () => {
            feedbackPopup.classList.add('active');
            document.body.classList.add('lock');
        });
    }

    const openServiceBtn = document.querySelector('#openServicePopup');
    const servicePopup = document.getElementById('servicePopup');
    if (openServiceBtn){
        openServiceBtn.addEventListener('click', () => {
            servicePopup.classList.add('active');
            document.body.classList.add('lock');
        });
    }

    const closeFeedbackBtns = document.querySelectorAll('.close-feedback-popup');
    if (closeFeedbackBtns){
        closeFeedbackBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                feedbackPopup.classList.remove('active');
                setTimeout(() => {
                    feedbackPopup.classList.remove('success');
                    document.body.classList.remove('lock');
                    form.reset();
                }, 300);
            });
        });
    }

    const closeServiceBtns = document.querySelectorAll('.close-service-popup');
    if (closeServiceBtns){
        closeServiceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                servicePopup.classList.remove('active');
                setTimeout(() => {
                    servicePopup.classList.remove('success');
                    document.body.classList.remove('lock');
                    serviceForm.reset();
                }, 300);
            });
        });
    }

    if (feedbackPopup){
        feedbackPopup.addEventListener('click', (e) => {
            // если клик именно по оверлею (не по форме внутри)
            if (e.target === feedbackPopup) {
                feedbackPopup.classList.remove('active');
                setTimeout(() => {
                    feedbackPopup.classList.remove('success');
                    document.body.classList.remove('lock');
                    form.reset();
                }, 300);
            }
        });
    }

    if (servicePopup){
        servicePopup.addEventListener('click', (e) => {
            // если клик именно по оверлею (не по форме внутри)
            if (e.target === servicePopup) {
                servicePopup.classList.remove('active');
                setTimeout(() => {
                    servicePopup.classList.remove('success');
                    document.body.classList.remove('lock');
                    serviceForm.reset();
                }, 300);
            }
        });
    }
});


const api = window.ProfitabilityCalculatorWidget;
const mount = typeof api === 'function' ? api : api?.create;

if (typeof mount !== 'function') {
throw new Error('ProfitabilityCalculatorWidget API is not available');
}

mount('profitability-widget', { theme: 'dark' });


//Попап «Готовое решение»
const solutionPopup = document.getElementById('solutionPopup');
const solutionForm = document.getElementById('solutionForm');
const solutionPackageSelect = document.getElementById('solutionPackageSelect');
const solutionPhoneInput = document.getElementById('solutionTel');

// Маска телефона
if (solutionPhoneInput) {
    IMask(solutionPhoneInput, {
        mask: '(000) 000-00-00'
    });
}

// Открытие попапа по кнопкам «Заказать» в карточках решений
const solutionBtns = document.querySelectorAll('.pm-gas-solutions__card-btn');
solutionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Определяем название пакета из карточки
        const card = btn.closest('.pm-gas-solutions__card');
        const packageName = card ? card.querySelector('.pm-gas-solutions__card-name') : null;
        if (packageName && solutionPackageSelect) {
            const value = packageName.textContent.trim();
            const hiddenInput = solutionPackageSelect.querySelector('input[type="hidden"]');
            const valueSpan = solutionPackageSelect.querySelector('.pm-custom-select__value');
            if (hiddenInput) hiddenInput.value = value;
            if (valueSpan) valueSpan.textContent = value;
            // Обновляем selected в dropdown
            const dd = document.getElementById('solutionDropdown');
            if (dd) {
                dd.querySelectorAll('.pm-custom-select__option').forEach(opt => {
                    opt.classList.toggle('selected', opt.dataset.value === value);
                });
            }
        }
        solutionPopup.classList.add('active');
        document.body.classList.add('lock');
    });
});

// Закрытие попапа
const closeSolutionBtns = document.querySelectorAll('.close-solution-popup');
closeSolutionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        solutionPopup.classList.remove('active');
        setTimeout(() => {
            solutionPopup.classList.remove('success');
            document.body.classList.remove('lock');
            solutionForm.reset();
            // Сброс select
            const valueSpan = solutionPackageSelect.querySelector('.pm-custom-select__value');
            const hiddenInput = solutionPackageSelect.querySelector('input[type="hidden"]');
            if (valueSpan) valueSpan.textContent = 'Бронза';
            if (hiddenInput) hiddenInput.value = 'Бронза';
            const dd = document.getElementById('solutionDropdown');
            if (dd) {
                dd.classList.remove('open');
                dd.querySelectorAll('.pm-custom-select__option').forEach((opt, i) => opt.classList.toggle('selected', i === 0));
            }
            solutionPackageSelect.classList.remove('open');
            // Сброс счётчика
            const counter = solutionForm.querySelector('.pm-textarea__counter');
            if (counter) counter.textContent = '0/100';
        }, 300);
    });
});

// Клик по оверлею
if (solutionPopup) {
    solutionPopup.addEventListener('click', (e) => {
        if (e.target === solutionPopup) {
            solutionPopup.classList.remove('active');
            setTimeout(() => {
                solutionPopup.classList.remove('success');
                document.body.classList.remove('lock');
                solutionForm.reset();
            }, 300);
        }
    });
}

// Кастомный select
const solutionDropdown = document.getElementById('solutionDropdown');
if (solutionPackageSelect && solutionDropdown) {
    const trigger = solutionPackageSelect.querySelector('.pm-custom-select__trigger');
    const options = solutionDropdown.querySelectorAll('.pm-custom-select__option');
    const hiddenInput = solutionPackageSelect.querySelector('input[type="hidden"]');
    const valueSpan = solutionPackageSelect.querySelector('.pm-custom-select__value');

    function positionDropdown() {
        const rect = trigger.getBoundingClientRect();
        solutionDropdown.style.top = (rect.bottom + 4) + 'px';
        solutionDropdown.style.left = rect.left + 'px';
        solutionDropdown.style.width = rect.width + 'px';
    }

    trigger.addEventListener('click', () => {
        const isOpen = solutionDropdown.classList.contains('open');
        if (isOpen) {
            solutionDropdown.classList.remove('open');
            solutionPackageSelect.classList.remove('open');
        } else {
            positionDropdown();
            solutionDropdown.classList.add('open');
            solutionPackageSelect.classList.add('open');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const val = option.dataset.value;
            hiddenInput.value = val;
            valueSpan.textContent = val;
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            solutionDropdown.classList.remove('open');
            solutionPackageSelect.classList.remove('open');
        });
    });

    // Закрытие при клике вне
    document.addEventListener('click', (e) => {
        if (!solutionPackageSelect.contains(e.target) && !solutionDropdown.contains(e.target)) {
            solutionDropdown.classList.remove('open');
            solutionPackageSelect.classList.remove('open');
        }
    });
}

// Счётчик символов textarea
const solutionComment = document.getElementById('solutionComment');
if (solutionComment) {
    const counter = solutionComment.closest('.pm-input-wrapper').querySelector('.pm-textarea__counter');
    solutionComment.addEventListener('input', () => {
        if (counter) counter.textContent = solutionComment.value.length + '/100';
    });
}

// Отправка формы
if (solutionForm) {
    solutionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let hasError = false;
        const inputs = solutionForm.querySelectorAll('.pm-input, .pm-checkbox');

        inputs.forEach(input => {
            const container = input.closest('.pm-input__container');
            if (!container) return;
            const errorEl = container.querySelector('.pm-input__error');

            container.classList.remove('error');
            if (errorEl) errorEl.textContent = '';

            if (input.type === 'checkbox') {
                if (!input.checked) {
                    container.classList.add('error');
                    if (errorEl) errorEl.textContent = 'Заполните это поле';
                    hasError = true;
                }
                return;
            }

            const value = input.value.trim();

            if (input.required && !value) {
                container.classList.add('error');
                if (errorEl) errorEl.textContent = 'Заполните это поле';
                hasError = true;
                return;
            }

            if (input.type === 'email' && value) {
                const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                if (!emailValid) {
                    container.classList.add('error');
                    if (errorEl) errorEl.textContent = 'Некорректный формат';
                    hasError = true;
                    return;
                }
            }

            if (input.type === 'tel' && value) {
                const digits = value.replace(/\D/g, '');
                if (digits.length !== 10) {
                    container.classList.add('error');
                    if (errorEl) errorEl.textContent = 'Некорректный формат';
                    hasError = true;
                    return;
                }
            }
        });

        if (!hasError) {
            solutionPopup.classList.add('success');
            solutionForm.reset();
        }
    });
}