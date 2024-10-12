const accessKey = "$2a$10$XKGw9XjvSAwKE5oQP"; // Replace with your actual access key
const binId = "670ae9f8acd3cb34a895cc79"; // Replace with your actual JSONBin.io ID

fetch(`https://api.jsonbin.io/b/${binId}`)
  .then(response => response.json())
  .then(data => {
    const bookList = document.getElementById('book-list'); // Get the book-list div

    data.record.forEach(book => {
      const bookItem = document.createElement('div');
      const title = document.createElement('h3');
      const author = document.createElement('p');
      const checkbox = document.createElement('input');

      checkbox.type = "checkbox";
      checkbox.checked = book.estado === 1;

      title.textContent = book.Obra;
      author.textContent = book.Autor;

      checkbox.addEventListener('change', () => {
        book.estado = checkbox.checked ? 1 : 0;
        updateJsonBin(data);
      });

      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(checkbox);

      // *** This is the key line! ***
      bookList.appendChild(bookItem); // Add the bookItem to the book-list div

    });
  });

function updateJsonBin(updatedData) {
  fetch(`https://api.jsonbin.io/b/${binId}`, {
    method: 'PUT',
    headers: {
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
