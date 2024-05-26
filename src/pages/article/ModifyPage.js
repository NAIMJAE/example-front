import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getArticleView, writeArticle } from '../../api/ArticleApi';

const ModifyPage = () => {
    
    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleNo = queryParams.get('articleNo');
    const cate = queryParams.get('cate');
    let pg = queryParams.get('pg');

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

    // 내용 입력시 useState의 값들 변경하는 핸들러
    const handleChange  = (e) => {
        const { name, value } = e.target;
        setArticle(prevState => ({...prevState, [name]:value}));
    }

    // 게시글 작성(수정) 버튼 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (article.articleTitle != null && article.articleContent != null) {
            try {
                const response = await writeArticle(article);
                if (response > 0) {
                    navigate(`/list?cate=${cate}&pg=${pg}`);
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
        {(cate === "notice") && <p className='title'>공지사항 글수정</p>}
        {(cate === "free") && <p className='title'>자유게시판 글수정</p>}
        {(cate === "qna") && <p className='title'>Qna게시판 글수정</p>}

        <form action="">
            <table>
                <tr>
                    <td>
                        <input type="text" name='articleTitle' placeholder='제목입력' value={article.articleTitle} onChange={ handleChange }/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea name="articleContent" id="" placeholder='내용입력' value={article.articleContent} onChange={ handleChange }></textarea>
                    </td>
                </tr>
                <tr>
                    <Link className='btn' to={`/view?articleNo=${articleNo}&cate=${cate}&pg=${pg}`}>취소</Link>
                    <input className='btn' type="submit" value="작성" onClick={ handleSubmit }/>
                </tr>
            </table>
        </form>
    </div>
  )
}

export default ModifyPage