<template>
	<view class="noticeList_box">
		<view class="announcement_list">
		      <view
		        class="announcement_item"
		        v-for="(item, index) in announcements"
		        :key="index"
		        
		      >
		        <view class="announcement_content">
		          <view class="announcement_title">{{ item.title }}</view>
		          <view class="announcement_date">{{ item.date }}</view>
		        </view>
				<view class="divider"></view> <!-- 分割线 -->
		      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				announcements: [
				    {
				        title: "公告标题 1斯卡哈就是看个哈时数据的撒娇看封是发积分",
				        date: "2024-01-01",
				        content: "这是公告内容 1。"
				    },
				    {
						title: "公告标题 2",
				        date: "2024-01-02",
				        content: "这是公告内容 2。"
				    },
				    {
						title: "公告标题 3",
				        date: "2024-01-03",
				        content: "这是公告内容 3。"
				    },
					{
						title: "公告标题 4",
					    date: "2024-01-04",
					    content: "这是公告内容 4。"
					},
					{
						title: "公告标题 5",
					    date: "2024-01-05",
					    content: "这是公告内容 5。"
					},
					{
						title: "公告标题 6",
					    date: "2024-01-06",
					    content: "这是公告内容 6。"
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.noticeList_box {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		align-items: center; // 纵轴对齐方式，默认是纵轴 子元素垂直居中
		justify-content: center; //纵轴对齐方式，默认是纵轴
	}
	.announcement_list {
	  display: flex;
	  flex-direction: column; /* 垂直排列 */
	}
	.announcement_item {
	  cursor: pointer; /* 鼠标悬停效果 */
	}
	.announcement_title {
	  font-size: 13px; /* 标题字体大小 */
	  margin-bottom: 5px;
	}
	.announcement_date {
	  font-size: 12px; /* 日期字体大小 */
	  color: #888; /* 日期颜色 */
	  margin-top: 10px;
	  margin-bottom: 10px; /* 下边距 */
	}
	.divider {
		height: 1px; /* 分割线高度 */
		background-color: #c5cccc; /* 分割线颜色 */
		margin: 10px 0; /* 上下边距 */
	}
	
</style>
