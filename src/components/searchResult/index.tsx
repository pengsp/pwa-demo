
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { IconSearch, IconClose, IconLeftArrow } from "../icons";

import "./index.scss";
interface SearchResultProps {
  data: Record<string, any>[],
  keywords?: string | undefined
}
function SearchResult({ data, keywords }: SearchResultProps) {

  return (<div className="search-result-container">
    {keywords ? <div className="result-length">查找到 {data.length} 条数据</div>
      : <div className="result-length">请输入关键词</div>
    }
    {/* <div className="result-length">查找到 {data.length} 条数据</div> */}
    {
      data.map((app: Record<string, any>, index: number) => {
        return <div className="rankings-app" key={`search-result-${app.id.attributes["im:id"]}`}>
          <div className="app-rank">{index + 1}</div>
          <div className="app-icon">
            <img className={index % 2 === 0 ? "odd" : "even"} src={app['im:image'][0].label} />
          </div>
          <div className="app-info">
            <h5 className="app-name">{app['im:name'].label}</h5>
            <div className="app-category">{app.category.attributes.label}</div>
          </div>
        </div>
      })
    }
  </div>)
}
export default SearchResult;