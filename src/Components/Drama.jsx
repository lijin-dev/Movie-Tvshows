import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getDrama } from "../Services/api";
import '../CSS/Drama.css'

function Drama(){
 
    const[drama, setDrama] = useState([]);
    const[page, setPage] = useState(() => {
        const savedPage = Number(localStorage.getItem("dramaPage"));
        return savedPage > 0 ? savedPage : 1;
    });
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("dramaPage", String(page));
    }, [page]);

    const app = async() =>{
        try{
            setLoading(true);
            const getdramas = await getDrama(page);
            setDrama(getdramas);
        }catch(err){
            console.log("An error Occured", err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        app();
    }, [page]);

    const handleClick = (data) =>{
        if(data.type === "movie"){
            navigate(`/moviedetails/${data.id}`)
        }else{
            navigate(`/tvdetails/${data.id}`)
        }
    }

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
        <div className="dramatitle">
            <h1>Drama Movies & TV Shows Online Free</h1>
            <p className="dramatitledetail">Stream the best Drama movies and TV shows free on Nunflix in HD. Browse 1,201 Drama titles — no signup, no subscription required. Updated daily with the newest Drama releases.</p>
        </div>
        <div className="dramacontain">
            {drama.map((data) =>(
            <div key={`${data.type}-${data.id}`}
            className="dramacard"
            onClick={() => handleClick(data)}>
                <img className="dramaposter" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title || data.name || ""} />
                <div className="dramaoverlay">
                    {data.name && <p>{data.name}</p>}
                    {data.title && <p>{data.title}</p>}
                    {data.release_date && <p>{data.release_date}</p>}
                    {data.first_air_date && <p>{data.first_air_date}</p>}
                </div>
            </div>
            ))}
        </div>
            <div className="imdbbtn">
                <div >
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

export default Drama