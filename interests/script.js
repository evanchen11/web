document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.querySelector('.typewriter');
    const text = textElement.textContent;
    let index = 0;
    textElement.textContent = ''; // Clear the element's text

    function getRandomDelay() {
      // Random delay between 10ms and 150ms
      return Math.random() * (120 - 50) + 10;
    }

    function type() {
      if (index < text.length) {
        textElement.textContent += text[index];
        index++;
        if (index == 47) {
            // textElement.classList.add('blinking'); // Show blinking cursor
            // setTimeout(() => {
            //   textElement.classList.remove('blinking'); // Remove blinking cursor
            //   type(); // Continue typing after delay
            // }, 500);        }
            textElement.classList.add('blinking-six-times'); // Add blinking animation
            setTimeout(() => {
              textElement.classList.remove('blinking-six-times'); // Remove blinking animation
              type(); // Continue typing after delay
            }, 1000); // 1s delay to match the animation duration
        }
        else{
            setTimeout(type, getRandomDelay());           
        }
      }
      else {
        // Remove the cursor effect once typing is complete
        textElement.classList.remove('typewriter');
        }
    }

    type();
  });
