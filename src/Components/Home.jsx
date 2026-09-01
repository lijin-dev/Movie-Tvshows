import { useEffect, useState } from "react"
import "../CSS/Home.css"
import { getPopularMovies, searchMovies } from "../Services/api";
import { Link, useNavigate } from "react-router-dom";

function Home(){

    const[query, setQuery] = useState("");
    const[movies, setMovies] = useState([]);
    const[suggestions, setSuggestions] = useState([]);
    const[loading, setLoading] = useState(true);
    const[isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!suggestions.length) return;

        const handleOutsideClick = (event) => {
            const dropdown = document.querySelector(".movie-search-dropdown");
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
                const results = await searchMovies(trimmedQuery);
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
        if(!searchValue) return
        if(loading) return

        setLoading(true);
        setIsSearching(true);
        setSuggestions([]);

        try{
            const searchResults = await searchMovies(searchValue);
            setMovies(searchResults)

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    const selectSuggestion = (item) => {
        const selectedTitle = item.title || item.name;
        setQuery(selectedTitle);
        setSuggestions([]);
        setMovies([item]);
        setIsSearching(true);
    }

    const getSuggestionMeta = (item) => {
        const type = item.media_type === "tv" ? "TV" : "Movie";
        const year = (item.release_date || item.first_air_date || "").slice(0, 4);
        return `${type} • ${year || "Unknown"}`;
    }

    const film = async () =>{
        try{
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
            setSuggestions([]);
            setIsSearching(false);

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() =>{
        film();
    }, [])
    
    const home = () =>{
        film();
        setQuery("");
        setSuggestions([]);
        setIsSearching(false);
    }

    return(
        <>
        <div className="contain">
            <div className="netflix-text">
                Lijinflix
            </div>
            <div className="menu">
                <p style={{cursor:"pointer"}} onClick={home}>Home</p>
                <p style={{cursor:"pointer"}} onClick={home}>Movies</p>
                <Link style={{textDecoration:"none", color:"white"}} to="/tvseries/">
                <p style={{cursor:"pointer"}}>Tv-Series</p>
                </Link>
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
                <input className="name" type="text" name="name" value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: "100%" }}/>
                <input className="submit" type="submit" />
            </form>
            {query.trim() && suggestions.length > 0 && (
                <div className="movie-search-dropdown" style={{transition:"all 0.3s ease", position: "absolute", top: "52px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "450px", background: "#171c22", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", zIndex: 10, overflowY: "auto", maxHeight: "420px", boxShadow: "0 8px 20px rgba(0,0,0,0.35)", scrollbarWidth: "thin", scrollbarColor: "#ff4d88 #2a2d31" }}>
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
                                alt={item.title || item.name}
                                style={{ width: "52px", height: "72px", objectFit: "cover", borderRadius: "8px", display: "block", background: "#2a2a2a" }}
                            />
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                                <span style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.2", color: "#f3f3f3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {item.title || item.name}
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
        {!isSearching && <h1 className="moviehead" style={{color:"white"}}>Popular Movies</h1>}
        <div className="image_container">
            {movies.map((data) => (
            <div className="movie_card" key={data.id}>
                <img onClick={() => navigate(`/moviedetails/${data.id}`)} className="movie_poster" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
                <div className="movie_details">
                    <p className="movie_title">{data.title}</p>
                    <p className="movie_release_date">{data.release_date}</p>
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

export default Home