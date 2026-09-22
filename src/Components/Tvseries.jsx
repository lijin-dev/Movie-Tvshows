import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPopularTvSeries, searchTvSeries } from "../Services/api";
import "../CSS/Tvseries.css"

function Tvseries() {

    const[query, setQuery] = useState("");
    const[tvseries, setTvseries] = useState([]);
    const[suggestions, setSuggestions] = useState([]);
    const[loading, setLoading] = useState(true);
    const[isSearching, setIsSearching] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (!suggestions.length) return;

        const handleOutsideClick = (event) => {
            const dropdown = document.querySelector(".tv-search-dropdown");
            if (dropdown && !dropdown.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [suggestions.length]);

    useEffect(() => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setSuggestions([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                const results = await searchTvSeries(trimmedQuery);
                setSuggestions(results.slice(0, 6));
            } catch (err) {
                console.log(err);
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const appto = async (e) =>{
        e.preventDefault();
        const searchValue = query.trim();
        if(!searchValue) return;
        setIsSearching(true);
        setSuggestions([]);
        try{
            setLoading(true)
            const getSearch = await searchTvSeries(searchValue);
            setTvseries(getSearch);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
    }
    }

    const selectSuggestion = (item) => {
        setQuery("");
        setSuggestions([]);
        setTvseries([item]);
        setIsSearching(true);
    }

    const getSuggestionMeta = (item) => {
        const type = item.media_type === "movie" ? "Movie" : "TV";
        const year = (item.first_air_date || item.release_date || "").slice(0, 4);
        return `${type} • ${year || "Unknown"}`;
    }

    const app = async () =>{
        if(loading)
        try{
            const gettvseries = await getPopularTvSeries();
            setTvseries(gettvseries);
            setSuggestions([]);
            setIsSearching(false);
        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        app();
    }, [])

  return (
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
                <p className="item">Tv-Series</p>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", width: "min(550px, 90vw)", margin: "0 auto" }}>
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(8, 10, 13, 0.38)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    zIndex: 5,
                    pointerEvents: "auto",
                    display: query.trim() && suggestions.length > 0 ? "block" : "none",
                    transition:"all 0.3s ease"
                }}
                onClick={() => setSuggestions([])}
            />
            <form className="form" onSubmit={appto} style={{ width: "100%", position: "relative", zIndex: 10 }}>
                <input className="name" type="text" name="name" value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: "100%" }} placeholder="Search any tv shows"/>
                <input className="submit" type="submit" value="Search" />
            </form>
            {query.trim() && suggestions.length > 0 && (
                <div className="tv-search-dropdown" style={{transition:"all 0.3s ease", position: "absolute", top: "52px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "450px", background: "#171c22", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", zIndex: 10, overflowY: "auto", maxHeight: "420px", boxShadow: "0 8px 20px rgba(0,0,0,0.35)", scrollbarWidth: "thin", scrollbarColor: "#ff4d88 #2a2d31" }}>
                    {suggestions.map((item) => (
                        <button
                            type="button"
                            key={item.id}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => selectSuggestion(item)}
                            style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", background: "transparent", border: "none", color: "white", textAlign: "left", padding: "12px 14px", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <img
                                src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : "https://via.placeholder.com/52x72?text=No+Image"}
                                alt={item.name || item.title}
                                style={{ width: "52px", height: "72px", objectFit: "cover", borderRadius: "8px", display: "block", background: "#2a2a2a" }}
                            />
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                                <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.2", color: "#f3f3f3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {item.name || item.title}
                                </span>
                                <span style={{ fontSize: "13px", color: "#c2c2c2", marginTop: "4px" }}>
                                    {getSuggestionMeta(item)}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
            {!isSearching && <h1 className="tvmaintitle" style={{color:"white"}}>Popular tv-series</h1>}
            <div className="tvserispostercontain">
                {tvseries.map((data) =>(
                <div className="tvseriescard" key={data.id}>
                    <img onClick={() =>navigate(`/tvdetails/${data.id}`)} className="tvseriesposter" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name || data.title} />
                    <div className="tvseriesdetails">
                        <p className="tvseriestitle">{data.name || data.title}</p>
                        <p className="tvseriesreleasedate">{data.first_air_date || data.release_date}</p>
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
  );
}

export default Tvseries