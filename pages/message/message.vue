<template>
	<view class="container box">
		<view class="msg_list" v-for="(item, index) in msglist" @click="navigateTo(index)">
			<view class="msg_icon">
				<view class="icon_container" :style="{ backgroundColor: item.bgc }">
					<image class="icon" :src="item.icon"></image>
				</view>
			</view>

			<view class="msg_content">
				<view class="title">
					{{ item.title }}
				</view>
				<view class="describe">
					{{ item.describe }}
				</view>
			</view>

			<view class="msg_right">
				<view class="time">
					{{ item.time }}
				</view>
				<view class="unread" v-show="item.unreadCount > 0">
					{{ item.unreadCount }}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { httpBaseURL } from "../../api/utils/url";
const msglist = [
	{
		index: 0,
		icon: "../../static/icon/msglist/tianqi.svg",
		bgc: "#6881ff",
		title: "天气",
		describe: "请大家注意天气变化",
		time: "",
		unreadCount: 0
	},
	{
		index: 1,
		icon: "../../static/icon/msglist/gantanhao.svg",
		bgc: "#40d787",
		title: "系统消息",
		describe: "恭喜你，昵称审核通...",
		time: "11分钟前",
		unreadCount: 0
	},
	{
		index: 2,
		icon: "../../static/icon/msglist/qunzu.svg",
		bgc: "#de868f",
		title: "活动消息",
		describe: "各位同学，明天10月...",
		time: "1天前",
		unreadCount: 0
	},
	{
		index: 3,
		icon: "../../static/icon/msglist/xiaoxi.svg",
		bgc: "#de868f",
		title: "学校公告",
		describe: "关于开展2023-2024...",
		time: "2周前",
		unreadCount: 0
	}
];

// 统计未读消息数量
let totalUnreadCount = 0;
msglist.forEach((item) => {
	totalUnreadCount += item.unreadCount; // 累加每个消息的 unreadCount
});
if (totalUnreadCount > 0) {
	uni.setTabBarBadge({
		index: 2,
		text: totalUnreadCount.toString()
	});
}

function navigateTo(index) {
	switch (index) {
		case 0:
			uni.navigateTo({
				url: "/pages/weather/weather"
			});
			break;
		case 1:
			uni.navigateTo({
				url: `/pages/messageList/messageList?title=${msglist[index].title}`
			});
			break;
		case 2:
			uni.navigateTo({
				url: `/pages/messageList/messageList?title=${msglist[index].title}`
			});
			break;
		case 3:
			uni.switchTab({
				url: "/pages/board/board"
			});
			break;
		default:
			break;
	}
}
</script>

<style lang="scss">
@import "../../common/style/base-style.scss";

.msg_list {
	width: 100%;
	height: 150rpx;
	display: flex;
	flex-direction: row;
	border-bottom: 0.5rpx solid $text-font-color-5;
	background-color: $bg-color-white;
}

.msg_icon {
	width: 25%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.icon_container {
	width: 90rpx;
	height: 90rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 64rpx;
}

.icon {
	width: 96rpx;
	height: 96rpx;
}

.msg_content {
	height: 100%;
	width: 45%;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: center;
}

.title {
	font-size: 32rpx;
	color: $text-font-color-1;
}

.describe {
	margin-top: 1vh;
	font-size: 24rpx;
	color: $text-font-color-2;
}

.msg_right {
	width: 20%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
}

.time {
	font-size: 24rpx;
	color: $text-font-color-2;
	text-align: end;
}

.unread {
	margin-top: 16rpx;
	width: 36rpx;
	height: 36rpx;
	text-align: center;
	background-color: #f00;
	color: #fff;
	border-radius: 18rpx;
}
</style>
