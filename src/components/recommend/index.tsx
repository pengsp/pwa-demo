import { useEffect, useState } from "react";
import { apis } from "../../config";
import Skeleton from "../skeleton";
import "./index.scss";

function Recommend() {
  const [recommendAppList, setRecommendAppList] = useState<Record<string, any>[]>([]);

  const fetchRecommendAppList = async () => {
    const response = await fetch(apis.recommend);
    const httpCode = response.status
    const data = await response.json();
    console.log(data);
    if (httpCode === 200) {
      const list = data?.feed.entry;
      setRecommendAppList(list);
    } else {
      console.log("出错了")
    }
    console.log(data)
  }



  useEffect(() => {
    fetchRecommendAppList()
  }, [])
  return (<div className="recommend-container">
    <h5 className="recommend-title">Recommend</h5>
    <div className="recommend-apps" >

      {recommendAppList.map((app: any, index: number) => {
        return <div className="recommend-app" key={index}>
          <div className="recommend-icon">
            {/* <img src={app} /> */}
          </div>

        </div>
      })}

    </div>

  </div>)
}
export default Recommend;