const binId = "670ae9f8acd3cb34a895cc79"; // Replace with your actual JSONBin.io ID
const apiKey = "$2a$10$XKGw9XjvSAwKE5oQP/L1c.bIjFJP1vvp2mMyraSDGyNnXpcj1K75K"; // Replace with your actual API key

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
            displayBookList(response);
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

  data.forEach(book => {
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
    checkbox.checked = book.estado === 1;
    checkbox.disabled = true; // Solo visualización para evitar problemas de seguridad en GitHub Pages

    bookItem.appendChild(numero);
    bookItem.appendChild(autor);
    bookItem.appendChild(obra);
    bookItem.appendChild(paginas);
    bookItem.appendChild(notas);
    bookItem.appendChild(checkbox);
    bookList.appendChild(bookItem);
  });
}

// Llamar a la función para obtener los datos al cargar la página
fetchData();
