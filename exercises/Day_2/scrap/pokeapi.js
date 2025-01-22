const fetchPokemon = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(data.name);
  } catch (err) {
    console.log("Error in fetching..")
  }
};
fetchPokemon(10);
