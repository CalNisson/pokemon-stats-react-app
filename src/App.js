import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({name: "", image: "", stats: [], types: [], abilities: []});
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("pkmnSubmit").click();
    } 
  }
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then(
      (response) => {
        setPokemon({
          name: capName(pokemonName),
          img: response.data.sprites.front_default,
          stats: response.data.stats,
          types: response.data.types,
          abilities: response.data.abilities,
          dexNum: response.data.id
        });
        setPokemonChosen(true);
    }).catch((error) => {
      console.log("Error Response: ")
      console.log(error);
    });
  }

  function capName(pokeName) {
    let name = pokeName;
    let replDash = false;

    if(name.indexOf("-mega") >= 0) {
      name = name.split("-mega")[0];
      name = "Mega " + name;
    } else if(name.indexOf("-alola") >= 0) {
      name = name.split("-alola")[0];
      name = "Alolan " + name;
    } else if(name.indexOf("-galar") >= 0) {
      name = name.split("-galar")[0];
      name = "Galarian " + name;
    } else if(name.indexOf("-hisui") >= 0) {
      name = name.split("-hisui")[0];
      name = "Hisuian " + name;
    } else if(name.indexOf("-null") >= 0) {
      name = name.split("-null")[0];
      name = "Type: Null";
    } else if(name.indexOf("-z") >= 0 ) {
      name = name.split("-z")[0];
      name = name + "-Z";
    } else if(name.indexOf("-mime") >= 0 ) {
      name = name.split("-mime")[0];
      name = name + ". Mime";
    } else if(name.indexOf("-jr") >= 0 ) {
      name = name.split("-jr")[0];
      name = name + " Jr.";
    } else if(name === "farfetchd") {
      name = "Farfetch'd";
    } else if(name.indexOf("-") >= 0) {
      replDash = true;
      name = name.replaceAll("-", " ");
    }

    const wordArr = name.split(" ");
    let assembledName = "";
    for(let i = 0; i < wordArr.length; i++) {
      if(i > 0) {
        assembledName = assembledName + " ";
      }
      const firstLetter = wordArr[i].charAt(0).toUpperCase();
      const restName = wordArr[i].slice(1);
      assembledName = assembledName + firstLetter + restName;
    }
    if(replDash === true) {
      assembledName = assembledName.replaceAll(" ", "-");
    }
    return assembledName;
  }

  function genStatNames(poke_stats) {
    const arrayItems = poke_stats.map((stat) => <h3 className={stat.stat.name}>{stat.stat.name.toUpperCase().replace("-", " ")}:</h3>);
    return arrayItems;
  }

  function genStats(poke_stats) {
    const arrayItems = poke_stats.map((stat) => <h3>{stat.base_stat}</h3>);
    return arrayItems;
  }

  function genAbilities(abilities) {
    const arrayItems = abilities.map((ability) => <h4>{capName(ability.ability.name.replaceAll("-"," "))}</h4>);
    return arrayItems;
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
              <h1>#{pokemon.dexNum} - {capName(pokemon.name.toLowerCase())}</h1>
              <img className="Pokemon" src={pokemon.img} alt="Pokemon's sprite"/>
              <div className="Types">
                <img className="Type" src={"https://www.serebii.net/pokedex-bw/type/" + pokemon.types[0].type.name + ".gif"} alt ="Pokemon's type"/>
                {pokemon.types[1] && <img className="Type" src={"https://www.serebii.net/pokedex-bw/type/" + pokemon.types[1].type.name + ".gif"} alt ="Pokemon's Second type"/>}
              </div>
              <h3>Abilities</h3>
              <ul>{genAbilities(pokemon.abilities)}</ul>
              <div></div>
              <div className="StatSection">
                <div className="row">
                  <div className="column">
                    <div className="column1">
                      <ul>{genStatNames(pokemon.stats)}</ul>
                    </div>
                  </div>
                  <div className="column">
                    <div className="column2">
                      <ul>{genStats(pokemon.stats)}</ul>
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
