import axios from 'axios';
import { RootUrl } from './RootUrl';

const rootURL = RootUrl() + '/article';

// 게시글 목록 출력 (전체)
export const getArticleList = async (data) => {
    const response = await axios.post(`${rootURL}/list`, data);

    return response.data;
};
// 게시글 출력 (1개)
export const getArticleView = async (data) => {
    const response = await axios.post(`${rootURL}/view`, data);

    return response.data;
};
// 게시글 작성
export const writeArticle = async (data) => {
    const response = await axios.post(`${rootURL}/write`, data);

    return response.data;
};
// 게시글 삭제
export const deleteArticle = async (data) => {
    console.log("삭제")
    const response = await axios.post(`${rootURL}/delete`, data);

    return response.data;
};