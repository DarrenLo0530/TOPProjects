class Book {
    #title = "Test";
    #author;
    #numPages;
    #read;
    
    constructor(title, author, numPages, read) {
        this.#title = title;
        this.#author = author;
        this.#numPages = numPages;
        this.#read = read;
    }

    info() {
        return `${this.#title} by ${this.#author}, ${this.#numPages}, ${this.#read ? "already read" : "not read yet"}.`;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get numPages() {
        return this.#numPages;
    }

    get read() {
        return this.#read;
    }

    toJSON() {
        return {title: this.#title, author: this.#author, numPages: this.#numPages, read: this.#read};
    }

    static revive(data) {
        return new Book(data.title, data.author, data.numPages, data.read);
    }
}


let library = [];

function saveToStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}


function populateFromStorage() {
    libraryData = localStorage.getItem('library');
    if(libraryData) {
        library = JSON.parse(libraryData)
                      .map(data => Book.revive(data));
    }

}

function validateBook(book) {
    if(book.title.length == 0 || book.author.length == 0 || book.numPages.length == 0) {
        alert("One or more fields are empty");
        return false;
    }

    if(library.some(libraryBook => libraryBook.title == book.title)) {
        alert("A book with that title already exists");
        return false;
    }

    return true;
}

const $title = document.querySelector("#title");
const $author = document.querySelector("#author");
const $numPages = document.querySelector("#num-pages");
const $read = document.querySelector("#read");
const $libraryDisplay = document.querySelector("#library-display");

//Modal
const $newBookButton = document.querySelector('#new-book-button');
const $newBookModal = document.querySelector('#new-book-modal');
const $newBookModalClose = document.querySelector('#new-book-modal .close');

function addBookToLibrary() {    
    console.log($title.value);
    let book = new Book($title.value, $author.value, parseInt($numPages.value), $read.checked);
    console.log(book);
    if(!validateBook(book)) {
        return false;
    }
    
    library.push(book);
    return true;
}

function getBookFromPanel(bookPanel) {
    bookPanel.id.split(" ").forEach(id => {
        if(/^book-\d$/.test(id)) { 
            return library[id.split("-")[1]];
        }
    })
}


function setReadButtonStyle(book, readButton) {
    if(book.read) {
        readButton.classList.remove('warning');
        readButton.classList.add('success');
        readButton.textContent = "Read";
    } else {
        readButton.classList.remove('success');
        readButton.classList.add('warning');
        readButton.textContent = "Not read";
    }
}

function displayBooks() {
    populateFromStorage();

    //Clear books display
    $libraryDisplay.textContent = "";

    library.forEach(function(book, index) {
        const bookPanel = document.createElement('div');
        bookPanel.className = "book-card";
        bookPanel.insertAdjacentHTML('beforeend', `
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <p>Number of Pages: ${book.numPages}</p>
            `
        );

        //Delete book button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "warning";
        deleteButton.addEventListener("click", function() {
            library.splice(index, 1);
            saveToStorage();
            displayBooks();
        });

        //Toggle read button
        const readButton = document.createElement('button');
        setReadButtonStyle(book, readButton);

        readButton.addEventListener("click", function() {
            book.read = !book.read;
            setReadButtonStyle(book, this);
        });
        
        bookPanel.append(deleteButton);
        bookPanel.append(readButton);

        $libraryDisplay.append(bookPanel);
    });
}

function clearForm() {
    $title.value = "";
    $author.value = "";
    $numPages.value = "";
    $read.checked = false;
}

document.querySelector('.book-form').addEventListener('submit', e => {
    e.preventDefault();

    addBookToLibrary();
    saveToStorage();
    displayBooks();
    
    clearForm();
});

$newBookButton.onclick = function() {
    $newBookModal.style.display = 'block';
}

window.onclick = function(event) {
    if(event.target == $newBookModal) {  
        $newBookModal.style.display = "none";
    }
}

$newBookModalClose.onclick = function() {
    $newBookModal.style.display = "none";
}


displayBooks();
