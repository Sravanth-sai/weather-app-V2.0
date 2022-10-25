const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://trueway-geocoding.p.rapidapi.com/Geocode?address=" +
    encodeURIComponent(address) +
    "&language=en&rapidapi-key=46ec6c1aadmsh39e8de68a280d49p1bcda9jsn88bc877e69df";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
      return;
    }

    const { body } = response; // Destructure response object;

    if (body.error) {
      callback("Location cannot be empty", undefined);
    } else if (body.message) {
      callback("Incorrect API key", undefined);
    } else if (body.results.length === 0) {
      callback("Unable to find location. Try changing location.", undefined);
    } else {
      const result = body.results[0];

      callback(undefined, {
        location: result.address,
        latitude: result.location.lat,
        longitude: result.location.lng,
      });
    }
  });
};

module.exports = geoCode;
