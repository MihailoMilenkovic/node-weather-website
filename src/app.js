const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mihailo Milenkovic",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Mihailo Milenkovic",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "Help info here",
    title: "Help",
    name: "Mihailo Milenkovic",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        forecast(lattitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          } else {
            res.send({
              location,
              forecast: forecastData,
              address: req.query.address,
            });
          }
        });
      }
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "404",
    name: "Mihailo Milenkovic",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    title: "404",
    name: "Mihailo Milenkovic",
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
