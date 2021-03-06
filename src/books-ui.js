export class BooksUI {
  // searchResultHolder;
  // bookInfoHolder;

  // currentPage = [];

  // api;

  constructor(api) {
    this.searchResultHolder = document.getElementById("searchResultHolder");
    this.bookInfoHolder = document.getElementById("bookInfoHolder");

    const searchInput = document.getElementById("searchInput");
    const goButton = document.getElementById("goButton");

    goButton.addEventListener("click", () => {
      const querry = searchInput.value;
      if (!querry) {
        return;
      }

      api.search(querry).then(page => {
        this.processSearchResult(page);
      });
    });

    this.searchResultHolder.addEventListener("click", event => {
      const targetDiv = event.target;
      const id = targetDiv.id;

      const selectedBook = this.currentPage.find(item => item.id === id);
      if (!selectedBook) {
        return;
      }

      if (this.selectedBook) {
        const selectedBook = this.searchResultHolder.querySelector(
          "#" + this.selectedBook.id
        );
        selectedBook.classList.remove("select-book");
      }

      this.selectedBook = selectedBook;
      targetDiv.classList.add("select-book");

      this.bookInfoHolder.innerHTML = `
        <h2>${selectedBook.title}</h2>
        <div>Languages available: ${selectedBook.language.join(", ")}</div>
      `;
    });
  }

  processSearchResult(page) {
    page.docs.forEach(item => {
      item.id = item.key.split("/").pop();
    });

    this.currentPage = page.docs;

    const booksHTML = page.docs.reduce((acc, item) => {
      return (
        acc +
        `
          <div id="${item.id}" class="book-info">${item.title}</div>
        `
      );
    }, "");

    this.searchResultHolder.innerHTML = booksHTML;
  }
}
