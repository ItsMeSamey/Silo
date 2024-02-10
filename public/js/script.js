document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const uploadContent = document.getElementById('uploadContent');
    const closeButton = document.getElementById('closeButton');
    const uploadForm = document.getElementById('uploadForm');
    const uploadOptions = document.getElementById('uploadOptions');
    const fileUpload = document.getElementById('fileUpload');
  
    uploadButton.addEventListener('click', function() {
      uploadContent.classList.toggle('hidden');
    });
  
    closeButton.addEventListener('click', function() {
      uploadContent.classList.add('hidden');
    });
  
    function showUploadOptions() {
      uploadOptions.classList.remove('hidden');
    }
  
    uploadButton.addEventListener('click', showUploadOptions);
  
    // Event listener for each upload option
    document.querySelectorAll('.upload-button').forEach(button => {
      button.addEventListener('click', showUploadOptions);
    });
  
    uploadForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission for demonstration purposes
      const files = fileUpload.files;
      // Handle file upload here, for demonstration alerting the number of files selected
      alert(`Selected ${files.length} file(s)`);
    });
  });
  // JavaScript code to trigger file input when the custom button is clicked
document.querySelector('.custom-file-upload').addEventListener('click', function() {
    document.getElementById('fileUpload').click();
  });
    // JavaScript code to display the selected file name  
    // Sample image data (replace with actual data)
const imageData = [
    { src: 'logo Lc.jpeg', uploadDate: '2024-02-15', uploadTime: '10:00 AM', size: '1.5 MB' },
    { src: 'image2.jpg', uploadDate: '2024-02-16', uploadTime: '11:30 AM', size: '1.2 MB' },
    { src: 'image3.jpg', uploadDate: '2024-02-17', uploadTime: '12:45 PM', size: '1.8 MB' },
    // Add more image data as needed
  ];
  
  document.addEventListener("DOMContentLoaded", function() {
    const imageTableBody = document.querySelector('.image-table-body');
    const detailsContainer = document.querySelector('.right-panel .image-details');
  
    // Load image details in table format
    imageData.forEach((image, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${image.src}" alt="Image"></td>
            <td>${image.uploadDate}</td>
            <td>${image.uploadTime}</td>
            <td>${image.size}</td>
        `;
        row.addEventListener('click', () => showImageDetails(image));
        imageTableBody.appendChild(row);
    });
  
    // Function to show image details on the right panel
    function showImageDetails(image) {
        detailsContainer.innerHTML = `
            <h2>Image Details</h2>
            <div>
                <img src="${image.src}" alt="Image">
            </div>
            <p><strong>Upload Date:</strong> ${image.uploadDate}</p>
            <p><strong>Upload Time:</strong> ${image.uploadTime}</p>
            <p><strong>Size:</strong> ${image.size}</p>
        `;
    }
  });
  const toggleDrawerButton = document.getElementById('toggleDrawerButton');
const drawer = document.querySelector('.drawer');
const iconToRemove = document.getElementById('iconToRemove');

toggleDrawerButton.addEventListener('click', () => {
  drawer.classList.toggle('drawer-open');
  if (drawer.classList.contains('drawer-open')) {
    // Drawer is open, show the icon
    iconToRemove.classList.remove('hidden');
  } else {
    // Drawer is closed, hide the icon
    iconToRemove.classList.add('hidden');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  var modal = document.getElementById('uploadModal');

  // Get the button that opens the modal
  var btn = document.getElementById('uploadModalLabel');

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
