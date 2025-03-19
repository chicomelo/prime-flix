import axios from 'axios';

// Base url https://api.themoviedb.org/3/
// Url da API /movie/550?api_key=fa9ac85bf115abe1a98a38aef62c13c1&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
