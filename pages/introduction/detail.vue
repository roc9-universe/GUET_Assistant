<template>
	<view class="container">
		<view class="name">
			{{ info.title.split(" ")[1]}}
		</view>
		
		<view class="introduction">
			<rich-text :nodes="info.content"></rich-text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"
import { getNoticeDetail } from '../../api/notice';
	const info = ref({
			title: '',
			content: ''
		});
	onLoad((params) => {
		info.value = JSON.parse(params.data) ;
		console.log(info.value);
		getNoticeDetail(info.value.id,info.value.title).then((res) => {
			console.log(res.data)
			info.value.content = res.data[0]
		})
	});
</script>

<style lang="scss">
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: $bg-color-grey;
		padding: 13px;
	}

	.name {
		font-size: 16px;
		padding: 17px 13px;
		margin-bottom: 20px;
		border-radius: 10px;
		background-color: $bg-color-white;
	}

	.introduction {
		font-size: 14px;
		flex-grow: 1;
		padding: 10px 13px;
		margin-bottom: 20px;
		border-radius: 10px;
		background-color: $bg-color-white;
	}
</style>