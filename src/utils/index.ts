import defaultImg from "../assets/images/default-img.png";

export const setDefaultImg = (e: any) => {
  var img = e.target;
  img.src = defaultImg;
  img.onerror = null;
}