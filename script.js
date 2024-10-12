const binId = "670ade0fad19ca34f8b7526b"; // Replace with your actual JSONBin.io ID
const apiKey = "$2a$10$TeKZWBg.uzaWTN8cMM8m/.FM3cK8OPY4wsZ/qphIreP7K7PJfEJhO"; // Replace with your actual API key

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
  req.setRequestHeader("X-Master-Key", apiKey); 
  req.send();
}

unction displayBookList(data) {
  const bookList = document.getElementById('book-list');

  data.forEach(book => {
    const bookItem = document.createElement('div');
    const numero = document.createElement('p'); // Display "Numero"
    const autor = document.createElement('p');
    const obra = document.createElement('p'); // Display "Obra"
    const paginas = document.createElement('p'); // Display "Paginas"
    const notas = document.createElement('p'); // Display "Notas"
    const checkbox = document.createElement('input');

    checkbox.type = "checkbox";
    checkbox.checked = book.estado === 1; 

    numero.textContent = `Número: ${book.Numero}`;
    autor.textContent = `Autor: ${book.Autor}`;
    obra.textContent = `Obra: ${book.Obra}`;
    paginas.textContent = `Páginas: ${book.Paginas}`;
    notas.textContent = `Notas: ${book.Notas}`;

    checkbox.addEventListener('change', () => {
      book.estado = checkbox.checked ? 1 : 0;
      updateJsonBin(data);
    });

    bookItem.appendChild(numero); 
    bookItem.appendChild(autor);
    bookItem.appendChild(obra);
    bookItem.appendChild(paginas);
    bookItem.appendChild(notas);
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
