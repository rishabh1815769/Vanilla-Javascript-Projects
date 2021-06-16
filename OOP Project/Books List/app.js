class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><i class="bi bi-x-circle" href="#"></i></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    div.role = "alert";
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    const row = document.querySelector(".row");
    const column = document.querySelector(".col-md-4 mx-auto");
    // Get form
    const form = document.querySelector("#book-form");
    // Insert alert
    container.insertBefore(div, row, column, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "bi bi-x-circle") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  console.log(ui);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields !", "alert-danger");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to local storage
    Store.addBook(book);

    // Show success
    ui.showAlert("Book Added!", "alert-success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book Removed!", "alert-success");

  e.preventDefault();
});
