// console.log("Client side JS file is loaded");

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector(".form-input");
const messageOne = document.querySelector("#message-one");
const forecast = document.querySelector("#forecast");
const weatherIcon = document.querySelector("#weather-icon");

search.addEventListener("focus", () => {
  search.style = `border: 1px solid #cccccc`;
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.style = `color: black;`;
  messageOne.textContent = "Fetching weather...";
  forecast.textContent = null;
  weatherIcon.setAttribute("style", "display: none");
  search.style = `border: 1px solid #cccccc`;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        search.style = `border: 1px solid red;
                        box-shadow: 0 0 3px red`;
        messageOne.style = `color: red;`; // display: block;`;
        messageOne.textContent = data.error;
      } else {
        messageOne.setAttribute("style", "color: black; display: block;");
        weatherIcon.style = `display: block;`;
        weatherIcon.setAttribute("src", data.weatherIcon);
        messageOne.textContent = data.location;
        //   forecast.style = `display: block;`;
        forecast.textContent = data.forecast;
        // console.log(data.location + "\n" + data.forecast);
      }
    });
  }); // + "&units=" + unit);
});
