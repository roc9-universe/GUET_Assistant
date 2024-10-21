
const BaseURL = 'http://x.xxx.xxx.xxx:xxxx'
//后端地址

// const local_BaseURL = 'http://localhost:9090'
// 本地运行后端地址

function request(url, method, data, header) {
	// url:请求地址
	// method:请求类型
	// data:请求参数
	// header:请求头用于附加 token 等参数
    return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		    const token = uni.getStorageSync('userInfo').token;
		    const header = {
		        token:token,
		    };
        uni.request({
            url: BASE_URL + url,
            method: method,
            data: data,
			header:header,
            success: (res) => {
				// console.log("header",header.Authorization);
				// console.log("token",token)
                // 请求成功
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    // 请求失败
                    reject(res);
                }
            },
            fail: (err) => {
                // 请求失败
                reject(err);
            },
			complete() {
				uni.hideLoading();
			}
        });
    });
}

export { request,BASE_URL };