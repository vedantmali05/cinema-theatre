import { DATE_MONTHS_SHORT } from "./const.js";

/* ///////////////
    MISCELLANEOUS HELPER UTILITY FUNCTION
/////////////// */


// Convert single digit number to 2 digit
export function toTwoDigit(num) {
  return ("0" + num).slice(-2);
}

// Generate random integer between given number
// FISHER YATES SHUFFLE
export function getRandomInRange(min, max) {
  // Create an array [start,......,end]
  const allNumbers = [];
  for (let i = min; i <= max; i++) {
    allNumbers.push(i);
  }
  // Fisher-Yates Array shuffle
  let i = allNumbers.length;
  while (i !== 0) {
    let randomIndex = Math.floor(Math.random() * i);
    i--;
    // Swap current element with random index
    [allNumbers[i], allNumbers[randomIndex]] = [
      allNumbers[randomIndex],
      allNumbers[i],
    ];
  }

  // Return Random Array element
  return allNumbers[Math.floor(Math.random() * allNumbers.length)];
}

// If given ELEMENT is an ARRAY, return the first element.
export function getFirstIfArray(elems) {
  if (Array.isArray(elems) || elems instanceof NodeList) return elems[0];
  else return elems;
}

// POP and RETURN ELEMENT based on Index from Array
export function popFromArray(array, value) {
  const index = array.indexOf(value);
  if (index > -1) array.splice(index, 1);
  return array;
}

/* ///////////////
    FUNCTIONS for DOM TRAVERSAL
/////////////// */

// FUNCTION to TRAVERSE and RETURN the PARENT with given class
export function getParentElement(element, targetParent) {
  element = getFirstIfArray(element);
  let parent = element.parentNode;

  while (parent && parent.tagName !== "BODY") {
    if (parent.tagName.toUpperCase() === targetParent.toUpperCase()) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null; // No parent found with the target class
}

// FUNCTION to Set Title Attribute
export function setTitleAttr() {
  let textElementsArr = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, th, td"
  );

  textElementsArr.forEach((elem) => {
    elem.setAttribute("title", elem.innerText);
  });
}

// Set Icons to Respective Messages - Notes, Snackbars and Input Messages
export function setMsgIcons(elem, iconName) {
  if (elem.querySelector(".bi")) return;
  if (!elem) return;
  let icon = document.createElement("i");
  icon.classList.add("bi", "bi-" + iconName)
  elem.prepend(icon);
}

/* ///////////////
DATA STORAGE FUNCTIONS
/////////////// */

// FUNCTION to SAVE data to storage throughout the project
export function saveToStorage(key, data) {
  try {
    if (!key || typeof key !== "string") {
      throw new Error("Invalid key: Key must be a non-empty string.");
    }
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);

  } catch (error) {
    return null;
  }
}

// FUNCTION to READ data to storage throughout the project
export function getFromStorage(key) {
  try {
    if (!key || typeof key !== "string") {
      throw new Error("Invalid key: Key must be a non-empty string.");
    }

    // Retrieve data
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      throw new Error("Key not found");
    }

    // Parse retrieved data
    const parsedData = JSON.parse(storedData);

    return parsedData;

  } catch (error) {
    return null;
  }
}

/* ///////////////
  DATE, TIME and CURRENCY FORMMATING
/////////////// */

export function formatDateCommon(dateStr) {
  dateStr = parseDate(dateStr);
  const DATE = new Date(dateStr);
  return `${toTwoDigit(DATE.getDate())} ${DATE_MONTHS_SHORT[DATE.getMonth()]}, ${DATE.getFullYear()}`;
}

// GET 2 DATES ADDITION
export function addDates(date1, date2) {
  const date1MS = new Date(date1).getTime();
  const date2MS = new Date(date2).getTime();
  const days = Math.floor((date2MS + date1MS) / (1000 * 60 * 60 * 24));
  return days;
}

// GET NUMBER OF DAYS BETWEEN 2 DATES
export function subtractDates(date1, date2) {
  const date1MS = new Date(date1).getTime();
  const date2MS = new Date(date2).getTime();
  let daysDiff = Math.floor((date2MS - date1MS) / (1000 * 60 * 60 * 24));
  return ++daysDiff;
}

export function formatINR(num, isCurrency = true) {
  // Convert to String and Split the Integer and Decimal Part
  num = num.toString();
  let [integerPart, decimalPart] = num.split('.');
  // Format the Integer part
  integerPart = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  // Join the Integer + Decimal part if it exists
  num = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  return isCurrency ? "₹" + num : num;
}


/* ///////////////
  GET REGION OF THE ELEMENT
/////////////// */
export function setLocationByRegion(elem, popupElem) {
  // Viewport's height and width
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Get X and Y position of the Center of the Element
  let { top, left, width, height } = elem.getBoundingClientRect();
  let popupHeight = popupElem.getBoundingClientRect().height;
  let popupWidth = popupElem.getBoundingClientRect().width;

  let centerX = left + width / 2;
  let centerY = top + height / 2;

  // Default - dropdown below and aligned left
  let posTop = top + height + 4;
  let posLeft = left;

  if (centerX < viewportWidth / 4 && centerY < viewportHeight / 4) {
    // north west
  } else if (centerX > 3 * viewportWidth / 4 && centerY < viewportHeight / 4) {
    // north east
    posLeft = left + width - popupWidth; // Align to the right
  } else if (centerX < viewportWidth / 4 && centerY > 3 * viewportHeight / 4) {
    // south west
    posTop = top - popupHeight - 4; // Show above the button
  } else if (centerX > 3 * viewportWidth / 4 && centerY > 3 * viewportHeight / 4) {
    // south east
    posTop = top - popupHeight - 4; // Show above the button
    posLeft = left + width - popupWidth; // Align to the right
  } else if (centerX < viewportWidth / 4) {
    // west
  } else if (centerX > 3 * viewportWidth / 4) {
    // east
    posLeft = left + width - popupWidth; // Align to the right
  } else if (centerY > 3 * viewportHeight / 4) {
    // south
    posTop = top - popupHeight - 4; // Show above the button
  }

  return [posTop, posLeft];
}



export function convertToHoursMinutes(timeString) {
  const [hours, minutes] = timeString.split(":");
  return `${hours} hrs ${minutes} mins`;
}

export function parseDate(dateStr) {
  // Check if the date string is in the format "Fri Sep 27 2024 05:30:00 GMT+0530 (India Standard Time)"
  if (isNaN(Date.parse(dateStr)) === false) {
    // If it's a valid Date object string, return as is (already parsed)
    return new Date(dateStr);
  }

  // If it's in "dd/mm/yyyy" format, parse it
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // Month is 0-indexed
}


export function getDatesInRange(startDate, endDate) {
  let date = new Date(startDate);
  let end = new Date(endDate);
  let datesArr = [];

  // Loop through each day from startDate to endDate
  while (date <= end) {
    datesArr.push(formatDateCommon(date));
    date.setDate(date.getDate() + 1);
  }
  return datesArr;
}

export function convertTo12Hour(timeStr) {
  let [hours, minutes] = timeStr.split(":").map(Number);
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

// SET INNERHTML IF ELEMENT EXISTS
export function setInnerHTML(elem, content) {
  if (elem) elem.innerHTML = content;
}