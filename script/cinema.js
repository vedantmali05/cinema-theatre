import { getFirstIfArray, getFromStorage, saveToStorage, toTwoDigit, formatDateCommon } from "./utils/utils.js";
import { MOVIE_LIST } from "./utils/const.js";


function convertToHoursMinutes(timeString) {
    const [hours, minutes] = timeString.split(":");
    return `${hours} hrs ${minutes} mins`;
}
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed
}

function getDatesInRange(startDate, endDate) {
    let date = parseDate(startDate);
    let end = parseDate(endDate);
    let datesArr = [];

    // Loop through each day from startDate to endDate
    while (date <= end) {
        datesArr.push(formatDateCommon(date)); // Add date to array
        date.setDate(date.getDate() + 1); // Increment date by 1 day
    }
    return datesArr;
}

function convertTo12Hour(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

document.addEventListener("DOMContentLoaded", () => {

    /* ///////////////
        HOME PAGE
    /////////////// */
    let bannersBox = document.getElementById("movie_banners_box");

    if (bannersBox) {
        saveToStorage("current_movie", []);
        MOVIE_LIST.forEach((movie) => {

            const banner = document.createElement('div');
            banner.classList.add('swiper-slide');

            // Create cinema banner structure
            banner.innerHTML = `
        <div class="cinema-banner">
            <!-- Movie Poster -->
            <picture class="poster">
                <img src="db/posters/${movie.poster}" alt="${movie.name} movie poster">
            </picture>

            <!-- Contents STARTS -->
            <section class="banner-contents">
                <!-- Column Left -->
                <section class="col-left">
                    <div>
                        <p class="subtitle desk-only">${movie.directors.join(", ")}'s</p>
                        <p class="fs-600">${movie.name}</p>
                        <p class="subtitle desk-only">
                           ${movie.cast.join(' <span class="icon"><i class="bi bi-dot"></i></span> ')}
                        </p>
                    </div>

                    <div class="divider desk-only"></div>
                    <p class="subtitle">
                        <span>${movie.ratingCategory || 'NR'}</span>
                        <span class="icon"><i class="bi bi-dot"></i></span>
                        <span>${movie.genre.join(', ')}</span>
                    </p>
                    <p class="subtitle desk-only description">${movie.description.slice(0, 175)}...</p>
                    <div class="divider desk-only"></div>
                    <div>
                        <strong class="badge transparent mobile-only">In Cinemas Now</strong>
                        <strong class="badge desk-only">In Cinemas Now</strong>
                        <strong class="badge transparent desk-only">${movie.releaseDate}</strong>
                        <strong class="badge transparent desk-only">${convertToHoursMinutes(movie.duration)}</strong>
                        <strong class="badge transparent">${movie.language.join(', ')}</strong>
                    </div>
                </section>

                <!-- Column Right -->
                <section class="col-right">
                    <div>
                        <p class="rating nowrap"><span>${movie.rating.toFixed(1)}</span>/10 <span class="icon"
                                style="margin-left: .4rem;"><i class="bi bi-star-fill"></i></span></p>
                    </div>
                    <div class="btn-box">
                        <button class="text">
                            <a href="${movie.trailer}" target="_blank">
                                <span class="icon"><i class="bi bi-youtube"></i></span>
                                Trailer
                            </a>
                        </button>
                        <button class="primary book-ticket-btn" data-movie-id="${movie.id}">
                            Book Tickets
                        </button>
                    </div>
                </section>
            </section>
            <!-- Contents ENDS -->
        </div>
    `;

            // Append the banner to the container
            bannersBox.appendChild(banner);
        });

        document.querySelectorAll(".book-ticket-btn").forEach(btn => {
            btn.addEventListener("click", () => {

                let currentMovie = MOVIE_LIST.find(movie => movie.id == btn.getAttribute("data-movie-id"));
                // console.log(currentMovie);
                // Save to Storage
                saveToStorage("current_movie", currentMovie);
                window.location.href = "preferences.html";
            })
        })
    }


    const CURRENT_MOVIE = getFromStorage("current_movie");

    if (CURRENT_MOVIE && CURRENT_MOVIE.length != 0) {
        document.getElementById("movie_poster").src = "./db/posters/" + CURRENT_MOVIE.poster;
        document.getElementById("movie_name").innerHTML = CURRENT_MOVIE.name + ` <span class="badge transparent" id="movie_category">${CURRENT_MOVIE.ratingCategory}</span>`;
        document.getElementById("movie_duration").innerHTML = convertToHoursMinutes(CURRENT_MOVIE.duration);
        document.getElementById("movie_dimension").innerHTML = CURRENT_MOVIE.dimensional;

        /* ///////////////
            PREFERENCES PAGE
        /////////////// */
        const preferencesForm = document.getElementById("preferences_form");

        if (preferencesForm) {
            let showDatesCtr = document.querySelector(".show-dates")
            const dates = getDatesInRange(CURRENT_MOVIE.availableFrom, CURRENT_MOVIE.availableTo);

            // Loop through the dates and dynamically create the radio buttons
            dates.forEach((date, i) => {
                const label = document.createElement("label");
                label.setAttribute("for", `show_date_${i + 1}`);

                label.innerHTML = `
                <input type="radio" name="show_date" id="show_date_${i + 1}" required>
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
                <input type="radio" name="show_time" id="show_time_${i + 1}" required>
                <span>${convertTo12Hour(time).split(" ")[0]} <span class="year">${convertTo12Hour(time).split(" ")[1]}</span></span>
                `
                showTimesCtr.appendChild(label);
            });

            let showLangaugesCtr = document.querySelector(".show-languages");
            let showLocationCtr = document.querySelector(".show-locations");

            CURRENT_MOVIE.language.forEach((elem, i) => {
                const label = document.createElement("label");
                label.setAttribute("for", `show_language_${i + 1}`);
                label.innerHTML = `<input type="radio" name="show_language" id="show_language_${i + 1}" required>${elem}`
                showLangaugesCtr.appendChild(label);
            })

            CURRENT_MOVIE.availableLocations.forEach((elem, i) => {
                const label = document.createElement("label");
                label.setAttribute("for", `show_location_${i + 1}`);
                label.innerHTML = `<input type="radio" name="show_location" id="show_location_${i + 1}" required>${elem}`
                showLocationCtr.appendChild(label);
            })

        }

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
    } else {

    }


})