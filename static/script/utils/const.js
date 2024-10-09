/* ///////////////
    CONSTANTS DEFINITIONS
/////////////// */

export const STATUS_HTTP_RESPONSE = {
    // Informational Responses (1xx)
    continue: 100,
    protocolSwitch: 101,
    processing: 102,
    // Successful Responses (2xx)
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204,
    resetContent: 205,
    partialContent: 206,
    // Redirection Messages (3xx)
    multipleChoices: 300,
    movedPermanently: 301,
    found: 302,
    seeOther: 303,
    notModified: 304,
    temporaryRedirect: 307,
    permanentRedirect: 308, // Though not recommended, included for completeness
    // Client Error Responses (4xx)
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    requestTimeout: 408,
    conflict: 409,
    gone: 410,
    lengthRequired: 411,
    preconditionFailed: 412,
    payloadTooLarge: 413,
    uriTooLong: 414,
    unsupportedMediaType: 415,
    rangeNotSatisfiable: 416,
    expectationFailed: 417,
    // Server Error Responses (5xx)
    internalServerError: 500,
    badGateway: 502,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
    httpVersionNotSupported: 505,
}

// Input Status
export const UI_STATUS_FEEDBACK = {
    error: "error",
    warn: "warn",
    info: "info",
    success: "success"
}

// User THEME
export const UI_THEME = {
    white: "white",
    black: "black",
    primary: "primary",
    accent: "accent"
}

// HTML UIs Classes
export const UI_CLASS = {
    fieldset: "fieldset",
    iconFrame: "icon-frame",
    success: "success",
    info: "info",
    error: "error",
    warn: "warn"
}

// HTML UI Size
export const UI_SIZE = {
    xs: "extra-small",
    s: "small",
    m: "medium",
    l: "large",
    xl: "extra-large",
}

// Loader types
export const UI_LOADER = {
    spinner: "spinner",
    progressBar: "progress-bar",
    skeleton: "skeleton"
}

// MAP Regions
export const UI_REGIONS = {
    northWest: "northWest",
    north: "north",
    northEast: "northEast",
    east: "east",
    southEast: "southEast",
    south: "south",
    southWest: "southWest",
    west: "west",
    center: "center"
};

/* ///////////////
    OTHER DATA
/////////////// */

// DATE AND TIME
export const DATE_WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const DATE_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const DATE_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


/* ///////////////
    CINEMA DATA
/////////////// */

// export const MOVIE_LIST = [
//     {
//         id: "8776",
//         poster: "joker-folie-à-deux.webp",
//         directors: ["Todd Phillips"],
//         name: "Joker: Folie à Deux",
//         cast: ["Joaquin Phoenix", "Zazie Beetz", "Lady Gaga"],
//         rating: 6.1,
//         ratingCategory: "R",
//         genre: ["Psychological Thriller", "Musical", "Crime", "Drama"],
//         description: "Arthur Fleck is institutionalized at Arkham, awaiting trial for his crimes as Joker. While struggling with his dual identity, Arthur not only stumbles upon true love, but also finds the music that's always been inside him.",
//         availableFrom: "04/10/2024",
//         availableTo: "01/11/2024",
//         timings: ["12:00", "15:30", "18:00", "22:00"],
//         availableLocations: ["Amravati", "Nagpur", "Ulhasnagar, Mumbai", "Pune"],
//         availableScreens: ["1", "2", "1", "3"],
//         releaseDate: "02/10/2024",
//         duration: "02:18",
//         language: ["English", "Hindi"],
//         trailer: "https://youtube.com/watch?v=_OKAwz2MsJs",
//         price: 215,
//         dimensional: "2D",
//     },
//     {
//         id: "1234",
//         poster: "dharmaveer-2.jpg",
//         directors: ["Pravin Tarde"],
//         name: "Dharmaveer 2",
//         cast: ["Sunil Barve", "Rajesh Bhosle", "Kshitish Date"],
//         rating: 7.6,
//         ratingCategory: "",
//         genre: ["Documentary"],
//         description: "Explores Anand Dighe's life, tracing his political journey and capturing the essence of his impactful legacy as a prominent figure.",
//         availableFrom: "27/09/2024",
//         availableTo: "01/11/2024",
//         timings: ["12:00", "15:30", "18:00", "22:00"],
//         availableLocations: ["Amravati", "Nagpur", "Ulhasnagar, Mumbai", "Pune"],
//         availableScreens: ["1", "2", "1", "3"],
//         releaseDate: "27/09/2024",
//         duration: "02:10",
//         language: ["Marathi"],
//         trailer: "https://youtube.com/watch?v=_OKAwz2MsJs",
//         price: 215,
//         dimensional: "2D",
//     },
//     {
//         id: "9088",
//         poster: "tumbbad.webp",
//         directors: ["Rahi Anil Barve", "Anand Gandhi", "Adesh Prasad"],
//         name: "Tumbbad",
//         cast: ["Sohum Shah", "Jyoti Malshe", "Anita Date-Kelkar"],
//         rating: 8.2,
//         ratingCategory: "A",
//         genre: ["Horror", "Historical Drama", "Fantasy", "Mystery"],
//         description: "A mythological story about a goddess who created the entire universe. The plot revolves around the consequences when humans build a temple for her first-born.",
//         availableFrom: "04/10/2024",
//         availableTo: "01/11/2024",
//         timings: ["12:00", "15:30", "18:00", "22:00"],
//         availableLocations: ["Amravati", "Nagpur", "Ulhasnagar, Mumbai", "Pune"],
//         availableScreens: ["1", "2", "1", "3"],
//         releaseDate: "02/10/2018",
//         duration: "01:44",
//         language: ["Marathi"],
//         trailer: "https://youtube.com/watch?v=_OKAwz2MsJs",
//         price: 215,
//         dimensional: "2D",
//     },
//     {
//         id: "2092",
//         poster: "transformer-one.jpg",
//         directors: ["Josh Cooley"],
//         name: "Transformers One",
//         cast: ["Chris Hemsworth", "Brian Tyree Henry", "Scarlett Johansson"],
//         rating: 7.8,
//         ratingCategory: "PG",
//         genre: ["Animation", "Sci-fi", "Action", "Adventure"],
//         description: "The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but who once were friends bonded like brothers who changed the fate of Cybertron forever.",
//         availableFrom: "04/10/2024",
//         availableTo: "01/11/2024",
//         timings: ["12:00", "15:30", "18:00", "22:00"],
//         availableLocations: ["Amravati", "Nagpur", "Ulhasnagar, Mumbai", "Pune"],
//         availableScreens: ["1", "2", "1", "3"],
//         releaseDate: "20/09/2024",
//         duration: "01:44",
//         language: ["English"],
//         trailer: "https://youtube.com/watch?v=_OKAwz2MsJs",
//         price: 215,
//         dimensional: "3D",
//     },
// ]