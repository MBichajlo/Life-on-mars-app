import axios from "axios";

export function Rover(name, earliestPossibleDate, latestPossibleDate) {
  this.name = name;
  this.earliestPossibleDate = earliestPossibleDate;
  this.latestPossibleDate = latestPossibleDate;
}
let roverNames = ["Perseverance", "Curiosity"];

export async function getMaxAndMinDate() {
  var rovers = [];
  var maxDate = "2004-01-01";
  for (const r of roverNames) {
    try {
      const response = await axios.get(
        `https://mars-photos.herokuapp.com/api/v1/manifests/${r}`
      );
      let newRover = new Rover(
        r,
        response.data.photo_manifest.landing_date,
        response.data.photo_manifest.max_date
      );
      if (response.data.photo_manifest.max_date > maxDate) {
        maxDate = response.data.photo_manifest.max_date;
      }
      rovers.push(newRover);
    } catch (error) {
      throw error;
    }
  }

  return {
    rovers: rovers,
    maxDate: maxDate,
  };
}
