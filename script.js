import pokemons from './pokemons.json' assert { type: 'json'};

/* Variables and constants */
let currentPokemon;     //[pokemonName, pokemonImage]
let countTotal = 0;
let points = 0;
let streak = 0;
let correct = 0;
let lastAnswer = 1;

/* HTML elements */

const modal = document.querySelector(".modal-div");
const closeModal = document.querySelector(".close-button-modal");
const content = document.querySelector(".content");
const screen = document.querySelector(".screen");
const guess = document.querySelector(".guess");
const skip = document.querySelector(".skip");
const pointsBoard = document.querySelector(".points");
const streakBoard = document.querySelector(".streak");
const hitBoard = document.querySelector(".hit");
const audio = document.getElementById("audio");


/* Functions */

const randomInt = (min,max) => Math.floor(Math.random() * (max - min) + min);

const fetchPokemon = async () => {
    let pokemon = pokemons[randomInt(0, pokemons.length)].toLowerCase();
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let data = await response.json();

    setCurrentPokemon(data);
    
    setupScreen();

    increaseTotal();
}

const setCurrentPokemon = (pokemon) => {
    let pokemonName = pokemon.name;
    let image = pokemon.sprites.other["official-artwork"].front_default;

    currentPokemon = [pokemonName, image];
}

const setAudio = () => {
    audio.volume = 0.01;
    audio.play();
}

const clearScreen = () => {
    screen.innerHTML = '';
}

const setupScreen = () => {
    const img = new Image(300,300);
    img.src = currentPokemon[1];
    screen.appendChild(img);
}

const clearInput = () => {
    guess.value = '';
    guess.style.backgroundColor = "white";
    guess.style.color = "black";
}

const correctAnswer = () => {
    guess.style.backgroundColor = "#D1FFBD";

    if(lastAnswer === 1) 
        increaseStreak();

    increasePoints();
    increaseCorrect();
}

const wrongAnswer = () => {
    guess.style.backgroundColor = "#ff6c70";
    decreasePoints();
    resetStreak();
}

const skipAnswer = () => {
    guess.value = currentPokemon[0];
    guess.style.backgroundColor = "#fafad2";
    resetStreak();
    if(points > 0)
        points -= 0.5;
}

const reset = () => {
    setTimeout(() => {
        fetchPokemon();
        clearScreen();
        clearInput();
    }, 2000);
}

const increasePoints = () => {
    points += 1;
}

const decreasePoints = () => {
    if(points > 0)
        if(points < 1)
            points = 0
        else
            points -= 1;
}

const increaseStreak= () => {
    streak += 1;
}

const resetStreak = () => {
    streak = 0;
}

const increaseCorrect = () => {
    correct += 1;
}

const increaseTotal = () => {
    countTotal += 1;
}

const updateScoreBoard = () => {
    pointsBoard.innerHTML = points;
    streakBoard.innerHTML = streak;
    let hit = (correct/countTotal);
    hitBoard.innerHTML = isNaN(hit) ? 0 : parseFloat(hit * 100).toFixed(2);
}


/* Event Listeners */

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    content.style.dysplay = "block";
    document.body.style.overflow = "visible";
    setAudio();
});

guess.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        if(guess.value.toLowerCase() === currentPokemon[0]){
            correctAnswer();
            reset();
        }else{
            wrongAnswer();
            setTimeout(() => {
                clearInput();
            }, 2000);
        }
        updateScoreBoard();
    }
})

skip.addEventListener("click", () => {
    skipAnswer();
    reset();
    updateScoreBoard();
})

// Initial app load
updateScoreBoard();
fetchPokemon();
