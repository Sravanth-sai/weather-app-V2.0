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

search.addEventListener("focus", () => {
  search.style = `border: 1px solid #cccccc`;
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.style = `color: black;`;
  messageOne.textContent = "Fetching weather...";
  forecast.textContent = null;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.style = `color: red;`; // display: block;`;
        messageOne.textContent = data.error;
      } else {
        messageOne.setAttribute("style", "color: black; display: block;");
        messageOne.textContent = data.location;
        //   forecast.style = `display: block;`;
        forecast.textContent = data.forecast;
        // console.log(data.location + "\n" + data.forecast);
      }
    });
  }); // + "&units=" + unit);
});
