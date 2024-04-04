$(document).ready(function () {
  $.ajax({
    url: "books.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // Sortieren der Bücher nach Bewertungen absteigend
      let sortedBooks = data.bookCollection.sort(
        (a, b) => b.details.rating - a.details.rating
      );

      // Beschränken auf die 20 besten Bücher
      let topBooks = sortedBooks.slice(0, 20);

      // Anzeige der Bücher auf der Webseite
      displayBooks(topBooks);
    },
    error: function () {
      // Fehlerbehandlung
      $("#output").html(
        "<p style='color: red; font-style: italic; text-align: center;'>an error occurred</p>"
      );
    },
  });
});

function displayBooks(books) {
  let $bookList = $("<div>").addClass("book-list").hide();

  books.forEach(function (book, index) {
    let $bookItem = $("<p>").addClass("book-item");
    if (index % 2 === 1) {
      $bookItem.addClass("greyline");
    }
    let $title = $("<span>")
      .addClass("book-title")
      .text(book.title)
      .css("font-weight", "bold")
      .attr("title", book.genre);
    let $year = $("<span>").text(` (${book.publicationYear})`);
    let $author = $("<span>")
      .text(` by ${book.author}`)
      .css("font-style", "italic");
    let $rating = $("<span>")
      .text(`${book.details.rating}/5`)
      .css("font-weight", "bold");

    $bookItem.append($title, $year, $author, $rating);
    $bookList.append($bookItem);
  });

  $("#output").html($bookList);
  $bookList.slideDown(250);

  // Rahmen-Stil hinzufügen
  $("#output").css({
    border: "1px solid #A5ACB2",
  });
}
