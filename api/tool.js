import {
	request
} from "../utils/request.js";

const userId = uni.getStorageSync("userInfo").id;

/**
 * 返回全部常用工具列表
 */
export function getTool(pageNo = 1, pageSize = -1) {
	return request({
		url: `/tool?pageNo=${pageNo}&pageSize=${pageSize}`,
		method: "GET",
	}).then(response => {
		return response.data;
	})
}

/**
 * 用户批量新增常用工具
 */
export function addTool(ids) {
	ids = ids.join(",");
	return request({
		url: `/tool/${ids}`,
		method: "PUT",
	}).then(response => {
		return response.data;
	})
}

/**
 * 用户批量删除常用工具
 */
export function deleteTool(ids) {
	ids = ids.join(",");
	return request({
		url: `/tool/${ids}`,
		method: "DELETE",
	}).then(response => {
		return response.data;
	})
}

/**
 * 根据用户id获取常用工具
 */
export function getUserTool(userId) {
	return request({
		url: `/tool/${userId}`,
		method: "GET",
	}).then(response => {
		return response.data;
	})
}