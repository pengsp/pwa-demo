import { useEffect, useMemo, useState } from "react";
import { apis } from "../../config";
import "./index.scss";

function Rankings() {
  const [appList, setAppList] = useState<Record<string, any>>();

  const fetchRankings = async () => {
    const response = await fetch(apis.rankings);
    const httpCode = response.status
    const data = await response.json()
    if (httpCode === 200) {
      const list = data?.feed.entry;
      setAppList(list);
    } else {
      console.log("出错了")
    }
    console.log(data)
  }
  useEffect(() => {
    fetchRankings()
  }, [])
  const rankings = useMemo(() => {
    if (appList) {
      return appList.map((app: any, index: number) => {
        return <div className="rankings-app" key={index}>
          <div className="app-rank">{index + 1}</div>
          <div className="app-icon">
            <img className={index % 2 === 0 ? "odd" : "even"} src={app['im:image'][0].label} />
          </div>
          <div className="app-info">
            <h5 className="app-name">{app['im:name'].label}</h5>
            <div className="app-category">{app.category.attributes.label}</div>
            <div className="app-score">31</div>
          </div>
        </div>
      })
    }
  }, [appList])
  return (<div className="rankings-container">
    {rankings}
  </div>)
}
export default Rankings;