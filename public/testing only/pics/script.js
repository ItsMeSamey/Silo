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
