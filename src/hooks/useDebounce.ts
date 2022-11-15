import { useRef } from 'react';

/**
  * useDebounce 防抖函数hooks
  * @param fn 需要包装的函数
  * @param delay 延迟时间，单位ms
  * @return Function
  */
export const useDebounce = (fn: Function, delay = 200): Function => {
  const { current }: any = useRef({ timer: null });
  return function (this: any, ...args: any) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};