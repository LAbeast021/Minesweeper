// /////////////// CONSTANT///////////////////////
const numbers = {
    1: "green",
    2: "yellowgreen",
    3: "yellow",
    4: "orange",
    5: "red",
    6: "purple",
    7: "pink",
    8: "olivegreen"
};
// /////////////// VAR /////////////////////////////////////////////////////////////////////////////////
let column, row, bombPercentage, board, randomBombs, divVal, divId, flags, gameClick;
var bombs = [];
flags = [];
gameClick = true;
// ///////////// CACHED ////////////////////////////////////////////////////////////////////////////////
let container = document.querySelector(".container");
// //////////// EVENT LISTENER //////////////////////////////////////////////////////////////////////////

$(".size").on("click", "button", function () {
    column = parseInt(this.value)
    column === 40 ? row = 25 : row = column
});

$(".difficulty").on("click", "button", function () {
    bombPercentage = this.value * (column * row);
    board = new Array((column * row)).fill(0);
    for (i = 0; i <= bombPercentage - 1; i++) {
        randomBombs = Math.floor(Math.random() * (column * row))
        bombs.push(randomBombs);
        board.splice(bombs[i], 1, 1);
    };

    $(".start").css({"visibility":"visible"});
});

$(".start").on("click", function () {
    $(".background").css("display", "none")
    this.style.display = "none";
    $("body").css("background-image", "url(images/sky.jpg")
    render();
});
$(".restart").click(function(){
    location.reload(true);
});

$(".container").on("click", "div", clickHandler)
////// RIGHT CLICK FOR FLAGS //////////////////////

$('.container ').on("contextmenu", function (evt) {
    if (gameClick === true) {
        evt.preventDefault();
        flags.includes(evt.target.id) ? flags = flags.filter(item => item !== evt.target.id) : flags.push(evt.target.id);
        if (evt.target.textContent === "") $(evt.target).toggleClass("rightclick");
    }
})
// ////////////// FUNCTIONS //////////////////////////////////////////////////////////////////////////////
function clickHandler() {
    if (this.textContent === "" && gameClick) {
        if (this.value && !this.classList.contains("rightclick")) {
            divId = parseInt(this.id);
            divVal = this.value;
            console.log(` id = ${divId} and value = ${divVal} and name ${this.name}`);
            borderGuard(divId);
        }
        else if (this.classList.contains("rightclick")) {
            return;
        }
        else {

            for (i = 0; i < (column * row); i++) {
                if (bombs.includes(i)) {
                    if (document.getElementById(i).classList.contains("rightclick")) {
                        document.getElementById(i).style.backgroundImage = "url(images/al_flag.png)"
                    }
                    else {
                        document.getElementById(i).classList.add("bomb");
                        $(".lose").css({"display":"flex","flex-direction":"column","align-items":"center",})
                    }
                    gameClick = false;
                }
            }
        };
        win();
        num = parseInt(this.textContent);
        colorChanger();
    }
}


function borderGuard(divId) {
    let div = document.getElementById(divId);
        if (divId === 0 && div.value) {
            div.name = "ltc";
            div.textContent = board[divId + 1] + board[divId + column] + (board[divId + column + 1])
        }
        else if (divId + 1 === column && div.value) {
            div.name = "rtc"
            div.textContent = board[divId - 1] + board[divId + column] + board[divId + (column - 1)]
                ;
        }
        else if (divId + 1 === column * row && div.value) {
            div.name = "rbc"
            div.textContent = board[divId - 1] + board[divId - column] + board[divId - (column + 1)]
                ;
        }
        else if (divId + 1 === (column * row) - column + 1 && div.value) {
            div.name = "lbc"
            div.textContent = board[divId + 1] + board[divId - column] + board[divId - (column - 1)]
                ;
        }

        else if ((divId + 1) / column === Math.floor((divId + 2) / column) && div.value) {
            div.name = "rw"
            div.textContent = board[divId - 1] + board[divId + column] + board[divId - column] + board[divId + column - 1] + board[divId - column - 1]
        }
        else if (divId % column === 0 && div.value) {
            div.name = "lw"
            div.textContent = board[divId + 1] + board[divId + column] + board[divId - column] + board[divId + column + 1] + board[divId - column + 1]
        }
        else if ((divId + column) < (column * row) && (divId - column) > 0 && div.value) {
            div.textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
        }
        else if ((divId + column) < (column * row) && div.value) {
            div.textContent = (board[divId + 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1]);
        }
        else if ((divId - column) >= 0 && div.value) {
            div.textContent = (board[divId + 1]) + (board[divId - 1]) + (board[divId - column - 1]) + (board[divId - column]) + (board[divId - column + 1]);
        };
        if (div.textContent == 0 && div.value && div.name == "") {
            if ((divId + column) < (column * row) && (divId - column) > 0) {
                div.value = false;
                borderGuard(divId + column);
                div.value = false;
                borderGuard(divId-(column+1));
                div.value = false;
                borderGuard(divId-(column-1));
                div.value = false;
                borderGuard(divId+(column-1));
                div.value = false;
                borderGuard(divId+(column+1));
                div.value = false;
                borderGuard(divId - column);
                div.value = false;
                borderGuard(divId + 1);
                div.value = false;
                borderGuard(divId - 1);
            }
            else if ((divId + column) < (column * row)) {
                div.value = false;
                borderGuard(divId + 1);
                div.value = false;
                borderGuard(divId - 1);
                div.value = false;
                borderGuard(divId+(column-1));
                div.value = false;
                borderGuard(divId+(column+1));
            }
            else if ((divId - column) > 0) {
                div.value = false;
                borderGuard(divId + 1);
                div.value = false;
                borderGuard(divId - 1);
                div.value = false;
                borderGuard(divId-(column+1));
                div.value = false;
                borderGuard(divId-(column-1));

            }
        }
        else if (div.textContent == 0 && div.value && div.name !== "") {
            return;
        }
    
};

function render() {
    $(".size, .difficulty").css("display", "none");
    container.style["grid-template-columns"] = `repeat(${column}, 36px)`;
    container.style["grid-template-row"] = `repeat(${row}, 30px)`;
    for (i = 0; i < (column * row); i++) {
        squars = document.createElement('div');
        squars.id = i;
        squars.classList.add("playground");
        squars.textContent = "";
        container.appendChild(squars);
        if (!bombs.includes(i)) {
            squars.name = "";
            squars.value = true;
        }
        else if (bombs.includes(i)) {
            document.getElementById(i).style.backgroundColor = "red";
        }

    };
};
function win() {
    let count = 0;
    for (i = 0; i < (column * row); i++) {
        if (!bombs.includes(i)) {
            if(document.getElementById(i).textContent !== ""){
                count += 1
            }
            if(count === (((column*row)))-bombs.length){
                $(".win").css({"display":"flex","flex-direction":"column","align-items":"center"})
            }
        }
    }
};
function colorChanger() {
    for (i = 0; i < (column * row); i++) {
        if (document.getElementById(i).textContent !== "") {
            document.getElementById(i).classList.add(numbers[parseInt(document.getElementById(i).textContent)])
            document.getElementById(i).style.backgroundImage = "none";
            document.getElementById(i).style.backgroundColor = "black"
        }
    }
}

















































