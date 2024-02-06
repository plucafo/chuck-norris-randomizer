// Variables to select html elements
var quoteEl = $(".quote-field");

// Gets data from Chuck Norris API
function getChuckNorrisData() {
  var chuckNorrisURL = "https://api.chucknorris.io/jokes/random";
  fetch(chuckNorrisURL)
    .then(function (chuckNorrisResponse) {
      console.log(chuckNorrisResponse);
      return chuckNorrisResponse.json();
    })

    .then(function (chuckNorrisData) {
      console.log("chuckNorrisData: ");
      console.log(chuckNorrisData);
    });
}

// Translates ?text= paramater into Yoda speak
var yodaTranslationEl;
function getYodaData(quoteText) {
  var yodaURL =
    "https://api.funtranslations.com/translate/yoda.json?text=" +
    encodeURIComponent(quoteText);

  //Getting data from YodaSpeak
  fetch(yodaURL)
    .then(function (yodaResponse) {
      console.log("yodaResponse: ", yodaResponse);
      return yodaResponse.json();
    })

    .then(function (yodaData) {
      console.log("yodaData: ");
      console.log(yodaData);
      if (yodaTranslationEl) {
        yodaTranslationEl.remove();
      }
      //Getting translated data from YodaSpeak and displaying in a new p element (REPLACE P ELEMENT LATER)
      const yodaTranslation = yodaData.contents.translated;
      yodaTranslationEl = $("<p>").text(`Yoda: "${yodaTranslation}`);
      quoteEl.append(yodaTranslationEl);
    });
}

// INSERTS A HARDCODED STRING FOR TESTING WITHOUT CALLING THE API
var stringEl;
$('#Translate').on('change', function () {
  const pickedTranslation = $(this).val();
  if (stringEl) {
    stringEl.remove();
  }
  if (pickedTranslation === 'Yoda') {

    stringEl = $('<p>').addClass('mt-3').text('This is a string for testing purposes');
    quoteEl.append(stringEl);

    $(this).prop('selectedIndex', 0);
  }
});

// WORKING YODA TRANSLATOR - *** DON'T DELETE ***
// $('#Translate').on('change', function () {
//   const pickedTranslation = $(this).val();

//   if (pickedTranslation === 'Yoda') {
//     var yodaText = $('.quote-field h5').text();
//     getYodaData(yodaText);

//     quoteEl.append(yodaTranslationEl);

//     $(this).prop('selectedIndex', 0);
//   }
// });


const quoteURL =
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
    const response = await fetch(quoteURL, options);
    const quoteData = await response.json();
    console.log(quoteData); // Logs quote data to console for testing

    quoteEl.empty(); // Clears the quote-field element before adding a new random quote

    // Variables to collect quote and author data from API
    var quoteText = quoteData[0].quote;
    var quoteAuthor = quoteData[0].author;
    console.log(`${quoteAuthor} - ${quoteText}`);

    // Create elements and set their text content to the quote
    var quoteTextEl = $("<h5>").text(`"${quoteText}"`);
    var quoteAuthorEl = $("<h6>").text(`- ${quoteAuthor}`);

    // Appened new elements to the page
    quoteEl.append(quoteTextEl);
    quoteEl.append(quoteAuthorEl);
  } catch (error) {
    console.error(error);
  }
}

// getChuckNorrisData();
// getYodaData();

// Generates random quote and displays it on the page when the quote button is clicked
var quoteBtn = $(".quote-button");
quoteBtn.on("click", getQuoteData);

// function create() {
//   var yodaImg = document.createElement("img")
//   image.src;
//   document.body.appendChild(image)
// }
// var element = document.getElementById("1")
// element.addEventListener("click", create)
