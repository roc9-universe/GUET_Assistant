/**
 * 比较时间戳并返回时间描述
 *
 * @param {number} timestamp - 要比较的时间戳，单位为毫秒。
 * @returns {string | null} - 返回与当前时间的相对时间描述，如 "1分钟内"、"5分钟"、"3小时"、"2天" 或 "1月"。超过3个月则返回 null。
 */
export function compareTimestamp(timestamp) {
	const currentTime = new Date().getTime();
	const timeDiff = currentTime - timestamp;

	if (timeDiff < 60000) {
		return '1分钟内';
	} else if (timeDiff < 3600000) {
		return Math.floor(timeDiff / 60000) + '分钟';
	} else if (timeDiff < 86400000) {
		return Math.floor(timeDiff / 3600000) + '小时';
	} else if (timeDiff < 2592000000) {
		return Math.floor(timeDiff / 86400000) + '天';
	} else if (timeDiff < 7776000000) {
		return Math.floor(timeDiff / 2592000000) + '月';
	} else {
		return null;
	}
}

/** 
 * 将路径转换为 File 对象（需要在 H5 或兼容环境中使用） 
 * @param {string} filePath 文件路径
 * @param {string} fileName 文件名
 * @returns {File} File 对象
 */
export function createFileFromPath(filePath, fileName) {
	return new File([filePath], fileName, {
		type: "image/png"
	});
}


export function gotoHome() {
	uni.showModal({
		title: "提示",
		content: "页面有误将返回首页",
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		}
	})
}