"use strict";

import { createDialog, setAsSlider } from "./utils/components.js";
import {
  UI_CLASS,
  UI_SIZE,
  DATE_WEEK_DAYS,
  DATE_MONTHS_SHORT,
  UI_STATUS_FEEDBACK,
} from "./utils/const.js";
import { refreshInputs } from "./utils/inputs.js";
import { toTwoDigit, setTitleAttr, setMsgIcons, formatDateCommon, getFromStorage, saveToStorage, setInnerHTML, convertTo12Hour, convertToHoursMinutes } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", function () {
  /* ///////////////
        SNACKBAR
    /////////////// */

  let snackbarSec = this.createElement("section");
  snackbarSec.classList.add("snackbar-sec");
  this.body.prepend(snackbarSec);

  /* ///////////////
        Populate UI elements and attributes
    /////////////// */

  // LOGO
  let pictureLogoList = this.querySelectorAll(".logo");

  pictureLogoList?.forEach((logo) => {
    let img = this.createElement("img");

    img.src = `/static/assets/logo/logo.svg`;
    switch (logo.getAttribute("data-size")) {
      default:
      case UI_SIZE.xs:
        img.style.width = "3.2rem";
        break;
      case UI_SIZE.s:
        img.style.width = "4.8rem";
        break;
      case UI_SIZE.m:
        img.style.width = "6.4rem";
        break;
      case UI_SIZE.l:
        img.style.width = "8rem";

        break;
      case UI_SIZE.xl:
        img.style.width = "9.6rem";

        break;
    }
    if (logo.getAttribute("data-name")) {
      let logoName = this.createElement("p");
      logoName.innerHTML = `CineForest`;
      logo.appendChild(logoName);
    }
    logo.appendChild(img);
  });

  // Set Title Attributes for Accessibility
  setTitleAttr();



  /* ///////////////
        CURRENT DATE AND TIME HANDLING
    /////////////// */

  let dateBoxList = this.querySelectorAll(".date");
  let dateDayNumBoxList = this.querySelectorAll(".date-day-num");
  let dateDayWeekBoxList = this.querySelectorAll(".date-day-week");
  let dateMonthBoxList = this.querySelectorAll(".date-month");
  let dateYearBoxList = this.querySelectorAll(".date-year");
  let timeBoxList = this.querySelectorAll(".time");

  setInterval(() => {
    const DATE = new Date();

    dateBoxList?.forEach(elem => {
      elem.innerHTML = formatDateCommon(DATE);
    })

    // Date Day Number
    dateDayNumBoxList?.forEach((elem) => {
      elem.innerHTML = toTwoDigit(DATE.getDate());
    });

    // Month Name
    dateMonthBoxList?.forEach((elem) => {
      elem.innerHTML = DATE_MONTHS_SHORT[DATE.getMonth()];
    });

    // Year
    dateYearBoxList?.forEach((elem) => {
      elem.innerHTML = DATE.getFullYear();
    });

    // Weekday
    dateDayWeekBoxList?.forEach((elem) => {
      elem.innerHTML = DATE_WEEK_DAYS[DATE.getDay()];
    });

    // Current time
    timeBoxList?.forEach((elem) => {
      let hours = DATE.getHours();
      let meridian = hours >= 12 ? "PM" : "AM";
      elem.innerHTML = `${toTwoDigit(hours % 12 || hours)}:${toTwoDigit(
        DATE.getMinutes()
      )} ${meridian}`;
    });
  }, 1000);

});
