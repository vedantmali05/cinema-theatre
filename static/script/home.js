import { getFirstIfArray, getFromStorage, saveToStorage, toTwoDigit, formatDateCommon, getRandomInRange, formatINR, convertToHoursMinutes, parseDate, getDatesInRange, convertTo12Hour, setInnerHTML } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    /* ///////////////
        FETCHING MOVIE LIST FROM BACKEND
    /////////////// */

    let MOVIE_LIST = [];

    function renderMovieBanners() {
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
                <img src="/static/assets/${movie.poster}" alt="${movie.name} movie poster">
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
                        <p class="rating nowrap"><span>${movie.rating}</span>/10 <span class="icon"
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
                            <a href="/preferences?movie_id=${movie.id}">Book Tickets</a>
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

    }


    fetch('/api/movies/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update MOVIE_LIST with the fetched data
            MOVIE_LIST = data;

            // After fetching, render the banners
            renderMovieBanners();
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
})