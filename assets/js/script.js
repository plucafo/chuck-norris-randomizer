document.addEventListener("DOMContentLoaded", function () {
  // Variables to select html elements
  var quoteEl = $(".quote-field");
  var translatedQuotesEl = $("#translatedQuotes");
  var displayedTranslations = {};
  // Function to get a random quote from the API and display it on the page
  var quoteURL =
    "https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1";
  async function getQuoteData() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ba9a53a5b4msh817988e2e3af1c7p18759ejsn39447850662c",
        "X-RapidAPI-Host": "andruxnet-random-famous-quotes.p.rapidapi.com",
      },
    };
    try {
      var response = await fetch(quoteURL, options);
      var quoteData = await response.json();
      console.log(quoteData); // Logs quote data to console for testing
      quoteEl.empty(); // Clears the quote-field element before adding a new random quote
      translatedQuotesEl.empty();
      // Variables to collect quote and author data from API
      var quoteText = quoteData[0].quote;
      var quoteAuthor = quoteData[0].author;
      console.log(`${quoteAuthor} - ${quoteText}`);
      // Create elements and set their text content to the quote
      var quoteTextEl = $("<h5>").text(`"${quoteText}"`);
      var quoteAuthorEl = $("<h6>")
        .addClass("text-end")
        .text(`- ${quoteAuthor}`);
      // Appened new elements to the page
      quoteEl.append(quoteTextEl);
      quoteEl.append(quoteAuthorEl);
    } catch (error) {
      console.error(error);
    }
  }
  function translateText(quoteText, translationType) {
    if (
      displayedTranslations[quoteText] &&
      displayedTranslations[quoteText].includes(translationType)
    ) {
      console.log(
        `${translationType} translation already displayed for this quote.`
      );
      return;
    }
    var translationURL = `https://api.funtranslations.com/translate/${translationType.toLowerCase().replace(/\s/g, '')}.json?text=${encodeURIComponent(
      quoteText
    )}`;
    fetch(translationURL)
      .then(function (response) {
        console.log(`${translationType} Response:`, response);
        return response.json();
      })
      .then(function (data) {
        console.log(`${translationType} Data:`, data);
        var translatedText = data.contents.translated;
        var translationEl = $("<h6>").html(
          `${translationType}: "${translatedText}`
        );
        translatedQuotesEl.append(translationEl);
        if (!displayedTranslations[quoteText]) {
          displayedTranslations[quoteText] = [];
        }
        displayedTranslations[quoteText].push(translationType);
      });
  }
  $("#Translate").on("change", function () {
    translatedQuotesEl.empty();
    var pickedTranslation = $(this).val();
    var textToTranslate = $(".quote-field h5").text();
    translateText(textToTranslate, pickedTranslation);
    // testString();
    $(this).prop("selectedIndex", 0);
  });
  // Generates random quote and displays it on the page when the quote button is clicked
  var quoteBtn = $(".quote-button");
  quoteBtn.on("click", getQuoteData);

  function testString() {
    var string = $("<h6>").text("This is a string for testing purpose");
    translatedQuotesEl.append(string);
  }
});
