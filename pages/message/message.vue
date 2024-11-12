<template>
	<view>
		<view class="msg_list" v-for="item in msglist">
			<view class="msg_icon">
				<view class="icon_container" :style="{backgroundColor:item.bgc}">
					<img class="icon" :src="item.icon"></img>
				</view>
			</view>

			<view class="msg_content">
				<view class="title">
					{{item.title}}
				</view>
				<view class="describe">
					{{item.describe}}
				</view>
			</view>

			<view class="msg_right">
				<view class="time">
					{{item.time}}
				</view>
				<view class="unread" v-show="item.unreadCount > 0">
					{{item.unreadCount}}
				</view>
			</view>

		</view>
	</view>
</template>

<script setup>

	const msglist = [{
		icon: '../../static/icon/msglist/tianqi.svg',
		bgc:'#6881ff',
		title: '天气变化',
		describe: '天气炎热，建议着短...',
		time: '2小时前',
		unreadCount: 0
	}, {
		icon: '../../static/icon/msglist/gantanhao.svg',
		bgc:'#40d787',
		title: '系统通知',
		describe: '恭喜你，昵称审核通...',
		time: '11分钟前',
		unreadCount: 1
	}, {
		icon: '../../static/icon/msglist/qunzu.svg',
		bgc:'#de868f',
		title: '活动通知',
		describe: '各位同学，明天10月...',
		time: '1天前',
		unreadCount: 0
	}, {
		icon: '../../static/icon/msglist/xiaoxi.svg',
		bgc:'#de868f',
		title: '学校公告',
		describe: '关于开展2023-2024...',
		time: '2周前',
		unreadCount: 1
	}]
	
	// 统计未读消息数量
	let totalUnreadCount = 0;
	msglist.forEach(item => {
		totalUnreadCount += item.unreadCount; // 累加每个消息的 unreadCount
	});
	uni.setTabBarBadge({
		index: 2,
		text:totalUnreadCount.toString(),
	})
	
	for (let i = 0; i<msglist.length ;i++){
		console.log(i + "未读数量:" + msglist[i].unreadCount );
	}
	
</script>

<style lang="scss">
	@import '../../common/style/base-style.scss'; 
	
	.msg_list {
		width:100%;
		height: 20vh;
		display: flex;
		flex-direction: row;
		border-bottom: 0.5rpx solid #cccccc;
	}

	.msg_icon {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.icon_container{
		width:128rpx;
		height:128rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 64rpx;
	}
	
	.icon {
		width:96rpx;
		height:96rpx;
	}

	.msg_content {
		height: 100%;
		width: 55%;
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
		width: 15%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.time {
		font-size: 24rpx;
		color: $text-font-color-2;
	}
	
	
	.unread{
		margin-top: 16rpx;
		width: 36rpx;
		height: 36rpx;
		text-align: center;
		background-color: #f00;
		color: #fff;
		border-radius: 18rpx;
	}
	
</style>