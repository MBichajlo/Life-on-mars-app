import axios from "axios";

export async function getCurrentMarsPosition() {
  //API call needs a start and stop date. Creating two dates: first one is current UTC time, second is one day ahead
  var firstDate = new Date();
  var secondDate = new Date();
  secondDate.setDate(firstDate.getDate() + 1);
  firstDate =
    firstDate.toISOString().split("T")[0] +
    "%20" +
    firstDate.toISOString().split("T")[1];
  firstDate = firstDate.slice(0, firstDate.indexOf("Z") - 7);
  console.log(firstDate);
  secondDate = secondDate.toISOString().split("T")[0];

  //making Horizon API call with all the not important information disabled
  try {
    const horizonsResponse = await axios.get(
      `https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND=%27499%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&START_TIME="${firstDate}"&STOP_TIME="${secondDate}"&STEP_SIZE="12h"&QUANTITIES=%2720%27`
    );
    console.log("Data recieved");
    var whatWeWant = horizonsResponse.data;

    //Data received can't be received in a sensible JS object so we decode the string

    //Isolating the ephemeris
    whatWeWant = whatWeWant.slice(
      whatWeWant.indexOf("$$SOE") + 5,
      whatWeWant.indexOf("$$EOE")
    );

    //Splitting by line and spaces
    whatWeWant = whatWeWant.split("\n").filter((s) => s != "")[0];
    whatWeWant = whatWeWant.split(" ").filter((s) => s != "" && s != " ");

    //these array entries will always be the desired data
    const currentDistanceFromEarth = parseFloat(whatWeWant[2]);
    const currentRelativeSpeed = parseFloat(whatWeWant[3]);
    return {
      distance: currentDistanceFromEarth,
      speed: currentRelativeSpeed,
    };
  } catch (error) {
    throw error;
  }
}
