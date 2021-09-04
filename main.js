'use-strict'

//Selecting elements
const newGameBtn = document.getElementById('restartBtn');
const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');

const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

const p1fs = document.getElementById('p1fs');
const p2fs = document.getElementById('p2fs');

const p1cs = document.getElementById('p1cs');
const p2cs = document.getElementById('p2cs');

const dice = document.getElementById('dice');

//initialization
p1fs.textContent = 0;
p2fs.textContent = 0;
p1cs.textContent = 0
p2cs.textContent = 0;
dice.classList.add('hidden');

//variables
let currentScore = 0;
let active = 0;
let score = [0,0];


//check active and updating active
function checkActive(){
    //dom updating active
    if(active === 0){
        p1.classList.add('active');
        p2.classList.remove('active');
    }else{
        p2.classList.add('active');
        p1.classList.remove('active');
    }
}

//roll dice
function roll(){

    //rolling dice
    let diceVal = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceVal}.png`;
    
    
    //updating scores
    if(diceVal > 1){
        currentScore+=diceVal;
        document.getElementById(`p${active+1}cs`).textContent = currentScore;
    }else{
        currentScore = 0;
        document.getElementById(`p${active+1}cs`).textContent = currentScore;
        active = active === 0 ? 1 : 0;
    }
    checkActive();
    

}

//hold btn
function hold(){
    score[active] += currentScore;
    if (score[active] >= 150) win();
    document.getElementById(`p${active+1}fs`).textContent = score[active];
    currentScore = 0;
    document.getElementById(`p${active+1}cs`).textContent = currentScore;
    active = active === 0 ? 1 : 0;
    checkActive();
}

//win function
function win(){
    document.getElementById(`p${active+1}`).classList.add('winner');
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
}

//restart function
function restart(){
    
    //initialization
    p1fs.textContent = 0;
    p2fs.textContent = 0;
    p1cs.textContent = 0
    p2cs.textContent = 0;
    dice.classList.add('hidden');
    p1.classList.add('active');
    p1.classList.remove('winner');
    p2.classList.remove('active');
    p2.classList.remove('winner');
    rollBtn.classList.remove('hidden');
    holdBtn.classList.remove('hidden');

    //variables
    currentScore = 0;
    active = 0;
    score = [0,0];
}

//btns functions
rollBtn.addEventListener('click',roll);
holdBtn.addEventListener('click',hold);
newGameBtn.addEventListener('click',restart);
