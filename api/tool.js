import {
	request
} from "../utils/request.js";

/**
 * 返回全部常用工具列表
 */
export function updateUserInfo(pageNo = 1, pageSize = -1) {
	return request({
		url: `/tool?pageNo=${pageNo}&pageSize=${pageSize}`,
		method: "GET",
	}).then(response => {
		return response.data;
	})
}