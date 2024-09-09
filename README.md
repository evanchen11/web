In order to change months, 

change index.html month header
change this line to match the month:         dayElement.dataset.date = `${String(9).padStart(2, '0')}.${String(day).padStart(2, '0')}.2024`; // Format date (mm.dd.yyyy)
change the loop to be 30,31, or 28 days
