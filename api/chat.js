import {
	request
} from "@/utils/request";
// import {
// 	baseUrlApi
// } from "./utils/utils";

/** 
 * 获取问答记录
 */
export function chatQA(content) {
	return request({
			url: `/chat/qa`,
			method: "POST",
			data: {
				content
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(response => {
			return response.data;
		})
}