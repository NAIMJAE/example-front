import React, { useState } from 'react'
import { loginAixos } from '../../api/UserApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../slices/loginSlice";

const LoginPage = () => {

  const navigate = useNavigate();
  // npm install redux react-redux
  const dispatch = useDispatch();

  // 입력한 아이디 비밀번호를 저장할 useState
  const [loginState, setLoginState] = useState({
    "userId" : "",
    "userPw" : "",
  })

  // 입력시 loginState를 저장하는 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginState(prevState => ({...prevState, [name]:value}));
  }

  // 로그인 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAixos(loginState);
      console.log(response);

      // redux 액션 실행
      dispatch(login(response.data));

      // 메인 이동
      navigate("/");

    }catch(err) {
      console.log(err);
    }
  } 

  return (
    <div className='loginPage'>
        <p className='title'>로그인</p>

        <form action="">
            <input type="text" name='userId' onChange={handleChange}/>
            <br/><br/>
            <input type="password" name='userPw' onChange={handleChange}/>
            <br/><br/>
            <input type="submit" value="로그인" onClick={handleSubmit}/>
        </form>

        <div>
          <p>abcd1111 / abcd1234!</p>
          <p>abcd2222 / abcd1234!</p>
          <p>user1234 / abcd1234!</p>
          <p>user5678 / abcd1234!</p>
        </div>
    </div>
  )
}

export default LoginPage