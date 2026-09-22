import { useEffect, useState } from "react"
import { data, Link, useNavigate } from "react-router-dom"
import { getTopRatedAll } from "../Services/api";
import '../CSS/Topimdb.css'

function Topimdb() {

    const[topimdb, setTopimdb] = useState([]);
    const[page, setPage] = useState(() => {
        const savedPage = Number(localStorage.getItem("topimdbPage"));
        return savedPage > 0 ? savedPage : 1;
    });
    const navigate = useNavigate();
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem("topimdbPage", String(page));
    }, [page]);

    const appone = async() =>{
        try{
            setLoading(true)
            const getToprating = await getTopRatedAll(page);
            setTopimdb(getToprating);
        }catch(err){
            console.log("An error occured", err);
        }finally{
            setLoading(false);
        }
    }


    useEffect(() =>{
        appone()
    }, [page])

    const handleClick = (data) =>{
        if (data.type === "movie"){
            navigate(`/moviedetails/${data.id}`);
        }else{
            navigate(`/tvdetails/${data.id}`)
        }
    };

    return(
        <>
        <div className="contain home-contain">
            <div className="menu">
                <input type="checkbox" id="menu" />
            <div className="netflix-text">
                Lijinflix
                <label htmlFor="menu" aria-label="Toggle menu">
                    <i className="bi bi-list"></i>
                    <i className="bi bi-x-lg close-icon"></i>
                </label>
            </div>
            <div className="items">
                <p className="item" onClick={() =>navigate("/")}>Home</p>
                <p className="item" onClick={() =>navigate("/")}>Movies</p>
                <p className="item" onClick={() =>navigate("/tvseries")}>Tv-Series</p>
            </div>
          </div>
        </div>
        <div>
            <h1 className="imdbtitle">Top IMDb Rated Movies & TV Shows</h1>
            <p className="imdbpara">The highest-rated films and series on Nunflix, ranked by IMDb / TMDB scores. From timeless classics to modern critical hits — all available to stream free in HD.</p>
        </div>
        <div className="imdbcontainer">
            {topimdb.map((data) =>(
            <div key={`${data.type}-${data.id}`}
            className="imdbcard"
            onClick={() =>handleClick(data)}>
                <div className="imdbposterwrap">
                    <img className="imdbposter" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name} />
                    <div className="imdbposter-overlay">
                        <p className="imdbmovie-name">{data.name}</p>
                        <p style={{color:"white"}}>{data.title}</p>
                        <p style={{color:"white"}}>{data.first_air_date}</p>
                        <p className="imdbmovie-date">{data.release_date}</p>
                    </div>
                </div>
            </div>
            ))}
            </div>
            <div className="imdbbtn">
                <div>
                    <button className="btnratingone" onClick={() => setPage(page - 1)}>◁ Previous</button>
                </div>
                <div>
                    <button className="btnratingtwo" onClick={() => setPage(page + 1)}>Next ▷</button>
                </div>
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
                <Link  style={{color:"white", textDecoration:"none"}} to='/drama'>
                <p className="four">Drama</p>
                </Link>
                <Link  style={{color:"white", textDecoration:"none"}} to='/comedy'>
                <p className="four">Comedy</p>
                </Link>
                <Link  style={{color:"white", textDecoration:"none"}} to='/documentary'>
                <p className="four">Documentary</p>
                </Link>
                <Link  style={{color:"white", textDecoration:"none"}} to='/thriller'>
                <p className="four">Thriller</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/crime'>
                <p className="four">Crime</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/horror'>
                <p className="four">Horror</p>
                </Link>
            </div>
            <div>
                <h2 className="three">COUNTRY</h2>
                <Link style={{color:"white", textDecoration:"none"}} to='/unitedstate'>
                <p className="four">United State of America</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/unitedkingdom'>
                <p className="four">United Kingdom</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/canada'>
                <p className="four">Canada</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/france'>
                <p className="four">France</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/japan'>
                <p className="four">Japan</p>
                </Link>
                <Link style={{color:"white", textDecoration:"none"}} to='/germany'>
                <p className="four">Germany</p>
                </Link>
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

export default Topimdb