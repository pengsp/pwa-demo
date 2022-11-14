import { useEffect, useMemo, useState } from "react";
import LazyLoad from 'react-lazyload';

import { apis } from "../../config";
import "./index.scss";

function Rankings() {
  const [appList, setAppList] = useState<Record<string, any>>();
  const [appRating, setAppRating] = useState<Record<string, any>>();
  const fetchRankings = async () => {
    const response = await fetch(apis.rankings);
    const httpCode = response.status
    const data = await response.json()
    if (httpCode === 200) {
      const list = data?.feed.entry;
      let ids: string[] = [];
      list.map((app: Record<string, any>) => {
        let id = app.id.attributes['im:id']
        ids.push(id)
      })
      fetchLookup(ids);
      setAppList(list);
    } else {
      console.log("出错了")
    }
    console.log(data)
  }
  const fetchLookup = async (ids: string[]) => {
    if (ids.length > 0) {
      let lookupIds = ids.join(',');
      let lokkipApi = `${apis.lookup}${lookupIds}`;
      const response = await fetch(lokkipApi);
      const httpCode = response.status
      const data = await response.json();
      console.log('fetchLookup', data);
      if (httpCode === 200) {
        const lookupRes = data?.results;
        let appRatings: Record<string, any> = {};
        lookupRes.map((item: Record<string, any>) => {
          let { trackId, averageUserRating, userRatingCount } = item;
          console.log({
            averageUserRating,
            userRatingCount
          })
          appRatings[trackId] = {
            averageUserRating,
            userRatingCount
          }
        })
        console.log('appRatings', appRatings);
        setAppRating(appRatings)
      } else {
        console.log("出错了")
      }
      console.log(data)
    }

  }

  useEffect(() => {
    fetchRankings()
  }, [])

  const RateStar = ({ percent }: { percent: number }) => {
    return <div className="rate-star-container">
      <div className="rate-star-ratio" style={{ "width": `${percent * 10}%` }}></div>
    </div>
  }
  const appListFragment = useMemo(() => {
    if (appList && appList.length > 0 && appRating) {
      return appList.map((app: any, index: number) => {
        return <div className="rankings-app" key={index}>
          <div className="app-rank">{index + 1}</div>
          <div className="app-icon">
            <LazyLoad >
              <img className={index % 2 === 0 ? "odd" : "even"} src={app['im:image'][0].label} />
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
        </div>
      })
    }
  }, [appList, appRating])

  return (<div className="rankings-container">  {appListFragment}  </div>)
}
export default Rankings;