
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { IconSearch, IconClose } from "../icons";

import "./index.scss";

function SearchBar() {
  const [keywords, setKeywords] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Record<string, any>[]>([]);

  const searchApps = function (keywords: string) {
    if (keywords === "") {
      setSearchResult([]);
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
    apps = Array.from(new Set(apps));
    let result = apps.filter((app: Record<string, any>) => {
      let appName = app['im:name']?.label;
      let appSummary = app?.summary?.label;
      let appTitle = app?.title?.label;
      let developer = appTitle.split('-').at(-1);
      if (appName.match(regexp) || appSummary.match(regexp) || developer.match(regexp)) {
        return app;
      }
    })
    console.log('search res', result)
    setSearchResult(result)
  }
  const searchAppsDebounce = useDebounce(searchApps, 300)

  const resetSearh = () => {
    setKeywords('');
    setSearchResult([]);
  }

  const inputSearch = (e: any) => {
    let keywords = e.target.value;
    setKeywords(keywords);
    searchAppsDebounce(keywords)
  }
  return (<div className="search-bar-container" >
    <div className="search-bar">
      <div className="search-icon-wrap"><IconSearch className="search-icon" /></div>
      <input className="search-bar-input" placeholder="Search..." value={keywords} onChange={inputSearch} maxLength={32} />
      {(keywords && keywords.length > 0) && <div className="search-icon-wrap"><IconClose className="search-icon" onClick={() => resetSearh()} /></div>}
    </div>
  </div>)
}
export default SearchBar;