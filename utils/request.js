import {
	httpBaseURL
} from "@/api/utils/url.js"

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
 * @param {Object} data 请求头用于附加 token 等参数
 */
export function request(config = {}) {
	let {
		url,
		data = {},
		method = "GET",
		header = {}
	} = config

	const token = uni.getStorageSync('userInfo').token;
	url = BASE_URL + url
	header['access-token'] = token || void 0


	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header,
			success: res => {
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