// Variables to select html elements
var quoteEl = $(".quote-field");
var translatedQuotesEl = $("#translatedQuotes");
var yodaTranslationEl;
var leetTranslationEl;
var grootTranslationEl;

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

// Translates ?text= paramater into Yoda speak
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
      // quoteEl.append(yodaTranslationEl);
      translatedQuotesEl.append(yodaTranslationEl);
    });
}

// Translates ?text= paramater into 1337 speak
function getLeetData(quoteText) {
  var leetURL =
    "https://api.funtranslations.com/translate/leetspeak.json?text=" +
    encodeURIComponent(quoteText);

  //Getting data from leetspeak API
  fetch(leetURL)
    .then(function (leetResponse) {
      console.log("leetResponse: ", leetResponse);
      return leetResponse.json();
    })

    .then(function (leetData) {
      console.log("leetData: ");
      console.log(leetData);
      if (leetTranslationEl) {
        leetTranslationEl.remove();
      }
      //Getting translated data from leetSpeak and displaying in a new p element (REPLACE P ELEMENT LATER)
      var leetTranslation = leetData.contents.translated;
      leetTranslationEl = $("<p>").text(`Leetspeak: "${leetTranslation}`);
      // quoteEl.append(leetTranslationEl);
      translatedQuotesEl.append(leetTranslationEl);
    });
}
// Groot Translator
function getGrootData(quoteText) {
  var grootURL =
    "https://api.funtranslations.com/translate/groot.json?text=" +
    encodeURIComponent(quoteText);
  fetch(grootURL)
    .then(function (grootResponse) {
      console.log("Groot Response:", grootResponse);
      return grootResponse.json();
    })
    .then(function (grootData) {
      console.log("grootdata:", grootData);

      var grootTranslation = grootData.contents.translated;
      grootTranslationEl = $("<p>").text(`Groot: "${grootTranslation}`);
      // quoteEl.append(grootTranslationEl);
      translatedQuotesEl.append(grootTranslationEl);
    });
}

// INSERTS A HARDCODED STRING FOR TESTING WITHOUT CALLING THE API
// var stringEl;
// $('#Translate').on('change', function () {
//   const pickedTranslation = $(this).val();
//   if (stringEl) {
//     stringEl.remove();
//   }
//   if (pickedTranslation === 'Yoda') {
//
//     stringEl = $('<p>').addClass('mt-3').text('This is a string for testing purposes');
//     quoteEl.append(stringEl);
//
//     $(this).prop('selectedIndex', 0);
//   }
// });
//
//Additional API translator 'starter code'
// function getBLANKData(quoteText){
//   var BLANKURL="BLANKURL.COM" +encodeURIComponent(quoteText);
//   fetch(BLANKURL)
//   .then(function(BLANKResponse){
//       console.log("BLANK Response:", BLANKResponse);
//       return BLANKResponse.json();
//   })
//   .then(function(BLANKdata){
//       console.log("BLANKdata:", BLANKdata);
//       const BLANKTranslation = BLANKdata.contents.translated;
//       const BLANKTranslationEl = $ ("<p>").text(`BLANK: "${BLANKTranslation}`);
//       quoteEl.append(BLANKTranslationEl);
//   })
// }
//

// WORKING YODA TRANSLATOR - *** DON'T DELETE ***
$("#Translate").on("change", function () {
  var pickedTranslation = $(this).val();

  // Conditional to check which translation was selected
  if (pickedTranslation === "Yoda") {
    var textToTranslate = $(".quote-field h5").text();
    getYodaData(textToTranslate);
  } else if (pickedTranslation === "H4X0R") {
    var textToTranslate = $(".quote-field h5").text();
    getLeetData(textToTranslate);
  } else if (pickedTranslation === "Groot") {
    var textToTranslate = $(".quote-field h5").text();
    getGrootData(textToTranslate);
  }
  $(this).prop("selectedIndex", 0);
});

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
