const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });
const cheerio = require('cheerio');  //parse the html
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.get('/item', (req, res, next) => {
  const location = req.body.location;
  nightmare.goto("https://www.google.com/search?q=" + location + "+weather")
    .evaluate(function () {
      return document.body.outerHTML;
    })
    .then(function (result) {
      let $ = cheerio.load(result);
      item = {
        location: location,
        temperature: $('#wob_tm').text(),
        humidity: $('#wob_hm').text(),
        windspeed: $('#wob_ws').text(),
        iconPath: $('#wob_tci').attr("src")

      }
      res.status(201).json({
        result: 1,
        item: item
      });
    })
    .catch(error => {
      res.status(201).json({
        result: 0
      });
      console.error('Search failed:', error)
    })
});



app.post('/item', (req, res, next) => {
  const location = req.body.location;
  nightmare.goto("https://www.google.com/search?q=" + location + "+weather")
    .evaluate(function () {
      return document.body.outerHTML;
    })
    .then(function (result) {
      let $ = cheerio.load(result);
      item = {
        location: location,
        temperature: $('#wob_tm').text(),
        humidity: $('#wob_hm').text(),
        windspeed: $('#wob_ws').text(),
        iconPath: $('#wob_tci').attr("src")

      }
      res.status(201).json({
        result: 1,
        item: item
      });
    })
    .catch(error => {
      res.status(201).json({
        result: 0
      });
      console.error('Search failed:', error)
    })
});

module.exports = app;

















