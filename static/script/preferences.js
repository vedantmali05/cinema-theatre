import { getFirstIfArray, getFromStorage, saveToStorage, toTwoDigit, formatDateCommon, getRandomInRange, formatINR, convertToHoursMinutes, parseDate, getDatesInRange, convertTo12Hour, setInnerHTML } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {

    const CURRENT_MOVIE = getFromStorage("current_movie");
  if (!CURRENT_MOVIE || CURRENT_MOVIE.length == 0) window.location.href = "127.0.0.1:8000";
  if (document.getElementById("movie_poster")) document.getElementById("movie_poster").src = "/static/assets/" + CURRENT_MOVIE.poster;
  setInnerHTML(document.getElementById("movie_name"), CURRENT_MOVIE.name + ` <span class="badge transparent" id="movie_category">${CURRENT_MOVIE.ratingCategory || "N/A"}</span>`);
  setInnerHTML(document.getElementById("movie_duration"), convertToHoursMinutes(CURRENT_MOVIE.duration));
  setInnerHTML(document.getElementById("movie_dimension"), CURRENT_MOVIE.dimensional);


    /* ///////////////
        PREFERENCES PAGE
    /////////////// */
    const preferencesForm = document.getElementById("preferences_form");

    if (preferencesForm) {
        let showDatesCtr = document.querySelector(".show-dates")
        let startDate = new Date(CURRENT_MOVIE.availableFrom);
        if (startDate < new Date()) startDate = new Date();
        const dates = getDatesInRange(startDate, CURRENT_MOVIE.availableTo);

        // Loop through the dates and dynamically create the radio buttons
        dates.forEach((date, i) => {
            const label = document.createElement("label");
            label.setAttribute("for", `show_date_${i + 1}`);

            let valueDate = new Date(date);
            let day = String(valueDate.getDate()).padStart(2, '0');
            let month = String(valueDate.getMonth() + 1).padStart(2, '0');
            let year = valueDate.getFullYear();

            label.innerHTML = `
                <input type="radio" name="show_date" id="show_date_${i + 1}" required value="${`${day}/${month}/${year}`}">
                <span>${date.split(",")[0]},<span class="year">${date.split(",")[1]}</span></span>
                `
            showDatesCtr.appendChild(label);
        });

        let showTimesCtr = document.querySelector(".show-times")
        // Loop through the dates and dynamically create the radio buttons
        CURRENT_MOVIE.timings.forEach((time, i) => {
            const label = document.createElement("label");
            label.setAttribute("for", `show_time_${i + 1}`);

            label.innerHTML = `
                <input type="radio" name="show_time" id="show_time_${i + 1}" required value="${time}">
                <span>${convertTo12Hour(time).split(" ")[0]} <span class="year">${convertTo12Hour(time).split(" ")[1]}</span></span>
                `
            showTimesCtr.appendChild(label);
        });

        let showLangaugesCtr = document.querySelector(".show-languages");
        let showLocationCtr = document.querySelector(".show-locations");

        CURRENT_MOVIE.language.forEach((elem, i) => {
            const label = document.createElement("label");
            label.setAttribute("for", `show_language_${i + 1}`);
            label.innerHTML = `<input type="radio" name="show_language" id="show_language_${i + 1}" value="${elem}" required>${elem}`
            showLangaugesCtr.appendChild(label);
        })

        let sortedLocationArray = CURRENT_MOVIE.availableLocations.sort((a, b) => a.localeCompare(b));

        sortedLocationArray.forEach((elem, i) => {
            const label = document.createElement("label");
            label.setAttribute("for", `show_location_${i + 1}`);
            label.innerHTML = `<input type="radio" name="show_location" id="show_location_${i + 1}" value="${elem}" required>${elem}`
            showLocationCtr.appendChild(label);
        })

    }
})