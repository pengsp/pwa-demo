import { useState } from "react";
import Rankings from "../../components/rankings";
import Recommend from "../../components/recommend";
import SearchBar from "../../components/searchBar";
import SearchResult from "../../components/searchResult";

function Home() {
  const [inSearchState, setInSearchState] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Record<string, any>[]>([]);
  const [searchKeywords, setSearchKeywold] = useState<string | undefined>();
  return (<>
    <SearchBar
      setPageState={(state) => setInSearchState(state)}
      updateSearchResult={(data, keywolds) => {
        setSearchKeywold(keywolds);
        setSearchResult(data);
      }
      } />
    <div className="main">
      <div style={{ display: `${inSearchState ? "none" : "block"}` }}>
        <Recommend />
        <Rankings />
      </div>
      <div style={{ display: `${!inSearchState ? "none" : "block"}` }}>
        <SearchResult data={searchResult} keywords={searchKeywords} />
      </div>
    </div>
  </>)
}
export default Home;