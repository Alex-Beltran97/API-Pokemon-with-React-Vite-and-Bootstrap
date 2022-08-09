import { useEffect, useState } from "react";
import Pokemon from "./components/Pokemon";
import { getPokemons } from "./services/fetchingData";

const App = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setsetPrevPage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePages = async (urlData)=>{
    getData(urlData);
  };

  const getData = async (urlData)=>{
    try{
      setLoading(true);
      const data =  await getPokemons(urlData);
      setPokemons([...data.results.map(item=>item.url)]);
      setNextPage(data.next);
      setsetPrevPage(data.previous);
      setLoading(false);
    }catch(error){
      console.log(error);
    };
  };

  useEffect(() => {
    getData(url);
  }, []);

  return (<>
    <h1 className="text-center">API Pokemon</h1>
    <div className="d-flex justify-content-between">
      <button 
        className="btn btn-primary"
        disabled={prevPage===null?true:false}
        onClick={()=>{
          handlePages(prevPage);
          setCurrentPage(currentPage-1)
        }}
      >
          Prev
      </button>
      <p className="fs-3">Page: {currentPage+1}</p>
      <button 
        className="btn btn-primary"
        disabled={nextPage===null?true:false}
        onClick={()=>{
          handlePages(nextPage);
          setCurrentPage(currentPage+1)
        }}
      >
        Next
      </button>
    </div>
    <div className="row">
      {!loading?
        pokemons.map((item,index)=>(
          <Pokemon key={index} path={item} />
        ))
      :
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }  
    </div>  
  </>);
};
 
export default App;