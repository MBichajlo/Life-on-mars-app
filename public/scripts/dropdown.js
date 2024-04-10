var selectYearButton = $(".select-year .select-button");
var dropdownYear = $(".select-year .select-dropdown");
var dropdownInput = $(".select-year .dropdown-input");

var dropdownMonth = $(".select-month .select-dropdown");

var dropdownDays = $(".select-day .select-dropdown");

var dropdownInputs = $(".dropdown-input");
var selectButtons = $(".select-button");

var passingData = $(".actual-data");

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
}

function populateMonths() {
  dropdownMonth.empty();
  if (chosenDate.year == highestPossibleDate.year) {
    for (i = 0; i < highestPossibleDate.month; i++) {
      jQuery("<input/>", {
        id: `month-${months[i]}`,
        class: "dropdown-input",
        name: "month",
        type: "radio",
        value: i + 1,
      })
        .on("change", changeValue)
        .appendTo(dropdownMonth);
      jQuery("<label>", {
        for: `month-${months[i]}`,
      })
        .text(months[i])
        .appendTo(dropdownMonth);
      $(`input#month-${months[i]}`).next().addBack().wrapAll("<li>");
    }
  } else {
    for (i = 0; i < 12; i++) {
      jQuery("<input/>", {
        id: `month-${months[i]}`,
        class: "dropdown-input",
        name: "month",
        type: "radio",
        value: i + 1,
      })
        .on("change", changeValue)
        .appendTo(dropdownMonth);
      jQuery("<label>", {
        for: `month-${months[i]}`,
      })
        .text(months[i])
        .appendTo(dropdownMonth);
      $(`input#month-${months[i]}`).next().addBack().wrapAll("<li>");
    }
  }
}

function populateDays() {
  dropdownDays.empty();
  var monthLength = 31;
  if (chosenDate.month == 2) {
    if (chosenDate.year % 4 == 0) {
      monthLength = 30;
    } else {
      monthLength = 29;
    }
  } else {
    if (
      (chosenDate.month <= 7 && chosenDate.month % 2 != 0) ||
      (chosenDate.month > 7 && chosenDate.month % 2 === 0)
    ) {
      monthLength = 32;
    } else {
      monthLength = 31;
    }
  }
  for (i = 1; i < monthLength; i++) {
    jQuery("<input/>", {
      id: `day-${i}`,
      class: "dropdown-input",
      name: "day",
      type: "radio",
      value: i,
    })
      .on("change", changeValue)
      .appendTo(dropdownDays);
    jQuery("<label>", {
      for: `day-${i}`,
    })
      .text(i)
      .appendTo(dropdownDays);
    $(`input#day-${i}`).next().addBack().wrapAll("<li>");
  }
}

function changeValue() {
  if (this.name === "month") {
    $(this)
      .parents("ul")
      .siblings("button")
      .children("span")
      .text(months[$(this).val() - 1]);
  } else {
    $(this)
      .parents("ul")
      .siblings("button")
      .children("span")
      .text($(this).val());
  }

  $(this).closest(".select-dropdown").toggleClass("active");
  $(this).parents(".dropdown-menu").toggleClass("active");
  chosenDate[this.name] = $(this).val();
  passingData.val(JSON.stringify(chosenDate));
  populateMonths();
  populateDays();
}
