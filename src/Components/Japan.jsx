import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { getJapan } from "../Services/api";
import '../CSS/Japan.css'

function Japan(){

    const[japan, setJapan] =useState([]);
    const[page, setPage] = useState(1);
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const app = async() =>{
        try{
            setLoading(true)
            const getJap = await getJapan(page);
            setJapan(getJap);
        }catch(err){
            console.log("An error Occured", err);
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        app();
    }, [page]);

    const handleClick = (data) =>{
        if(data.type === "movie"){
            navigate(`/moviedetails/${data.id}`);
        }else{
            navigate(`/tvdetails/${data.id}`);
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
         <div className="japantitle">
            <h1>Japan Movies & TV Shows Online Free</h1>
            <p style={{color:"gray"}}>Watch movies and TV shows from Japan free in HD on Lijinflix. 1,201 titles available — no signup or subscription. Discover the best of Japan and television, with English subtitles available for most titles.</p>
         </div>
         <div className="japancontain">
            {japan.map((data) =>(
                <div className="japancard" key={`${data.type}-${data.id}`}>
                    <img onClick={() =>handleClick(data)} className="japanposter" src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"} alt={data.name || data.title || "No poster available"} />
                    <div className="japanoverlay">
                        <p>{data.name}</p>
                        <p>{data.title}</p>
                        <p>{data.release_date}</p>
                        <p>{data.first_air_date}</p>
                    </div>
                </div>
            ))}
         </div>
         <div className="imdbbtn">
            <div>
                <button className="btnratingone" onClick={() =>setPage(page - 1)}>Previous</button>
            </div>
            <div>
                <button className="btnratingtwo" onClick={() =>setPage(page + 1)}>Next</button>
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

export default Japan