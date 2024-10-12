const binId = "670ade0fad19ca34f8b7526b"; // Replace with your actual JSONBin.io ID
const apiKey = "$2a$10$TeKZWBg.uzaWTN8cMM8m/.FM3cK8OPY4wsZ/qphIreP7K7PJfEJhO"; // Replace with your actual API key

function fetchData() {
  fetch(`https://cors-anywhere.herokuapp.com/https://api.jsonbin.io/v3/b/${binId}`, {
    headers: {
      'X-Master-Key': apiKey
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      // ... your code to handle the data ...
      displayBookList(data); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayBookList(data) {
  const bookList = document.getElementById('book-list'); // Assuming you have a div with id 'book-list'

  data.forEach(book => {
    const bookItem = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const checkbox = document.createElement('input');

    checkbox.type = "checkbox";
    checkbox.checked = book.estado === 1; // Assuming you have an 'estado' property

    title.textContent = book.Obra;  // Assuming you have an 'Obra' property
    author.textContent = book.Autor; // Assuming you have an 'Autor' property

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
  req.setRequestHeader("X-Master-Key", apiKey);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(updatedData));
}

// Call the function to fetch the data initially
fetchData();
