import Cookies from 'js-cookie';
import 'lazysizes';
import noUiSlider from 'nouislider';
import Swiper, {Navigation, Pagination} from 'swiper';
import {Fancybox, Carousel, Panzoom} from '@fancyapps/ui';

//add simple support for background images:
document.addEventListener('lazybeforeunveil', function (e) {
    let bg = e.target.getAttribute('data-bg');
    if (bg) {
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});

// Мобильное меню

document.querySelector('.header__mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.add('open')
})

document.querySelector('.mobile-menu__close').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.remove('open')
})

if (!Cookies.get('message')) {
    import('../blocks/cookies-message/script.js').then(module => {
        module.showCookieMessage();
    });
}

let priceSlider = document.querySelector('#sliderprice');
let minPriceInput = document.querySelector('#price-from');
let maxPriceInput = document.querySelector('#price-to');

if (priceSlider) {
    noUiSlider.create(priceSlider, {
        start: [minPriceInput.dataset.min, maxPriceInput.dataset.max],
        connect: true,
        range: {
            'min': Number(minPriceInput.dataset.min),
            'max': Number(maxPriceInput.dataset.max)
        }
    });
}


// Галерея фото в карточке товара
let productSliderContainer = document.querySelector('.js-product-card-slider');

if (productSliderContainer) {
    let productCardSlider = new Swiper('.js-product-card-slider', {
        modules: [Navigation, Pagination]
    });

    // Переключение слайдера в карточке товара

    let productCardThumbs = document.querySelectorAll('.js-product-card-thumb');

    if (productCardThumbs.length) {
        let productCardThumbCurrent = document.querySelector('.js-product-card-thumb.current');
        productCardThumbs.forEach((thumb,index) => {

            if (index > 6) {
                thumb.classList.add('hidden')
            }

            if (productCardThumbs.length > 7 && index === 6) {
                let productCardThumbMore = document.createElement('button');
                productCardThumbMore.innerText = `+${productCardThumbs.length - 6}`;
                productCardThumbMore.classList = 'product-card__gallery-thumbs-item-more';
                thumb.insertAdjacentElement('beforeend', productCardThumbMore);
                productCardThumbMore.addEventListener('click', () => {
                    document.querySelectorAll('[data-fancybox="product-gallery"]')[6].click();
                })
            }

            thumb.addEventListener('click', () => {
                productCardSlider.slideTo(index);
                productCardThumbCurrent.classList.remove('current')
                productCardThumbCurrent = thumb
                thumb.classList.add('current')
            })
        })
    }
}

Fancybox.bind("[data-fancybox]", {
    infinite: true
});

// Выбор размера смена кнопок в зависимости от наличия на остатке

let sizeChooseInput = document.querySelectorAll('.js-choose-size'),
    productSizesContainer = document.querySelector('.product-card___sizes'),
    productAvailableBox = productSizesContainer.querySelector('.js-product-available '),
    addCartBtn = document.querySelector('.js-add-cart'),
    orderSewBtn = document.querySelector('.js-order-sew');

if (sizeChooseInput.length) {

    sizeChooseInput.forEach(input => {
        input.addEventListener('input', () => {

            if (Number(input.dataset.quanity) > 0) {
                addCartBtn.classList.add('visible')
                orderSewBtn.classList.remove('visible')
                productAvailableBox.classList = ' product-card__sizes-available js-product-available available';
                productAvailableBox.innerHTML = 'В наличии';
            } else {
                orderSewBtn.classList.add('visible')
                addCartBtn.classList.remove('visible')
                productAvailableBox.classList = ' product-card__sizes-available js-product-available no-available';
                productAvailableBox.innerHTML = 'Нет в наличии';
            }
        })
    })
}




