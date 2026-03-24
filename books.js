let books;

function filterBooks(event) {
  renderBooks(event.target.value);
}

function getBookRatingHTML(rating) {
  let ratingInt = Math.floor(rating);
  let ratingHTML = "";
  for (let i = 0; i < ratingInt; i++) {
    ratingHTML += `
      <i class="fas fa-star"></i>`;
  }
  if (rating - ratingInt) {
    ratingHTML += `
      <i class="fas fa-star-half-alt"></i>`;
  }

  return ratingHTML;
}

function getBookPricesHTML(origPrice, salePrice) {
  if (salePrice) {
    return `<span class="book__price--normal">$${origPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`;
  } else {
    return `$${origPrice.toFixed(2)}`;
  }
}

async function renderBooks(sortVal, haveBooks) {
  const booksWrapper = document.querySelector('.books');

  if (!books) {
    booksWrapper.classList.add("books__loading");
    books = await getBooks();
    booksWrapper.classList.remove("books__loading");
  }

  switch (sortVal) {
    case "LOW_TO_HIGH":
      books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
      break;
    case "HIGH_TO_LOW":
      books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
      break;
    case "RATING":
      books.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  booksWrapper.innerHTML = "";

  for (const book of books) {

    const bookRatingHTML = getBookRatingHTML(book.rating);

    const bookPricesHTML = getBookPricesHTML(book.originalPrice, book.salePrice);

    booksWrapper.innerHTML +=
      `
  <div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${bookRatingHTML}
    </div>
    <div class="book__price">
      ${bookPricesHTML}
    </div>
  </div>`;
  }
}

setTimeout(() => { renderBooks(""); });

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "pics/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "pics/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "pics/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "pics/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "pics/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "pics/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "pics/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "pics/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "pics/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "pics/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "pics/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
