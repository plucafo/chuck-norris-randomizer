// Variables to select html elements
var quoteEl = $('.quote-field');

// Gets data from Chuck Norris API
function getChuckNorrisData() {
  var chuckNorrisURL = 'https://api.chucknorris.io/jokes/random';
  fetch(chuckNorrisURL)
    .then(function (chuckNorrisResponse) {
      console.log(chuckNorrisResponse);
      return chuckNorrisResponse.json();
    })

    .then(function (chuckNorrisData) {
      console.log('chuckNorrisData: ');
      console.log(chuckNorrisData);
    });
}

// Translates ?text= paramater into Yoda speak
function getYodaData(quoteText) {
  var yodaURL =
    'https://api.funtranslations.com/translate/yoda.json?text=' +
    encodeURIComponent(quoteText);

  //Getting data from YodaSpeak
  fetch(yodaURL)
    .then(function (yodaResponse) {
      console.log('yodaResponse: ', yodaResponse);
      return yodaResponse.json();
    })

    .then(function (yodaData) {
      console.log('yodaData: ');
      console.log(yodaData);

      //Getting translated data from YodaSpeak and displaying in a new p element (REPLACE P ELEMENT LATER)
      const yodaTranslation = yodaData.contents.translated;
      const yodaTranslationEl = $('<p>').text(`Yoda: "${yodaTranslation}`);
      quoteEl.append(yodaTranslationEl);
    });
}
//Event Listener for translation dropdown
$('#Translate').on('change', function () {
  const pickedTranslation = $(this).val();
  if (pickedTranslation === 'Yoda') {
    var yodaText = $('.quote-field h5').text();
    getYodaData(yodaText);
  } else if (pickedTranslation === "Groot") {
    var grootText = $('.quote-field h5').text();
    getGrootData(grootText);
  }
})


// Groot Translator
function getGrootData(quoteText){
  var grootURL="https://api.funtranslations.com/translate/groot.json?text=" +encodeURIComponent(quoteText);
  fetch(grootURL)
  .then(function(grootResponse){
      console.log("Groot Response:", grootResponse);
      return grootResponse.json();
  })
  .then(function(grootdata){
      console.log("grootdata:", grootdata);
      const grootTranslation = grootdata.contents.translated;
      const grootTranslationEl = $ ("<p>").text(`Groot: "${grootTranslation}`);
      quoteEl.append(grootTranslationEl);
  })
}


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
//In the event listener add
//
//  else if (pickedTranslation === "BLANK") {
//   var BLANKText = $('.quote-field h5').text();
//   getBLANKData(grootText);
// }


// Gets data from Random Quote API
const quoteURL =
  'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=10';

async function getQuoteData() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ba9a53a5b4msh817988e2e3af1c7p18759ejsn39447850662c',
      'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com',
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
    var quoteTextEl = $('<h5>').text(`"${quoteText}"`);
    var quoteAuthorEl = $('<h6>').text(`- ${quoteAuthor}`);

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
var quoteBtn = $('.quote-button');
quoteBtn.on('click', getQuoteData);
