import React from "react"
import { render, screen } from "@testing-library/react"
import Rankings from "../../components/rankings";
import RankingsData from "../mock/rankings.json"

describe("最流行的APP界面渲染测试", () => {
  test("无数据时骨架屏渲染", () => {
    render(<Rankings appList={[]} appRating={{}} />);
    expect(screen.getAllByRole("rankings-app-skeleton").length).toEqual(10);
  });
  test("数据加载时骨架屏渲染", () => {
    let appRatings: any = {}
    let RankingsCount = RankingsData.length;
    RankingsData.map(app => {
      let trackId = app.id.attributes['im:id']
      appRatings[trackId] = {
        averageUserRating: Number((Math.random() * 10).toFixed(5)),
        userRatingCount: Math.floor((Math.random() * 10000) + 50)
      }
      return app;
    })
    render(<Rankings appList={RankingsData} appRating={appRatings} />);
    expect(screen.getAllByRole("rankings-app").length).toEqual(RankingsCount);
  });
});
