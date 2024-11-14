//Smooth scroll to blocks
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        let targetId;

        if (this.getAttribute('href').startsWith('#')) {
            targetId = this.getAttribute('href').substring(1);
            e.preventDefault();
        }
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

//Accordion scripts
const accordionItems = document.querySelectorAll('.accordion__item');
const accordionLinks = document.querySelectorAll('.accordion__header');

function changeShowClass(n) {
    accordionItems.forEach((item, i) => {
        if (i === n) {
            item.classList.toggle('show');
        } else {
            item.classList.remove('show');
        }
    });
    //accordionItems[n].classList.toggle('show');    
}

accordionLinks.forEach((link, i) => link.onclick = () => changeShowClass(i));

//Testimonials slider scripts
const sliderContainer = document.querySelector('.testimonials__slider-container');
const slides = document.querySelectorAll('.testimonials__slide');
const sliderBtnPrev = document.querySelector('.testimonials__slider-prev');
const sliderBtnNext = document.querySelector('.testimonials__slider-next');
let sliderDots = document.querySelector('.testimonials__slider-dots');
const slidesPerView = 2; //Count of slides on screen
let total = 0;
let numOfDots = 0;
let numIndex = 0;

//Setting the width of the slider container
function setContainerWidth() {
    const gap = (slides.length) * 24;
    const slideWidth = slides[0].offsetWidth;
    total = gap + slideWidth * slides.length;

    sliderContainer.style.width = `${total}px`;
}
setContainerWidth()

//Creating dots dependent on the count of slides
function createDots() {
    numOfDots = Math.round(slides.length / slidesPerView);

    for(let i = 1; i <= numOfDots; i++) {
        const newDot = document.createElement('span');
        newDot.classList.add('testimonials__slider-dot');
        sliderDots.prepend(newDot);
    }
    sliderDots = document.querySelectorAll('.testimonials__slider-dot')
    sliderDots[0].classList.add('active');
}
createDots();

//Changing slides' main function
function changeSlides(n) {
    const transform = total / numOfDots * n;
    sliderContainer.style.transform = `translateX(-${transform}px)`

    sliderDots.forEach(dot => dot.classList.remove('active'));
    sliderDots[n].classList.add('active');

    if (n === 0) {
        sliderBtnNext.classList.remove('disable');
        sliderBtnPrev.classList.add('disable');
    } else if (n === numOfDots - 1) {
        sliderBtnNext.classList.add('disable');
        sliderBtnPrev.classList.remove('disable');
    } else {
        sliderBtnPrev.classList.remove('disable');
        sliderBtnNext.classList.remove('disable');
    }
}

//Changing slides by button prev
sliderBtnPrev.onclick = () => {
    if (numIndex === 0) {
        numIndex
    } else {
        numIndex--;
    }
    changeSlides(numIndex);
}

//Changing slides by button next
sliderBtnNext.onclick = () => {
    if (numIndex === numOfDots - 1) {
        numIndex
    } else {
        numIndex++;
    }
    changeSlides(numIndex);
}

//Changing slides by dots
sliderDots.forEach((dot, i) => dot.onclick = () => {
    numIndex = i;
    changeSlides(i)
});

