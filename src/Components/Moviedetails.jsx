import { useEffect, useState } from "react";
import { data, Link, Links, useNavigate, useParams } from "react-router-dom"
import { getMovieActors, getMovieById, getSimilarMovies } from "../Services/api";
import "../CSS/Moviedetails.css";

function Moviedetails(){

    const[movieposter, setMovieposter] = useState({});
    const[actors, setActors] = useState([]);
    const[similarmovies, setSimilarmovies] = useState([]);
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const {id} = useParams();


    const appthree = async (id) =>{
        if (loading)

            setLoading(true)
        try{
            const getsimilar = await getSimilarMovies(id);
            setSimilarmovies(getsimilar);
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        appthree(id);
    }, [id])

    const apptwo = async (id) =>{
        
        if(loading)
            setLoading(true)

        try{
            const getActors = await getMovieActors(id);
            setActors(getActors);
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        apptwo(id);
    }, [id])

    const app = async () =>{
        try{
            const getMovieId = await getMovieById(id);
            setMovieposter(getMovieId);
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        app(id);
    }, [id])

    return(
        <>
        <div className="contain">
            <div className="netflix-text">
                Lijinflix
            </div>
            <div className="menu">
                <Link style={{textDecoration:"none", color:"white"}} to='/'>
                    <p style={{cursor:"pointer"}}>Home</p>
                </Link>
                <Link style={{textDecoration:"none", color:"white"}} to='/'>
                    <p  style={{cursor:"pointer"}}>Movies</p>
                </Link>
                <Link style={{textDecoration:"none", color:"white"}} to="/tvseries/">
                    <p style={{cursor:"pointer"}}>Tv-Series</p>
                </Link>
            </div>
        </div>
        <div className="movie_hero">
            <img className="cover" src={`https://image.tmdb.org/t/p/original${movieposter.backdrop_path}`} alt={movieposter.title} />
            <img className="poster" src={`https://image.tmdb.org/t/p/w500${movieposter.poster_path}`} alt={movieposter.title} />
            <div className="details_text">
                <p>{movieposter.genres?.map((genre) => genre.name).join(", ")}</p>
                <h1 className="title">{movieposter.title}</h1>
                <div className="buttoncontainer">
                <button className="moviebutton" onClick={() => navigate(`/movietrailer/${id}`)}>Watch Now ▶</button>
                </div>
                <div className="imdp"><h4>IMDB: {movieposter.vote_average}</h4></div>
                <p className="overview">{movieposter.overview}</p>
            </div>
        </div>
        <div>
            <h1 className="casttitle">Cast</h1>
        </div>
        <div className="moviecastcontainer">
            {actors.slice(0, 10).map(data =>(
            <div key={data.id}>
            <img className="moviecast" src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} alt="Loading..." />
            <p className="movieactorname">{data.name}</p>
            <p className="movieactorname">({data.character?.split("/").pop().trim()})</p>
            </div>
            ))}
        </div>
        <div className="similartextcontain">
            <h2 className="similartext">You may also like</h2>
        </div>
        <div className="similarmoviecontainer">
            {similarmovies.slice(0, 30).map((val) =>(
            <div className="similar_movie_card" key={val.id}>
                <img onClick={() =>navigate(`/moviedetails/${val.id}`)} className="similarmovies" src={`https://image.tmdb.org/t/p/w500${val.poster_path}`} alt={val.title} />
                <div className="similar_movie_details">
                    <p className="similar_movie_title">{val.title}</p>
                    <p className="similar_movie_release_date">{val.release_date}</p>
                </div>
            </div>
            ))}
        </div>
        <div className="about">
            <h1 className="head1">
                Watch Free Movies & TV Shows Online in HD
            </h1>
            <p className="para1">
                Welcome to Lijinflix ─── stream the latest movies and complete TV series free in HD. No signup,
            </p>
            <p className="para2">
                no subscription. Updated daily with new releases across every genre.
            </p>
        </div>
        <div className="netflix-text">
            <h1>LIJINFLIX</h1>
        </div>
        <div style={{color:"white"}} className="gridding">
            <div className="desclaimer">
                <p className="one" style={{color:"#CCCACD"}}>A free, ad-free hub for high-quality movies and shows</p>
                <p className="two" style={{color:"#A5A5A5"}}>Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties</p>
            </div>
            <div >
                <h2 className="three" style={{fontWeight:"bold", color:""}}>GENRES</h2>
                <p className="four">Drama</p>
                <p className="four">Comedy</p>
                <p className="four">Documentary</p>
                <p className="four">Thriller</p>
                <p className="four">Crime</p>
                <p className="four">Horror</p>
            </div>
            <div>
                <h2 className="three">COUNTRY</h2>
                <p className="four">United State of America</p>
                <p className="four">United Kingdom</p>
                <p className="four">Canada</p>
                <p className="four">France</p>
                <p className="four">Japan</p>
                <p className="four">Germany</p>
            </div>
            <div>
                <h1 className="three">WATCH FREE</h1>
                <Link style={{color:"white", textDecoration:"none"}} to="/">
                <p className="four">Home</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to="/">
                <p className="four">Movies</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/tvseries'>
                <p className="four">TV-Series</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/topimdb'>
                <p className="four">Top IMDB</p>
                </Link>
                <Link  style={{color:"white", textDecoration:"none"}} to='/latest'>
                <p className="four">Recently Updated</p>
                </Link>
                <p className="four">Search & Filter</p>
            </div>
            <div>
                <h2 className="three">HELP</h2>
                <p className="four">Browse</p>
                <p className="four">Sitemap</p>
            </div>
        </div>
        </>
    )
}

export default Moviedetails