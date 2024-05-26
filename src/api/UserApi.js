import axios from 'axios';
import { RootUrl } from './RootUrl';

const rootURL = RootUrl() + '/user';

// 회원가입
export const registerUser = async (data) => {
    const response = await axios.post(`${rootURL}/register`, data);

    return response.data;
};
// 로그인
export const loginAixos = async (data) => {
    const response = await axios.post(`${rootURL}/login`, data);

    return response;
};
// 회원 목록
export const getUserList = async (data) => {
    const response = await axios.get(`${rootURL}/list`, data);

    return response.data;
};