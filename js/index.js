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
                    const slide = document.createElement('li'); // Використовуємо <li> для списку
                    slide.classList.add('swiper-slide', 'review-card');

                    const avatar = review.avatar ? review.avatar : 'img/default-avatar.png'; // Задайте правильний шлях до аватара
                    const author = review.author ? review.author : 'Anonymous';
                    const text = review.text ? review.text : 'No review provided';

                    slide.innerHTML = `
                        <p class="review-text">${text}</p>
                        <div class="review-author">
                            <img src="${avatar}" alt="${author}" class="author-photo">
                            <p class="author-name">${author}</p>
                        </div>
                    `;

                    swiperWrapper.appendChild(slide);
                });
                initSwiper();
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            errorMessage.style.display = 'block'; // Показати повідомлення про помилку
        });
});

function initSwiper() {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
        },
        on: {
            reachEnd: function () {
                this.navigation.nextEl.classList.add('disabled');
            },
            fromEdge: function () {
                if (this.isBeginning) {
                    this.navigation.prevEl.classList.add('disabled');
                } else {
                    this.navigation.prevEl.classList.remove('disabled');
                }
                if (this.isEnd) {
                    this.navigation.nextEl.classList.add('disabled');
                } else {
                    this.navigation.nextEl.classList.remove('disabled');
                }
            }
        }
    });
}
