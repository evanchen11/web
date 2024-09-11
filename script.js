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
    const monthElement = document.getElementById('month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentMonth = 8; // September (0-based index)
    let currentYear = 2024;

    // Generate calendar headers (days of the week)
    const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    headers.forEach(header => {
        const headerElement = document.createElement('div');
        headerElement.classList.add('day', 'header');
        headerElement.textContent = header;
        calendarContainer.appendChild(headerElement);
    });

    // Function to generate calendar days for a given month
    function generateCalendarDays(month, year) {
        // Clear existing calendar days
        calendarContainer.innerHTML = '';
        headers.forEach(header => {
            const headerElement = document.createElement('div');
            headerElement.classList.add('day', 'header');
            headerElement.textContent = header;
            calendarContainer.appendChild(headerElement);
        });

        // Get the number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
         const firstDayOfWeek = new Date(year, month, 1).getDay();


        // Generate blank days for the previous month (if necessary)
        for (let i = 0; i < firstDayOfWeek; i++) {
            const blankDayElement = document.createElement('div');
            blankDayElement.classList.add('blank');
            calendarContainer.appendChild(blankDayElement);
        }

        // Generate calendar days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('date');
            dayElement.textContent = day;
            dayElement.dataset.date = `${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}.${year}`; // Format date (mm.dd.yyyy)
            dayElement.addEventListener('click', async (event) => {
                const date = event.target.dataset.date;
                console.log(`Clicked date: ${date}`);
                const sectionExists = await checkSectionExists(date);
                if (sectionExists) {
                    window.location.href = `https://evanchen11.github.io/web/thoughts/thoughts.html#${date}`;
                } else {
                    alert('Entry not found.');
                }
            });
            calendarContainer.appendChild(dayElement);
        }
    }

    // Generate the initial calendar
    generateCalendarDays(currentMonth, currentYear);

    // Update the month display
    monthElement.textContent = getMonthName(currentMonth) + " " + currentYear;

    // Add event listeners to the month navigation buttons
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendarDays(currentMonth, currentYear);
        monthElement.textContent = getMonthName(currentMonth) + " " + currentYear;
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendarDays(currentMonth, currentYear);
        monthElement.textContent = getMonthName(currentMonth) + " " + currentYear;
    });

    // Function to get the month name from a 0-based index
    function getMonthName(monthIndex) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[monthIndex];
    }
});


// Function to check if a section exists in thoughts.html
async function checkSectionExists(date) {
    const sectionId = date; // Assumes section ID matches the date format
    console.log(sectionId)
    try {
        const response = await fetch('https://evanchen11.github.io/web/thoughts/thoughts.html');
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



document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('color-bars-container');

    // Define the colors you want for the bars
    const colors = ['#FF0000', '#00FF00', '#0000FF'];
    
    // Create and append color bars
    colors.forEach((color, index) => {
        const bar = document.createElement('div');
        bar.classList.add('color-bar');
        bar.style.top = `${index * 10}px`;
        bar.style.backgroundColor = color;
        container.appendChild(bar);

        // Make the bars visible
        setTimeout(() => {
            bar.style.opacity = 1;
        }, 100);
    });
});