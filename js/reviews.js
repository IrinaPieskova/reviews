
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.getElementById('reviews-wrapper');
    const errorMessage = document.getElementById('error-message');

    fetch('https://portfolio-js.b.goit.study/api/reviews')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                errorMessage.style.display = 'block';
            } else {
                data.forEach(review => {
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide');
                    slide.textContent = review.text; // Змінити за потреби
                    swiperWrapper.appendChild(slide);
                });
                initSwiper();
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            errorMessage.style.display = 'block';
        });
});

function initSwiper() {
    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
        },
    });
}