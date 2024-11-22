<script setup>
import { ref } from "vue";
import { updateUserInfo } from "@/api/tool.js";
import { onShow } from "@dcloudio/uni-app";
const toolList = ref();

const getList = async () => {
	const { tools } = await updateUserInfo();
	toolList.value = tools;
};

const useTool = (item) => {
	const pattern = /^http/;
	if (pattern.test(item.url)) {
		uni.navigateTo({
			url: `/pages/externalPage/externalPage?pageUrl=${item.url}`
		});
	} else {
		if (item.id == "2") {
			uni.reLaunch({
				url: item.url
			});
		} else {
			uni.navigateTo({
				url: item.url
			});
		}
	}
};

onShow(() => {
	getList();
});
</script>

<template>
	<view style="padding-top: 40rpx">
		<view v-for="item in toolList" :key="item.id" class="tool-box" @click="useTool(item)">
			<image class="tool-img" mode="aspectFill" :src="item.logo"></image>
			<view class="tool-text">
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
// .box {
// 	padding: $page-padding;
// }

.tool-box {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20rpx;

	.tool-img {
		width: 100rpx;
		height: 100rpx;
	}

	.tool-text {
		width: 65%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-weight: bold;
		margin: 20rpx;
		color: $text-font-color-2;
		background: linear-gradient(to right, transparent 20%, #cde4dd, transparent),
			linear-gradient(to left, transparent 20%, #cde4dd, transparent);
	}
}
</style>
