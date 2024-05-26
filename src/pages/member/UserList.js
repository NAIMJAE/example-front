import React, { useEffect, useState } from 'react'
import { getUserList } from '../../api/UserApi';

const UserList = () => {

  // 불러온 회원 목록을 저장할 useState
  const [userList, setUserList] = useState(null);

  // 회원 목록을 불러오는 useEffect
  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await getUserList();
        console.log(response);
        setUserList(response);

      }catch(err) {
        console.log(err);
      }
    }
    fetchData();
  },[])

  return (
    <div>
        <p className='title'>회원 목록</p>

        <table>
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>나이</th>
                <th>전화번호</th>
                <th>가입일</th>
            </tr>
            {userList && userList.length > 0 ? (userList.map((user, index) => (
              <tr key={index}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.userAge}</td>
                <td>{user.userHp}</td>
                <td>{user.rdate}</td>
              </tr>
            ))):(
              <></>
            )}
        </table>
    </div>
  )
}

export default UserList