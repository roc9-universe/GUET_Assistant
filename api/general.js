import {
	request
} from "../utils/request.js";
import {
	httpBaseURL
} from "@/api/utils/url.js";

/**
 * 文件上传
 * @param file 上传的文件
 */
export function upload(file = null) {
	const url = "/common/upload"
	if (file) {
		const formData = new FormData();
		formData.append("file", file);
		return request({
				url: url,
				method: "POST",
				data: formData
			})
			.then(response => {
				return response;
			})
	} else {
		return httpBaseURL + url;
	}

}