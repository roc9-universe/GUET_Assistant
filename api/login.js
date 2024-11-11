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
      'Content-Type': 'application/x-www-form-urlencoded'  // 设置请求头
    }
  })
  .then(response => {
    if (response.code === 200) {
      const token = response.data.token;
	  const id = response.data.id;
      // 保存 token
      uni.setStorageSync('userInfo', { token,id });
	  //console.log("userInfo:", uni.getStorageSync('userInfo'));
      return response;
    } else {
      throw new Error(response.msg || "登录失败");
    }
  })
  .catch(error => {
    console.error("登录请求失败:", error);
    throw error;
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
		if (response.code === 200) {
			const {id,token} = uni.getStorageSync('userInfo');
			uni.setStorageSync('userInfo', { ...response.data,id,token });
			return response.data; // 返回用户信息数据
		} else {
			throw new Error(response.msg || "获取用户信息失败");
		}
	})
	.catch(error => {
		console.error("获取用户信息请求失败:", error);
		throw error;
	});
}