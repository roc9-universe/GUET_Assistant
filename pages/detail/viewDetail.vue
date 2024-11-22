<template>
    <view class="article-container">
      <!-- 文章标题 -->
      <view class="article-header">
        <text class="article-title">{{ announcementTitle }}</text>
        <text class="article-date">{{ TimestampToYYYYMMDD(announcementTime) }}</text>
      </view>
      <!-- 文章内容 -->
      <view class="article-content">
        <rich-text :nodes="richTextContent"></rich-text>
      </view>
    </view>
</template>

<script>
import { getNoticeDetail } from "../../api/notice.js";
	
export default {
  data() {
    return {
	  announcementTitle:"",
	  announcementTime:'',
	  richTextContent:"",
     
    };
  },
  onLoad(options) {
    // 获取传递的参数
	this.announcementTitle= options.title
	this.announcementTime = options.publishTime
	console.log(this.announcementTime)
    const { id, title , publishTime } = options;
	
    this.loadAnnouncementDetail(id,title);
  },
  // computed: {
  //     formattedDate() {
  //       const date = new Date(this.announcementTime);
		// console.log(this.announcementTime)
  //       const year = date.getFullYear();
  //       const month = String(date.getMonth() + 1).padStart(2, "0");
  //       const day = String(date.getDate()).padStart(2, "0");
  //       return `${year}-${month}-${day}`;
  //     },
  //   },
  methods: {
    // 获取公告详情
    async loadAnnouncementDetail(id,title) {
      try {
        const response = await getNoticeDetail(id,title);
		this.richTextContent = response.data[0]
      } catch (error) {
        console.error('加载公告详情失败', error);
      }
    },
	TimestampToYYYYMMDD(timestampString) {
		  const timestamp = parseInt(timestampString, 10);
	      const date = new Date(timestamp);
	      const year = date.getFullYear();
	      const month = String(date.getMonth() + 1).padStart(2, '0');
	      const day = String(date.getDate()).padStart(2, '0');
	      return `${year}-${month}-${day}`;
	},
  }
};
</script>

<style>
.article-container {
  padding: 20px;
  background-color: #ffffff;
}

/* 标题部分 */
.article-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.article-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
}

.article-date {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  display: block;
}

/* 文章内容部分 */
.article-content {
  font-size: 16px;
  color: #444;
  line-height: 1.8;
}

/* 富文本元素样式 */
.article-content p {
  margin-bottom: 15px;
}

.article-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.article-content li {
  margin-bottom: 8px;
}

.article-content img {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 15px;
}

.article-content a {
  color: #3498db;
  text-decoration: none;
}

.article-content a:hover {
  text-decoration: underline;
}
</style>
