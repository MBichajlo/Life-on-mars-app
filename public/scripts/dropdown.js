var selectButton = $(".select-button");
var dropdown = $(".select-dropdown");

selectButton.on("click", function () {
  console.log("click");
  dropdown.toggleClass("active");
});
