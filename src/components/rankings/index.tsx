import { useCallback, useEffect, useState } from "react";
import LazyLoad from 'react-lazyload';
import { apis } from "../../config";
import { setDefaultImg } from "../../utils";
import Skeleton from "../skeleton";
import "./index.scss";


function Rankings() {

  const [appList, setAppList] = useState<Record<string, any>>();
  const [appRating, setAppRating] = useState<Record<string, any>>();
  const [appListHTML, setAppListHTML] = useState<any>();

  const fetchRankings = useCallback(async () => {
    const response = await fetch(apis.rankings);
    const httpCode = response.status
    const data = await response.json()

    if (httpCode === 200) {
      let list = data?.feed.entry;
      let ids: string[] = [];
      // console.log(list)
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
      console.log("fetch failed")
    }
  }, [])

  const fetchLookup = async (ids: string[]) => {
    if (ids.length > 0) {
      let lookupIds = ids.join(',');
      let lokkipApi = `${apis.lookup}${lookupIds}`;
      const response = await fetch(lokkipApi);
      // console.log(response)

      const httpCode = response.status
      const data = await response.json();
      // console.log(data)

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
        console.log("fetch failed")
      }
    }
  }

  useEffect(() => {
    fetchRankings()
  }, [fetchRankings])

  const RateStar = ({ percent }: { percent: number }): JSX.Element => {
    return <div className="rate-star-container">
      <div className="rate-star-ratio" style={{ "width": `${percent * 10}%` }}></div>
    </div>
  }


  useEffect(() => {
    let html: any = null;
    if (appList && appList.length > 0 && appRating) {
      html = appList.map((app: any, index: number) => {
        return (<div className="rankings-app" key={app.id.attributes["im:id"]}>
          <div className="app-rank">{index + 1}</div>
          <div className="app-icon">
            <LazyLoad placeholder={<>123</>} offset={120}>
              <img className={index % 2 === 0 ? "odd" : "even"} src={app['im:image'][1].label} alt="" onError={(e) => setDefaultImg(e)} />
            </LazyLoad>
          </div>
          <div className="app-info">
            <h5 className="app-name">{app['im:name'].label}</h5>
            <div className="app-category">{app.category.attributes.label}</div>
            <div className="app-score">
              <RateStar percent={appRating[app.id.attributes['im:id']].averageUserRating} />
              <span> ({appRating[app.id.attributes['im:id']].userRatingCount})</span>
            </div>
          </div>
        </div>)
      })
    }
    setAppListHTML(html);
  }, [appList, appRating])

  const AppListHTMLSkeleton = () => {
    return (<div>{
      Array(10).fill(1).map((_: any, index: number) => {
        return <div className="rankings-app" key={index}>
          <div className="app-rank">{index + 1}</div>
          <div className="app-icon">
            <Skeleton className={`app-icon-skeleton ${index % 2 === 0 ? "odd" : "even"}`} />
          </div>
          <div className="app-info">
            <h5 className="app-name"><Skeleton className="app-name-skeleton" /></h5>
            <div className="app-category"><Skeleton className="app-category-skeleton" /></div>
            <div className="app-score">
              <Skeleton className="app-score-skeleton" />
            </div>
          </div>
        </div>
      })
    }</div>)
  }
  return (<div className="rankings-container">
    {appListHTML ? appListHTML : <AppListHTMLSkeleton />}
  </div>)
}
export default Rankings;