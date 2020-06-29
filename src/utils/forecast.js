const request = require("request");

const weatherApiKey = "e4a2a04b63bc0efcaa9a3159367ecc27";

const forecast = (lattitude, longitude, callback) => {
  const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&units=metric&APPID=${weatherApiKey}`;
  request({ url: weatherURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to get weather data", undefined);
    } else if (body.message) {
      callback(`error:${body.message}`, undefined);
    } else {
      //console.log(response);
      callback(
        undefined,
        `The temperature is ${body.main.temp} degrees. The pressure is ${body.main.pressure} mbar. The humidity is ${body.main.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
