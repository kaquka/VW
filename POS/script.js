let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');

document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSliderPosition();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
});

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.getElementById('carForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const color = document.getElementById('color').value;
    const carImage = document.getElementById('carImage');
    carImage.src = `taos_${color.toLowerCase()}.png`;
});
