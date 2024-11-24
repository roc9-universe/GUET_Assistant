<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { chatQA } from "@/api/chat.js";

/** 用户头像 */
const userAvatar = ref();
/** 聊天缓存 */
const chatData = ref([]);
/** 输入框 */
const inputData = ref("");

/** 发送状态：true正在发送 */
const sendStatus = ref(false);
const sendQuestion = async (question) => {
	if (!question) {
		uni.showToast({
			title: "请输入问题",
			icon: "none"
		});
		return;
	}

	sendStatus.value = true;
	const userMessage = { type: "user", data: question };
	const assistantPlaceholder = { type: "assistant", data: "等待回答..." };
	chatData.value.push(userMessage, assistantPlaceholder);
	inputData.value = "";

	try {
		const res = await chatQA(question);
		chatData.value.splice(chatData.value.length - 1, 1, res);
	} catch (e) {
		console.error("消息发送错误", e);
		chatData.value.splice(chatData.value.length - 2, 2);
		uni.showToast({
			title: "发送失败",
			icon: "none"
		});
	} finally {
		sendStatus.value = false;
		uni.setStorageSync("chatData", chatData.value);
	}
};

onShow(() => {
	userAvatar.value =
		uni.getStorageSync("userInfo").avatar || "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
	chatData.value = uni.getStorageSync("chatData") || [];
});
</script>

<template>
	<view class="box qa-box">
		<view v-if="chatData.length <= 0" class="qa-text">—— 还没开始聊天，请输入问题 ——</view>
		<view class="qa-body">
			<view class="qa-main">
				<view
					v-for="(item, index) in chatData"
					:key="index"
					class="qa-item"
					:class="item.type === 'user' ? 'qa-item-user' : ''"
				>
					<image class="qa-avatar" :src="item.type === 'user' ? userAvatar : '../../static/icon/qa/robot.jpg'" />
					<view class="qa-content">
						<text>{{ item.data }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="qa-footer">
			<textarea v-model="inputData" class="qa-input" placeholder="请输入询问的问题" auto-height />
			<button
				class="qa-button"
				size="mini"
				hover-class="is-hover"
				@click="sendQuestion(inputData)"
				:disabled="sendStatus"
			>
				{{ sendStatus ? "回答中" : "发送" }}
			</button>
		</view>
	</view>
</template>

<style scoped lang="scss">
.qa-box {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: $bg-color-grey;

	.qa-text {
		text-align: center;
		margin: 50rpx;
		color: $text-font-color-3;
	}

	.qa-body {
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column-reverse;
		padding: $page-padding;

		.qa-item {
			display: flex;
			margin: 25rpx 0;

			.qa-avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.qa-content {
				margin-left: 20rpx;
				max-width: 80%;
				padding: 20rpx;
				border-radius: 15rpx;
				background-color: $bg-color-qa;
			}
		}

		// 问答项为用户
		.qa-item-user {
			flex-direction: row-reverse;

			.qa-content {
				margin-right: 20rpx;
				background-color: $input-bg-color;
			}
		}
	}

	.qa-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: $page-padding;
		background-color: $uni-bg-color-grey;
		border-top: 1px solid $border-color;

		.qa-input {
			width: 100%;
			padding: 12rpx 15rpx;
			border-radius: 10rpx;
			background-color: $input-bg-color;
			max-height: 400rpx;
			overflow-y: auto;
		}

		.qa-button {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 140rpx;
			margin-left: 15rpx;
			padding: 4rpx 0;
			background-color: $brand-theme-color;
			color: white;
		}

		.is-hover {
			background-color: darken($brand-theme-color, 10%);
		}
	}
}
</style>
