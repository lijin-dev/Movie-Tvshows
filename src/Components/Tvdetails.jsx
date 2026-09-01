import { useEffect, useState } from "react"
import { getSimilarTvSeries, getTvById, getTvCast } from "../Services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../CSS/Tvdetails.css'

function Tvdetails(){

    const[poster, setPoster] =useState({});
    const[loading, setLoading] =useState(true);
    const[actors, setActors] = useState([]);
    const[similar, setSimilar] = useState([]);
    const navigate = useNavigate();
    const {idmo} = useParams();


    const appthree = async () =>{
        try{
            setLoading(true);
            const getSimilartv = await getSimilarTvSeries(idmo);
            setSimilar(getSimilartv);
        }catch(err){
            console.log("An error Occured", err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        appthree(idmo);
    }, [idmo]);

    const apptwo = async () =>{
        try{
            setLoading(true)
            const getactors = await getTvCast(idmo);
            setActors(getactors);
        }catch(err){
            console.log("An error occured",err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        apptwo(idmo);
    }, [idmo])

    const app = async () =>{
            try{
            setLoading(true)
            const gettvid = await getTvById(idmo);  
            setPoster(gettvid);
        }catch(err){
            console.log("An error Occured",err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        app(idmo);
    }, [idmo])

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
        <div>
            <div className="tvcoverpostercontain">
                {poster.backdrop_path && (
                    <img className="tvcover" src={`https://image.tmdb.org/t/p/original${poster.backdrop_path}`} alt={`${poster.name} backdrop`} />
                )}
                <div className="tvpostercontain">
                    {poster.poster_path && (
                        <img className="tvposter " src={`https://image.tmdb.org/t/p/w500${poster.poster_path}`} alt={`${poster.name} poster`} />
                    )}
                    <div className="tvdetailstext">
                        <div>
                            <p style={{color:"white"}}>{poster.genres?.map((genre) =>genre.name).join(",")}</p>
                        </div>
                        <div>
                            <h1>{poster.name}</h1>
                        </div>
                        <div>
                            <button onClick={() =>navigate(`/tvvideo/${poster.id}`)} className="tvwatchbutton">Watch now ▶</button>
                        </div>
                        <div>
                            <p className="tvimdb">IMDB: {poster.vote_average?.toFixed(1)}</p>
                        </div>
                        <div>
                            <p className="tvoverview">{poster.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="casttext">
            <h1 style={{color:"white", fontSize:"40px"}}>Cast</h1>
        </div>
        <div className="tvcast">
            {actors.slice(0, 10).map((actor) =>(
            <div key={actor.id}>
                <img
                    className="tvcastimage"
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                />
                <p style={{color:"white"}}>{actor.name}</p>
                <p style={{color:"white"}}>({actor.character})</p>
            </div>
            ))}
        </div>
        <div>
            <h1 className="similartvtitlee" style={{color:"white"}}>You may also like</h1>
        </div>
        <div className="similartvcontain">
            {similar.map((set) =>(
            <div className="similartvcard" key={set.id}>
                <img onClick={() =>navigate(`/tvdetails/${set.id}`)} className="similartvposter" src={`https://image.tmdb.org/t/p/w500${set.poster_path}`} alt={set.name} />
                <div className="similartvdetails">
                    <p className="similartvtitle">{set.name}</p>
                    <p className="similartvreleasedate">{set.first_air_date}</p>
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

export default Tvdetails