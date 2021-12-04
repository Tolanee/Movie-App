import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import './App.css';
import axios from 'axios'
import HeaderName from './components/HeaderName';
import Search from './components/Search';
import AddFavs from './components/AddFavs';
import DeleteFavs from './components/DeleteFavs';


function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [favs, setfavs] = useState([])

  const getMovies = async(search)=>{
   await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=f5a6c9b3`)
    .then((res)=>{
      if(res.data.Search){
        setMovies(res.data.Search)
      }
        
    })
  }

  useEffect(() => {
    getMovies(search)
  }, [search]);

  useEffect(() => {
    const addFavouriteMovies = JSON.parse(
      localStorage.getItem('favourite-movie')
    );
    setfavs(addFavouriteMovies)
  }, []);

  const saveToLocalStorage =(items)=>{
   localStorage.setItem('favourite-movie', JSON.stringify(items))
  };

  const addFavouriteMovie =(movie)=>{
    const newFavs = [...favs, movie]
    setfavs(newFavs)
    saveToLocalStorage(newFavs)
  }

  const deleteFavouriteMovie =(movie)=>{
    const newFavs = favs.filter((fav)=>
      fav.imdbID !== movie.imdbID
    );
    setfavs(newFavs)
    saveToLocalStorage(newFavs)

  }

  return (
    <div className='container-fluid movie-app'>

        <div className="d-flex flex-row align-items-center mt-4 mb-4 ">
        <HeaderName header='Movies'/>
        <Search search={search} setSearch={setSearch}/>
        </div>
        <div className="d-flex flex-row">
        <MovieList movies={movies}
         favouriteComponent={AddFavs} 
         handleFavClick={addFavouriteMovie}/>
        </div>

        <div className="d-flex flex-row align-items-center mt-4 mb-4 ">
        <HeaderName header='Favourites'/>
        
        </div>
        <div className="d-flex flex-row">
        <MovieList movies={favs}
         favouriteComponent={DeleteFavs} 
         handleFavClick={deleteFavouriteMovie}/>
        </div>
    </div>
  );
}

export default App;
