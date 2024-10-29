<script setup>
import { ref } from 'vue';

const goEnter = () => {
    // console.log("Button clicked, navigating to /pages/mine/mine");
    uni.redirectTo({
        url: "/pages/enter/enter"
    });
};
</script>

<template>
	<view class="content">
		<button @click="goEnter">enter</button>
		恶趣味请问
	</view>
</template>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

