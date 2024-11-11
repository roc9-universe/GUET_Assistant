import {
	request
} from "../utils/request.js";
import {
	baseUrlApi
} from "./utils/utils";

/**
 * 用户登录
 * @param {string} studentId 学生 ID
 * @param {string} password 密码
 */
export function userLogin(studentId, password) {
	return request({
			url: `/user/login/${studentId}/${password}`,
			method: "POST",
			header: {
				'Content-Type': 'application/x-www-form-urlencoded' // 设置请求头
			}
		})
		.then(response => {
			const token = response.data.token;
			const id = response.data.id;
			// 保存 token
			uni.setStorageSync('userInfo', {
				token,
				id
			});
			return response;
		})
}

/**
 * 获取用户信息
 * @param {number} id 用户 ID
 */
export function getUserInfo(id) {
	return request({
			url: `/user/${id}`,
			method: "GET",
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(response => {
			const {
				id,
				token
			} = uni.getStorageSync('userInfo');
			uni.setStorageSync('userInfo', {
				...response.data,
				id,
				token
			});
			return response.data;
		})
}

/**
 * 根据id获取用户信息
 * 
 */
export function updateUserInfo(data) {
	return request({
		url: "/user",
		method: "PUT",
		data
	}).then(response => {
		return response.data;
	})
}