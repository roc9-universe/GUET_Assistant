<script setup>
import { ref } from "vue";

const props = defineProps({
	range: Object, // 范围对象
	sure: Function, // 确定回调函数
	initialValue: Array // 初始值
});

// const selectValue = defineModel({
// 	default: []
// });

const selectValue = ref();

// 定义 popup 实例
const popup = ref(null);

// 定义确认事件
const confirm = (value) => {
	props.sure(value);
	popup.value.close();
};

// 定义 open 方法
const open = (direction = "right") => {
	selectValue.value = props.initialValue;
	if (popup.value) {
		popup.value.open(direction);
	} else {
		console.error("弹出实例未初始化。");
	}
};

defineExpose({
	open
});
</script>

<template>
	<view>
		<uni-popup ref="popup" background-color="#fff">
			<slot name="head"></slot>

			<view style="margin-left: 5rpx"><slot name="tip"></slot></view>
			<view class="popup-content">
				<uni-data-checkbox mode="tag" multiple v-model="selectValue" :localdata="range"></uni-data-checkbox>
			</view>

			<view class="popup-content">
				<button @click="confirm(selectValue)">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<style scoped lang="scss">
.popup-content {
	width: 450rpx;
	padding: $page-padding;
}

// 小程序穿透失效
// :deep(.uni-data-checklist) {
// 	.checklist-group {
// 		flex-direction: column;

// 		.checklist-box {
// 			.checklist-content {
// 				justify-content: center;
// 			}
// 		}

// 		.checklist-box.is--tag {
// 			margin-right: 0;
// 			text-align: center;
// 			padding: 20px;
// 			border: 0;
// 		}
// 	}
// }
</style>
