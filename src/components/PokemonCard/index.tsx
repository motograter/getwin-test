import { RootState, useDispatch, useSelector } from "app/store";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { pokemonActions } from "app/pokemon.slice";
import "./style.scss";

export function PokemonCard() {
  const dispatch = useDispatch();

  const pokemon = useSelector(
    (state: RootState) => state.pokemon.selectedPokemon
  );
  const onClearPokemon = () =>
    dispatch(pokemonActions.setSelectedPokemon(null));

  const pokemonStats = pokemon?.stats?.map?.((stat: any, idx: number) => {
    return (
      <div
        key={`${stat.base_stat}-${stat.stat.name}-${idx}`}
        className="pokemon_stat"
      >
        <b>{stat.stat.name}</b>: {stat.base_stat}
      </div>
    );
  });

  const pokemonMoves = pokemon?.moves?.map?.((move: any, idx: number) => {
    return (
      <div key={`${move?.move?.name}-${idx}`} className="pokemon_stat">
        <span>{move?.move?.name}</span>
      </div>
    );
  });

  const pokemonImg = pokemon?.sprites?.front_default || "";
  return (
    <Card>
      <div className="card-header">
        <Card.Img variant="top" src={pokemonImg} alt="pokemon" />
        <Card.Title>
          {pokemon?.name?.toLocaleUpperCase?.() || "Empty"}
        </Card.Title>
      </div>

      <Card.Body>
        {pokemon ? (
          <div className="d-flex">
            <div className="pokemon_stat-list">
              <h6>Stats:</h6>
              {pokemonStats}
            </div>
            <div className="pokemon_move-list">
              <h6 className="sticky">Moves:</h6>
              {pokemonMoves}
            </div>
          </div>
        ) : (
          <Card.Text>Pokemon not selected yet</Card.Text>
        )}
        <Button onClick={onClearPokemon} disabled={!pokemon} variant="primary">
          Clear Pokemon
        </Button>
      </Card.Body>
    </Card>
  );
}
