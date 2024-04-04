var roverInput = $("#roverInput");
var cameraInput = $("#cameraInput");

// const rovers = JSON.parse(roverInput.attr("data-"));

$(roverInput).on("change", changeCameras);
jQuery(changeCameras);

function changeCameras() {
  console.log("changing cameras");
  const rover = rovers[roverInput.val()];
  cameraInput.empty();
  rover.cameras.forEach((camera) => {
    var selectElement = document.createElement("option");
    selectElement.text = camera.full_name;
    selectElement.value = camera.name;
    cameraInput.append(selectElement);
  });
}

$(cameraInput).on("change", function () {
  console.log(cameraInput.val());
});

//for now its hardcoded into this script file, but It'll be probably moved and accesed via internal axios request
const rovers = {
  Perseverance: {
    cameras: [
      { name: "EDL_RUCAM", full_name: "Rover Up-Look Camera" },
      { name: "EDL_DDCAM", full_name: "Descent Stage Down-Look Camera" },
      { name: "EDL_PUCAM1", full_name: "Parachute Up-Look Camera A" },
      { name: "EDL_PUCAM2", full_name: "Parachute Up-Look Camera B" },
      { name: "NAVCAM_LEFT", full_name: "Navigation Camera - Left" },
      { name: "NAVCAM_RIGHT", full_name: "Navigation Camera - Right" },
      { name: "MCZ_RIGHT", full_name: "Mast Camera Zoom - Right" },
      { name: "MCZ_LEFT", full_name: "Mast Camera Zoom - Left" },
      {
        name: "FRONT_HAZCAM_LEFT_A",
        full_name: "Front Hazard Avoidance Camera - Left",
      },
      {
        name: "FRONT_HAZCAM_RIGHT_A",
        full_name: "Front Hazard Avoidance Camera - Right",
      },
      {
        name: "REAR_HAZCAM_LEFT",
        full_name: "Rear Hazard Avoidance Camera - Left",
      },
      {
        name: "REAR_HAZCAM_RIGHT",
        full_name: "Rear Hazard Avoidance Camera - Right",
      },
      { name: "EDL_RDCAM", full_name: "Rover Down-Look Camera" },
      { name: "SKYCAM", full_name: "MEDA Skycam" },
      { name: "SHERLOC_WATSON", full_name: "SHERLOC WATSON Camera" },
      { name: "SUPERCAM_RMI", full_name: "SuperCam Remote Micro Imager" },
      { name: "LCAM", full_name: "Lander Vision System Camera" },
    ],
  },
  Curiosity: {
    cameras: [
      {
        name: "FHAZ",
        full_name: "Front Hazard Avoidance Camera",
      },
      {
        name: "NAVCAM",
        full_name: "Navigation Camera",
      },
      {
        name: "MAST",
        full_name: "Mast Camera",
      },
      {
        name: "CHEMCAM",
        full_name: "Chemistry and Camera Complex",
      },
      {
        name: "MAHLI",
        full_name: "Mars Hand Lens Imager",
      },
      {
        name: "MARDI",
        full_name: "Mars Descent Imager",
      },
      {
        name: "RHAZ",
        full_name: "Rear Hazard Avoidance Camera",
      },
    ],
  },
  Opportunity: {
    cameras: [
      {
        name: "FHAZ",
        full_name: "Front Hazard Avoidance Camera",
      },
      {
        name: "NAVCAM",
        full_name: "Navigation Camera",
      },
      {
        name: "PANCAM",
        full_name: "Panoramic Camera",
      },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      {
        name: "ENTRY",
        full_name: "Entry, Descent, and Landing Camera",
      },
      {
        name: "RHAZ",
        full_name: "Rear Hazard Avoidance Camera",
      },
    ],
  },
  Spirit: {
    cameras: [
      {
        name: "FHAZ",
        full_name: "Front Hazard Avoidance Camera",
      },
      {
        name: "NAVCAM",
        full_name: "Navigation Camera",
      },
      {
        name: "PANCAM",
        full_name: "Panoramic Camera",
      },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      {
        name: "ENTRY",
        full_name: "Entry, Descent, and Landing Camera",
      },
      {
        name: "RHAZ",
        full_name: "Rear Hazard Avoidance Camera",
      },
    ],
  },
};
