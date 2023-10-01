let lat, long;
const APIKEY = "eccde07efcd7707ce5948a105bf38ae4";
let paste = document.getElementById("wypisz");
function pobierz() {
  const place = document.getElementById("place").value;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q="+ place + "&appid=" + APIKEY + "&units=metric"
  )
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the response data as JSON
      } else {
        console.log("blad w zapytaniu")
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      // Process the response data here
      let temp = data["main"]["temp"];
      paste.innerHTML = "TEMP: " + temp;
    })
    .catch((error) => {
      paste.innerHTML = "Podane miasto nie istnieje!!"; // Example: Logging the error to the console
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    paste.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      APIKEY +
      "&units=metric"
  )
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the response data as JSON
      } else {
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      // Process the response data here
      let temp = data["main"]["temp"];
      let name = data["name"];
      paste.innerHTML = "TEMPERATURA W : " + name + " WYNOSI " + temp + " °C";
    });
}
getLocation();
