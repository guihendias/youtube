const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();

    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    searchPokemon = data.id;

    const image =
      data.sprites.versions["generation-v"]["black-white"].animated
        .front_default;

    pokemonImage.setAttribute("src", image);
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "";
    pokemonImage.setAttribute("src", "");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const pokemon = input.value.toLowerCase();

  renderPokemon(pokemon);

  input.value = "";
});

buttonPrev.addEventListener("click", () => {
  searchPokemon--;
  if (searchPokemon < 1) {
    searchPokemon = 1;
  }

  renderPokemon(searchPokemon);
});

buttonNext.addEventListener("click", () => {
  searchPokemon++;
  if (searchPokemon > 898) {
    searchPokemon = 898;
  }

  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
