import React from "react";
import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css'

// URL da API: /movie/550?api_key=fa9ac85bf115abe1a98a38aef62c13c1&language=pt-BR

function Home() {

  const [filmes, setFilmes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "fa9ac85bf115abe1a98a38aef62c13c1",
          language: "pt-BR",
          page: 1
        }
      })

      //console.log(response.data.results.slice(0,10));
      setFilmes(response.data.results.slice(0,10));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if(loading){
    return(
      <div>
        <h2 className="loading">Carregando filmes ...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <Link to={`/filme/${filme.id}`}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="{filme.title}" /></Link>
              <Link className="btn" to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;
