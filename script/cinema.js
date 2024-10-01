import { toTwoDigit } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {

    let seatGridLeft = document.querySelector(".seat-grid-left");
    let seatGridCenter = document.querySelector(".seat-grid-center");
    let seatGridRight = document.querySelector(".seat-grid-right");

    `<input type="checkbox" name="seat_grid" id="seat_grid_a1" value="a1"></input>`

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

})