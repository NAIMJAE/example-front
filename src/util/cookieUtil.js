import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 생성
export const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); //보관기한

  return cookies.set(name, value, { path: "/", expires: expires });
};

// 쿠키 가져오기
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키 삭제
export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path });
};