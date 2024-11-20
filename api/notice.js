import {
	request
} from "../utils/request.js";

/**
 * 获取校园公告
 * 
 */
export function getNoticeList() {
	return request({
			url: `/message/getTitleList?userId=${'2100810819'}&type=${'校园公告'}`,
			method: "GET",
		})
		.then(response => {
			return response;
		})
}

/**
 * 根据公告id和公告标题获取公告详情
 * 
 */
export function getMessageList(id, title) {
	return request({
			url: `/message/getMessageList?id=${id}&title=${title}`,
			method: "GET"
		})
		.then(response =>{
			return response;
		})
}