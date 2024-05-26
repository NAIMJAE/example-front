import React, { useEffect, useState } from 'react'
import { getArticleList } from '../../api/ArticleApi'
import { Link, useLocation } from 'react-router-dom';
import PagingComponent from '../../components/article/PagingComponent';
// 밑에 2개 날짜 포맷
import Moment from 'moment';
import "moment/locale/ko";

const ListPage = () => {

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cate = queryParams.get('cate');
    let pg = queryParams.get('pg');
    if (pg === null) {
        pg = 1;
    }

    // 서버에 전달할 페이지 정보를 저장하는 useState 
    const [pageRequest, setPageRequest] = useState({
        "cate" : cate,
        "type" : null,
        "keyword" : null,
        "pg" : pg,
    })

    // 서버에서 받아온 articleList 정보 저장하는 useState
    const [articleList, setArticleList] = useState(null);

    // 서버에서 게시글 목록 데이터를 가져오는 useEffect
    // useEffect 의존성배열에 pageRequest가 있어 pageRequest의 내용이 바뀔때마다 수행
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getArticleList(pageRequest);
                setArticleList(response);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [pageRequest]);

    console.log(articleList);

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageRequest(prevPageRequest => ({...prevPageRequest, pg: newPg}));
    }

    
  return (
    <div>
        {(cate === "notice") && <p className='title'>공지사항 목록</p>}
        {(cate === "free") && <p className='title'>자유게시판 목록</p>}
        {(cate === "qna") && <p className='title'>Qna게시판 목록</p>}

        <div>
            <Link className='btn' to="/">뒤로</Link>
            <Link className='btn' to={`/write?cate=${cate}&pg=${pageRequest.pg}`}>글쓰기</Link>
        </div>

        <table>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>카테고리</th>
                <th>글쓴이</th>
                <th>날짜</th>
            </tr>
            {/* 왜인지 모르겠는데 null 체크 안하면 오류뜸 */}
            {articleList && articleList.dtoList.length > 0 ? (articleList.dtoList.map((article, index) => (
            <tr key={index}>
                <td>{articleList.startNo - index}</td>
                <td>
                    <Link to={`/view?articleNo=${article.articleNo}&cate=${cate}&pg=${articleList.pg}`}>{article.articleTitle}</Link>
                </td>
                <td>{article.articleCate}</td>
                <td>{article.articleWriter.substring(0, 6) + '****'}</td>
                <td>
                    {/* 날짜 포맷(import 수동) / npm install moment --save */}
                    {Moment(article.articleDate).format('YY-MM-DD HH:mm:ss')}
                </td>
            </tr>
            ))
          ) : (
            <tr>
                <td colSpan="5">게시글이 없습니다.</td>
            </tr>
          )}
        </table>

        <PagingComponent articleList={articleList} changePage={changePage}></PagingComponent>
    </div>
  )
}

export default ListPage;