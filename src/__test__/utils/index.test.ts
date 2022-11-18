import { setDefaultImg } from "../../utils/index"

test('图片加载失败的时候，设置默认图片', () => {
  const input = {
    target: {
      src: null,
      onerror: null
    }
  };
  setDefaultImg(input);
  expect(input).toEqual({
    target: {
      src: "default-img.png",
      onerror: null
    }
  });
});