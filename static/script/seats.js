import { getFirstIfArray, getFromStorage, saveToStorage, toTwoDigit, formatDateCommon, getRandomInRange, formatINR, convertToHoursMinutes, parseDate, getDatesInRange, convertTo12Hour, setInnerHTML } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {

    const CURRENT_MOVIE = getFromStorage("current_movie");
    if (!CURRENT_MOVIE || CURRENT_MOVIE.length == 0) window.location.href = "127.0.0.1:8000";
    if (document.getElementById("movie_poster")) document.getElementById("movie_poster").src = "/static/assets/" + CURRENT_MOVIE.poster;
    setInnerHTML(document.getElementById("movie_name"), CURRENT_MOVIE.name + ` <span class="badge transparent" id="movie_category">${CURRENT_MOVIE.ratingCategory || "N/A"}</span>`);
    setInnerHTML(document.getElementById("movie_duration"), convertToHoursMinutes(CURRENT_MOVIE.duration));
    setInnerHTML(document.getElementById("movie_dimension"), CURRENT_MOVIE.dimensional);


    // Create a URL object
    let urlObj = new URL(window.location.href);
    // Use URLSearchParams to extract parameters from the query string
    let params = new URLSearchParams(urlObj.search);

    // Create the USER_PREFERENCES object
    let USER_PREFERENCES = {
        showDate: params.get('show_date') || '',
        showTime: params.get('show_time') || '',
        showLanguage: params.get('show_language') || '',
        showLocation: params.get('show_location') || ''
    };

    setInnerHTML(document.getElementById("movie_date"), `${formatDateCommon(USER_PREFERENCES.showDate).split(",")[0]}, </span><span class="subtitle">${formatDateCommon(USER_PREFERENCES.showDate).split(",")[1]}</span>`)
    setInnerHTML(document.getElementById("movie_time"), `${convertTo12Hour(USER_PREFERENCES.showTime).split(" ")[0]} </span><span class="subtitle">${convertTo12Hour(USER_PREFERENCES.showTime).split(" ")[1]}</span>`)
    setInnerHTML(document.getElementById("movie_language"), `${USER_PREFERENCES.showLanguage}`)
    setInnerHTML(document.getElementById("movie_location"), `CineForest Cinemas, ${USER_PREFERENCES.showLocation}`)


    /* ///////////////
        SEATS PAGE
    /////////////// */


    let seatGridLeft = document.querySelector(".seat-grid-left");
    let seatGridCenter = document.querySelector(".seat-grid-center");
    let seatGridRight = document.querySelector(".seat-grid-right");


    if (seatGridLeft && seatGridCenter && seatGridRight) {
        for (let i = 65; i <= 81; i++) {
            for (let j = 1; j <= 18; j++) {
                let seat = document.createElement("label");
                let idStr = String.fromCharCode(i) + toTwoDigit(j);
                seat.setAttribute("for", "seat_grid_" + idStr)
                seat.innerHTML = `<input type="checkbox" name="seat_grid" id="seat_grid_${idStr}" value="${idStr}" ${false ? "disabled='true'" : ""}></input> ${idStr}`
                if (j >= 1 && j <= 3) seatGridLeft.append(seat);
                if (j >= 4 && j <= 15) seatGridCenter.append(seat);
                if (j >= 16 && j <= 18) seatGridRight.append(seat);
            }
        }
    }

    let seatsList = document.querySelectorAll("[name='seat_grid']");
    let seatCountElemList = document.querySelectorAll(".seats-count");
    let seatSubmitBtnsList = document.querySelectorAll(".seat-submit-btn");
    let seatForm = document.querySelector(".seats-sec");


    let seatCounter = 0;

    seatsList.forEach((seat, i) => {
        if (occupiedSeats && occupiedSeats.length > 0) {

            occupiedSeats.forEach(occupied => {
                if (seat.value == occupied) seat.disabled = true;
            })
        }

        seat.addEventListener("change", () => {
            if (seat.checked) seatCounter++;
            else seatCounter--;
            seatCountElemList.forEach(elem => elem.innerHTML = seatCounter);
            seatSubmitBtnsList.forEach(btn => btn.disabled = seatCounter < 1 ? true : false)
        })
    })


    seatSubmitBtnsList.forEach(btn => {
        btn.addEventListener("click", () => {
            // TODO: Remove when values are returned from backend
            if (seatCounter > 0) {
                seatForm.submit();
            }
            else btn.disabled = true;
        });
    });


    document.getElementById("download_tickets_btn")?.addEventListener("click", () => {
        console.log(window.print());
    })

})