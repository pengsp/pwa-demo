import { useEffect, useMemo, useState } from "react";
import LazyLoad from 'react-lazyload';
import { apis } from "../../config";
import "./index.scss";

function Recommend() {
  const [recommendAppList, setRecommendAppList] = useState<Record<string, any>[]>([]);
  const fetchRecommendAppList = async () => {
    const response = await fetch(apis.recommend);
    const httpCode = response.status
    const data = await response.json();
    if (httpCode === 200) {
      const list = data?.feed.entry;
      setRecommendAppList(list);
      localStorage.setItem('recommend-apps', JSON.stringify(list));
    } else {
      console.log("出错了")
    }
  }

  useEffect(() => {
    fetchRecommendAppList()
  }, [])

  const recommendAppsHTML = useMemo(() => {
    if (recommendAppList && recommendAppList.length > 0) {
      return recommendAppList.map((app: Record<string, any>) => {
        return <div className="recommend-app" key={app.id.attributes["im:id"]}>
          <div>
            <LazyLoad height={100} placeholder="Loading..." >
              <img className="recommend-app-icon" src={app['im:image'][1].label} />
            </LazyLoad>
          </div>
          <div className="recommend-app-name">{app['im:name'].label}</div>
          <div className="recommend-app-category">{app.category.attributes.label}</div>
        </div>
      })
    }
    return <></>;
  }, [recommendAppList])

  return (<div className="recommend-container">
    <h5 className="recommend-title">Recommend</h5>
    <div className="recommend-apps" >
      <div className="recommend-apps-inner" >
        {recommendAppsHTML}
      </div>
    </div>
  </div>)
}
export default Recommend;