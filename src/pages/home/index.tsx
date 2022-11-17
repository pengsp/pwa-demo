import { useCallback, useEffect, useState } from "react";
import Rankings from "../../components/rankings";
import Recommend from "../../components/recommend";
import SearchBar from "../../components/searchBar";
import SearchResult from "../../components/searchResult";
import { apis } from "../../config";

const cacheVersion = process.env.REACT_APP_CACHE_VERSION;

function Home() {
  const [inSearchState, setInSearchState] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Record<string, any>[]>([]);
  const [searchKeywords, setSearchKeywold] = useState<string | undefined>();
  const [recommendAppList, setRecommendAppList] = useState<Record<string, any>[]>([]);
  const [appList, setAppList] = useState<Record<string, any>[]>([]);
  const [appRating, setAppRating] = useState<Record<string, any>>({});

  const fetchRecommendAppList = async () => {
    const response = await fetch(apis.recommend);
    const httpCode = response.status
    const data = await response.json();
    if (httpCode === 200) {
      const list = data?.feed.entry;
      setRecommendAppList(list);
      localStorage.setItem('recommend-apps', JSON.stringify(list));
    } else {
      console.log("top grossing applications fetch failed")
    }
  }

  useEffect(() => {
    fetchRecommendAppList()
  }, [])


  const fetchRankings = useCallback(async () => {
    const response = await fetch(apis.rankings);
    const httpCode = response.status
    const data = await response.json()
    if (httpCode === 200) {
      let list = data?.feed.entry;
      let ids: string[] = [];
      if (!(list instanceof Array)) {
        list = [list];
      }
      list.map((app: Record<string, any>) => {
        let id = app.id.attributes['im:id']
        ids.push(id)
        return app;
      })
      fetchLookup(ids);
      setAppList(list);
      window.localStorage.setItem('rankings', JSON.stringify(list));
    } else {
      console.log("top free applications fetch failed")
    }
  }, [])

  const fetchLookup = async (ids: string[]) => {
    if (ids.length > 0) {
      let lookupIds = ids.join(',');
      let lokkipApi = `${apis.lookup}${lookupIds}&v=${cacheVersion}`;
      const response = await fetch(lokkipApi);
      const httpCode = response.status
      const data = await response.json();
      if (httpCode === 200) {
        const lookupRes = data?.results;
        let appRatings: Record<string, any> = {};
        lookupRes.map((item: Record<string, any>) => {
          let { trackId, averageUserRating, userRatingCount } = item;
          appRatings[trackId] = {
            averageUserRating,
            userRatingCount
          }
          return item;
        })
        setAppRating(appRatings)
      } else {
        console.log("lookup failed")
      }
    }
  }

  useEffect(() => {
    fetchRankings()
  }, [fetchRankings])

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
        <Recommend recommendAppList={recommendAppList} />
        <Rankings appRating={appRating} appList={appList} />
      </div>
      <div style={{ display: `${!inSearchState ? "none" : "block"}` }}>
        <SearchResult data={searchResult} keywords={searchKeywords} />
      </div>
    </div>
  </>)
}
export default Home;