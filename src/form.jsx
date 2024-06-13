import React, { useState } from 'react';
import MovieCard from './movieCard';
export default function SearchForm() {

    const [query, setQuery] = React.useState('');
    const [movies, setMovies] = React.useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=986f50caad89dbce194bc3b6fb3c0450&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const res = await fetch(url);   
            const data = await res.json();
            setMovies(data.results);
        } catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div>
                <form className="form" onSubmit={searchMovies}>
                    <label htmlFor="query" className='label'/>
                    <input className="input" type="text" name="query" 
                            placeholder='input here'
                            value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="button">Submit</button>
                </form>
                
            </div>
            <div className="cards-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                   <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}
