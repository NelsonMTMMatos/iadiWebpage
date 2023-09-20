import pokemons from './pokemons.json' assert { type: 'json'};


const closeModal = document.getElementById("close-modal");


closeModal.addEventListener('click', () => {
    
})



const img = new Image(300,400);
img.src = link;
document.getElementById("screen").appendChild(img)

fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((response) => response.json()).then((data) => console.log(data))

console.log(pokemons);