import express from "express";

import bodyParser from "body-parser";
import { dirname, parse } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv/config";

import { getMaxAndMinDate } from "./rovers.js";
import { Rover } from "./rovers.js";
import { getCurrentMarsPosition } from "./marsEarthDistance.js";
import { getWeather } from "./weather.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

const spirit = new Rover("Spirit", "2004-01-04", "2010-03-21");
const opportunity = new Rover("Opportunity", "2004-01-25", "2018-06-11");

const lowestPossibleDate = "2004-01-04";
// Normally there would be an apiCall on start of the server and with some intervals, but it's too time consuming so i'll just hardcode the maximum dates for now
// const apiResult = await getMaxAndMinDate();

//For development purpose only ***
const perseverance = new Rover("Perseverance", "2021-02-18", "2024-04-01");
const curiosity = new Rover("Curiosity", "2012-08-06", "2024-02-19");

//****
export const rovers = [spirit, opportunity, perseverance, curiosity];

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    // rovers: rovers,
    // highestPossibleDate: apiResult.maxDate,
    highestPossibleDate: "2024-04-01",
  });
});

app.get("/latestPhotos", async (req, res) => {
  try {
    const latestPhoto = await axios.get(
      "http://mars-photos.herokuapp.com/api/v1/rovers/perseverance/latest_photos"
    );
    console.log(typeof latestPhoto.data["latest_photos"]);
    // res.send(latestPhoto.data.latest_photos[0]);
    res.render("photo.ejs", {
      photo:
        latestPhoto.data.latest_photos[
          Math.floor(Math.random() * latestPhoto.data.latest_photos.length)
        ],
      rovers: rovers,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post("/submit", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  var date = new Date(
    parseInt(data.year),
    parseInt(data.month) - 1,
    parseInt(data.day),
    2
  );
  date = date.toISOString().split("T")[0];
  console.log(date);
  //Checking which rovers are available for this day
  let possibleRovers = rovers.filter(
    (r) => r.latestPossibleDate > date && r.earliestPossibleDate < date
  );
  // console.log(possibleRovers);
  var photo = "";

  //api calls for each possible rover to determine if any of them took any photos on a given date
  for (const r of possibleRovers) {
    try {
      const nasaResponse = await axios.get(
        `http://mars-photos.herokuapp.com/api/v1/rovers/${r.name}/photos?earth_date=${date}`
      );
      // console.log(nasaResponse.data);
      if (nasaResponse.data.photos.length != 0) {
        photo =
          nasaResponse.data.photos[
            Math.floor(Math.random() * nasaResponse.data.photos.length)
          ];
        break;
      }
    } catch (error) {}
  }
  console.log("lmao");
  res.render("photo.ejs", {
    photo: photo,
    rovers: rovers,
  });
  console.log("lmao");
});

app.get("/currentDistance", async (req, res) => {
  try {
    const position = await getCurrentMarsPosition();
    res.render("currentDistance.ejs", {
      position: position,
    });
  } catch (error) {
    res.send(error.code);
  }
});

app.get("/weather", async (req, res) => {
  const weatherData = await getWeather();
  res.send(weatherData);
});

app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
