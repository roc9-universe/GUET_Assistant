<template>
	<view class="container box">
		<view class="card">
			<view class="title">校园简介</view>
			<view class="p">
				&nbsp;&nbsp;&nbsp;&nbsp;桂林电子科技大学设有现设有22个学院（教学部），经过五十多年的建设与发展，学校已经成为一所以工学为主，电子信息学科和国防军工特色鲜明、优势突出，理、管、经、文、法、艺等多学科协调发展，在区内外有一定影响力的多科性大学。
			</view>
		</view>
		<view class="card">
			<view class="title">学院</view>
			<ul>
				<view class="li" hover-class="touch" v-for="(item, index) in data" :key="index" @click="toDetail(item)">
					{{ item.title }}
				</view>
			</ul>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getMessageList } from "../../api/notice";

const data = ref([
	{
		title: "1院 xxxxx学院",
		content: "介绍"
	},
	{
		title: "2院 xxxxx学院",
		content: "介绍"
	},
	{
		title: "3院 桂林电子科技大学计算机与信息安全学院",
		content: `桂林电子科技大学计下设二级学院
桂林电子科技大学计算机与信息安全学院（School of Computer Science and Information Security）是桂林电子科技大学下设的二级学院。
桂林电子科技大学计算机与信息安全学院始建于1980年。1981年开始招收本科生，1996年开始招收硕士研究生。2010年，学院更名为计算机科学与工程学院。2016年，计算机科学与工程学院更名为计算机与信息安全学院。
根据2021年12月学院官网信息显示，学院开设7个本科专业，有一级学科博士点1个，二级学科硕士点1个，工程硕士授权领域2个；有教职工133人，其中专任教师115人，正高级职称教师40人，副高级职称教师46人，博士学位教师74人，博士生导师21人。 [3]`
	},
	{
		title: "4院 xxxxx学院",
		content: "介绍"
	},
	{
		title: "5院 xxxxx学院",
		content: "介绍"
	},
	{
		title: "6院 xxxxx学院",
		content: "介绍"
	},
	{
		title: "7院 xxxxx学院",
		content: "介绍"
	},
	{
		title: "8院 xxxxx学院",
		content: "介绍"
	}
]);

const toDetail = (item) => {
	uni.navigateTo({
		url: "/pages/introduction/detail?data=" + JSON.stringify(item)
	});
};
onLoad(() => {
	const userId = uni.getStorageSync("userInfo").id;
	getMessageList("", "院校介绍")
		.then((res) => {
			data.value = res.data;
		})
		.catch((error) => {
			console.error("加载消息列表失败", error);
		});
});
</script>

<style lang="scss">
.touch {
	background-color: #fafafa;
}
ul {
	padding: 0;
}
.p {
	padding: 10px 0;
	font-size: 12px;
	color: #333;
}

.li {
	padding: 13px 0;
	list-style-type: none;
	border-bottom: 1px solid $border-color;
	font-size: 13px;

	&:last-child {
		border-bottom: 0px;
	}
}

.container {
	padding: $page-padding;
}
.card {
	padding: 0 13px;
	margin-bottom: 20px;
	border-radius: 10px;
	background-color: $bg-color-white;
	.title {
		padding: 14px 0;
		border-bottom: 1px solid $border-color;
		font-size: 18px;
		color: #333;
	}
	.campus {
		border: 1px solid $border-color;
		background-color: $bg-color-white;
		margin: 20px 10px;
	}
}
</style>
