<template>
	<view class="main_container">
		<view class="search_box">
			<input class="search_input" placeholder="请输入搜索内容"  />
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
		
		</view>
		<view class="notice_box">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	input {
		width: 100%;
	    height: 42px;
	    padding-left: 13px;
	}
	
	// image {
	// 	height: 42px;
	//     width: 42px;
	//     cursor: pointer;
	//     position: absolute;
	// }
	
	.main_container{
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
	.search_input{
		border: 2px ;
		border-radius: 8px;
		outline: none; /* 去掉焦点轮廓 */
		margin: 10px auto;
		height: 30px; 
		background-color: $bg-color-white; 
		overflow: hidden; /* 隐藏溢出 */
		text-emphasis-color: $text-font-color-3;
	}

    .hotspot_box { 
		border: 2px ;
		border-radius: 15px;
		margin-top: 10px;
		width: 90%;
		height: 150px; 
	} 
	.swiper-image {
		border-radius: 20px;
	    width: 100%; /* 图片宽度 */
	    height: 100%; /* 图片高度 */
	    object-fit: cover; /* 保持图片比例 */
	}
	
    .function_box { 
		border-radius: 8px;
		margin-top: 20px;
		width: 80%;
		height: 170px; 
		background-color: $bg-color-white; 
	} 
    .notice_box{ 
		margin-top: 10px;
		margin-bottom: 5px;
		width: 90%;
		height: 100%;
		background-color: $bg-color-white; 
	} 
</style>
