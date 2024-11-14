//Smooth scroll to blocks
document.querySelectorAll('a').forEach(link => {
    link.onclick = (e) => {
        let targetId,
            targetElement;

        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            targetId = link.getAttribute('href').substring(1);
            targetElement = document.getElementById(targetId);
        }

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };
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
let slidesPerView = 2; //Count of slides on screen

if (window.innerWidth < 920) {
    slidesPerView = 1;
}

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
setContainerWidth();

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
function changeSlides(index) {
    const transform = total / numOfDots * index;
    sliderContainer.style.transform = `translateX(-${transform}px)`

    sliderDots.forEach(dot => dot.classList.remove('active'));
    sliderDots[index].classList.add('active');

    if (index === 0) {
        sliderBtnNext.classList.remove('disable');
        sliderBtnPrev.classList.add('disable');
    } else if (index === numOfDots - 1) {
        sliderBtnNext.classList.add('disable');
        sliderBtnPrev.classList.remove('disable');
    } else {
        sliderBtnPrev.classList.remove('disable');
        sliderBtnNext.classList.remove('disable');
    }
}

//Changing slides by button prev
sliderBtnPrev.onclick = () => {
    if (numIndex !== 0) {
        numIndex--;
    }
    changeSlides(numIndex);
}

//Changing slides by button next
sliderBtnNext.onclick = () => {
    if (numIndex !== numOfDots - 1) {
        numIndex++;
    }
    changeSlides(numIndex);
}

//Changing slides by dots
sliderDots.forEach((dot, i) => dot.onclick = () => {
    numIndex = i;
    changeSlides(i)
});

//Changing slides by swipe

sliderContainer.addEventListener("touchstart", touchStart, false);
sliderContainer.addEventListener("touchmove", touchMove, false);

let xDown, 
    yDown;

function touchStart(evt) {
    const { clientX, clientY } = evt.touches[0];
    xDown = clientX; yDown = clientY;
}

function touchMove(evt) {
    if (!xDown || !yDown) {
        return; 
    }

    const { clientX, clientY } = evt.touches[0];

    const xDiff = xDown - clientX;
    const yDiff = yDown - clientY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        xDiff > 0 ? sliderBtnNext.click() : sliderBtnPrev.click();
    }
    
    xDown = yDown = null;
}
