import pokemons from './pokemons.json' assert { type: 'json'};


fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((response) => response.json()).then((data) => console.log(data))

console.log(pokemons);