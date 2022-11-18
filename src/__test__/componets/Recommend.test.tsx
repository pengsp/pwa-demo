import React from "react"
import { render, screen } from "@testing-library/react"
import Recommend from "../../components/recommend"
import RecommendApps from "../mock/recommend.json"

describe("推荐APP组件测试", () => {
  test("数据加载时骨架屏渲染", () => {
    render(<Recommend recommendAppList={[]} />);
    expect(screen.getAllByRole("recommend-app-skeleton").length).toEqual(10);
  });
  test("数据加载完界面渲染", async () => {
    let RecommendAppsCount = RecommendApps.length;
    render(<Recommend recommendAppList={RecommendApps} />);
    expect(screen.getAllByRole("recommend-app").length).toEqual(RecommendAppsCount);
  });
});
