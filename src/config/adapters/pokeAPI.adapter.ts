import {AxiosAdapter} from './http/axios.adapter';

export const pokeApiFetcher = new AxiosAdapter({
  baseURL: 'https://pokeapi.co/api/v2',
  params: {},
});
