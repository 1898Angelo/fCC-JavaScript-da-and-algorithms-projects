const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const sprite = document.getElementById("sprite")
const types = document.getElementById("types");
const statTDs = document.querySelectorAll("tr > td:nth-of-type(2)")
// API URL endpoint
const endpoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"

// Utility Functions
async function fetchPokemon(id) {

    try {
        const response = await fetch(endpoint + id);
        if (!response.ok) {
            alert("Pokémon not found");
            return
        }
        const data = await response.json();
        return data
    } 
    
    catch(error) {
        alert(`An error occured: ${error}`)
    }
}
// DOM Functions
const fillData = async (id) => {
    const data = await fetchPokemon(id);

    if (!data) {
        return
    }

    pokemonName.textContent = data.name.toUpperCase();
    pokemonID.textContent = `#${data.id}`;
    height.textContent = `${data.height}`;
    weight.textContent = `${data.weight}`;
    sprite.src = data.sprites.front_default;

    types.innerHTML = "";
    Object.keys(data.types).forEach((index) => {
        const type = data.types[index].type.name;
        // Each Pokemon type has its own class going with the same name
        // and a different background color each.
        types.innerHTML += 
        `
        <p class="${type} pokemon-type">${type.toUpperCase()}</p>
        `;
    });

    const stats = data.stats;
    Object.keys(data.stats).forEach((index) => {
        // Same number of TD's as stats in the data.stats proeprty 
        // and they're also ordered the same way.
        statTDs[index].textContent = stats[index].base_stat
    })
}

const randomPokemon = () => {
    const randomNumber = Math.floor(Math.random() * 1001);
    fillData(randomNumber);
}

// Events
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const pokemonID = searchInput.value.toLowerCase();
    fillData(pokemonID);
    searchInput.value = "";
})

searchInput.addEventListener("keypress", (event) => {
    const pokemonID = event.target.value.toLowerCase();
    if (!pokemonID) return;

    if (event.key === "Enter") {
        fillData(value)
    }
})
