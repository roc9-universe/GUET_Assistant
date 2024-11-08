import {
	request
} from "@/utils/request";
import {
	baseUrlApi
} from "./utils/utils";

import axios from 'axios';

export function login(studentId, password) {
  // 构建请求体
  const data = {
    studentId: studentId,
    password: password,
  };

  // 发送POST请求
  return axios.post('http://localhost:7777/user/login/${studentId}/${password}', data)
    .then(response => {
        // 检查返回的状态码 code 是否为 200
        if (response.data.code === 200) {
        // 登录成功，获取 token 并存储
			const { token } = response.data.data; // 从 response.data.data 中获取 token
			if (token) {
				localStorage.setItem('token', token); // 保存 token 到 localStorage
				return response.data; // 返回整个 response.data，可以在其他地方使用
            } else {
              throw new Error('未获取到 token');
            }
        } else {
            // 如果 code 不是 200，则抛出错误
			throw new Error(response.data.msg || '登录失败');
        }
    })
    .catch(error => {
        console.error('登录失败:', error);
		throw error;
    });
}