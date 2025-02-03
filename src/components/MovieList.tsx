import { useEffect, useState } from "react";
import { movieList } from "../Services/ApiService"

interface movie{
    id: number;
    title: string,
    img: string,
    overview: string,
}



export default function MovieList(){
    const [movies,setMovies] = useState<movie[]>([]);
    const [page,setPage] =useState<number>(1);
    
    useEffect(() =>{
        async function fetchMovies(){
            try {
            const data = await movieList(page);
            if(movies.length == 0) setMovies(data);
            else{
                setMovies(prevMovies => [ ...prevMovies, ...data])
            }
            }catch (error) {console.error(error);}
            
        }
        fetchMovies();
    },[page]);
    return(
        <div>
            <div>
                <h1>lista</h1>
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <p>{movie.title}</p>
                            <p>{movie.id}</p>
                            <div>
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    style={{
                                    width: "150px",
                                    height: "auto",
                                    borderRadius: "10px",
                                    boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
                                    }}
                                />                            
                            </div>
                            <p>{movie.overview}</p>
                        </li>
                        
                    ))}
                </ul>
                <button onClick={() => setPage(prevPage => prevPage + 1)}>siema</button>
            </div>
        </div>
    )
}