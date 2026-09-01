import { useEffect, useState } from "react"
import { getMovieActors, getMovieById, getMovieTrailer, getSimilarMovies, getTvCast } from "../Services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/Trailer.css"

function Trailer(){

    const[trailer, setTrailer] = useState(null);
    const[loading, setLoading] = useState(true);
    const[movie, setMovie] = useState(null);
    const[actors, setActors] = useState(null);
    const[similar, setSimilar] = useState([]);
    const navigate = useNavigate();
    const {idmt} =useParams()


    

    const appfour = async () =>{
        try{
            const getSimilar = await getSimilarMovies(idmt);
            setSimilar(getSimilar);
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        appfour();
    }, [idmt])

    const appthree = async () =>{
        try{
            const getCast = await getMovieActors(idmt);
            setActors(getCast)
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        appthree();
    }, [idmt])

    const apptwo = async () =>{
        try{
            const getMovie = await getMovieById(idmt);
            setMovie(getMovie);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
        apptwo();
    }, [idmt])

    const app = async () =>{

        setLoading(true);

        try{
            const trailers = await getMovieTrailer(idmt);
            const youtubeTrailer = trailers.find(
                (video) => video.site === "YouTube" && video.type === "Trailer"
            );
            setTrailer(youtubeTrailer || null);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        app();
    }, [idmt])

    if (loading) {
        return <div style={{ color: "white", padding: "2rem" }}>Loading trailer...</div>;
    }

    if (!movie) {
        return <div style={{ color: "white", padding: "2rem" }}>Movie details not found.</div>;
    }

    const hasTrailer = Boolean(trailer && trailer.key);
    const castNames = actors?.slice(0, 3).map((data) => data.name).join(", ") || "N/A";

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
        <div className="movietrailercontain">
            <div className="iframecontain">
                {hasTrailer ? (
                    <iframe className="movietrailer"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="movietrailer" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "white" }}>
                        Trailer unavailable
                    </div>
                )}
            </div>
                <div className="trailerposterdetails">
                    <div>
                <img className="trailerposter" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                    </div>
                <div className="moviedetails">
                    <h1 style={{color:"white", fontWeight:"bold"}}>{movie.title}</h1>
                    <div className="imdb">
                    <p style={{color:"black"}}> IMDB :{movie.vote_average.toFixed(1)}</p>
                    </div>
                    <p style={{color:"grey"}}>{movie.overview || "No overview available."}</p>
                    <p style={{marginTop:"1rem"}}> Country: {movie.production_countries?.map((country) => country.name).join(", ") || "N/A"}</p>
                    <p>Genres: {movie.genres.slice(0, 1).map((genre) => genre.name)}</p>
                    <p>Released: {movie.release_date}</p>
                    <p>Productions: {movie.production_companies.map((companies) => companies.name).join(", ")}</p>
                    <p>Cast: {castNames}</p>
                </div>
                </div>
        </div>
        <div>
        </div>
            <h2 className="alike">You may also like</h2>
        <div className="simicontain">
        {similar.map((simi) =>(
        <div style={{cursor:"pointer"}} key={simi.id} className="simiposterwrap" onClick={() => navigate(`/moviedetails/${simi.id}`)}>
            <img onClick={() => navigate(`/moviedetails/${simi.id}`)} className="simiposter" src={`https://image.tmdb.org/t/p/w500${simi.poster_path}`} alt="" />
            <div className="simiposteroverlay">
                <h4>{simi.title}</h4>
                <p>{simi.release_date}</p>
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

export default Trailer