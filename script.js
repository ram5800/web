const binId = "670ade0fad19ca34f8b7526b"; // Replace with your actual JSONBin.io ID
const accessKey = "$2a$10$XKGw9XjvSAwKE5oQP/L1c.bIjFJP1vvp2mMyraSDGyNnXpcj1K75K"; // Replace with your actual access key


fetch(`https://api.jsonbin.io/v3/b/${binId}`, { // Updated URL for v3
  headers: {
    'X-Access-Key': accessKey,
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const bookList = document.getElementById('book-list');
    data.forEach(book => { // Loop through the books array
      const bookItem = document.createElement('div');
      const title = document.createElement('h3');
      const author = document.createElement('p');
      const checkbox = document.createElement('input');

      checkbox.type = "checkbox";
      checkbox.checked = book.estado === 1; // Use "estado" for read status

      title.textContent = book.Obra; // Use "Obra" for the book title
      author.textContent = book.Autor; // Use "Autor" for the author

      checkbox.addEventListener('change', () => {
        book.estado = checkbox.checked ? 1 : 0; // Update "estado"
        updateJsonBin(data); // Update the data on JSONBin.io
      });

      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(checkbox);
      bookList.appendChild(bookItem);
    });
  });

function updateJsonBin(updatedData) {
  fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: 'GET',
    headers: {
      'X-Access-Key': accessKey, // Include access key here
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
  .then(response => {
    // Handle success (e.g., display a message)
  })
  .catch(error => {
    // Handle errors
  });
}
