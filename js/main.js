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
        board.splice(bombs[i] , 1 , 1);
    }
    console.log(bombPercentage);
})
$(".start").on("click", function(){
    render();
    bombDefuser();
})
$(".container").on("click", "div", clickHandler)
// ////// RIGHT CLICK FOR FLAGS //////////////////////
// $('.container').bind('contextmenu','button', function(){
//     if (this.which == 3){ // can also use button instead of which.
//         // prevent default action.
//         this.preventDefault(); }
//     console.log("rasssss kilik");
// })




let num;

// ////////////// FUNCTIONS /////////////////
function clickHandler(){
    if(this.value){
        divId = parseInt(this.id);
        divVal = this.value;
        // console.log(` id = ${this.id} and value = ${this.value}`);
        if(!boarderGuard(divVal, divId, this)){
            if(document.getElementById(divId + column) && document.getElementById(divId - column) ){
                this.textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column ]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
            }
            else{
                if(document.getElementById(divId + column)){
                    this.textContent = (board[divId + 1]) +  (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1]);
                    console.log("divar bala")
                }
                else{
                    this.textContent = (board[divId + 1]) +  (board[divId - 1]) + (board[divId - column - 1]) + (board[divId - column]) + (board[divId - column + 1]);
                    console.log("divar paiin ")
                }
            }
        }    
    }
    else{
        console.log("YOU LOST")
    }
}

function boarderGuard (divVal, divId, clicked){
    if(divVal === 1){ 
        if(board[divId + 1] || board[divId + column] || (board[divId + column + 1])){
            clicked.textContent = board[divId + 1] + board[divId + column] + (board[divId + column + 1])
        }
       return true;
    }
    else if(divVal === column){
        if(board[divId - 1] || board[divId + column] || board[divId +( column - 1)]){
            clicked.textContent = board[divId - 1] + board[divId + column] + board[divId +( column - 1)]
        }
        return true;
        ;}
    else if (divVal === column * row) {
        if(board[divId - 1]  || board[divId - column] || board[divId - ( column - 1)] ){
            clicked.textContent = board[divId - 1]  + board[divId - column] + board[divId - ( column + 1)]
        }
        return true;
        ;}
    else if (divVal === (column*row) - column + 1) {
        if(board[divId + 1]  || board[divId - column] || board[divId -  (column - 1)]){
            clicked.textContent = board[divId + 1]  + board[divId - column] + board[divId -  (column - 1)]
        }
        return true;
        ;}
    else if (divVal/column === Math.floor((divVal+1)/column)){
            if(board[divId - 1] || board[divId + column] || board[divId - column] || board[divId + column - 1] || board[divId - column - 1] ){
                clicked.textContent = board[divId - 1] + board[divId + column] + board[divId - column] + board[divId + column - 1] + board[divId - column - 1]
            }
            return true   
        }
    else if((divVal-1)/column === Math.floor(divVal/column)){
        if(board[divId + 1] || board[divId + column] || board[divId - column] || board[divId + column + 1] || board[divId - column + 1] ){
            clicked.textContent = board[divId + 1] + board[divId + column] + board[divId - column] + board[divId + column + 1] + board[divId - column + 1]
        }  
            return true;
        }
    else{
           return (false);
        }
}





function render(){
    $(".size, .difficulty").fadeOut(1000);
    container.style["grid-template-columns"] = `repeat(${column}, 31px)`;
    container.style["grid-template-row"] = `repeat(${row}, 31px)`;
    for(i=0 ; i <(column * row) ; i++){
        squars = document.createElement('div');
        squars.id = i;
        squars.textContent = 0;
        container.appendChild(squars);
        bombs.includes(i) ? squars.classList.add("bomb") : squars.value = i+1;  
    }}
    $(".container").fadeOut(1000).fadeIn(4000);
    