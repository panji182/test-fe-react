export type TPokemon = {
  name: string;
  url: string;
};

type TStat = {
  name: string,
  url: string
};

export type TStatsOriginal = {
  base_stat: number,
  effort: number,
  stat: TStat
};

export type TStats = {
  name: string,
  base_stat: number
};

export type TAbility = {
  name: string,
  url: string
};

export type TAbilityOriginal = {
  ability: TAbility,
  is_hidden: boolean,
  slot: number
};

export type TType = {
  name: string,
  url: string
};

export type TTypeOriginal = {
  slot: number,
  type: TType
}

export type TSpecies = {
  name: string,
  url: string
};

export type TDetailData = {
  name: string,
  abilities: TAbility[], 
  height: number,
  weight: number,
  image: string,
  stats: TStats[],
  types: TType[],
  species: TSpecies,
  color: string,
  habitat: string
};