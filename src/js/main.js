import Cookies from 'js-cookie';
import 'lazysizes';
import noUiSlider from 'nouislider';


//add simple support for background images:
document.addEventListener('lazybeforeunveil', function(e){
    let bg = e.target.getAttribute('data-bg');
    if(bg){
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});


if(!Cookies.get('message')) {
    import('../blocks/cookies-message/script.js').then(module => {
        module.showCookieMessage();
    });
}

let priceSlider = document.querySelector('#sliderprice');
let minPriceInput = document.querySelector('#price-from');
let maxPriceInput = document.querySelector('#price-to');

noUiSlider.create(priceSlider, {
    start: [minPriceInput.dataset.min, maxPriceInput.dataset.max],
    connect: true,
    range: {
        'min': Number(minPriceInput.dataset.min),
        'max': Number(maxPriceInput.dataset.max)
    }
});




