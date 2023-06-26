import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({name: "", image: "", stats: [], types: []});
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("pkmnSubmit").click();
    } 
  }
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: capName(pokemonName),
          img: response.data.sprites.front_default,
          stats: response.data.stats,
          types: response.data.types
        });
        setPokemonChosen(true);
    }).catch((error) => {
      console.log("Error Response: ")
      console.log(error);
    });
  }

  function capName(pokeName) {
    const name = pokeName;
    const firstLetter = name.charAt(0).toUpperCase();
    const restName = name.slice(1);
    return firstLetter + restName;
  }

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input 
          id="pkmnInput"
          type="text" 
          onChange={(event) => {
            setPokemonName(event.target.value)
          }}
          onKeyDown={handleKeyDown}
          ></input>
        <button 
          id="pkmnSubmit"
          onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className = "DisplaySection">
        {!pokemonChosen ? (
            <h1>Please choose a Pokemon</h1>
          ) : (
            <>
              <h1>{pokemon.name}</h1>
              <img className="Pokemon" src={pokemon.img} alt="Pokemon's sprite"/>
              <div className="Types">
                <img className="Type" src={"https://www.serebii.net/pokedex-bw/type/" + pokemon.types[0].type.name + ".gif"} alt ="Pokemon's type"/>
                {pokemon.types[1] && <img className="Type" src={"https://www.serebii.net/pokedex-bw/type/" + pokemon.types[1].type.name + ".gif"} alt ="Pokemon's Second type"/>}
              </div>
              <div className="StatSection">
                <div className="row">
                  <div className="column">
                    <div className="column1">
                      <h3 className="hp">HP:</h3>
                      <h3 className="atk">Attack:</h3>
                      <h3 className="def">Defense:</h3>
                      <h3 className="spatk">Special Attack:</h3>
                      <h3 className="spdef">Special Defense:</h3>
                      <h3 className="speed">Speed:</h3>
                    </div>
                  </div>
                  <div className="column">
                    <div className="column2">
                      <h3>{pokemon.stats[0].base_stat}</h3>
                      <h3>{pokemon.stats[1].base_stat}</h3>
                      <h3>{pokemon.stats[2].base_stat}</h3>
                      <h3>{pokemon.stats[3].base_stat}</h3>
                      <h3>{pokemon.stats[4].base_stat}</h3>
                      <h3>{pokemon.stats[5].base_stat}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default App;
