const {useState,useEffect}=React;


const App=()=>{

const [movies, setMovies]=useState([]);
const [search,setSearch]=useState("");

const tmdb_api="https://api.themoviedb.org/3/movie/popular?api_key=31b5379604bed607f009a664bcc0ab9b&language=en-US";
const IMG_api="https://image.tmdb.org/t/p/w500/"
const SEARCH_api="https://api.themoviedb.org/3/search/movie?api_key=31b5379604bed607f009a664bcc0ab9b&language=en-US&query="

const getMovies=async (api)=>{
const response= await fetch(api);
const data=await response.json();
setMovies(data.results);
}

useEffect(()=>{getMovies(tmdb_api)},[]);

const formHandler=(e)=>{
e.preventDefault();
if (search){
getMovies(SEARCH_api+search);
}

else{
getMovies(tmdb_api);
}

setSearch("");
}

const Movie= ({title,poster_path,overview,vote_average})=>{
return <div class="movie">
<img src={IMG_api+poster_path} />
<div class="movie-info">
<h3>{title}</h3>
<span>{vote_average}</span>
</div>
<div class="movie-overview">
<h2>Overview :</h2>
<p>{overview}</p>
</div>
</div>

}


return ( 
<React.Fragment>
<header><form onSubmit={formHandler}><input value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search..."/></form></header>
<div>
<h1>Movies</h1>
<div class="movie-container">
{movies.map((movie)=>{return <Movie key={movie.id} {...movie}/>})}
</div>
</div>
</React.Fragment>
)

}

ReactDOM.render(<App/>, document.querySelector("#app"));
