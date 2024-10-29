<template>
	<view class="mine">
		<!--头像-->
		<view class="info">
			<view class="profile">
				<image class="avatar" src="../../static/icon/mine/avatar.jpg"/>
				<view class="details">
					<text class="name">XXX</text>
					<text class="student-id">学号: XXXXXXXXXX</text>
				</view>
				<button class="edit-btn" @click="editinfo">编辑资料</button>
			</view>
			
			<view class="identity">
				<text class="school">桂林电子科技大学</text>
				<image class="icon" src="../../static/icon/mine/school.svg"></image>
			</view>
			<text class="specific">学院学生</text>
		</view>
	
		<!--功能-->
		<view class="main">
			<view class="menu-item" @click="goTomap">
				<image class="icon" src="../../static/icon/mine/map.svg" />
				<text>校内地图</text>
			</view>
			<view class="menu-item">
				<image class="icon" src="../../static/icon/mine/weather.svg" />
				<text>今日天气</text>
			</view>
			<view class="menu-item">
				<image class="icon" src="../../static/icon/mine/about.svg" />
				<text>关于我们</text>
			</view>
			<view class="menu-item" @click="editinfo">
				<image class="icon" src="../../static/icon/mine/setting.svg" />
				<text>设置</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			editinfo(){
				uni.navigateTo({
					url: "/pages/setting/setting"
				})
			},
			goTomap(){
				uni.navigateTo({
					url: "/pages/map/map"
				})
			}
		}
	}
</script>

<style>
	.mine{
		display: flex;
		flex-direction: column;
		width: 100vw; height: calc(100vh - 94px);
		background-color: #f8f8f8;
	}
	
	.info{
		background-color: #174E8E;
		padding: 20rpx;
		border-radius: 0 10px 0 10px;
		height: 24vh; width: 100vw;
	}
	.profile{
		display: flex; flex-direction: row;
		align-items: center;
	}
	.avatar {
		width: 10vh; height: 10vh; margin: 20rpx;
		border-radius: 5px;
	}
	.details{
		display: flex; flex-flow: column;
	}
	.name{
		font-size: 42rpx; font-weight: bold;
		color: white; margin-bottom: 10rpx;
	}
	.student-id{
		font-size: 24rpx; color: #eaeaea;
	}
	.edit-btn{
		background-color: white;
		color: #2A60B2; font-size: 24rpx;
		border-radius: 10rpx;
		margin-left:50rpx; height: 5vh; width: 12vh;
	}
	.identity{
		display: flex; align-items: center; 
		margin-left: 20rpx; margin-top: 20rpx;
	}
	.school{
		font-size: 32rpx; color: white; 
		margin-bottom: 10rpx; margin-right: 10rpx;
	}
	.specific{
		font-size: 24rpx; color: #eaeaea;
		margin-left: 20rpx; margin-top: 10rpx;
	}
	
	.main{
		padding: 20rpx;
		margin-top: 50rpx;
		background-color: white;
	}
	.menu-item{
		display: flex; flex-direction: row;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #eaeaea;
	}
	.icon{
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}
</style>
