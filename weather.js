import axios from "axios";
import { xml2json } from "./xml2json.js";
import { response } from "express";
import { DOMParser } from "@xmldom/xmldom";

export async function getWeather() {
  try {
    const response = await axios.get(
      "http://cab.inta-csic.es/rems/rems_weather.xml",
      {
        headers: {
          Accept: "application/xml",
        },
        responseType: "document",
      }
    );
    const xmlDoc = new DOMParser().parseFromString(response.data, "text/xml");
    var json = xml2json(xmlDoc);
    json = json.replace("undefined", "");
    json = JSON.parse(json).weather_report;
    console.log(json);
    const interestingData = {
      date: json.terrestrial_date,
      min_air_temp: json.magnitudes.min_temp,
      max_air_temp: json.magnitudes.max_temp,
      pressure: json.magnitudes.pressure,
      min_ground_temp: json.magnitudes.min_gts_temp,
      max_ground_temp: json.magnitudes.max_gts_temp,
      overallWeather: json.magnitudes.atmo_opacity,
      sunrise: json.magnitudes.sunrise,
      sunset: json.magnitudes.sunset,
      month: json.magnitudes.season.split(" ")[1],
      season: getSeason(json.magnitudes.season),
    };
    return interestingData;
  } catch (error) {
    console.log(error);
  }
}

function getSeason(month) {
  month = parseInt(month.split(" ")[1]);
  console.log(month);
  if (month < 4) {
    return "Autumn";
  } else if (month < 7) {
    return "Winter";
  } else if (month < 10) {
    return "Spring";
  } else {
    return "Summer";
  }
}
