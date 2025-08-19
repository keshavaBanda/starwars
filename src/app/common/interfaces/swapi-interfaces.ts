
export interface IPeopleDetailsResponse {
  name: string,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: "male" | "female",
  homeworld: string,
  films: string[]
  species: [],
  vehicles: string[],
  starships: string[],
  created: string,
  edited: string,
  url: string,
  _id?: number,
  speciesData?: ISpeice[]
}

export interface IPeople {
  count: number,
  next: string,
  previous: string,
  results: IPeopleDetailsResponse[]
}

export interface IFilm {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  characters: string[],
  planets: string[],
  starships: string[],
  vehicles: string[],
  species: string[],
  created: string,
  edited: string,
  url: string
  _id?: number
}

export interface ISpeice {
  name: string,
  classification: string,
  designation: string,
  average_height: string,
  skin_colors: string,
  hair_colors: string,
  eye_colors: string,
  average_lifespan: string,
  homeworld: string,
  language: string,
  people: string[],
  films: string[],
  created: string,
  edited: string,
  url: string,
  _id?: number
}

export interface IVehicle {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  vehicle_class: string,
  pilots: string[],
  films: string[],
  created: string,
  edited: string,
  url: string,
  _id?: number
}

export interface IStarship {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: string,
  length: string,
  max_atmosphering_speed: string,
  crew: string,
  passengers: string,
  cargo_capacity: string,
  consumables: string,
  hyperdrive_rating: string,
  MGLT: string,
  starship_class: string,
  pilots: string[],
  films: string[],
  created: string
  edited: string,
  url: string,
  _id?: number
}
export interface IPeopleDetails {
  people: IPeopleDetailsResponse,
  films: (IFilm | null)[],
  species: (ISpeice | null)[],
  vehicles: (IVehicle | null)[],
  starships: (IStarship | null)[]
}

export interface IFilmResponse {
  count: number,
  next: null,
  previous: null,
  results: IFilm[]
}

export interface IVehicleResponse {
  count: number,
  next: null,
  previous: null,
  results: IVehicle[]
}
export interface ISpeiceResponse {
  count: number,
  next: null,
  previous: null,
  results: ISpeice[]
}
export interface IStarshipResponse {
  count: number,
  next: null,
  previous: null,
  results: IStarship[]
}

