<script>

</script>

<template>
	<view class="box">
		<setting-card>
			<template #title>头像</template>
			<template #item>
				<image class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
			</template>
		</setting-card>
		<setting-card>
			<template #title>姓名</template>
			<template #item>
				<view class="text">
					<text>陈鹏宇</text>
				</view>
			</template>
		</setting-card>
		<setting-card>
			<template #title>性别</template>
			<template #item>
				<view class="text">
					<text>男</text>
				</view>
			</template>
		</setting-card>

		<setting-card style="margin: 40rpx 0;">
			<template #title>对外信息显示</template>
			<template #item>
				<view class="text">
					<text>陈鹏宇</text><text>@桂林电子科技大学</text>
				</view>
			</template>
		</setting-card>

		<setting-card>
			<template #title>手机</template>
			<template #item>
				<view class="text">
					<text>19580787869</text>
				</view>
			</template>
		</setting-card>
		<setting-card>
			<template #title>学院</template>
			<template #item>
				<view class="text">
					<text>计算机与信息安全学院</text>
				</view>
			</template>
		</setting-card>
		<setting-card>
			<template #title>班级</template>
			<template #item>
				<view class="text">
					<text>21级软件工程3班</text>
				</view>
			</template>
		</setting-card>
	</view>
</template>

<style scoped lang="scss">
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
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