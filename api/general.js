import {
	request
} from "../utils/request.js";

/**
 * 文件上传
 * @param file 上传的文件
 */
export function upload(file) {
	const formData = new FormData();
	formData.append("file", file);
	return request({
			url: `/common/upload`,
			method: "POST",
			data: formData
		})
		.then(response => {
			return response;
		})
}