keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '⌫'
]
const guessrows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
]
var currentRow = 0
var currentIndex = 0
var isGameOver = false
const wordle = "EEEEE"

let tileitems = document.querySelector('.tile_container')
let keyitems = document.querySelector('.key_container')
let messageitems = document.querySelector('.message_container')
guessrows.forEach((guessrow,rowindex)=>{
    const row = document.createElement('div')
    row.setAttribute('id','guessrow-' + rowindex)
    guessrow.forEach((guess,guessindex)=>{
        const guesselement = document.createElement('div')
        guesselement.setAttribute('id','guessrow-'+ rowindex + '-tile-'+ guessindex )
        guesselement.setAttribute('class','tile')
        row.append(guesselement)
    })
    tileitems.append(row)
})

keys.forEach(key => {
    const buttonelement = document.createElement('button')
    buttonelement.textContent = key;
    buttonelement.setAttribute('id',key);
    buttonelement.addEventListener('click',()=>handleclick(key))
    keyitems.append(buttonelement)
});

function handleclick(key) {
    if(key==='⌫'){
        deleteLetter()
    }
    else if(key==='ENTER'){
        checkRow()
    }
    else addLetter(key)
    
}
function addLetter(key) {
    if(currentRow<6 && currentIndex<5){
        const tileelement = document.getElementById('guessrow-' + currentRow + '-tile-' + currentIndex)
        tileelement.textContent = key
        guessrows[currentRow][currentIndex] = key
        tileelement.setAttribute('data',key)
        console.log('guessrow-' + currentRow + '-tile-' + currentIndex);
        currentIndex++
    }
}
function deleteLetter(){
    if(currentIndex>0){
        currentIndex--;
        const tileElement = document.getElementById('guessrow-' + currentRow + '-tile-' + currentIndex)
        tileElement.textContent = ''
        guessrows[currentRow][currentIndex] = ''

    }
}

const checkRow = ()=>{
    if(currentIndex===5){
        const guess = guessrows[currentRow].join('')
        console.log('guess is' + guess);
        flipTile()
        if(guess==wordle){
            showMessage('Correct!')
            isGameOver = true
            return
        }
        else{
            if(currentRow>=5){
                isGameOver = false;
                showMessage('Game Over')
            }
            else{
                currentRow++;
                currentIndex=0
            }
        }
        
    }
}

const showMessage = (message)=>{
    const messageElement  = document.createElement('p')
    messageElement.textContent = message
    messageitems.append(messageElement)
    setTimeout(() => {
        messageitems.removeChild(messageElement)
    }, 2000);
}

const addColorToKey = (keyletter,color)=>{
    const key = document.getElementById(keyletter)
    key.classList.add(color)


}

const flipTile = ()=>{
    const rowTiles = document.querySelector('#guessrow-' + currentRow).childNodes
    let checkWordle = wordle
    
    rowTiles.forEach((tile,index)=>{
        const dataLetter = tile.getAttribute('data')
        setTimeout(()=>{
            tile.classList.add('flip')
            if(dataLetter==checkWordle[index]){
                tile.classList.add('green_overlay')
                checkWordle = checkWordle.replace(dataLetter,' ')
                addColorToKey(dataLetter,'green_overlay')
            }
            else if(checkWordle.includes(dataLetter)){
                tile.classList.add('yellow_overlay')
                checkWordle = checkWordle.replace(dataLetter,' ')
                addColorToKey(dataLetter,'yellow_overlay')
            }
            else{
                tile.classList.add('grey_overlay')
                addColorToKey(dataLetter,'grey_overlay')
            }
            console.log(checkWordle);
        },500*index)
        
    })
}