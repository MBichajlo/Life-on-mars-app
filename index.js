import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(getMaxAndMinDate);

async function getMaxAndMinDate(req, res, next) {
  try {
    const response = await axios.get(
      `https://mars-photos.herokuapp.com/api/v1/manifests/opportunity`
    );
    console.log(response.data.photo_manifest.landing_date);
  } catch (error) {
    console.log(error);
  }
  next();
}

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  console.log(req.body.date);
  try {
    const nasaResponse = await axios.get(
      `http://mars-photos.herokuapp.com/api/v1/rovers/opportunity/photos?earth_date=${req.body.date}&camera=fhaz`
    );
    const data = nasaResponse.data;
    // console.log(data);
    if (data.photos.length === 0) {
      res.render("index.ejs", {
        alert: "No photos on that day",
      });
    } else {
      //   console.log(data.photos[Math.floor(Math.random() * data.photos.length)]);

      res.render("index.ejs", {
        photoURL:
          data.photos[Math.floor(Math.random() * data.photos.length)].img_src,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
