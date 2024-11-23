<script setup>
import { ref } from "vue";
import { getTool, getUserTool, deleteTool, addTool } from "@/api/tool.js";
import { onShow } from "@dcloudio/uni-app";

/** 常用工具列表 */
const toolList = ref([]);
/** 工具箱范围 */
const range = ref([]);
/** 用户的工具箱 */
const userTool = ref();
/** 获取常用工具列表 */
const getList = async () => {
	const { tools } = await getTool();
	toolList.value = tools;
	range.value = toolList.value.map((item) => {
		return {
			value: item.id,
			text: item.name
		};
	});
};
/** 获取用户的工具箱列表 */
const getUserToolList = async () => {
	const userId = uni.getStorageSync("userInfo").id;
	const res = await getUserTool(userId);
	userTool.value = res.map((item) => {
		return item.id;
	});
};

/** 使用工具 */
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

/** 弹出层实例 */
const popup = ref();
const openSelectPopup = () => {
	popup.value.open("right");
};
const selectTool = async (value) => {
	const oldSet = new Set(userTool.value);
	const newSet = new Set(value);

	// 计算新增和删除，时间复杂度为 O(n)
	const add = value.filter((item) => !oldSet.has(item));
	const deleted = userTool.value.filter((item) => !newSet.has(item));

	// 异步操作处理新增和删除, 只在 add 或 deleted 不为空时执行相应操作
	const promises = [];

	if (add.length > 0) {
		promises.push(addTool(add));
	}

	if (deleted.length > 0) {
		promises.push(deleteTool(deleted));
	}

	// 并行执行所有需要的操作
	if (promises.length > 0) {
		await Promise.all(promises);
	}

	// 刷新用户工具列表
	getUserToolList();
};

onShow(() => {
	getList();
	getUserToolList();
});
</script>

<template>
	<view style="padding-top: 40rpx">
		<!-- 固定(非跳转)工具 -->
		<view class="tool-box" @click="openSelectPopup()">
			<image class="tool-img" mode="aspectFill" src="../../static/icon/tool/tool-box.svg"></image>
			<view class="tool-text">
				<text>工具箱</text>
			</view>
		</view>

		<!-- 常用工具 -->
		<view v-for="item in toolList" :key="item.id" class="tool-box" @click="useTool(item)">
			<image class="tool-img" mode="aspectFill" :src="item.logo"></image>
			<view class="tool-text">
				<text>{{ item.name }}</text>
			</view>
		</view>

		<!-- 选择器弹窗 -->
		<select-popup ref="popup" :range="range" :sure="selectTool" :initial-value="userTool">
			<template #head>
				<view class="tool-box">
					<image class="tool-img" mode="aspectFill" src="../../static/icon/tool/tool-box.svg"></image>
					<view class="tool-title">工具箱</view>
				</view>
			</template>
			<template #tip>
				<uni-section title="注：工具箱在展板展示" type="line"></uni-section>
			</template>
		</select-popup>
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

	.tool-img {
		width: 100rpx;
		height: 100rpx;
	}

	.tool-title {
		font-size: 40rpx;
		font-weight: bold;
		padding: 20rpx;
		display: flex;
	}
}
</style>
