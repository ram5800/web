const binId = "670ae9f8acd3cb34a895cc79"; // Replace with your actual JSONBin.io ID
const apiKey = "$2a$10$rcLfHTG1AZqpMkqFpZuoyeJO0eUpr.hK0/Y9p/ntIrA8dHqPAfVhO"; // Replace with your actual API key


let booksData = []; // Array para almacenar los datos de los libros

function fetchData() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        try {
          const response = JSON.parse(req.responseText);
          console.log("Respuesta completa desde JSONBin:", response); // Imprime la respuesta como objeto

          // Comprobamos que la respuesta sea un arreglo
          if (Array.isArray(response)) {
            booksData = response; // Almacenar los datos de los libros
            displayBookList(booksData);
          } else {
            console.error('Error: La respuesta no contiene un arreglo válido.', response);
          }
        } catch (error) {
          console.error('Error al analizar JSON:', error);
          console.error('Texto de respuesta:', req.responseText); // Muestra el texto de respuesta original
        }
      } else {
        console.error('Error fetching data:', req.status, req.statusText);
      }
    }
  };

  req.open("GET", `https://api.jsonbin.io/v3/b/${binId}/latest?meta=false`, true);
  req.setRequestHeader("X-Master-Key", apiKey);
  req.send();
}

function displayBookList(data) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ""; // Limpiar contenido previo

  data.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');

    const numero = document.createElement('p');
    const autor = document.createElement('p');
    const obra = document.createElement('p');
    const paginas = document.createElement('p');
    const notas = document.createElement('p');
    const checkbox = document.createElement('input');

    numero.textContent = `Número: ${book.Numero}`;
    autor.textContent = `Autor: ${book.Autor}`;
    obra.textContent = `Obra: ${book.Obra}`;
    paginas.textContent = `Páginas: ${book.Paginas}`;
    notas.textContent = `Notas: ${book.Notas || 'N/A'}`;

    checkbox.type = "checkbox";
    checkbox.checked = book.estado === 1; // Marca el checkbox si el libro está leído

    // Cambia la clase de la caja si el checkbox está marcado
    if (checkbox.checked) {
      bookItem.classList.add('checked');
    }

    // Manejar el evento de cambio en el checkbox
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        bookItem.classList.add('checked'); // Añadir la clase checked
        book.estado = 1; // Cambiar el estado a leído
      } else {
        bookItem.classList.remove('checked'); // Remover la clase checked
        book.estado = 0; // Cambiar el estado a no leído
      }
      updateBookState(); // Actualizar el estado del libro en JSONBin
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


// Función para actualizar el estado del libro en JSONBin
function updateBookState() {
  const req = new XMLHttpRequest();
  req.open("PUT", `https://api.jsonbin.io/v3/b/${binId}`, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", apiKey);
  

  // Enviar el array de libros actualizado
  req.send(JSON.stringify(booksData));

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        console.log("Estado del libro actualizado exitosamente", req.responseText);
      } else {
        console.error('Error actualizando el estado del libro:', req.status, req.statusText);
      }
    }
  };
}
// Llamar a la función para obtener los datos al cargar la página
fetchData();
