import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/UserApi'

const RegisterPage = () => {

  // 페이지 이동 훅
  const navigate = useNavigate();

  // 사용자가 입력한 값을 저장하는 useState
  const [user, setUser] = useState({
    "userId" : "",
    "userPw" : "",
    "userName" : "",
    "userAge" : "",
    "userHp" : "",
  })

  // 정보 입력시 useState 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({...prevState, [name]:value}));
  }

  // 회원가입 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(user);
      console.log(response);
      if (response > 0) {
        alert("성공");
        navigate(`/`);
      }else {
        alert("실패");
        navigate(`/register`);
      }
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
        <p className='title'>회원가입</p>

        <form action="">
            <table>
              <tr>
                <td>아이디</td>
                <td>
                  <input type="text" name='userId' onChange={ handleChange }/>
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input type="password" name='userPw' onChange={ handleChange }/>
                </td>
              </tr>
              <tr>
                <td>이름</td>
                <td>
                  <input type="text" name='userName' onChange={ handleChange }/>
                </td>
              </tr>
              <tr>
                <td>나이</td>
                <td>
                  <input type="number" name='userAge' onChange={ handleChange }/>
                </td>
              </tr>
              <tr>
                <td>연락처</td>
                <td>
                  <input type="text" name='userHp' onChange={ handleChange }/>
                </td>
              </tr>
            </table>
            <Link className='btn' to="">취소</Link>
            <input className='btn' type="submit" value="가입" onClick={handleSubmit}/>
        </form>
    </div>
  )
}

export default RegisterPage