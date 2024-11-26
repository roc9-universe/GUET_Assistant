import {
	wsBaseURL
} from "@/api/utils/url.js";
import {
	ref
} from "vue";

/** 请求地址 */
const BASE_URL = wsBaseURL;

const userId = uni.getStorageSync("userInfo").id;

/** 通知数量 */
export const noticeNumber = ref(uni.getStorageSync("noticeNumber") || {
	all: 0, // 全部
	system: 0, // 系统消息
	activity: 0, // 活动通知
});

/** 控制通知红点 */
export const controlRed = () => {
	if (noticeNumber.value.all > 0) {
		console.log(noticeNumber.value);
		uni.setTabBarBadge({
			index: 2,
			text: String(noticeNumber.value.all),
		});
	} else {
		noticeNumber.value.all = 0;
		uni.removeTabBarBadge({
			index: 2
		});
	}
	uni.setStorageSync("noticeNumber", noticeNumber.value);
}

/** 通知处理 */
const noticeHandle = {
	系统消息: () => {
		noticeNumber.value.system++;
	},
	活动消息: () => {
		noticeNumber.value.activity++;
	}
};


/** WebSocket 单例 */
let socketInstance = null;

export function socket() {
	if (socketInstance) {
		console.log("WebSocket 已存在，已返回当前实例");
		return socketInstance;
	}

	// 创建 WebSocket 连接
	socketInstance = uni.connectSocket({
		url: `${BASE_URL}/ws/messages`,
		header: {
			'content-type': 'application/json'
		},
		success(res) {
			console.log("WebSocket 连接创建成功", res);
		}
	});

	uni.onSocketOpen(function(res) {
		console.log('WebSocket连接已打开！');
	});

	/** 接收通知 */
	uni.onSocketMessage(function(res) {
		console.log("收到服务器内容：" + res.data);
		/** 通知数据 */
		const data = JSON.parse(res.data);
		// 同步本地消息缓存
		noticeNumber.value = uni.getStorageSync("noticeNumber") || noticeNumber.value;

		// 解析该通知是否为当前用户通知
		if (data.userId == userId) {
			// 检查data.messageType是否在noticeHandle中
			console.log(data.messageType)
			if (noticeHandle[data.messageType]) {
				noticeNumber.value.all++;
				noticeHandle[data.messageType]();
			} else {
				console.log(`未处理的消息类型: ${data.messageType}`);
			}
		}

		// 设置通知红点
		controlRed();
	});

	uni.onSocketError(function(res) {
		console.error('WebSocket连接打开失败，请检查！');
	});

	uni.onSocketClose(function(res) {
		console.log('WebSocket 已关闭！');
	});

}