// /////////////// CONSTANT///////////////////////
// /////////////// VAR //////////////////////////
let column, row, bombPercentage, board, randomBombs, divVal, divId ;
var bombs = [];
// ///////////// CACHED ////////////////////////

let container = document.querySelector(".container");
// //////////// EVENT LISTENER ////////////////////

$(".size").on("click","button",function(){
  column = parseInt(this.value)
  column === 40 ? row = 25 : row = column
})
$(".difficulty").on("click","button",function(){
    bombPercentage = this.value*(column*row);
    board = new Array((column*row) -1).fill(0);
    for (i=0 ; i <= bombPercentage -1 ; i++){
        randomBombs = Math.floor(Math.random()*(column*row))
        bombs.push(randomBombs);
        board.splice(bombs[i] , 1 , -1);
    }
    console.log(bombPercentage);
})
$(".start").on("click", function(){
    render();
})
$(".container").on("click", "div", clickHandler)







// ////////////// FUNCTIONS /////////////////
function clickHandler(){
    if(this.value){
        divVal = this.value;
        divId = this.id;
        console.log(` id = ${this.id} and value = ${this.value}`);
        if(divVal === 1) console.log("left top corner");
        else if(divVal === column) console.log("right top corner");
        else if (divVal === column * row) console.log(" right bottom corner ");
        else if (divVal === (column*row) - column + 1) console.log(" left bottom corner");

        else if (divVal/column === Math.floor((divVal+1)/column)){
            console.log("right Wall")
        }
        else if((divVal-1)/column === Math.floor(divVal/column)){
            console.log("left Wall")
        }

        
    }
    else{
        alert("YOU LOST")
    }
}





function render(){
    $(".size, .difficulty").fadeOut(1000);
    container.style["grid-template-columns"] = `repeat(${column}, 31px)`;
    container.style["grid-template-row"] = `repeat(${row}, 31px)`;
    for(i=0 ; i <(column * row) ; i++){
        squars = document.createElement('div');
        squars.id = i;
        container.appendChild(squars);
        bombs.includes(i) ? squars.classList.add("bomb") : squars.value = i+1;  
    }}
    $(".container").fadeOut().fadeIn(4000)