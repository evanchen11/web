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


document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');

    // Generate calendar headers (days of the week)
    const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    headers.forEach(header => {
        const headerElement = document.createElement('div');
        headerElement.classList.add('day', 'header');
        headerElement.textContent = header;
        calendarContainer.appendChild(headerElement);
    });

    // Generate calendar days (for simplicity, we'll generate a static month)
    for (let day = 1; day <= 30; day++) { // Adjust the number of days as needed
        const dayElement = document.createElement('div');
        dayElement.classList.add('date');
        dayElement.textContent = day;
        dayElement.dataset.date = `${String(9).padStart(2, '0')}.${String(day).padStart(2, '0')}.2024`; // Format date (mm.dd.yyyy)
        dayElement.addEventListener('click', async (event) => {
            const date = event.target.dataset.date;
            console.log(`Clicked date: ${date}`);
            const sectionExists = await checkSectionExists(date);
            if(sectionExists) {
                window.location.href = `/thoughts/thoughts.html#${date}`;
            }
            else {
                alert('Entry not found.');
            }
            // window.location.href = "/Users/evan/code/web/thoughts/thoughts.html"; // Modify with your blog URL structure
        });
        calendarContainer.appendChild(dayElement);
    }
});
// document.addEventListener('DOMContentLoaded', () => {
//     const calendarContainer = document.getElementById('calendar-container');
//     const monthTitle = document.getElementById('month-title');
//     const prevMonthBtn = document.getElementById('prev-month');
//     const nextMonthBtn = document.getElementById('next-month');

//     let currentDate = new Date();

//     function generateCalendar(date) {
//         calendarContainer.innerHTML = ''; // Clear existing calendar
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         const daysInMonth = new Date(year, month + 1, 0).getDate();
//         const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//         // Update month title
//         monthTitle.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

//         // Generate calendar headers (days of the week)
//         headers.forEach(header => {
//             const headerElement = document.createElement('div');
//             headerElement.classList.add('day', 'header');
//             headerElement.textContent = header;
//             calendarContainer.appendChild(headerElement);
//         });

//         // Generate blank spaces for the first week
//         const firstDayOfMonth = new Date(year, month, 1).getDay();
//         for (let i = 0; i < firstDayOfMonth; i++) {
//             const emptyElement = document.createElement('div');
//             emptyElement.classList.add('date', 'empty');
//             calendarContainer.appendChild(emptyElement);
//         }

//         // Generate calendar days
//         for (let day = 1; day <= daysInMonth; day++) {
//             const dayElement = document.createElement('div');
//             dayElement.classList.add('date');
//             dayElement.textContent = day;
//             dayElement.dataset.date = `${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}.${year}`; // Format date (mm.dd.yyyy)
//             dayElement.addEventListener('click', async (event) => {
//                 const date = event.target.dataset.date;
//                 console.log(`Clicked date: ${date}`);
//                 const sectionExists = await checkSectionExists(date);
//                 if (sectionExists) {
//                     window.location.href = `/thoughts/thoughts.html#${date}`;
//                 } else {
//                     alert('Entry not found.');
//                 }
//             });
//             calendarContainer.appendChild(dayElement);
//         }
//     }

//     function updateCalendar(direction) {
//         if (direction === 'prev') {
//             currentDate.setMonth(currentDate.getMonth() - 1);
//         } else if (direction === 'next') {
//             currentDate.setMonth(currentDate.getMonth() + 1);
//         }
//         generateCalendar(currentDate);
//     }

//     // Initial calendar generation
//     generateCalendar(currentDate);

//     // Event listeners for navigation
//     prevMonthBtn.addEventListener('click', () => updateCalendar('prev'));
//     nextMonthBtn.addEventListener('click', () => updateCalendar('next'));
// });


// Function to check if a section exists in thoughts.html
async function checkSectionExists(date) {
    const sectionId = date; // Assumes section ID matches the date format
    console.log(sectionId)
    try {
        const response = await fetch('http://localhost:8080/thoughts/thoughts.html');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        console.log(doc.getElementById(sectionId));
        return !!doc.getElementById(sectionId);
    } catch (error) {
        console.error('Failed to fetch or parse thoughts.html:', error);
        return false;
    }
}