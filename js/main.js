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
let seconds = 0;
let time;
// ///////////// CACHED ////////////////////////////////////////////////////////////////////////////////
let container = document.querySelector(".container");
let flagNum = document.getElementById("numberofflags");
let TIMER = document.getElementById("timertext");
// //////////// EVENT LISTENER //////////////////////////////////////////////////////////////////////////

$(".size").on("click", "button", function () {
    $(".difficulty").css("visibility","visible")
    $("h3").css("display","block")
    column=0;
    row=0;
    $(".size button").hasClass("clicked") ?  $(".size button").removeClass("clicked") : this.classList.add("clicked");
    this.classList.add("clicked");
    column = parseInt(this.value)
    column === 40 ? row = 25 : row = column
});

$(".difficulty").on("click", "button", function () {
    bombPercentage=0;
    bombs=[];
    $(".difficulty button").hasClass("clicked") ?  $(".difficulty button").removeClass("clicked") : $(this).addClass("clicked");
    this.classList.add("clicked");
    bombPercentage = this.value * (column * row);
    board = new Array((column * row)).fill(0);
    bombCreator()
    function bombCreator(i=0){
        for(i ; i <= bombPercentage -1; i++){
            if(bombs.length === bombPercentage) return
            randomBombs = Math.floor(Math.random() * (column * row))
            if(bombs.includes(randomBombs)){
                return bombCreator(i)
            }
            bombs.push(randomBombs);
            board.splice(bombs[i], 1, 1);

        }
    }

    $(".start").css({"visibility":"visible"});
});

$(".start").on("click", function () {
    $(`h3, h2, .background`).css("display","none")
    this.style.display = "none";
    $("body").css("background-image", "url(images/sky.jpg");
    time = setInterval(timer,1000);
    render();
});
$(".restart").click(function(){
    location.reload(true);
});

$(".container").on("click", "div", clickHandler)

///////////// RIGHT CLICK FOR FLAGS ///////////////////////////////////////////////////////////////////////////

$('.container ').on("contextmenu", function (evt) {
    evt.preventDefault();
    if(flagNum.innerHTML == 0 && !evt.target.classList.contains("rightclick")) return
    if (gameClick === true) {
        flags.includes(evt.target.id) ? flags = flags.filter(item => item !== evt.target.id) : flags.push(evt.target.id);
        flags.includes(evt.target.id) ? flagNum.innerHTML = `${parseInt(flagNum.innerHTML) - 1}` : flagNum.innerHTML = `${parseInt(flagNum.innerHTML) + 1}`
        if (evt.target.textContent === "") $(evt.target).toggleClass("rightclick");
    }
    win();
})
// ////////////// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////
function render() {
    TIMER.innerHTML = formatTime(seconds);
    flagNum.innerHTML = `${bombs.length}`
    $(".size, .difficulty").css("display", "none");
    $('nav').css({"visibility":"visible","height":"200%"})
    $('.container').css({"display":"grid","grid-template-rows":"repeat(25, 34px)","grid-template-columns":"repeat(40, 34px)","grid-column-gap":"3px","grid-row-gap":"3px",
    "margin-bottom": "1%","margin-top":"5%"
    })
    timer()
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
        // else if (bombs.includes(i)) {
        //     document.getElementById(i).style.backgroundColor = "red";
        // }

    };
};
function clickHandler() {
    if (this.textContent === "" && gameClick) {
        if (this.value && !this.classList.contains("rightclick")) {
            divId = parseInt(this.id);
            divVal = this.value;
            // console.log(` id = ${divId} and value = ${divVal} and name ${this.name}`);
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
                        $(".lose").css({"display":"flex","flex-direction":"column","align-items":"center","justify-content":"center"})
                        myStopFunction()
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
    if(!div.classList.contains("rightclick")){
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
        // /////////////////////////////// RECURSIVE SEARCH /////////////////////////////////////////////////////////////////////////////////////////
        if (div.textContent == 0 && div.value && div.name == "") {
            if ((divId + column) < (column * row) && (divId - column) > 0) {
                div.value = false;
                borderGuard(divId + column);div.value = false;
                borderGuard(divId-(column+1));div.value = false;
                borderGuard(divId-(column-1));div.value = false;
                borderGuard(divId+(column-1));div.value = false;
                borderGuard(divId+(column+1)); div.value = false;
                borderGuard(divId - column);div.value = false;
                borderGuard(divId + 1);div.value = false;
                borderGuard(divId - 1);
            }
            else if ((divId + column) < (column * row)) {
                div.value = false;
                borderGuard(divId + 1);div.value = false;
                borderGuard(divId - 1);div.value = false;
                borderGuard(divId+(column-1));  div.value = false;
                borderGuard(divId+(column+1));
            }
            else if ((divId - column) > 0) {
                div.value = false;
                borderGuard(divId + 1); div.value = false;
                borderGuard(divId - 1);div.value = false;
                borderGuard(divId-(column+1));div.value = false;
                borderGuard(divId-(column-1));
            }
        }
        else if (div.textContent == 0 && div.value && div.name !== "") {
            return;
        }
    }  
};


function win() {
    let count=0;
    let flags=0;
    for (i = 0; i < (column * row); i++) {
        if (!bombs.includes(i)) {
            if(document.getElementById(i).textContent !== ""){
                count += 1
            }
            var flagsNum = document.querySelectorAll('.rightclick').length
            if(count === (((column*row)))-bombs.length && parseInt(flagsNum) === parseInt(bombs.length)){
                $(".win").css({"display":"flex","flex-direction":"column","align-items":"center"})
                myStopFunction()
                for (i = 0; i < (column * row); i++) {
                    if (bombs.includes(i)) {
                        if (document.getElementById(i).classList.contains("rightclick")) {
                            document.getElementById(i).style.backgroundImage = "url(images/al_flag.png)"
                            }
                        }
                    }
            }
        };
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
};

// function timer (){
//      var time =  setInterval(() => {
//         seconds = seconds + 1
//          TIMER.innerHTML = formatTime(seconds)
//     }, 1000);
// }
function timer (){
    seconds = seconds + 1
    TIMER.innerHTML = formatTime(seconds)
} 
function myStopFunction() {
    clearInterval(time);
  }
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    let secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }









// Line 49-50 combined together
// $("h2").css("display","none")
// $(".background").css("display", "none")

// LIne 38 for bombs
// for (i = 0; i <= bombPercentage -1; i++) {
//     randomBombs = Math.floor(Math.random() * (column * row))
//     bombs.push(randomBombs);
//     board.splice(bombs[i], 1, 1);
// };








































