<template>
  <view class="announcement-detail">
    <view>
      <text class="title"></text>
    </view>
    <view>
      <text class="content">{{ announcement.data }}</text>
    </view>
  </view>
</template>

<script>
import { getNoticeDetail } from "../../api/notice.js";
	
export default {
  data() {
    return {
      announcement: {}, // 公告详情数据
    };
  },
  onLoad(options) {
    // 获取传递的参数
	console.log("dddd")
    const { id, title } = options;
    this.loadAnnouncementDetail(id,title);
  },
  methods: {
    // 获取公告详情
    async loadAnnouncementDetail(id,title) {
      try {
        const response = await getNoticeDetail(id,title);
        // this.announcement = response.data;
		console.log(response)
      } catch (error) {
        console.error('加载公告详情失败', error);
      }
    }
  }
};
</script>

<style>
.announcement-detail {
  padding: 20px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.content {
  font-size: 16px;
  line-height: 1.5;
}
</style>
