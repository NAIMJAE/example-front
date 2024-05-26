import React, { useState } from 'react'
import { writeArticle } from '../../api/ArticleApi';
import { Link, useNavigate , useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WritePage = () => {
    
    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cate = queryParams.get('cate');
    let pg = queryParams.get('pg');

    // 로그인 인증 정보 불러오기
    const loginSlice = useSelector((state) => state.loginSlice);

    // 페이지 이동 훅
    const navigate = useNavigate();

    // 사용자가 입력한 값을 저장하는 useState
    const [article, setArticle] = useState({
        "articleTitle" : "",
        "articleContent" : "",
        "articleCate" : cate,
        "articleWriter" : loginSlice.username,
    })

    // 내용 입력시 useState의 값들 변경하는 핸들러
    const handleChange  = (e) => {
        const { name, value } = e.target;
        setArticle(prevState => ({...prevState, [name]:value}));
    }

    // 게시글 작성 버튼 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (article.articleTitle !== "" || article.articleContent !== "") {
            try {
                const response = await writeArticle(article);
                if (response > 0) {
                    navigate(`/list?cate=${cate}&pg=1`);
                }else {
                    alert("실패");
                }
            }catch(err) {
                console.log(err);
            }
        }else {
            alert("빈칸있음");
        }
    }

  return (
    <div>
        {(cate === "notice") && <p className='title'>공지사항 글쓰기</p>}
        {(cate === "free") && <p className='title'>자유게시판 글쓰기</p>}
        {(cate === "qna") && <p className='title'>Qna게시판 글쓰기</p>}

        <form action="">
            <table>
                <tr>
                    <td>
                        <input type="text" name='articleTitle' placeholder='제목입력' onChange={ handleChange }/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea name="articleContent" id="" placeholder='내용입력' onChange={ handleChange }></textarea>
                    </td>
                </tr>
                <tr>
                    <Link className='btn' to={`/list?cate=${cate}&pg=${pg}`}>취소</Link>
                    <input className='btn' type="submit" value="작성" onClick={ handleSubmit }/>
                </tr>
            </table>
        </form>
    </div>
  )
}

export default WritePage