import axios from 'axios';

export const getPokemons = async (url) =>{
  const data = await axios.get(url)
  return data.data;
}