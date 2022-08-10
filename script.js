console.log("Welcome to the tictactoe game");




let moveSound = new Audio('ting.mp3')
let turn = "X"

const changeTurn = ()=>{
    return turn === 'X' ? 'O' : 'X';
}

const checkgameover = ()=>{
    let boxtexts = document.getElementsByClassName('val');
    let wins = [
        [0,1,2,0,-10,0,20],
        [3,4,5,0,0,0,20],
        [6,7,8,0,10,0,20],
        [0,3,6,-10,0,90,20],
        [1,4,7,0,0,90,20],
        [2,5,8,10,0,90,20],
        [0,4,8,0,0,45,20],
        [2,4,6,0,0,135,20],
    ]
    wins.forEach((v)=>{
        if((boxtexts[v[0]].innerText===boxtexts[v[1]].innerText) &&( boxtexts[v[1]].innerText===boxtexts[v[2]].innerText) && (boxtexts[v[0]].innerText===boxtexts[v[2]].innerText) && boxtexts[v[0]].innerText!==''){
            document.querySelector('.turn').innerText = `${boxtexts[v[0]].innerText} Won`
            document.querySelector('.line').style.transform = `translate(${v[3]}vw,${v[4]}vw) rotate(${v[5]}deg)`
            document.querySelector('.line').style.width = `${v[6]}vw`
        }
    })
}
let boxes = document.getElementsByClassName('box')
Array.from(boxes).forEach((element)=>{
    let boxtext = element.querySelector(".val");
    element.addEventListener('click',()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn()
            document.querySelector('.turn').innerHTML = `Turn for ${turn}`
            checkgameover()
            moveSound.play();
        }
    })
})

let line1 = document.querySelector('.line') 
var rect = boxes[4].getBoundingClientRect();
line1.style.top = `calc(${rect.top}px + 5vw)`;
line1.style.left = `calc(${rect.left}px - 5vw)`;



let resetbutton = document.querySelector('.reset')
resetbutton.addEventListener('click',()=>{
    Array.from(boxes).forEach((element)=>{
        let boxtext = element.querySelector('.val')
        boxtext.innerHTML = ""
        
    })
    document.querySelector('.line').style.width = "0px"

})

