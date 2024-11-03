<template>
	<view class="container">
		<view class="top_bar">

		</view>

		<view class="content">
			<image class="background-image" src="../../static/background/wheatherbackg.jpg" mode="aspectFill"></image>
			
			<view class="search_box">
				<view class="search_icon"></view>
				<view class="search_input"></view>
			</view>
			
			<view class="main_weather">
				
			</view>

			<view class="list_weather">
				
			</view>

			<view class="title_air">
				空气质量
			</view>
			<view class="charts-box">
				<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
      //这里的 opts 是图表类型 type="ring" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['ring'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        color: ["#fdecd8","#f39423","#f9c78b","#f5a544","#fbdab2","#f7b463","#FC8452"],
        padding: [5,5,5,5],
        fontSize: 13,
        fontColor: "#ffffff",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: true,
          position: "right",
          lineHeight: 25,
          float: "center",
          padding: 5,
          margin: 5,
          backgroundColor: "#333132",
          borderColor: "#333132",
          borderWidth: 0,
          fontSize: 13,
          fontColor: "#ffffff",
          hiddenColor: "#CECECE",
          itemGap: 10
        },
        title: {
          name: "",
          color: "#ffffff",
          offsetX: 0,
          offsetY: 0
        },
        subtitle: {
          name: "",
          color: "#ffffff",
          offsetX: 0,
          offsetY: 0
        },
        extra: {
          ring: {
            ringWidth: 15,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#333132",
            centerColor: "#333132",
            customRadius: 0,
            linearType: "none"
          },
          tooltip: {
            showBox: true,
            showArrow: true,
            showCategory: false,
            borderWidth: 0,
            borderRadius: 0,
            borderColor: "#ffffff",
            borderOpacity: 0.7,
            bgColor: "#ffffff",
            bgOpacity: 0.7,
            gridType: "solid",
            dashLength: 4,
            gridColor: "#CCCCCC",
            boxPadding: 3,
            fontSize: 13,
            lineHeight: 20,
            fontColor: "#ffffff",
            legendShow: true,
            legendShape: "auto",
            splitLine: true,
            horizentalLine: false,
            xAxisLabel: false,
            yAxisLabel: false,
            labelBgColor: "#ffffff",
            labelBgOpacity: 0.7,
            labelFontColor: "#ffffff"
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            series: [
              {
                data: [{"name":"PM10","value":61},{"name":"PM2.5","value":37},{"name":"MO2","value":25},{"name":"SO2","value":3},{"name":"O3","value":108},{"name":"CO","value":0}]
              }
            ]
          };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
};
</script>

<style lang="scss">
	@import '../../common/style/base-style.scss';

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		margin-left: 2.5%;
		width: 95%;
		height: 512rpx;
		background-color: #333132;
		border-radius: 64rpx;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.top_bar {
		height: 8vh;
		background-color: $brand-theme-color;
	}

	.content {
		width: 100%;
		flex: 1;
		justify-content: center; 
	}

	.search_box {
		margin-top: 16rpx;
		height: 64rpx;
		width: 100%;
		background-color: #ebebeb;
		border-radius: 32rpx;
	}

	.background-image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>