import { ChangeEvent, useEffect, useId, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "./store";
import { getPokemonList, fetchPokemonTypes } from "./pokemon.asyncActions";
import { RootState } from "./store";
import { Loader } from "components/Loader";
import Badge from "react-bootstrap/Badge";
import { getBageColorByPokemonType } from "helpers";
import "./App.scss";
import { Paginator } from "components/Paginator";
import { SortFilter } from "components/SortFilter";
import { PokemonCard } from "components/PokemonCard";
import { Pokemon } from "types";
import { pokemonActions } from "app/pokemon.slice";

function App() {
  const id = useId();
  const dispatch = useDispatch();

  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const take = useSelector((state: RootState) => state.pokemon.take);

  const loading = useSelector((state: RootState) => state.loader.loading);
  const currentPage = useSelector(
    (state: RootState) => state.pokemon.currentPage
  );

  const [pokemonFilter, setPokemonFilter] = useState<string>("");

  useEffect(() => {
    getPokemonList(dispatch, { take, offset: currentPage * take });
    dispatch(fetchPokemonTypes());
  }, [take, currentPage]);

  const onPokemonClick = (pokemon: Pokemon) => {
    dispatch(pokemonActions.setSelectedPokemon(pokemon));
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setPokemonFilter(event.target.value);
  };

  const filteredPokemons: () => Pokemon[] = () => {
    return pokemons.length > 0
      ? pokemons.filter((pokemon: Pokemon) =>
          pokemon.name
            .toLocaleLowerCase()
            .includes(pokemonFilter.toLocaleLowerCase())
        )
      : [];
  };

  return (
    <div className="App">
      {!!loading && <Loader />}

      <div className="layout d-flex">
        <div className="col-7">
          <div className="pokemons-controls">
            <SortFilter />
            <Form.Control
              className="search-box"
              type="search"
              onChange={onSearch}
              placeholder="search by name"
            />
          </div>
          <section className="pokemon-list">
            <h2>Pokemon List</h2>
            <ListGroup>
              {filteredPokemons().map((pokemon: Pokemon, idx: number) => (
                <ListGroup.Item key={`${id}-${idx}`}>
                  <span className="list-item_name">{pokemon.name}</span>

                  <div className="pokemon-types">
                    {pokemon.types.map((type: any) => (
                      <Badge
                        key={type + id}
                        pill
                        bg={getBageColorByPokemonType(type.type.name)}
                      >
                        {type.type.name}
                      </Badge>
                    ))}
                  </div>

                  <Button size="sm" onClick={() => onPokemonClick(pokemon)}>
                    Details
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Paginator />
          </section>
        </div>

        <section className="pokemon-details">
          <h2>Pokemon Details</h2>
          <PokemonCard />
        </section>
      </div>
    </div>
  );
}

export default App;
