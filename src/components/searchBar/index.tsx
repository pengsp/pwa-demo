
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { IconSearch, IconClose, IconLeftArrow } from "../icons";

import "./index.scss";
interface SearchBarProps {
  updateSearchResult: (data: any, keywords?: string) => void
  setPageState: (state: boolean) => void
}
function SearchBar({ updateSearchResult, setPageState }: SearchBarProps) {
  const [inSearchState, setInSearchState] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string>('');
  // const [searchResult, setSearchResult] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setPageState(inSearchState)
  }, [inSearchState])

  const searchApps = function (keywords: string) {
    if (keywords === "") {
      // setSearchResult([]);
      updateSearchResult([]);
      return;
    }
    let rankingsStr = localStorage.getItem("rankings");
    let recommendAppsStr = localStorage.getItem("recommend-apps");
    let regexp = new RegExp(keywords, "g");
    let apps = [];
    let rankings = rankingsStr && JSON.parse(rankingsStr);
    let recommendApps = recommendAppsStr && JSON.parse(recommendAppsStr);
    if (rankings instanceof Array) {
      apps.push(...rankings);
    }
    if (recommendApps instanceof Array) {
      apps.push(...recommendApps)
    }
    console.log('apps-1', apps)
    let hits: any[] = [];
    let result = apps.filter((app: Record<string, any>) => {
      let id = app.id.attributes["im:id"];
      let appName = app['im:name']?.label;
      let appSummary = app?.summary?.label;
      let appTitle = app?.title?.label;
      let developer = appTitle.split('-').at(-1);
      if (appName.match(regexp) || appSummary.match(regexp) || developer.match(regexp)) {
        if (!hits.includes(id)) {
          hits.push(id);
          return app;
        }
      }
    })
    console.log('search res', result)
    updateSearchResult(result, keywords);
    // setSearchResult(result)
  }
  const searchAppsDebounce = useDebounce(searchApps, 300)

  const resetSearch = () => {
    setKeywords('');
    // setSearchResult([]);
    updateSearchResult([])
  }

  const inputSearch = (e: any) => {
    let keywords = e.target.value;
    setKeywords(keywords);
    searchAppsDebounce(keywords)
  }

  const cancelSearch = () => {
    resetSearch();
    setInSearchState(false)
  }

  return (<div className="search-bar-container" >
    <div className={`search-bar-wrap ${inSearchState ? "in-search-state" : ""}`}>
      {/* <div className="search-cancel"><IconLeftArrow className="search-cancel-icon" width={32} height={32} onClick={() => setInSearchState(false)} /></div> */}
      <div className="search-bar">
        <div className="search-icon-wrap"><IconSearch className="search-icon" /></div>
        <input className="search-bar-input" placeholder="Search..." value={keywords} onFocus={() => setInSearchState(true)} onChange={inputSearch} maxLength={32} />
        {(keywords && keywords.length > 0) && <div className="search-icon-wrap"><IconClose className="search-icon" onClick={() => resetSearch()} /></div>}
        {inSearchState && <div className="search-action" onClick={() => cancelSearch()} >取消</div>}
      </div>
    </div>
  </div>)
}
export default SearchBar;