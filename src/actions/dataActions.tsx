import axios from 'axios';
import type {
  TPokemon,
  TStatsOriginal,
  TStats,
  TAbility,
  TAbilityOriginal,
  TType,
  TTypeOriginal,
  TDetailData
} from 'types/declaredTypes';

type TGetAllPokemonsResponse = {
  results: TPokemon[];
};

const getDetailPokemon = (pokemonData: TPokemon[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axioses: Array<any> = [];

  pokemonData.forEach(d => {
    axioses.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${d.name}`));
  })

  return axioses;
}

const getDetailSpecies = (detailPokemonData: TDetailData[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axioses: Array<any> = [];

  detailPokemonData.forEach(d => {
    axioses.push(axios.get(`https://pokeapi.co/api/v2/pokemon-species/${d.species.name}`));
  })

  return axioses;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListPokemons = async (offset: number, callBack: any) => {
  try {
    const { data } = await axios.get<TGetAllPokemonsResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`
    );
    const detailAxioses = data?.results.length > 0 ? getDetailPokemon(data?.results) : null;

    const settledData = detailAxioses ? await Promise.allSettled(detailAxioses) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detailData = (settledData || []).length > 0 ? (settledData || []).reduce((res: TDetailData[], d: any) => {
      if (d.status === 'fulfilled') res.push({
        name: d.value.data.name,
        abilities: d.value.data.abilities.reduce(( resAbility: TAbility[], dAbilities: TAbilityOriginal) => {
          resAbility.push({
            name: dAbilities.ability.name,
            url: dAbilities.ability.url
          });
          return resAbility;
        }, []), 
        height: d.value.data.height,
        weight: d.value.data.weight,
        image: d.value.data.sprites.other['official-artwork'].front_shiny,
        stats: d.value.data.stats.reduce((resStats: TStats[], dStats: TStatsOriginal) => {
          resStats.push({
            name: dStats.stat.name,
            base_stat: dStats.base_stat
          });
          return resStats;
        }, []),
        types: d.value.data.types.reduce((resTypes: TType[], dTypes: TTypeOriginal) => {
          resTypes.push({
            name: dTypes.type.name,
            url: dTypes.type.url
          });
          return resTypes;
        }, []),
        species: d.value.data.species,
        color: '',
        habitat: ''
      });
      return res;
    }, []) : null;
    const detailSpeciesAxioses = (detailData || []).length > 0 ? getDetailSpecies(detailData || []) : null;

    const settledSpeciesData = detailSpeciesAxioses ? await Promise.allSettled(detailSpeciesAxioses) : null;
    const speciesData = (settledSpeciesData || []).map(d => {
      if (d.status === 'fulfilled') {
        return { ...d.value.data };
      } else {
        return {};
      }
    });

    if ((speciesData || []).length > 0) {
      for (let i = 0; i < (detailData || []).length; i++) {
        const pokemonName = (detailData || [])[i].name || '';
        const { color, habitat } = speciesData?.find(d => d.name === pokemonName);
        (detailData || [])[i].color = color.name;
        (detailData || [])[i].habitat = habitat.name;
      }
    } 

    callBack(detailData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
