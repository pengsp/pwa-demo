import React from "react"
import { render, screen } from "@testing-library/react"
import RankingsData from "../mock/rankings.json"
import SearchResult from "../../components/searchResult";


describe("搜索结果界面渲染测试", () => {
  test("无数据时骨架屏渲染", () => {
    let keywords = "google";
    let RankingsDataCount = RankingsData.length;
    render(<SearchResult data={RankingsData} keywords={keywords} />);
    expect(screen.getAllByRole("search-result-app").length).toEqual(RankingsDataCount);
  });
});
