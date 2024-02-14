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
    localStorage.setItem("quoteText", quoteText);
    localStorage.setItem("quoteAuthor", quoteAuthor);
  }

  var savedQuoteText = localStorage.getItem("quoteText");
  var savedQuoteAuthor = localStorage.getItem("quoteAuthor");

  if (savedQuoteText && savedQuoteAuthor) {
    // If there is saved data, create elements and set their text content
    var quoteTextEl = $("<h5>").text(`"${savedQuoteText}"`);
    var quoteAuthorEl = $("<h6>")
      .addClass("text-end")
      .text(`- ${savedQuoteAuthor}`);

    // Append elements to the page
    quoteEl.append(quoteTextEl);
    quoteEl.append(quoteAuthorEl);
  }

  // Function to translate quote to chosen translation
  function translateText(quoteText, translationType) {
    var translationURL = `https://api.funtranslations.com/translate/${translationType
      .toLowerCase()
      .replace(/\s/g, "")}.json?text=${encodeURIComponent(quoteText)}`;
    fetch(translationURL)
      .then(function (response) {
        console.log(`${translationType} Response:`, response);
        return response.json();
      })
      .then(function (data) {
        console.log(`${translationType} Data:`, data);
        var translatedText = data.contents.translated;
        var translationEl = $("<h5>")
          .html(`${translationType}: ${translatedText}`)
          .addClass("mt-2");
        translatedQuotesEl.append(translationEl);
        if (!displayedTranslations[quoteText]) {
          displayedTranslations[quoteText] = [];
        }
        displayedTranslations[quoteText].push(translationType);
      });
  }

  // Event listener for select element
  $("#Translate").on("change", function () {
    translatedQuotesEl.empty();
    var pickedTranslation = $(this).val();
    var textToTranslate = $(".quote-field h5").text();
    translateText(textToTranslate, pickedTranslation);
    // testString();
    if (pickedTranslation === "Yoda") {
      var backgroundImage = $("<img>").attr("src", "/assets/images/yoda.jpg");
      translatedQuotesEl.append(backgroundImage);
    } else if (pickedTranslation === "Groot") {
      var backgroundImage = $("<img>").attr("src", "/assets/images/groot.jpeg");
      translatedQuotesEl.append(backgroundImage);
      playGrootAudio();
    } else if (pickedTranslation === "Pirate") {
      var backgroundImage = $("<img>").attr(
        "src",
        "/assets/images/pirate.jpeg"
      );
      translatedQuotesEl.append(backgroundImage);
    } else if (pickedTranslation === "Pig-Latin") {
      var backgroundImage = $("<img>").attr("src", "/assets/images/pig.jpeg");
      translatedQuotesEl.append(backgroundImage);
    } else if (pickedTranslation === "Leetspeak") {
      var backgroundImage = $("<img>").attr("src", "/assets/images/leet.jpeg");
      translatedQuotesEl.append(backgroundImage);
    } else if (pickedTranslation === "Klingon") {
      var backgroundImage = $("<img>").attr("src", "/assets/images/worf.jpeg");
      translatedQuotesEl.append(backgroundImage);
    }

    $(this).prop("selectedIndex", 0);
  });

  // Generates random quote and displays it on the page when the quote button is clicked
  var quoteBtn = $(".quote-button");
  quoteBtn.on("click", getQuoteData);

  // Function to add hardcoded string for testing when API call limit is met
  function testString() {
    var string = $("<h6>").text("This is a string for testing purpose");
    translatedQuotesEl.append(string);
  }

  // Plays groot audio file
  function playGrootAudio() {
    var audioPlayer = new Audio("/assets/sounds/groot.mp3");
    audioPlayer.play();
  }
});
