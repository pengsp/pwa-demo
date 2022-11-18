import { useEffect, useState } from "react";
import LazyLoad from 'react-lazyload';
import Skeleton from "../skeleton";
import { setDefaultImg } from "../../utils";
import Spin from "../spin";
import "./index.scss";

interface RecommendProps {
  recommendAppList: Record<string, any>[]
}

function Recommend({ recommendAppList }: RecommendProps) {
  const [recommendAppsHTML, setRecommendAppsHTML] = useState<any>();
  useEffect(() => {
    let html: any = null;
    if (recommendAppList && recommendAppList.length > 0) {
      html = recommendAppList.map((app: Record<string, any>) => {
        return <div className="recommend-app" key={`recommend-app-${app?.id?.attributes["im:id"]}`} role="recommend-app">
          <div>
            <LazyLoad height={100} placeholder={<Spin />} >
              <img className="recommend-app-icon" src={app['im:image'][1].label} alt="" onError={(e) => setDefaultImg(e)} />
            </LazyLoad>
          </div>
          <div className="recommend-app-name">{app['im:name'].label}</div>
          <div className="recommend-app-category">{app?.category?.attributes?.label}</div>
        </div>
      })
    }
    setRecommendAppsHTML(html)
  }, [recommendAppList])

  const RecommendAppListSkeleton = () => {
    return (<>
      {Array(10).fill(1).map((_: any, index: number) => {
        return <div className="recommend-app" key={`recommend-app-skeleton-${index}`} role="recommend-app-skeleton">
          <Skeleton className="recommend-app-icon-skeleton" />
          <Skeleton className="recommend-app-name-skeleton" />
          <Skeleton className="recommend-app-category-skeleton" />
        </div>
      })}
    </>)
  }

  return (<div className="recommend-container">
    <h5 className="recommend-title">Recommend</h5>
    <div className="recommend-apps" >
      <div className="recommend-apps-inner" >
        {recommendAppsHTML ? recommendAppsHTML : <RecommendAppListSkeleton />}
      </div>
    </div>
  </div>)
}
export default Recommend;