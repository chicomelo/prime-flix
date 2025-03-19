import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import './filme.css'
import api from '../../services/api'
import { toast } from 'react-toastify'

function Filme() {

  // quando é utilizado o useEffect com dependencias externas para
  // ele funcionar é bom passar como dependencia do use effect

  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "fa9ac85bf115abe1a98a38aef62c13c1",
          language: "pt-BR"
        }
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log('filme nao encontrado')
        // redireciona para home com o navigate e sobreescreve a url
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilme();

    return () => {
      console.log('componente desmontado')
    }
    
  } , [navigate, id])

  function salvarFilme(){
    
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id);

    if(hasFilme){
      toast.success("Filme já está na lista!")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")

  }

  if(loading){
    return(
      <div>
        <h2 className="loading">Carregando detalhes ...</h2>
      </div>
    )
  }

  return (
    <div className="filme-info container">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="{filme.title}" />
      <h3>Sinopse:</h3>
      <p className="resumo">{filme.overview}</p>

      <h3>Avaliação:</h3>
      <p className="nota-filme">{filme.vote_average} / 10</p>
      
      <div className="area-buttons">
        <button onClick={salvarFilme}>Adicionar aos favoritos</button>
        <button>
          <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Assistir trailer</a>
        </button>
      </div>

    </div>
  );
}

export default Filme;
