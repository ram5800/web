const binId = "670ade0fad19ca34f8b7526b"; // Replace with your actual JSONBin.io ID
const accessKey = "$2a$10$XKGw9XjvSAwKE5oQP"; // Replace with your actual access key

// Fetch initial data
function fetchData() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        const data = JSON.parse(req.responseText);
        displayBookList(data);
      } else {
        console.error('Error fetching data:', req.status, req.statusText);
      }
    }
  };
  req.open("GET", `https://api.jsonbin.io/v3/b/${binId}`, true);
  req.setRequestHeader("X-Master-Key", accessKey);
  req.send();
}

// Display the book list
function displayBookList(data) {
  const bookList = document.getElementById('book-list');

  data.forEach(book => {
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
    bookList.appendChild(bookItem);
  });
}

// Update the data on JSONBin.io
function updateJsonBin(updatedData) {
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        console.log('Data updated successfully!');
      } else {
        console.error('Error updating data:', req.status, req.statusText);
      }
    }
  };
  req.open("PUT", `https://api.jsonbin.io/v3/b/${binId}`, true);
  req.setRequestHeader("X-Master-Key", accessKey);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(updatedData));
}

// Call the function to fetch the data initially
fetchData();
