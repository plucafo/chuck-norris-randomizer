// Gets data from Chuck Norris API
var URL = "https://api.chucknorris.io/jokes/random";

function getData() {
  fetch(URL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })

    .then(function (data) {
      console.log("data: ");
      console.log(data);
    });
}

getData();
