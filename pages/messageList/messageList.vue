<template>
	<view class="messageList_container">
		
		<view class="title_container">
			<text class="title_text">{{ type }}</text>
		</view>

		<view class="message_list">
			<view
				v-for="message in messages"
				:key="message.id"
				@click="viewDetail(message.id, message.title, message.publishTime)"
			>
				<view class="message_content">
					<view class="message_title">{{ message.title }}</view>
					<view class="message_date">{{ TimestampToYYYYMMDD(message.publishTime) }}</view>
				</view>
				<view class="divider"></view>
				<!-- 分割线 -->
			</view>
		</view>

		<view class="empty_tips" v-if="this.messages.length === 0">暂无消息</view>
	</view>
</template>

<script>
import { getMessageList } from "../../api/notice.js";
export default {
	data() {
		return {
			messages: [],
			type: ""
		};
	},
	onLoad(options) {
		this.type = options.title;
		this.loadmessages();
	},
	methods: {
		async loadmessages() {
			try {
				const userId = uni.getStorageSync("userInfo").studentId;
				const response = await getMessageList(userId, this.type);
				this.messages = response.data;
			} catch (error) {
				console.error("加载消息列表失败", error);
			}
		},
		viewDetail(id, title, time) {
			uni.navigateTo({
				url: `/pages/detail/viewDetail?id=${id}&title=${title}&publishTime=${time}`
			});
		},
		TimestampToYYYYMMDD(timestampString) {
			const timestamp = parseInt(timestampString, 10);
			const date = new Date(timestamp);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style lang="scss" scoped>
.messageList_container {
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	align-items: center;
	justify-content: center;
}
.message_list {
	display: flex;
	width: 90%;
	flex-direction: column;
}
.message_item {
	cursor: pointer;
}
.message_title {
	font-size: 13px;
	margin-bottom: 5px;
}
.message_date {
	font-size: 12px;
	color: #888;
	margin-top: 10px;
	margin-bottom: 10px;
}
.divider {
	height: 1px;
	background-color: #c5cccc;
	margin: 10px 0;
}

.empty_tips {
	margin-top: 30vh;
	text-align: center;
	font-size: 28rpx;
	color: $text-font-color-2;
	line-height: 2;
	opacity: 0.7;
}

.title_container {
	width: 100%;
	text-align: center;
}

.title_text {
	font-size: 24rpx;
	font-weight: bold;
	color: $text-font-color-5;
}
</style>
