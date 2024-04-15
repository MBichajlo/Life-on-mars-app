var selectYearButton = $(".select-year .select-button");
var dropdownYear = $(".select-year .select-dropdown");
var dropdownInput = $(".select-year .dropdown-input");

var dropdownMonth = $(".select-month .select-dropdown");

var dropdownDays = $(".select-day .select-dropdown");

var dropdownInputs = $(".dropdown-input");
var selectButtons = $(".select-button");

var chosenDate = {
  year: 2004,
  month: 1,
  day: 5,
};

function Month(name, numberOfDays) {
  this.name = name;
  this.numberOfDays = numberOfDays;
}

const months = [
  new Month("January", 31),
  new Month("February", 28),
  new Month("March", 31),
  new Month("April", 30),
  new Month("May", 31),
  new Month("June", 30),
  new Month("July", 31),
  new Month("August", 31),
  new Month("September", 30),
  new Month("October", 31),
  new Month("November", 30),
  new Month("December", 31),
];

$(function () {
  populateMonths();
  populateYears();
  populateDays();
  dropdownInputs = $("li");
  dropdownInput = $(".select-year .dropdown-input");
});

const highDate = $(".date-select").attr("data-").split("-");

const highestPossibleDate = {
  year: parseInt(highDate[0]),
  month: parseInt(highDate[1]),
  day: parseInt(highDate[2]),
};

selectButtons.on("click", function () {
  $(this).parent().children(".select-dropdown").toggleClass("active");
  $(this).parents(".dropdown-menu").toggleClass("active");
  $(this).parent().find("svg").toggleClass("active");
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
      .on("change", changeValue)
      .appendTo(dropdownYear);
    jQuery("<label>", {
      for: `year-${i}`,
    })
      .text(i)
      .appendTo(dropdownYear);
    $(`input#year-${i}`).next().addBack().wrapAll("<li>");
  }
  $(`#year-${chosenDate.year}`).attr("checked", "true");
  $(`#year-${chosenDate.year}`).trigger("change");
}

function populateMonths() {
  dropdownMonth.empty();
  var numberOfMonths = 12;

  $(".select-month button span").text("Month");
  if (chosenDate.year == highestPossibleDate.year) {
    numberOfMonths = highestPossibleDate.month;
  }
  for (i = 1; i < numberOfMonths + 1; i++) {
    jQuery("<input/>", {
      id: `month-${i}`,
      class: "dropdown-input",
      name: "month",
      type: "radio",
      value: i,
      required: "true",
    })
      .on("change", changeValue)
      .appendTo(dropdownMonth);
    jQuery("<label>", {
      for: `month-${i}`,
    })
      .text(months[i - 1].name)
      .appendTo(dropdownMonth);
    $(`input#month-${i}`).next().addBack().wrapAll("<li>");
  }
  if (chosenDate.year != highestPossibleDate.year) {
    // console.log($(`#day-${chosenDate.day}`)[0]);
    console.log($(`#month-${chosenDate.month}`));
    $(`#month-${chosenDate.month}`).attr("checked", "true");
    $(`#month-${chosenDate.month}`).trigger("change");
  }
}

function populateDays() {
  dropdownDays.empty();
  $(".select-day button span").text("Day");
  var monthLength = 31;
  if (chosenDate.month == 2) {
    if (chosenDate.year % 4 == 0) {
      monthLength = 30;
    } else {
      monthLength = 29;
    }
  } else {
    monthLength = months[chosenDate.month - 1].numberOfDays + 1;
  }
  for (i = 1; i < monthLength; i++) {
    var $input = jQuery("<input/>", {
      id: `day-${i}`,
      class: "dropdown-input",
      name: "day",
      type: "radio",
      value: i,
      required: "true",
    }).on("change", changeValue);

    var $label = jQuery("<label>", {
      for: `day-${i}`,
    }).text(i);
    var $li = jQuery("<li>", {
      id: `day-${i}-card`,
    });
    dropdownDays.append($input).append($label);
    $(`input#day-${i}`).next().addBack().wrapAll($li);
  }
  if (chosenDate.day < monthLength - 1) {
    // console.log($(`#day-${chosenDate.day}`)[0]);
    $(`#day-${chosenDate.day}`).attr("checked", "true");
    $(`#day-${chosenDate.day}`).trigger("change");
  }
}

function changeValue() {
  chosenDate[this.name] = $(this).val();
  console.log(this);
  // checkIfDatePossible(this);
  if (this.name === "month") {
    populateDays();
    $(this)
      .parents("ul")
      .siblings("button")
      .children("span")
      .text(months[$(this).val() - 1].name);
  } else if (this.name === "year") {
    populateDays();
    populateMonths();
    $(this)
      .parents("ul")
      .siblings("button")
      .children("span")
      .text($(this).val());
  } else {
    $(this)
      .parents("ul")
      .siblings("button")
      .children("span")
      .text($(this).val());
  }

  $(this).closest(".select-dropdown").removeClass("active");
  $(this).parents(".dropdown-menu").removeClass("active");
}

function checkIfDatePossible(obj) {
  console.log(obj);
  if (obj.name === "month") {
    console.log("Month");
    if (chosenDate.day > months[$(obj).val()].numberOfDays) {
      // populateDays();
      return false;
    }
  }
  if (this.name === "year") {
    if ($(obj).val() == highestPossibleDate.year) {
      // populateMonths();
      return false;
    }
    if (chosenDate.month == 2) {
      // populateDays();
      return false;
    }
  }
}
