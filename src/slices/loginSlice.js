import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

// npm install @reduxjs/toolkit
// npm install react-cookie

// 쿠키에서 인증 정보를 읽어와서 상태로 변환하는 함수
const loadStateFromCookie = () => {
  const auth = getCookie("auth");
  const username = auth?.username; // 옵셔널 체이닝 연산자를 이용해 안전하게 username 참조
  const accessToken = auth?.accessToken;

  return { username, accessToken };
};

// 사용자 인증 상태의 초기 값
const initState = {
  username: "",
  accessToken: "",
};

/*
  slice를 생성하는 Redux Toolkit의 함수
  slice는 Redux Toolkit에서 제공하는 유틸리티로, Redux 상태 관리를 쉽게 하기 위해 사용
  사용자 로그인 인증 정보를 관리하기 위해 사용
*/
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadStateFromCookie() || initState, //쿠키가 없다면 초깃값 사용

  // login 리듀서 : 로그인 시 호출되어 로그인 인증 정보의 상태를 업데이트
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      
      // 상태 업데이트
      state.username = data.username;
      state.accessToken = data.accessToken;

      // 쿠키 저장
      setCookie("auth", data, 1);
    },

    // logout 리듀서 : 로그아웃 시 호출되어 쿠키를 삭제하고 초기 상태로 되돌림
    logout: (state) => {
      console.log("logout....");
      removeCookie("auth");
      return { ...initState };
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;