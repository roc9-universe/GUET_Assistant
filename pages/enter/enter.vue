<template>
	<view class="enter">
		<button class="skip" @click="goTologin">跳过</button>
		
		<view class="midWord">
			<text class="midChinese">桂电助手</text>
			<text class="midPingyin">GUI DIAN ZHU SHOU</text>
		</view>
		
		<view class="buttom">
			<image src="../../static/logo.png" class="img"></image>
			<view class="underWord">
				<text class="underChinese">智慧校园</text>
				<text class="underEnglish">CAMPUSHOY</text>
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
			goTologin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		},
		mounted(){
			setTimeout(()=>{
				uni.navigateTo({
					url:'/pages/login/login'
				});
			},3000);
		}
	}
</script>

<style>
	.enter{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		background-color: #f8f8f8;
	}
	
	.skip{
		margin-top: 2vh; margin-right: 5vw;
		background-color: #174E8E; color: white;
		width: 15vw; height: 5vh; font-size: 24rpx;
	}
	
	.midWord{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 10vh;
	}
	.midChinese {
		font-size: 64rpx; 
		color: #174E8E; 
		font-weight: bold; 
	}
	.midPingyin {
		font-size: 24rpx; 
		color: #174E8E; 
		margin-top: 10rpx; 
	}
	
	.buttom{
		display: flex;
		flex-direction: row;
		margin-top: 30vh; padding-left: 10vh;
	}
	.img{
		width: 15vh; height: 15vh;
	}
	.underWord{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 3vh;
	}
	.underChinese{
		font-size: 64rpx;
		text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);;
		font-style: italic;
	}
	.underEnglish{
		font-size: 32rpx;
		margin-top: 10rpx;
		letter-spacing: 5rpx;
	}
</style>
