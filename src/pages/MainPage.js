import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../slices/loginSlice';

const MainPage = () => {

  // 저장된 로그인 인증 정보를 불러오는 Hook
  const dispatch = useDispatch();
  const loginSlice = useSelector((state) => state.loginSlice);

  const logoutHandler = () => {
    // 로그아웃 액션 실행
    dispatch(logout());
  };

  return (
    <div>
        <p>메인페이지</p>

        {!loginSlice.username ? (
          <>
            <Link className='list' to="/login">로그인</Link><br/>
            <Link className='list' to="/register">회원가입</Link><br/>
          </>
        ) : (
          <>
          <Link className='list' to="/user/logout" onClick={logoutHandler}>로그아웃</Link><br/>
          <Link className='list' to="/userList">회원 목록</Link><br/>
          <Link className='list' to="/list?cate=notice">공지사항 목록</Link><br/>
          <Link className='list' to="/list?cate=free">자유게시판 목록</Link><br/>
          <Link className='list' to="/list?cate=qna">QnA 목록</Link><br/>
          </>
        )}
        <Link className='list' to="/guide">가이드</Link><br/>

    </div>
  )
}

export default MainPage;