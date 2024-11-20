<script setup>
import { ref, shallowRef } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { getUserInfo, updateUserInfo } from "../../api/user.js";

/** 用户头像 */
const avatar = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png");
/** 选择头像 */
const onChooseAvatar = (e) => {
	const { avatarUrl } = e.detail;
	avatar.value = avatarUrl;
};

/** 用于循环渲染的用户信息列表 */
const userInfo = ref({});
/** 用于更新数据的用户id */
let userId = "";

/** 获取用户数据 */
function fetchUserInfo() {
	const data = uni.getStorageSync("userInfo");
	userId = data.id;
	userInfo.value = {
		username: {
			name: "姓名",
			value: data.username
		},
		studentId: {
			name: "学号",
			value: data.studentId
		},
		gender: {
			name: "性别",
			value: data.gender,
			select: true,
			option: [
				{ value: "男", text: "男" },
				{ value: "女", text: "女" }
			]
		},
		phone: {
			name: "电话",
			value: data.phone
		},
		type: {
			name: "身份",
			value: data.type,
			select: true,
			option: [
				{ value: "学生", text: "学生" },
				{ value: "老师", text: "老师" }
			]
		},
		college: {
			name: "学院",
			value: data.college,
			select: true,
			option: [
				{ value: "计算机与信息安全学院", text: "计算机与信息安全学院" },
				{ value: "机电工程学院", text: "机电工程学院" },
				{ value: "信息与通信学院", text: "信息与通信学院" },
				{ value: "艺术与设计学院", text: "艺术与设计学院" },
				{ value: "商学院", text: "商学院" },
				{ value: "外国语学院", text: "外国语学院" },
				{ value: "数学与计算科学学院", text: "数学与计算科学学院" },
				{ value: "电子工程与自动化学院", text: "电子工程与自动化学院" },
				{ value: "法学院", text: "法学院" },
				{ value: "材料科学与工程学院", text: "材料科学与工程学院" },
				{ value: "应用科技学院", text: "应用科技学院" },
				{ value: "国际学院", text: "国际学院" },
				{ value: "公共事务学院", text: "公共事务学院" },
				{ value: "生命与环境科学学院", text: "生命与环境科学学院" },
				{ value: "信息科技学院", text: "信息科技学院" },
				{ value: "北海职业技术学院（北海）", text: "北海职业技术学院（北海）" }
			]
		},
		classname: {
			name: "班级",
			value: data.classname
		}
	};
}

onShow(() => {
	fetchUserInfo();
});

/** 当前弹窗的引用 */
const inputDialog = ref();

/** 弹窗配置 */
const inputDialogConfig = ref({
	key: "",
	title: "",
	placeholder: ""
});

/**
 * 开启弹窗
 * @param {string} item 用户信息
 * @param {string} key 用户key
 */
const inputDialogToggle = (item, key) => {
	if (inputDialog.value) {
		inputDialogConfig.value = {
			key,
			title: `修改${item.name}`,
			placeholder: `请输入${item.name}`
		};
		inputDialog.value.open();
	}
};

const inputData = ref("");
/**
 * 弹窗确认
 * @param {string} data 输入的值
 */
const dialogInputConfirm = async () => {
	if (inputData.value === "") {
		uni.showToast({
			title: "请输入有效值",
			icon: "none"
		});
		return;
	}
	await updateUserInfo({
		id: userId,
		[inputDialogConfig.value.key]: inputData.value
	});
	await getUserInfo(userId);
	fetchUserInfo();
	inputData.value = "";
};
/** 弹窗取消 */
const dialogInputClose = () => {
	inputData.value = "";
};

/** 输入文本样式 */
const styles = ref({
	borderColor: "#e5e5e5"
});
</script>

<template>
	<view class="box">
		<view class="avatar-box">
			<setting-card>
				<template #title>头像</template>
				<template #item>
					<image class="avatar" :src="avatar" />
				</template>
			</setting-card>
			<button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">获取微信头像</button>
		</view>

		<view style="margin-top: 40rpx">
			<view v-for="(item, key) in userInfo" :key="key" @click="inputDialogToggle(item, key)">
				<setting-card>
					<template #title>{{ item.name }}</template>
					<template #item>
						<view class="text">
							<text>{{ item.value }}</text>
						</view>
					</template>
				</setting-card>
			</view>
		</view>

		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog
					mode="input"
					:title="inputDialogConfig.title"
					:placeholder="inputDialogConfig.placeholder"
					@close="dialogInputClose()"
					@confirm="dialogInputConfirm"
				>
					<view v-if="userInfo[inputDialogConfig.key]?.select" style="width: 100%">
						<uni-data-select
							v-model="inputData"
							:placeholder="inputDialogConfig.placeholder"
							:clear="ture"
							:localdata="userInfo[inputDialogConfig.key].option"
						/>
					</view>
					<view v-else style="width: 100%">
						<uni-easyinput
							v-model="inputData"
							focus
							:styles="styles"
							:placeholder="inputDialogConfig.placeholder"
						></uni-easyinput>
					</view>
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<style scoped lang="scss">
.avatar-box {
	position: relative;
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
	}
	.avatar-button {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		opacity: 0;
	}
}

.text {
	color: $text-font-color-2;
	width: 40vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: end;

	text {
		white-space: nowrap;
	}
}
</style>
