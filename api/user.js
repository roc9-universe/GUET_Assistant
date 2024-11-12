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
				'Content-Type': 'application/x-www-form-urlencoded'
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
 * 用户微信登录
 * @param {string} code 微信登录时获得的 code
 */
export function loginWithWechat(code) {
	return uni.request({
			url: '/user/login',
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			data: {
				code: code // 将微信返回的 code 传给后端
			}
		})
		.then(response => {
			const token = response.data.token;
			const id = response.data.id;
			// 保存 token 和用户信息
			uni.setStorageSync('userInfo', {
				token,
				id
			});
			return response; // 返回整个响应对象
		})
		.catch(error => {
			throw new Error('登录请求失败，请重试');
		});
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

/**
 * 用户注册
 * @param {Object} userInfo - 包含注册所需的用户信息
 * @param {string} userInfo.username - 用户名
 * @param {string} userInfo.type - 用户类型
 * @param {string} userInfo.password - 密码
 * @param {string} userInfo.college - 学院
 * @param {number} userInfo.studentId - 学号
 */
export function userRegister(userInfo) {
	return request({
			url: `/user/register`,
			method: "POST",
			data: userInfo,
			header: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			if (response.code === 200) {
				console.log("注册成功:", response.msg);
				return response;
			} else {
				throw new Error(response.msg || "注册失败");
			}
		})
		.catch(error => {
			console.error("注册请求失败:", error);
			throw error;
		});
}