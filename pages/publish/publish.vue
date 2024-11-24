<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { getMessageType, postMessage } from "../../api/notice.js";

const submitForm = ref({
	title: "",
	content: "",
	userId: [],
	status: 0,
	publishTime: "",
	regularTime: "",
	messageType: ""
});

const messageType = ref([]);

const getData = () => {
	getMessageType().then((res) => {
		console.log(res);
		const data = [];
		for (const value of res.data) {
			data.push({ value: value, text: value });
		}
		messageType.value = data;
	});
};

onShow(() => {
	getData();
	submitForm.value = {
		...submitForm.value,
		...uni.getStorageSync("publishDraft")
	};
});

/** 消息类型修改的时候触发 */
const messageTypeChange = () => {
	if (!["系统消息", "活动消息"].includes(submitForm.value.messageType)) {
		delete submitForm.value.userId;
	}
};

/** 去编辑内容页面 */
const goEdit = () => {
	uni.setStorageSync("publishDraft", submitForm.value);
	uni.navigateTo({
		url: "/pages/edit/edit"
	});
};

/** 发布信息 */
const onPubish = async () => {
	uni.showLoading({
		title: "发布中",
		mask: true
	});
	submitForm.value.publishTime = submitForm.value.regularTime;
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
			<uni-section v-if="['系统消息', '活动消息'].includes(submitForm.messageType)" title="用户群体" type="line">
				<view class="pubish-view">
					<uni-easyinput focus placeholder="请选择用户群体"></uni-easyinput>
				</view>
			</uni-section>
			<uni-section title="定时发布" type="line">
				<view class="pubish-view">
					<uni-datetime-picker v-model="submitForm.regularTime" type="datetime" />
				</view>
			</uni-section>
			<uni-section title="消息类型" type="line">
				<view class="pubish-view">
					<uni-data-select
						v-model="submitForm.messageType"
						placeholder="请选择消息类型"
						:clear="ture"
						:localdata="messageType"
						@change="messageTypeChange()"
					/>
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
			<button style="margin-top: 10px" @click="onCancel()">取消</button>
		</view>
	</view>
</template>

<style scoped lang="scss">
s .box {
	display: flex;
	flex-direction: column;
}
.pubish-view {
	padding: $page-padding;
}
.pubish-content {
	min-height: 200rpx;
	padding: $page-padding;
	border: 1px solid $border-color;
	border-radius: 4px;
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
</style>
