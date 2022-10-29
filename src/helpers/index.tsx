export const getBageColorByPokemonType = (type: string) => {
    switch (true) {
      case ["water", "ice", "psychic"].includes(type):
        return "primary";
      case ["fire", "fairy", "dragon"].includes(type):
        return "danger";
      case ["grass", "shadow", "unknown"].includes(type):
        return "secondary";
      case ["ground", "dark", "steel"].includes(type):
        return "dark";
      case ["flying", "electric", "bug"].includes(type):
        return "info";
      default:
        return "success";
    }
  };