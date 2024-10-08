import { allowNumberInputOnly } from "./utils/inputs.js";
import { getFirstIfArray, getFromStorage, saveToStorage, toTwoDigit, formatDateCommon, getRandomInRange, formatINR, convertToHoursMinutes, parseDate, getDatesInRange, convertTo12Hour, setInnerHTML } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {

    const CURRENT_MOVIE = getFromStorage("current_movie");
    if (!CURRENT_MOVIE || CURRENT_MOVIE.length == 0) window.location.href = "127.0.0.1:8000";



    // Create a URL object
    let urlObj = new URL(window.location.href);
    // Use URLSearchParams to extract parameters from the query string
    let params = new URLSearchParams(urlObj.search);

    // Create the USER_PREFERENCES object
    let USER_PREFERENCES = {
        showDate: params.get('show_date') || '',
        showTime: params.get('show_time') || '',
        showLanguage: params.get('language') || '',
        showLocation: params.get('location') || '',
        name: params.get('name') || '',
        seatsArr: new Set((params.get('seats') || '').split(','))
    };

    setInnerHTML(document.getElementById("movie_name"), CURRENT_MOVIE.name + ` <span class="badge transparent" id="movie_category">${CURRENT_MOVIE.ratingCategory || "N/A"}</span>`);
    setInnerHTML(document.getElementById("movie_dimension"), CURRENT_MOVIE.dimensional);

    setInnerHTML(document.getElementById("movie_date"), `${formatDateCommon(USER_PREFERENCES.showDate).split(",")[0]}, </span><span class="subtitle">${formatDateCommon(USER_PREFERENCES.showDate).split(",")[1]}</span>`)
    setInnerHTML(document.getElementById("movie_time"), `${convertTo12Hour(USER_PREFERENCES.showTime).split(" ")[0]} </span><span class="subtitle">${convertTo12Hour(USER_PREFERENCES.showTime).split(" ")[1]}</span>`)
    setInnerHTML(document.getElementById("movie_language"), `${USER_PREFERENCES.showLanguage}`)
    setInnerHTML(document.getElementById("movie_location"), `CineForest Cinemas, ${USER_PREFERENCES.showLocation}`)
    setInnerHTML(document.getElementById("user_name"), `${USER_PREFERENCES.name}`)
    console.log(USER_PREFERENCES.showLanguage)


    // TODO: Remove when values are returned from backend
    USER_PREFERENCES.screen = CURRENT_MOVIE.availableScreens[getRandomInRange(0, USER_PREFERENCES.seatsArr.size)];

    setInnerHTML(document.getElementById("movie_screen"), USER_PREFERENCES.screen);
    setInnerHTML(document.getElementById("movie_seats_count"), formatINR(USER_PREFERENCES.seatsArr.size, false) + " Seats:");

    if (USER_PREFERENCES.seatsArr.size > 0) setInnerHTML(document.getElementById("movie_seats"), Array.from(USER_PREFERENCES.seatsArr).join(", "));
    setInnerHTML(document.getElementById("movie_total_price"), formatINR(CURRENT_MOVIE.price * USER_PREFERENCES.seatsArr.size));
    setInnerHTML(document.getElementById("movie_price_calculation"), `(${formatINR(CURRENT_MOVIE.price)} <i class="bi bi-x"></i> ${formatINR(USER_PREFERENCES.seatsArr.size, false)} Seats)</span>`);

    setInnerHTML(document.getElementById("user_name"), USER_PREFERENCES.name);

    // PRINT PAGE
    document.getElementById("download_tickets_btn")?.addEventListener("click", () => {
        window.print();
    })
})