import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSimilarTvSeries, getTvById, getTvCast, getTvTrailer } from "../Services/api";
import '../CSS/Tvtrailer.css'

function Tvtrailer(){
  
    const[trailer, setTrailer] = useState(null);
    const[loading, setLoading] =useState(true);
    const[tvimage, setTvimage] = useState(null);
    const[actors, setActors] = useState(null);
    const[similartv, setSimilartv] = useState([]);
    const navigate = useNavigate();
    const {ido} = useParams();

    const appfour = async () =>{
        try{
            setLoading(true)
            const getSimilar = await getSimilarTvSeries(ido);
            setSimilartv(getSimilar)
        }catch(err){
            console.log("An error Occured", err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        appfour(ido);
    }, [ido])

    const appthree = async () =>{
        try{
            setLoading(true)
            const getCast = await getTvCast(ido);
            setActors(getCast);
        }catch(err){
            console.log("An error occured", err);
            
        }finally{
            setLoading(false)
        }      
    }

    useEffect(() =>{
        appthree(ido);
    }, [ido])

    const apptwo = async () =>{
        try{
            setLoading(true);
            const gettvid = await getTvById(ido)
            setTvimage(gettvid);
        }catch(err){
            console.log("An error Occured", err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        apptwo(ido);
    }, [ido])

    const app = async () =>{
        try{
            setLoading(true)
            const gettvvideo = await getTvTrailer(ido);
            const tvTrailer = gettvvideo.find(
                (video) => video.site === "YouTube" && video.type === "Trailer"
            );
            setTrailer(tvTrailer || null);
        }catch(err){
            console.log("An error Occured", err);
            setTrailer(null);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        app(ido)
    }, [ido]);

    const castNames = actors?.slice(0, 3).map((actor) => actor.name).join(", ") || "N/A";

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
        <div className="tvtrailercontainer">
        <div className="tvtrailercontain">
            {loading ? (
                <div style={{color: "white", textAlign: "center", padding: "2rem"}}>Loading trailer...</div>
            ) : trailer ? (
                <iframe className="tvtrailer"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="TV Show Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                ></iframe>
            ) : (
                <div style={{color: "white", textAlign: "center", padding: "2rem"}}>Trailer not available</div>
            )}
        </div>
            {tvimage &&(
        <div className="tvtrailerimagecontain">
            <div>
            <img className="tvtrailerimage" src={`https://image.tmdb.org/t/p/w500${tvimage.poster_path}`} alt="" />
            </div>

            <div className="tvtrailertext">
                <h1 className="tvtrailername">{tvimage.name}</h1>
                <p className="tvimdbt">IMDB: {tvimage.vote_average.toFixed(1)}</p>
                <p className="tvtraileroverview">{tvimage.overview}</p>
                <p>Country: {tvimage.production_countries.slice(0, 1).map((production) => production.name)}</p>
                <p>Genres: {tvimage.genres.slice(0, 1).map((genre) =>genre.name)}</p>
                <p style={{color:"white"}}>
                   Released:  {tvimage.first_air_date || tvimage.release_date || "N/A"}
                </p>
                <p>Production: {tvimage.production_companies.slice(0, 3).map((produce) => produce.name).join(",")}</p>
                <p>Cast: {castNames}</p>
            </div>
        </div>
            )}
            </div>
            <h1 className="similartitle">You may also like</h1>
            <div className="trailersimicontain">
                {similartv.map((simi) => (
                <div key={simi.id} className="trailersimicard">
                    <img onClick={() => navigate(`/tvdetails/${simi.id}`)} className="tvsimil" src={`https://image.tmdb.org/t/p/w500${simi.poster_path}`} alt={simi.name} />
                    <div className="trailersimioverlay">
                        <h4>{simi.name}</h4>
                        <p>{simi.first_air_date || simi.release_date || "N/A"}</p>
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

export default Tvtrailer