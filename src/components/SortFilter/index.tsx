import { RootState, useDispatch } from "app/store";
import { useSelector } from "react-redux";
import { pokemonActions } from "app/pokemon.slice";
import Badge from "react-bootstrap/Badge";
import { useId } from "react";
import { getBageColorByPokemonType } from "helpers";
import "./style.scss";

type PokemonType = {
  name: "string";
  url: "string";
};

export const SortFilter = () => {
  const dispatch = useDispatch();
  const id = useId();
  const pokemonTypes = useSelector(
    (state: RootState) => state.pokemon.pokemonTypes
  );

  const onClickSortFilter = (typeName: string) => {
    dispatch(pokemonActions.sortPokemonsByType(typeName));
  };

  return (
    <div className="sort-filter">
      <h4>Sort Filter</h4>
      <div className="sort-filter_filters">
        {pokemonTypes.length > 0 &&
          pokemonTypes.map((pokemonType: PokemonType, idx) => (
            <Badge
              bg={getBageColorByPokemonType(pokemonType.name)}
              key={`${id}-${idx}`}
              onClick={() => onClickSortFilter(pokemonType.name)}
            >
              {pokemonType.name}
            </Badge>
          ))}
      </div>
    </div>
  );
};
