const binId = "670ade0fad19ca34f8b7526b"; // Replace with your actual JSONBin.io ID

fetch(`https://api.jsonbin.io/b/${binId}`)
  .then(response => response.json())
  .then(data => {
    const bookList = document.getElementById('book-list');
    data.books.forEach(book => {
      const bookItem = document.createElement('div');
      const title = document.createElement('h3');
      const author = document.createElement('p');
      const checkbox = document.createElement('input');

      checkbox.type = "checkbox";
      checkbox.checked = book.haveRead; 

      title.textContent = book.title;
      author.textContent = book.author;

      checkbox.addEventListener('change', () => {
        book.haveRead = checkbox.checked; 
        updateJsonBin(data); // Update the data on JSONBin.io
      });

      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(checkbox);

      // Add the bookItem to the book-list div
      bookList.appendChild(bookItem);
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
