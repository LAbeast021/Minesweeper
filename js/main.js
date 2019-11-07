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
let column, row, bombPercentage, board, randomBombs, divVal, divId,flags,gameClick ;
var bombs = [];
flags =[];
gameClick =true;
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
    $(".background").css("display","none")
    this.style.display = "none";
    $("body").css("background-image","url(images/sky.jpg")
    render();
})
$(".container").on("click", "div", clickHandler)

////// RIGHT CLICK FOR FLAGS //////////////////////

$('.container ').on("contextmenu",function(evt){
    if(gameClick === true){
    evt.preventDefault();
    flags.includes(evt.target.id) ? flags = flags.filter(item => item !== evt.target.id) : flags.push(evt.target.id);
     if (evt.target.textContent === "")$(evt.target).toggleClass("rightclick");
    }
})





// ////////////// FUNCTIONS /////////////////
function clickHandler(){
if(this.textContent === "" && gameClick){
    if(this.value && !this.classList.contains("rightclick")){
        divId = parseInt(this.id);
        divVal = this.value;
        // console.log(` id = ${this.id} and value = ${this.value}`);
        if(!borderGuard(divVal, divId, this)){
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
    else if(this.classList.contains("rightclick")){ 
        return;
     }
    else{
        
        for(i=0 ; i< (column*row) ; i++){
            if(bombs.includes(i)){
                if(document.getElementById(i).classList.contains("rightclick")){
                    document.getElementById(i).style.backgroundImage = "url(images/al_flag.png)"
                }
                else{
                    document.getElementById(i).classList.add("bomb");
                }
                gameClick = false;
            }
        }
    }

    num = parseInt(this.textContent);
    // if (num || num ===0 )this.style.backgroundColor = "black";
    // this.classList.add (numbers[num]);
    colorChanger();
    if(num === 0){
        rightDown(divId);
        leftUp(divId);
    } 
}
}


function borderGuard (divVal, divId, div){
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
    $(".size, .difficulty").css("display","none");
    container.style["grid-template-columns"] = `repeat(${column}, 36px)`;
    container.style["grid-template-row"] = `repeat(${row}, 30px)`;
    for(i=0 ; i <(column * row) ; i++){
        squars = document.createElement('div');
        squars.id = i;
        squars.classList.add("playground");
        squars.textContent = "";
        container.appendChild(squars);
         if(!bombs.includes(i)){
             squars.value = i +1;
         };
         if(bombs.includes(i)){
             document.getElementById(i).style.backgroundColor = "red";
         }
    };   
};



function winOrLose(){

}



function colorChanger(){
    for(i=0 ; i< (column*row) ; i++){
        if(document.getElementById(i).textContent !== ""){
            document.getElementById(i).classList.add(numbers[parseInt(document.getElementById(i).textContent)])
            document.getElementById(i).style.backgroundImage = "none";
            document.getElementById(i).style.backgroundColor = "black"
        }
    }
}




 
function rightDown(divId){
    if(document.getElementById(divId).textContent == 0 ){
if(!document.getElementById(divId+1).classList.contains("rightclick")){
    document.getElementById(divId+1).textContent = (board[(divId+1) + 1]) + (board[(divId+1) - column + 1]) + (board[(divId+1) - column ]) + (board[(divId+1) - column - 1]) + (board[(divId+1) - 1]) + (board[(divId+1) + column - 1]) + (board[(divId+1) + column]) + (board[(divId+1) + column + 1])
}
if(!document.getElementById(divId-1).classList.contains("rightclick")){
    document.getElementById(divId-1).textContent = (board[(divId-1) + 1]) + (board[(divId-1) - column + 1]) + (board[(divId-1) - column ]) + (board[(divId-1) - column - 1]) + (board[(divId-1) - 1]) + (board[(divId-1) + column - 1]) + (board[(divId-1) + column]) + (board[(divId-1) + column + 1])
}
if(!document.getElementById(divId+column).classList.contains("rightclick") && document.getElementById(divId+column)){
    document.getElementById(divId+column).textContent = (board[(divId+column) + 1]) + (board[(divId+column) - column + 1]) + (board[(divId+column) - column ]) + (board[(divId+column) - column - 1]) + (board[(divId+column) - 1]) + (board[(divId+column) + column - 1]) + (board[(divId+column) + column]) + (board[(divId+column) + column + 1])
}
if(!document.getElementById(divId-column).classList.contains("rightclick") && document.getElementById(divId-column) ){
    document.getElementById(divId-column).textContent = (board[(divId-column) + 1]) + (board[(divId-column) - column + 1]) + (board[(divId-column) - column ]) + (board[(divId-column) - column - 1]) + (board[(divId-column) - 1]) + (board[(divId-column) + column - 1]) + (board[(divId-column) + column]) + (board[(divId-column) + column + 1])
}
if(!document.getElementById(divId+(column+1)).classList.contains("rightclick")){
    document.getElementById(divId+(column+1)).textContent = (board[(divId+(column+1)) + 1]) + (board[(divId+(column+1)) - column + 1]) + (board[(divId+(column+1)) - column ]) + (board[(divId+(column+1)) - column - 1]) + (board[(divId+(column+1)) - 1]) + (board[(divId+(column+1)) + column - 1]) + (board[(divId+(column+1)) + column]) + (board[(divId+(column+1)) + column + 1])
}
if(!document.getElementById(divId+(column-1)).classList.contains("rightclick")){
    document.getElementById(divId+(column-1)).textContent = (board[(divId+(column-1)) + 1]) + (board[(divId+(column-1)) - column + 1]) + (board[(divId+(column-1)) - column ]) + (board[(divId+(column-1)) - column - 1]) + (board[(divId+(column-1)) - 1]) + (board[(divId+(column-1)) + column - 1]) + (board[(divId+(column-1)) + column]) + (board[(divId+(column-1)) + column + 1])
}
if(!document.getElementById(divId-(column+1)).classList.contains("rightclick")){
    document.getElementById(divId-(column+1)).textContent = (board[(divId-(column+1)) + 1]) + (board[(divId-(column+1)) - column + 1]) + (board[(divId-(column+1)) - column ]) + (board[(divId-(column+1)) - column - 1]) + (board[(divId-(column+1)) - 1]) + (board[(divId-(column+1)) + column - 1]) + (board[(divId-(column+1)) + column]) + (board[(divId-(column+1)) + column + 1])
}
if(!document.getElementById(divId-(column-1)).classList.contains("rightclick")){
    document.getElementById(divId-(column-1)).textContent = (board[(divId-(column-1)) + 1]) + (board[(divId-(column-1)) - column + 1]) + (board[(divId-(column-1)) - column ]) + (board[(divId-(column-1)) - column - 1]) + (board[(divId-(column-1)) - 1]) + (board[(divId-(column-1)) + column - 1]) + (board[(divId-(column-1)) + column]) + (board[(divId-(column-1)) + column + 1])
}
}
colorChanger();
if(document.getElementById(divId+1).textContent == 0){
    rightDown(divId+1);
}
if(document.getElementById(divId+column).textContent ==0 && !isNaN(document.getElementById(divId+column).textContent) ){
    rightDown(divId+column);
}
if(document.getElementById(divId-1).textContent ==0 && !isNaN(document.getElementById(divId+column).textContent) ){
    leftUp(divId-1);
}
if(document.getElementById(divId-column).textContent ==0 && !isNaN(document.getElementById(divId+column).textContent) ){
    leftUp(divId-column);
}
};

function leftUp (divId){
    if(document.getElementById(divId).textContent == 0 ){
        if(!document.getElementById(divId+1).classList.contains("rightclick")){
            document.getElementById(divId+1).textContent = (board[(divId+1) + 1]) + (board[(divId+1) - column + 1]) + (board[(divId+1) - column ]) + (board[(divId+1) - column - 1]) + (board[(divId+1) - 1]) + (board[(divId+1) + column - 1]) + (board[(divId+1) + column]) + (board[(divId+1) + column + 1])
        }
        if(!document.getElementById(divId-1).classList.contains("rightclick")){
            document.getElementById(divId-1).textContent = (board[(divId-1) + 1]) + (board[(divId-1) - column + 1]) + (board[(divId-1) - column ]) + (board[(divId-1) - column - 1]) + (board[(divId-1) - 1]) + (board[(divId-1) + column - 1]) + (board[(divId-1) + column]) + (board[(divId-1) + column + 1])
        }
        if(!document.getElementById(divId+column).classList.contains("rightclick")){
            document.getElementById(divId+column).textContent = (board[(divId+column) + 1]) + (board[(divId+column) - column + 1]) + (board[(divId+column) - column ]) + (board[(divId+column) - column - 1]) + (board[(divId+column) - 1]) + (board[(divId+column) + column - 1]) + (board[(divId+column) + column]) + (board[(divId+column) + column + 1])
        }
        if(!document.getElementById(divId-column).classList.contains("rightclick")){
            document.getElementById(divId-column).textContent = (board[(divId-column) + 1]) + (board[(divId-column) - column + 1]) + (board[(divId-column) - column ]) + (board[(divId-column) - column - 1]) + (board[(divId-column) - 1]) + (board[(divId-column) + column - 1]) + (board[(divId-column) + column]) + (board[(divId-column) + column + 1])
        }
        if(!document.getElementById(divId+(column+1)).classList.contains("rightclick")){
            document.getElementById(divId+(column+1)).textContent = (board[(divId+(column+1)) + 1]) + (board[(divId+(column+1)) - column + 1]) + (board[(divId+(column+1)) - column ]) + (board[(divId+(column+1)) - column - 1]) + (board[(divId+(column+1)) - 1]) + (board[(divId+(column+1)) + column - 1]) + (board[(divId+(column+1)) + column]) + (board[(divId+(column+1)) + column + 1])
        }
        if(!document.getElementById(divId+(column-1)).classList.contains("rightclick")){
            document.getElementById(divId+(column-1)).textContent = (board[(divId+(column-1)) + 1]) + (board[(divId+(column-1)) - column + 1]) + (board[(divId+(column-1)) - column ]) + (board[(divId+(column-1)) - column - 1]) + (board[(divId+(column-1)) - 1]) + (board[(divId+(column-1)) + column - 1]) + (board[(divId+(column-1)) + column]) + (board[(divId+(column-1)) + column + 1])
        }
        if(!document.getElementById(divId-(column+1)).classList.contains("rightclick")){
            document.getElementById(divId-(column+1)).textContent = (board[(divId-(column+1)) + 1]) + (board[(divId-(column+1)) - column + 1]) + (board[(divId-(column+1)) - column ]) + (board[(divId-(column+1)) - column - 1]) + (board[(divId-(column+1)) - 1]) + (board[(divId-(column+1)) + column - 1]) + (board[(divId-(column+1)) + column]) + (board[(divId-(column+1)) + column + 1])
        }
        if(!document.getElementById(divId-(column-1)).classList.contains("rightclick")){
            document.getElementById(divId-(column-1)).textContent = (board[(divId-(column-1)) + 1]) + (board[(divId-(column-1)) - column + 1]) + (board[(divId-(column-1)) - column ]) + (board[(divId-(column-1)) - column - 1]) + (board[(divId-(column-1)) - 1]) + (board[(divId-(column-1)) + column - 1]) + (board[(divId-(column-1)) + column]) + (board[(divId-(column-1)) + column + 1])
        }

}
colorChanger();

if(document.getElementById(divId-1).textContent ==0 && !isNaN(document.getElementById(divId+column).textContent) ){
    leftUp(divId-1);
}
// if(document.getElementById(divId-column).textContent ==0 && !isNaN(document.getElementById(divId+column).textContent) ){
//     leftUp(divId-column);
// }
};



    







    





       


       





























        
