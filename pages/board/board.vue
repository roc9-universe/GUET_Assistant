<template>
	<view class="main_container">
		<view class="search_box">
			<input class="search_input" placeholder="请输入搜索内容" />
		</view>
		<view class="hotspot_box">
			<swiper indicator-dots="true" autoplay="true" interval="3000" duration="500">
				<swiper-item>
					<image class="swiper-image" src="https://pic.imgdb.cn/item/661d36160ea9cb1403c379fe.png" alt="图1" />
				</swiper-item>
				<swiper-item>
					<image class="swiper-image" src="https://pic.imgdb.cn/item/661d31530ea9cb1403b92b10.png" alt="图2" />
				</swiper-item>
			</swiper>
		</view>

		<view class="function_box">
			<!-- 工具栏，支持滑动 -->
			<swiper class="tool-swiper" :indicator-dots="false" :autoplay="false">
				<swiper-item v-for="(page, pageIndex) in paginatedTools" :key="pageIndex">
					<view class="tool-row">
						<view class="tool-item" v-for="tool in page" :key="tool.id" @click="navigateToTool(tool.url)">
							<image class="tool-icon" :src="tool.logo" />
							<text class="tool-name">{{ tool.name }}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="notice_box">
			<view class="header">
				<view>校内公告</view>
				<view @click="goToNoticeList">查看更多</view>
			</view>
			<view class="divider"></view> <!-- 分割线 -->
			<view class="announcement_list">
				<view class="announcement_item" v-for="announcement in announcements" :key="announcement.id"
					@click="viewDetail(announcement.id,announcement.title,announcement.publishTime)">
					<view class="announcement_content">
						<view class="announcement_title">{{ announcement.title }}</view>
						<view class="announcement_date">{{ TimestampToYYYYMMDD(announcement.publishTime) }}</view>
					</view>
					<view class="divider"></view> <!-- 分割线 -->
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import { getNoticeList } from "../../api/notice.js";
	import { getUserTool } from "@/api/tool.js";
	import { getUserInfo } from "../../api/user.js";

	export default {
		data() {
			return {
				announcements: [],
				tools: [], // 工具列表
			}
		},
		created() {
			this.loadAnnouncements();
		},
		async mounted() {
			// 根据登录状态获取用户ID
			const userInfo = uni.getStorageSync("userInfo");
			const userId = userInfo.id;
			// const userId = -96940030;
			await this.loadTools(userId);
		},
		computed: {
			// 将工具按每 4 个分组，便于分页展示
			paginatedTools() {
				const groups = [];
				for (let i = 0; i < this.tools.length; i += 4) {
					groups.push(this.tools.slice(i, i + 4));
				}
				return groups;
			},
		},
		methods: {
			//获取公告列表
			async loadAnnouncements() {
				try {
					const response = await getNoticeList();
					//只展示前4条，其他的公告点击查看更多
					this.announcements = response.data.slice(0, 4);
				} catch (error) {
					console.error('加载公告列表失败', error);
				}
			},
			TimestampToYYYYMMDD(timestamp) {
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
			},

			//获取工具列表

			async loadTools(userId) {
				try {
					const response = await getUserTool(userId);
					const toolsFromBackend = response;

					// 如果后端返回的工具为空，使用默认工具
					if (!toolsFromBackend || toolsFromBackend.length === 0) {
						this.tools = [{
								id: 1,
								name: "今日天气",
								url: "/pages/weather/weather",
								logo: "https://pic.imgdb.cn/item/67407962d29ded1a8cfb6d3f.png",
							},
							{
								id: 2,
								name: "智能问答",
								url: "/pages/qa/qa",
								logo: "https://pic.imgdb.cn/item/6740795bd29ded1a8cfb6805.png",
							},
							{
								id: 3,
								name: "校园地图",
								url: "/pages/map/map",
								logo: "https://pic.imgdb.cn/item/67407957d29ded1a8cfb6484.png",
							},
							{
								id: 5,
								name: "学校官网",
								url: "https://www.guet.edu.cn/",
								logo: "https://pic.imgdb.cn/item/67407ac2d29ded1a8cfc9ec5.png",
							},
						];
					} else {
						this.tools = toolsFromBackend;
					}
				} catch (error) {
					console.error("加载工具数据失败", error);
				}
			},
			// 跳转到对应工具页面
			navigateToTool(url) {
				
				const tabBarPages = [
				    "/pages/qa/qa",
				  ];//TabBar 页面路径
				
				if (url.startsWith("http")) {
					// 外链
					wx.navigateTo({
						url: `/pages/externalPage/externalPage?url=${encodeURIComponent(url)}`,
					});
				} else {
					// 内部页面
					if (tabBarPages.includes(url)) {
						// 如果是 TabBar 页面
						wx.switchTab({
							url
						})
					} else {
						// 非 TabBar 页面
						wx.navigateTo({
							url
						})
					}
				}
			},

			viewDetail(id, title, publishTime) {
				wx.navigateTo({
					url: `/pages/detail/viewDetail?id=${id}&title=${title}&publishTime=${publishTime}`
				});
			},

			goToNoticeList() {
				uni.navigateTo({
					url: '/pages/noticeList/noticeList' // 目标页面路径
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	input {
		width: 100%;
		height: 42px;
		padding-left: 13px;
	}

	.main_container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $bg-color-grey;
	}

	.search_box {
		width: 95%;
		display: flex;
		align-items: center; // 纵轴对齐方式，默认是纵轴 子元素垂直居中
		justify-content: center; //纵轴对齐方式，默认是纵轴

	}

	.search_input {
		border: 2px;
		border-radius: 8px;
		outline: none;
		/* 去掉焦点轮廓 */
		margin: 10px auto;
		height: 30px;
		background-color: $bg-color-white;
		overflow: hidden;
		/* 隐藏溢出 */
		text-emphasis-color: $text-font-color-3;
	}

	.hotspot_box {
		border: 2px;
		border-radius: 15px;
		margin-top: 10px;
		width: 90%;
		height: 300px;
		overflow: hidden;
	}

	.swiper-image {
		// border-radius: 20px;
		width: 100%;
		/* 图片宽度 */
		height: 100%;
		/* 图片高度 */
		object-fit: cover;
		/* 保持图片比例 */
	}

	.function_box {
		display: flex;
		border-radius: 8px;
		margin-top: 20px;
		width: 90%;
		height: 170px;
		text-align: center;
		background-color: $bg-color-white;
		justify-content: space-around;
		/* 等间距排列 */
	}


	.tool-swiper {
		width: 100%;
		height: 100%;
	}

	.tool-row {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 12px 0;
	}

	.tool-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 22%;
	}

	.tool-icon {
		width: 37px;
		height: 37px;
		margin-bottom: 10px;
	}

	.tool-name {
		font-size: 12px;
		text-align: center;
	}

	.notice_box {
		padding: 10px;
		margin-top: 10px;
		margin-bottom: 5px;
		width: 90%;
		height: 100%;
		background-color: $bg-color-white;
	}

	.header {
		display: flex;
		font-size: 14px;
		/* 标题字体大小 */
		justify-content: space-between;
		/* 左右盒子间隔最大化 */
		align-items: center;
		/* 垂直居中对齐 */
	}

	.announcement_list {
		display: flex;
		flex-direction: column;
		/* 垂直排列 */
	}

	.announcement_item {
		// cursor: pointer; /* 鼠标悬停效果 */
	}

	.announcement_title {
		font-size: 13px;
		/* 标题字体大小 */
		margin-bottom: 5px;
	}

	.announcement_date {
		font-size: 12px;
		/* 日期字体大小 */
		color: #888;
		/* 日期颜色 */
		margin-top: 10px;
		margin-bottom: 10px;
		/* 下边距 */
	}

	.divider {
		height: 1px;
		/* 分割线高度 */
		background-color: #c5cccc;
		/* 分割线颜色 */
		margin: 10px 0;
		/* 上下边距 */
	}
</style>