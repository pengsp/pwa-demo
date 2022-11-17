import { useEffect, useState } from "react";
import LazyLoad from 'react-lazyload';
import { setDefaultImg } from "../../utils";
import Skeleton from "../skeleton";
import Spin from "../spin";
import "./index.scss";

interface RankingsProps {
  appList: Record<string, any>[],
  appRating: Record<string, any>
}

function Rankings({ appList, appRating }: RankingsProps) {
  const [appListHTML, setAppListHTML] = useState<any>();

  const RateStar = ({ percent }: { percent: number }): JSX.Element => {
    return <div className="rate-star-container">
      <div className="rate-star-ratio" style={{ "width": `${percent * 10}%` }}></div>
    </div>
  }

  useEffect(() => {
    let html: any = null;
    if (appList && appList.length > 0 && appRating) {
      html = appList.map((app: any, index: number) => {
        return (<div className="rankings-app" key={app?.id?.attributes["im:id"]}>
          <div className="app-rank">{index + 1}</div>
          <div className="app-icon">
            <LazyLoad placeholder={<Spin />} offset={120}>
              <img className={index % 2 === 0 ? "odd" : "even"} src={app['im:image'][1].label} alt="" onError={(e) => setDefaultImg(e)} />
            </LazyLoad>
          </div>
          <div className="app-info">
            <h5 className="app-name">{app['im:name'].label}</h5>
            <div className="app-category">{app?.category?.attributes?.label}</div>
            <div className="app-score">
              <RateStar percent={appRating[app?.id?.attributes['im:id']]?.averageUserRating} />
              <span> ({appRating[app?.id?.attributes['im:id']]?.userRatingCount})</span>
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