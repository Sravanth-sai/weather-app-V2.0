const request = require("postman-request");

const forecast = (latitude, longitude, units = "m", callback) => {
  const location = latitude + "," + longitude;

  const url =
    "http://api.weatherstack.com/current?access_key=67344611c0ea3449addcae7b07e9378d&query=" +
    location +
    "&units=" +
    units;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect to weather services! Please check connectivity and try after sometime.",
        undefined
      );
      return;
    }

    const { body } = response; // destructure response object;

    if (body.error) {
      if (body.error.code == 615) {
        callback(
          "Unable to fetch weather for location. Try changing location",
          undefined
        );
        return;
      }
      callback(body.error.type, undefined);
    } else {
      const current = body.current;
      // console.log(response.body);
      // console.log(current);

      callback(undefined, {
        // current,
        currentWeather: current.weather_descriptions[0],
        currentTemp: current.temperature,
        feelslike: current.feelslike,
        humidity: current.humidity,
        icon: current.weather_icons[0],
        // windDirection:
      });
    }
  });
};

module.exports = forecast;
