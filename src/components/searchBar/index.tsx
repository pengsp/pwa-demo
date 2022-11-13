
import { useState } from "react";
import { IconSearch, IconClose } from "../icons";
import "./index.scss";

function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const inputSearch = (e: any) => {
    let keyword = e.target.value;
    // console.log(e)
    setKeyword(keyword)
  }
  return (<div className="search-bar-container" >
    <div className="search-bar">
      <div className="search-icon-wrap"><IconSearch className="search-icon" /></div>
      <input className="search-bar-input" placeholder="Search..." value={keyword} onChange={(e) => inputSearch(e)} maxLength={32} />
      {(keyword && keyword.length > 0) && <div className="search-icon-wrap"><IconClose className="search-icon" onClick={() => setKeyword('')} /></div>}
    </div>
  </div>)


}
export default SearchBar;