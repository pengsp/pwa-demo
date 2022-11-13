import "./index.scss";

interface SkeletonProps {
  width?: string
  height?: string
  shapeType?: string
}

function createStyle({ width, height, shapeType }: SkeletonProps) {
  // const {width,height,shapeType} = styles;
  let styles: any = {};
  if (width) {
    styles['width'] = width;
  }
  if (height) {
    styles['height'] = height;
  }
  switch (shapeType) {
    case 'circle':
      styles['border-radius'] = "50%";
      break;
    case 'square':
      styles['border-radius'] = "4px";
      break;
    case 'default':
    default:
      styles['border-radius'] = "0";
      break;
  }
  return styles;
}
function Skeleton({ width, height, shapeType }: SkeletonProps) {
  const styles = createStyle({ width, height, shapeType });
  return (<div className="skeleton-container" {...styles}></div>);
}
export default Skeleton;