import {
	httpBaseURL
} from "@/api/utils/url.js";

/** 请求地址 */
const BASE_URL = httpBaseURL;
/** 请求白名单，放置一些不需要token的接口 */
const whiteList = [
	"/user/login",
	"/user/register"
];


/**
 * 请求方法
 * @param {Object} url 请求地址
 * @param {Object} method 请求类型
 * @param {Object} header 请求参数
 * @param {Object} data 请求体
 */
export function request(config = {}) {
	let {
		url,
		data = {},
		method = "GET",
		header = {}
	} = config;

	// 处理非白名单请求
	if (!whiteList.some((v) => url.indexOf(v) > -1)) {
		console.log(123, url)
		const token = uni.getStorageSync('userInfo').token;
		header['access-token'] = token || void 0;
	}
	url = BASE_URL + url;


	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header,
			success: res => {
				console.log()
				if (res.data.code === 200) {
					resolve(res.data)
				} else if (res.data.code === 400) {
					uni.showModal({
						title: "错误提示",
						content: res.data.msg,
						showCancel: false
					})
					reject(res.data)
				} else {
					
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
					reject(res.data)
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}