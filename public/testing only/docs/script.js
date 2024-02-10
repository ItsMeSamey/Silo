// JavaScript for Document Page


document.addEventListener('DOMContentLoaded', function() {
    const documentTableBody = document.querySelector('.document-table-body');
    const documentPreview = document.querySelector('.document-preview');
    // Sample document data (replace with actual data)
//     const documents = [
//         { thumbnail: 'thumbnail1.jpg', title: 'Document 1', date: '2024-02-20', size: '2.5 MB', url: 'document1.pdf' },
//         { thumbnail: 'thumbnail2.jpg', title: 'Document 2', date: '2024-02-21', size: '3.2 MB', url: 'document2.pdf' },
//         { thumbnail: 'thumbnail3.jpg', title: 'Document 3', date: '2024-02-22', size: '1.8 MB', url: 'document3.pdf' },
        // Add more document data as needed
//     ];

    // Function to render document table
    function renderDocuments() {
        documentTableBody.innerHTML = '';
        FILES.forEach((document, index) => {
            const row = `
                <tr onclick="downloadFile(\'`+document.id+`\',\'`+document.name+`+\')" data-index="${index}">
                    <td><img src="${document.thumbnail}" alt="Thumbnail"></td>
                    <td>${document.name}</td>
                    <td>${document.id}</td>
                </tr>
            `;
            documentTableBody.innerHTML += row;
        });
    }

    // Function to render document preview
    function renderDocumentPreview(index) {
        const document = FILES[index];
        documentPreview.innerHTML = `
            <h2>${document.title}</h2>
            <p><strong>Date:</strong> ${document.date}</p>
            <p><strong>Size:</strong> ${document.size}</p>
            <iframe src="${document.url}" frameborder="0"></iframe>
        `;
    }

    // Event listener for document table row click
    documentTableBody.addEventListener('click', function(event) {
        const rowIndex = event.target.closest('tr').dataset.index;
        renderDocumentPreview(rowIndex);
    });

    // Initial rendering
  //
let binnn = setInterval(
  ()=>{
      renderDocuments();
    }
  }, 1000
)
    renderDocuments();
    renderDocumentPreview(0); // Show preview of first document by default
});
