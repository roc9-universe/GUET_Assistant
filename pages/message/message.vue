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
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

const noticeNumber = ref({
	all: 0, // 全部
	system: 0, // 系统消息
	activity: 0 // 活动通知
});

const msglist = ref();

onShow(() => {
	noticeNumber.value = uni.getStorageSync("noticeNumber") || noticeNumber.value;

	msglist.value = [
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
			unreadCount: noticeNumber.value.system
		},
		{
			index: 2,
			icon: "../../static/icon/msglist/qunzu.svg",
			bgc: "#de868f",
			title: "活动消息",
			describe: "各位同学，明天10月...",
			time: "1天前",
			unreadCount: noticeNumber.value.activity
		},
		{
			index: 3,
			icon: "../../static/icon/msglist/xiaoxi.svg",
			bgc: "#ffaa7f",
			title: "学校公告",
			describe: "关于开展2023-2024...",
			time: "2周前",
			unreadCount: 0
		}
	];
});

function navigateTo(index) {
	switch (index) {
		case 0:
			uni.navigateTo({
				url: "/pages/weather/weather"
			});
			break;
		case 1:
			noticeNumber.value.all -= noticeNumber.value.system;
			noticeNumber.value.system = 0;
			uni.navigateTo({
				url: `/pages/messageList/messageList?title=${msglist.value[index].title}`
			});
			break;
		case 2:
			noticeNumber.value.all -= noticeNumber.value.activity;
			noticeNumber.value.activity = 0;
			uni.navigateTo({
				url: `/pages/messageList/messageList?title=${msglist.value[index].title}`
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

	msglist.value[index].unreadCount = 0;
	if (noticeNumber.value.all > 0) {
		console.log(noticeNumber.value.all);
		// 设置通知红点
		uni.setTabBarBadge({
			index: 2,
			text: String(noticeNumber.value.all)
		});
	} else {
		noticeNumber.value.all = 0;
		uni.removeTabBarBadge({
			index: 2
		});
	}

	// 缓存通知数量
	uni.setStorageSync("noticeNumber", noticeNumber.value);
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
