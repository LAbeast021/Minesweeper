// /////////////// CONSTANT///////////////////////
const numbers = {
    1 : "green",
    2 : "yellowgreen",
    3 : "yellow",
    4 : "orange",
    5 : "red",
    6 : "purple",
    7 : "pink",
    8 : "olivegreen"
};
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
})
$(".container").on("click", "div", clickHandler)
////// RIGHT CLICK FOR FLAGS //////////////////////

$('.container ').on("contextmenu",function(evt){
    evt.preventDefault();
     if (evt.target.textContent === "")$(evt.target).toggleClass("rightclick");
})





// ////////////// FUNCTIONS /////////////////
function clickHandler(){
    if(this.value && !this.classList.contains("rightclick")){
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
                else if(document.getElementById(divId - column)){
                    this.textContent = (board[divId + 1]) +  (board[divId - 1]) + (board[divId - column - 1]) + (board[divId - column]) + (board[divId - column + 1]);
                    console.log("divar paiin ")
                }
            }
        }    
    }
    else if(!this.classList.contains("rightclick")){
        console.log("YOU LOST")
    }

    num = parseInt(this.textContent);
    if (num || num ===0 )this.style.backgroundColor = "black";
    this.classList.add (numbers[num]);
    if(num === 0){
        spray(divId,this);
    } 
}


function boarderGuard (divVal, divId, div){
    if(divVal === 1){ 
            div.textContent = board[divId + 1] + board[divId + column] + (board[divId + column + 1])
       return true;
    }
    else if(divVal === column){
            div.textContent = board[divId - 1] + board[divId + column] + board[divId +( column - 1)]
        return true;
        ;}
    else if (divVal === column * row) {
            div.textContent = board[divId - 1]  + board[divId - column] + board[divId - ( column + 1)]
        return true;
        ;}
    else if (divVal === (column*row) - column + 1) {
            div.textContent = board[divId + 1]  + board[divId - column] + board[divId -  (column - 1)]
        
        return true;
        ;}
    else if (divVal/column === Math.floor((divVal+1)/column)){
                div.textContent = board[divId - 1] + board[divId + column] + board[divId - column] + board[divId + column - 1] + board[divId - column - 1]
            return true   
        }
    else if((divVal-1)/column === Math.floor(divVal/column)){
            div.textContent = board[divId + 1] + board[divId + column] + board[divId - column] + board[divId + column + 1] + board[divId - column + 1]
            return true;
        }
    else{
           return false;
        };
}
function render(){
    $(".size, .difficulty").fadeOut(1000);
    container.style["grid-template-columns"] = `repeat(${column}, 35px)`;
    container.style["grid-template-row"] = `repeat(${row}, 35px)`;
    for(i=0 ; i <(column * row) ; i++){
        squars = document.createElement('div');
        squars.id = i;
        squars.classList.add("playground");
        squars.textContent = "";
        container.appendChild(squars);
        bombs.includes(i) ? squars.classList.add("bomb") : squars.value = i+1; 
    };
    
};


function spray(divId , div){
    // console.log(`${divId} is id  \n ${div} is the div`);
    while(parseInt(document.getElementById(divId).textContent) === 0 && divId === column){
    if (parseInt(document.getElementById(divId).textContent) === 0){
        document.getElementById(divId+1).textContent = (board[(divId+1) + 1]) + (board[(divId+1) - column + 1]) + (board[(divId+1) - column ]) + (board[(divId+1) - column - 1]) + (board[(divId+1) - 1]) + (board[(divId+1) + column - 1]) + (board[(divId+1) + column]) + (board[(divId+1) + column + 1])
          divId = divId+1; 
          div = document.getElementById(divId+1);}
          
          
        if (parseInt(document.getElementById(divId).textContent) === 0){
            document.getElementById(divId-1).textContent = (board[(divId-1) + 1]) + (board[(divId-1) - column + 1]) + (board[(divId-1) - column ]) + (board[(divId-1) - column - 1]) + (board[(divId-1) - 1]) + (board[(divId-1) + column - 1]) + (board[(divId-1) + column]) + (board[(divId-1) + column + 1])
           divId = divId-1;
           div =  document.getElementById(divId-1);}
           

        if (parseInt(document.getElementById(divId).textContent) === 0){
            document.getElementById(divId+column).textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column ]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
            divId = divId+column;
            div = document.getElementById(divId+column)}
        };
        spray(divId, div);
           


        // document.getElementById(divId-column).textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column ]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
        //     spray(divId-column , document.getElementById(divId-column));


        // document.getElementById(divId+(column-1)).textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column ]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
        //     spray(divId+(column-1 ), document.getElementById(divId+(column-1)));


        // document.getElementById(divId+(column+1)).textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column ]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
        //     spray(divId+(column+1) , document.getElementById(divId+(column+1)));


        // document.getElementById(divId-(column-1)).textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column ]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
        //     spray(divId-(column-1), document.getElementById(divId-(column-1)));


        // document.getElementById(divId-(column+1)).textContent = (board[divId + 1]) + (board[divId - column + 1]) + (board[divId - column ]) + (board[divId - column - 1]) + (board[divId - 1]) + (board[divId + column - 1]) + (board[divId + column]) + (board[divId + column + 1])
        //     spray(divId-(column+1), document.getElementById(divId-(column+1)));
    }




























        //     if(divId === 1){ 
        //         document.getElementById(divId-1).textContent = board[divId + 1] + board[divId + column] + (board[divId + column + 1])
        //    return true;
        // }
        // else if(divId === column){
        //     document.getElementById(divId-1).textContent = board[divId - 1] + board[divId + column] + board[divId +( column - 1)]
        //     return true;
        //     ;}
        // else if (divId === column * row) {
        //     document.getElementById(divId-1).textContent = board[divId - 1]  + board[divId - column] + board[divId - ( column + 1)]
        //     return true;
        //     ;}
        // else if (divId === (column*row) - column + 1) {
        //     document.getElementById(divId-1).textContent= board[divId + 1]  + board[divId - column] + board[divId -  (column - 1)]
            
        //     return true;
        //     ;}
        // else if (divId/column === Math.floor((divVal+1)/column)){
        //     document.getElementById(divId-1).textContent= board[divId - 1] + board[divId + column] + board[divId - column] + board[divId + column - 1] + board[divId - column - 1]
        //         return true   
        //     }
        // else if((divId-1)/column === Math.floor(divVal/column)){
        //     document.getElementById(divId-1).textContent = board[divId + 1] + board[divId + column] + board[divId - column] + board[divId + column + 1] + board[divId - column + 1]
        //         return true;
        //     }
        // else{
        //        return false;
        //     };
        // if(divId ===1){
        //     document.getElementById(divId-1).textContent =  board[divId + 1] + board[divId + column] + (board[divId + column + 1])
            
        // }
    