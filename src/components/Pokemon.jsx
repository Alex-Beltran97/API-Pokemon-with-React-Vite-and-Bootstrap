import axios from 'axios';
import { useEffect, useState } from 'react';

const Pokemon = ({path}) => {
  const [pokemon, setPokemon] = useState();

  const getPokemonData = async (url)=>{
    try{
      const data = await axios.get(url);
      setPokemon(data.data);
    }catch(error){
      console.log(error);
    };
  };

  useEffect(() => {
    getPokemonData(path);
  }, []);
  return (<>
    <div className='col-12 col-sm-6 col-md-4 col-lg-2'>
      <div className="card m-1" style={{width:"12rem"}}>
        <div className="card-body">
          <img src={pokemon?.sprites?.front_default} className="card-img-top" alt={pokemon?.name} />
          <h5 className="card-title text-center">{pokemon?.name}</h5>
        </div>
      </div>
    </div>
  </>);
};
 
export default Pokemon;