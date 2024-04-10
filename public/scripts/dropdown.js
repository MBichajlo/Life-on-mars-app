var selectYearButton = $(".select-year .select-button");
var dropdownYear = $(".select-year .select-dropdown");
var dropdownInput = $(".select-year .dropdown-input");

var dropdownMonth = $(".select-month .select-dropdown");

var dropdownDays = $(".select-day .select-dropdown");

var dropdownInputs = $(".dropdown-input");
var selectButtons = $(".select-button");

var chosenDate = {
  year: 0,
  month: "",
  day: 0,
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

$(function () {
  populateMonths();
  populateYears();
  populateDays();
  dropdownInputs = $("li");
  dropdownInput = $(".select-year .dropdown-input");
  console.log(dropdownInputs);
});
const highDate = $(".date-select").attr("data-").split("-");
const highestPossibleDate = {
  year: parseInt(highDate[0]),
  month: months[parseInt(highDate[1] - 1)],
  day: parseInt(highDate[2]),
};
selectButtons.on("click", function () {
  // console.log(dropdownInputs);
  console.log(dropdownInput.val());
  $(this).parent().children(".select-dropdown").toggleClass("active");
  $(this).parent().children(".dropdown-input").toggleClass("active");
});

function populateYears() {
  for (i = 2004; i <= highestPossibleDate.year; i++) {
    jQuery("<input/>", {
      id: `year-${i}`,
      class: "dropdown-input",
      name: "year",
      type: "radio",
      value: i,
    })
      .on("change", function () {
        $(this)
          .parents("ul")
          .siblings("button")
          .children("span")
          .text($(this).val());
      })
      .appendTo(dropdownYear);
    jQuery("<label>", {
      for: `year-${i}`,
    })
      .text(i)
      .appendTo(dropdownYear);
    $(`input#year-${i}`).next().addBack().wrapAll("<li>");
  }
}

function populateMonths() {
  for (i = 0; i < 12; i++) {
    jQuery("<input/>", {
      id: `month-${months[i]}`,
      class: "dropdown-input",
      name: "month",
      type: "radio",
      value: months[i],
    })
      .on("change", function () {
        $(this)
          .parents("ul")
          .siblings("button")
          .children("span")
          .text($(this).val());
      })
      .appendTo(dropdownMonth);
    jQuery("<label>", {
      for: `month-${months[i]}`,
    })
      .text(months[i])
      .appendTo(dropdownMonth);
    $(`input#month-${months[i]}`).next().addBack().wrapAll("<li>");
  }
}

function populateDays() {
  for (i = 1; i < 32; i++) {
    jQuery("<input/>", {
      id: `day-${i}`,
      class: "dropdown-input",
      name: "day",
      type: "radio",
      value: i,
    })
      .on("change", function () {
        $(this)
          .parents("ul")
          .siblings("button")
          .children("span")
          .text($(this).val());
      })
      .appendTo(dropdownDays);
    jQuery("<label>", {
      for: `day-${i}`,
    })
      .text(i)
      .appendTo(dropdownDays);
    $(`input#day-${i}`).next().addBack().wrapAll("<li>");
  }
}
