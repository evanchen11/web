// script.js
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 } // Reset to first slide if at the end
    slides[slideIndex - 1].style.display = "block"; // Show current slide
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

showSlides(); // Initial call to start the slideshow


// animate intro
document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('intro');
    const text = element.textContent;
    const letters = text.split('');
    
    element.innerHTML = letters.map(letter => `<span>${letter}</span>`).join('');
});
