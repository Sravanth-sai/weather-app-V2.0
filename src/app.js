const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

// console.log(__dirname); // Gives absolute path of current file
//  __filename Gives absolute path of current file with filename
// console.log(path.join(__dirname, "../public/"));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
// this is required for express to use .hbs files to render dynamic
// templates. The caseSensitivity and spelling should be same
app.set("view engine", "hbs"); // To tell experss to use handlebars
app.set("views", viewsPath); // set handlebars' views path for express to use
hbs.registerPartials(partialsPath); // set handlebars partails path for express to use

// app.use(express.static()) --> for using the path to load static items like HTML
app.use(express.static(publicDirectoryPath));

// app.get using res.send()

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([{ title: "Help page", created: "today" }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page!</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sravanth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sravanth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sravanth",
    helpText: "This is some helpful text!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is required to fetch weather!",
    });
  }
  const address = req.query.address;
  let units = "m";
  let unit = "";
  if (req.query.units) {
    units = req.query.units.toLowerCase();
    if (units === "f" || units === "fahrenheit") {
      unit = "°F";
      units = "f";
    } else if (units === "kelvin" || units === "s") {
      unit = "K";
      units = "s";
    } else {
      unit = "°C";
    }
  }

  geoCode(address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      res.send({ error });
    } else {
      forecast(latitude, longitude, units, (error, data) => {
        if (error) {
          res.send({
            error,
          });
        } else {
          const { currentWeather, currentTemp, feelslike, humidity } = data;
          res.send({
            address,
            location,
            forecast:
              currentWeather +
              ". It is currently " +
              currentTemp +
              unit +
              " out. Feels like " +
              feelslike +
              unit +
              " with " +
              humidity +
              "% humidity.",
          });
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Search term is required!",
    });
  }

  // console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404error", {
    title: "404",
    name: "Sravanth",
    error: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404error", {
    title: "404",
    name: "Sravanth",
    error: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
