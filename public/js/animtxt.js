document.addEventListener('DOMContentLoaded', function() {
  // Typing animation
  const textArray = ["Safety", "Security", "Privacy","Storage"];
  let textIndex = 0;
  let charIndex = 0;
  let isBackspacing = false;

  function typeText() {
    const currentText = textArray[textIndex];
    const typingElement = document.querySelector('.typing-text');
    if (!isBackspacing) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isBackspacing = true;
        setTimeout(typeText, 1500);
      } else {
        setTimeout(typeText, 150);
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isBackspacing = false;
        textIndex = (textIndex + 1) % textArray.length;
      }
      setTimeout(typeText, 50);
    }
  }

  typeText();

  // Sidebar functionality
  const sidebar = document.querySelector('.sidebar-wrap');
  const hiddenCard = document.querySelector('.hidden');

  // Add an event listener to detect when the sidebar is expanded
  sidebar.addEventListener('mouseover', function() {
    // Add the 'hidden' class to hide the card
    hiddenCard.classList.add('hidden');
  });

  // Add an event listener to detect when the sidebar is collapsed
  sidebar.addEventListener('mouseout', function() {
    // Remove the 'hidden' class to show the card
    hiddenCard.classList.remove('hidden');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  var modal = document.getElementById('uploadModal');

  // Get the button that opens the modal
  var btn = document.getElementById('uploadButton');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

  // When the user clicks the button, open the modal
  btn.addEventListener('click', function() {
      modal.style.display = 'block';
  });

  // When the user clicks on <span> (x), close the modal
  span.addEventListener('click', function() {
      modal.style.display = 'none';
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  });
});
