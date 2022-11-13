import { useEffect, useState } from "react";
import Skeleton from "../skeleton";
import "./index.scss";

function Recommend() {
  const [recommendAppList, setRecommendAppList] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    setRecommendAppList(Array(4).fill(1))
  }, [])
  return (<div className="recommend-container">
    <h5 className="recommend-title">Recommend</h5>
    <div className="recommend-apps" >

      {recommendAppList.map((item: any, index: number) => {
        return <div className="recommend-app" key={index}> <Skeleton width="100%" /></div>
      })}

    </div>

  </div>)
}
export default Recommend;