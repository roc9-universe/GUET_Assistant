<script setup>
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { getMessageType, postMessage } from "../../api/notice.js";
import { getUserList } from "../../api/user.js";

const submitForm = ref({
	title: "",
	userId: [],
	content: "",
	status: 0,
	publishTime: "",
	regularTime: "",
	messageType: "系统消息"
});

/** 消息类型 */
const messageType = ref([]);
/** 用户范围 */
const userRange = ref([]);
/** 用于渲染提交表单中选中的userId */
const selectedUserRange = computed(() =>
	userRange.value.filter((user) => submitForm.value.userId.includes(user.value))
);
/** 选择器实例 */
const popup = ref();
const openSelectPopup = () => {
	popup.value.open("right");
};
const selectUser = (value) => {
	submitForm.value.userId = value;
};

const getData = () => {
	getUserList().then((res) => {
		const data = [];
		for (const key in res) {
			data.push({
				value: key,
				text: res[key]
			});
		}
		userRange.value = data;
	});
	getMessageType().then((res) => {
		const data = [];
		for (const value of res.data) {
			data.push({
				value: value,
				text: value
			});
		}
		messageType.value = data;
	});
};

onShow(() => {
	getData();
	// 获取缓存
	submitForm.value = {
		...submitForm.value,
		...uni.getStorageSync("publishDraft")
	};
});

/** 信息白名单：确认需要指定用户群体 */
const messageWhite = () => {
	return ["系统消息", "活动消息"].includes(submitForm.value.messageType);
};

/** 消息类型修改的时候触发 */
const messageTypeChange = () => {
	if (!messageWhite()) {
		submitForm.value.userId = [];
	}
};

/** 去编辑内容页面 */
const goEdit = () => {
	uni.setStorageSync("publishDraft", submitForm.value);
	uni.navigateTo({
		url: "/pages/edit/edit"
	});
};

/** 表单校验 */
const formValidate = () => {
	console.log(submitForm.value);
	const formFields = {
		title: "标题不能为空",
		content: "内容不能为空",
		userId: "用户不能为空",
		messageType: "请选择消息类型",
		regularTime: "请选择发布时间"
	};

	/** 是否为有效内容 */
	const effectiveContent = (str) => {
		if (typeof str === "string") {
			return str.replace(/\s+/g, "") === ""; // \s+ 匹配所有空白字符并去除
		} else if (Array.isArray(str)) {
			return str.length <= 0;
		}
		// 如果是其他类型，返回 false，表示无效内容
		return false;
	};

	for (let field in formFields) {
		// 如果不是系统或活动消息,则不需要指定用户群体
		if (field == "userId" && !messageWhite()) continue;
		const fieldValue = submitForm.value[field];
		// 判断值是否为空或者为有效内容
		if (!fieldValue || effectiveContent(fieldValue)) {
			uni.showToast({
				title: formFields[field],
				icon: "error"
			});
			return false;
		}
	}
	return true;
};

/** 发布信息 */
const onPubish = async () => {
	if (formValidate()) {
		uni.showLoading({
			title: "发布中",
			mask: true
		});

		// 处理提交数据
		submitForm.value.publishTime = submitForm.value.regularTime;
		if (submitForm.value.userId.length <= 0) {
			submitForm.value.userId = [""];
		}

		try {
			await postMessage(submitForm.value);
			uni.hideLoading();
			uni.navigateBack();
			uni.showToast({
				title: "发布成功",
				icon: "success"
			});
			uni.removeStorage({
				key: "publishDraft"
			});
		} catch {
			uni.hideLoading();
			uni.showToast({
				title: "发布失败",
				icon: "error"
			});
		}
	}
};

/** 取消发布 */
const onCancel = () => {
	uni.navigateBack();
	uni.removeStorage({
		key: "publishDraft"
	});
};
</script>

<template>
	<view class="box">
		<view>
			<uni-section title="消息标题" type="line">
				<view class="pubish-view">
					<uni-easyinput v-model="submitForm.title" focus placeholder="请输入标题"></uni-easyinput>
				</view>
			</uni-section>
			<uni-section title="消息类型" type="line">
				<view class="pubish-view">
					<uni-data-select
						v-model="submitForm.messageType"
						placeholder="请选择消息类型"
						:clear="true"
						:localdata="messageType"
						@change="messageTypeChange()"
					/>
				</view>
			</uni-section>
			<uni-section v-if="messageWhite()" title="用户群体" type="line">
				<view class="pubish-view">
					<view class="pubish-content pubish-user" @click="openSelectPopup()">
						<view class="tip" v-if="selectedUserRange.length == 0">点击选择用户群体</view>

						<view v-for="(item, index) in selectedUserRange" :key="item.value" class="pubish-user-item">
							<!-- <uni-tag :inverted="true" :text="item.text" type="primary" /> -->
							{{ item.text }}
						</view>
					</view>
				</view>
			</uni-section>
			<uni-section title="定时发布" type="line">
				<view class="pubish-view">
					<uni-datetime-picker v-model="submitForm.regularTime" type="datetime" />
				</view>
			</uni-section>

			<uni-section title="消息内容" type="line">
				<view class="pubish-view">
					<view class="pubish-content" @click="goEdit()">
						<rich-text :nodes="submitForm.content"></rich-text>
					</view>
				</view>
			</uni-section>
		</view>
		<view class="pubish-button-box">
			<button class="pubish-button" hover-class="is-hover" @click="onPubish()">发布</button>
			<button style="margin-top: 10px; margin-bottom: 10vh" @click="onCancel()">取消</button>
		</view>

		<!-- 选择器弹窗 -->
		<select-popup ref="popup" :range="userRange" :sure="selectUser" :initial-value="submitForm.userId">
			<template #head>
				<view class="user-box">
					<image class="user-img" mode="aspectFill" src="../../static/icon/publish/user.svg"></image>
					<view class="user-title">用户列表</view>
				</view>
			</template>
			<template #tip>
				<uni-section title="选择发送的用户" type="line"></uni-section>
			</template>
		</select-popup>
	</view>
</template>

<style scoped lang="scss">
.box {
	display: flex;
	flex-direction: column;
	background-color: white;
}

.pubish-view {
	padding: $page-padding;
}

.pubish-content {
	min-height: 200rpx;
	max-height: 500rpx;
	padding: $page-padding;
	border: 1px solid $border-color;
	border-radius: 4px;
	overflow: auto;

	.tip {
		color: $uni-text-color-grey;
	}
}

.pubish-user {
	min-height: 60rpx;
	display: flex;
	flex-wrap: wrap;

	.pubish-user-item {
		padding: 10rpx;
		margin: 0 10rpx 10rpx 0;
		color: $brand-theme-color;
		border: 1px solid $brand-theme-color;
		border-radius: 8rpx;
	}
}

.pubish-button-box {
	padding: $page-padding;

	.pubish-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $brand-theme-color;
		color: white;
	}

	.is-hover {
		background-color: darken($brand-theme-color, 10%);
	}
}

.user-box {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	line-height: 100rpx;
	font-weight: bold;
}

.user-box {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;

	.user-img {
		width: 100rpx;
		height: 100rpx;
	}

	.user-title {
		font-size: 40rpx;
		font-weight: bold;
		padding: 20rpx;
		display: flex;
	}
}
</style>
