import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteArticle, getArticleView } from '../../api/ArticleApi';
import { useSelector } from 'react-redux';

const ViewPage = () => {
    
    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleNo = queryParams.get('articleNo');
    const cate = queryParams.get('cate');
    let pg = queryParams.get('pg');

    // 로그인 인증 정보 불러오기
    const loginSlice = useSelector((state) => state.loginSlice);

    // 페이지 이동 훅
    const navigate = useNavigate();

    // 서버에서 가져온 게시글 데이터를 저장하는 useState
    const [article, setArticle] = useState('');

    // 서버에서 해당 게시글 데이터를 가져오는 useEffect
    // useEffect 의존성배열 비어있는 배열이라서 마운트시 1회만 실행됨
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getArticleView({ articleNo });
                console.log(response);
                setArticle(response);
            }catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    // 게시글 삭제 핸들러
    const handleDelete = async() => {
        // 리액트에서는 confirm 앞에 window 붙여야 사용가능
        let result = window.confirm("정말 삭제하시겠습니까?");
        if (result) {
            try {
                const response = await deleteArticle({ articleNo });
                if (response > 0) {
                    alert("삭제 성공")
                    navigate(`/list?cate=${cate}&pg=1`);
                }else {
                    alert("삭제 실패");
                }
            }catch(err) {
                console.log(err);
            }
        }
    }

  return (
    <div>
        {(article.articleCate === "notice") && <p className='title'>공지사항 글보기</p>}
        {(article.articleCate === "free") && <p className='title'>자유게시판 글보기</p>}
        {(article.articleCate === "qna") && <p className='title'>Qna게시판 글보기</p>}

        <form action="">
            <table>
                <tr>
                    <td>
                        <input type="text" name='articleTitle' value={article.articleTitle} readOnly/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea name="articleContent" value={article.articleContent} readOnly></textarea>
                    </td>
                </tr>
                <tr>
                    {loginSlice.username === article.articleWriter ? (
                        <>
                            <Link className='btn' to={`/modify?articleNo=${articleNo}&cate=${cate}&pg=${pg}`}>수정</Link>
                            <input className='btn' type="button" value="삭제" onClick={handleDelete}/>
                        </>
                    ) : (
                        <></>
                    )}
                    <Link className='btn' to={`/list?cate=${cate}&pg=${pg}`}>목록</Link>
                </tr>
            </table>
        </form>
    </div>
  )
}

export default ViewPage