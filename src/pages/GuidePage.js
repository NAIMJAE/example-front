import React from 'react'

const GuidePage = () => {
  return (
    <div>
        <p className='title'> 가이드</p>

        <table>
            <tr>
                <td colSpan="2">추가 라이브러리 설치 목록</td>
            </tr>
            <tr>
                <td>날짜 포맷 변경</td>
                <td>npm install moment --save</td>
            </tr>
            <tr>
                <td>쿠키 라이브러리</td>
                <td>npm install react-cookie</td>
            </tr>
            <tr>
                <td>redux (상태관리 라이브러리)</td>
                <td>npm install redux react-redux</td>
            </tr>
            <tr>
                <td>toolkit (Redux 도구 모음)</td>
                <td>npm install @reduxjs/toolkit</td>
            </tr>
        </table>
<br/>
        <table>
            <tr>
                <td colSpan="2">사용한 Hook</td>
            </tr>
            <tr>
                <td>useState</td>
                <td>
                    함수형 컴포넌트에서 상태 변수를 선언하는 데 사용<br/>
                    상태 변수는 컴포넌트의 상태를 유지하며,<br/>
                    상태가 변경되면 컴포넌트가 다시 렌더링
                </td>
            </tr>
            <tr>
                <td>useEffect</td>
                <td>
                    컴포넌트가 렌더링될 때와 업데이트될 때,<br/>
                    그리고 언마운트될 때 부수적인 효과를 수행하는 데 사용<br/>
                    데이터를 가져오거나 구독을 설정할 때 사용
                </td>
            </tr>
            <tr>
                <td>useNavigate</td>
                <td>페이지 이동</td>
            </tr>
            <tr>
                <td>useLocation</td>
                <td>
                    현재 경로(location)에 대한 정보를 가져오는 데 사용<br/>
                    현재 URL의 경로, 쿼리 파라미터 등을 가져올 수 있음
                </td>
            </tr>
            <tr>
                <td>useDispatch <br/>(로그인 인증에 사용)</td>
                <td>
                    Redux store에 액션을 보낼 때 사용<br/>
                    컴포넌트에서 액션을 디스패치하여 상태를 변경
                </td>
            </tr>
            <tr>
                <td>useSelector <br/>(로그인 인증에 사용)</td>
                <td>
                    Redux store의 상태를 읽어오는 데 사용<br/>
                    컴포넌트에서 상태를 선택하여 가져올 수 있음
                </td>
            </tr>
        </table>
    </div>
  )
}

export default GuidePage