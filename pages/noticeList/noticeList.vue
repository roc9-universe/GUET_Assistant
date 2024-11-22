<template>
	<view class="noticeList_box">
		<view class="announcement_list">
		      <view
		        v-for="announcement in announcements"
		          :key="announcement.id"
		          @click="viewDetail(announcement.id,announcement.title)"
		        >
		          <view class="announcement_content">
		            <view class="announcement_title">{{ announcement.title }}</view>
		            <view class="announcement_date">{{ TimestampToYYYYMMDD(announcement.publishTime) }}</view>
		          </view>
				  <view class="divider"></view> <!-- 分割线 -->
		        </view>
		</view>
	</view>
</template>

<script>
import { getNoticeList } from "../../api/notice.js";
	export default {
		data() {
			return {
				announcements:[],
			}
		},
		created() {
			this.loadAnnouncements()
		},
		methods: {
			async loadAnnouncements() {
			      try {
			        const response = await getNoticeList();
			        this.announcements = response.data;
			      } catch (error) {
			        console.error('加载公告列表失败', error);
			      }
			},
			viewDetail(id,title){
				wx.navigateTo({
				    url: `/pages/detail/viewDetail?id=${id}&title=${title}`
				});
			},
			TimestampToYYYYMMDD(timestamp) {
			      const date = new Date(timestamp);
			      const year = date.getFullYear();
			      const month = String(date.getMonth() + 1).padStart(2, '0');
			      const day = String(date.getDate()).padStart(2, '0');
			      return `${year}-${month}-${day}`;
			},
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
	width: 90%;
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
