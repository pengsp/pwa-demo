import "./index.scss";

function Skeleton({ className, ...rest }: any) {
  return (<div className={`skeleton-container ${className}`} {...rest} ></div>);
}
export default Skeleton;