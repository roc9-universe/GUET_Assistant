<template>
	<view class="container">
		<image class="background-image" src="../../static/background/wheatherbackg.jpg" mode="scaleToFill"></image>
		<view class="content">
			<view class="main_weather">
				<view class="title_container">
					<view class="title_main">灵川县 乡道167</view>
					<image class="icon_location" src="../../static/icon/weather/location.svg"></image>
				</view>
				<view class="temperature">{{ temperature }}°C</view>
				<view class="title_second">{{ text }} | 空气{{ category }}</view>
			</view>

			<view class="list_weather_container">
				<view class="list_weather" v-for="(item, index) in fiveDaysWeather" key="index">
					<view class="week_day">
						{{ item.week_day }}
					</view>
					<view class="date">
						{{ item.date }}
					</view>
					<image class="list_weather_icon" :src="item.weather_icon" mode="scaleToFill"></image>
					<view class="weather_text">
						{{ item.weather_text }}
					</view>
					<view class="temperature_text">
						{{ item.tempMax}}|{{item.tempMin}}°C
					</view>
				</view>
			</view>

			<view class="title_air">空气质量</view>
			<view class="charts-box">
				<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
			</view>
		</view>
	</view>
</template>

<script>
import { request } from "@/utils/request.js";
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
				color: ["#fdecd8", "#f39423", "#f9c78b", "#f5a544", "#fbdab2", "#f7b463", "#FC8452"],
				padding: [5, 5, 5, 5],
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
			},
			temperature: 20,
			text: "",
			category: "",
			fiveDaysWeather: [],
			c: "<"
		};
	},
	onReady() {
		this.getWeatherData();
	},
	methods: {
		goback() {
			uni.navigateBack();
		},
		getWeatherData() {
			request({ url: "/message/weather", method: "GET" })
				.then((res) => {
					console.log(res);

					const air = res.data.todayAir;
					//取当天数据
					this.text = res.data.toadyWeather.text;
					this.temperature = parseInt(res.data.toadyWeather.temp);
					this.category = air.category;

					// 取未来5天数据
					const temp = res.data["5dayWeather"];
					const weekdays = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
					for (let i = 0; i < 5; i++) {
						let date = new Date(temp[i].fxDate);
						let item = {};
						let month = date.getMonth(date) + 1;
						let day = date.getDate(date);
						item.week_day = weekdays[date.getDay()];
						item.date = month + "/" + day;
						item.weather_icon = "../../static/icon/weather/" + temp[i].iconDay + "-fill.svg";
						console.log("icon=>" + temp[i].iconDay);
						item.weather_text = temp[i].textDay;
						item.tempMax = temp[i].tempMax;
						item.tempMin = temp[i].tempMin;
						this.fiveDaysWeather.push(item);
					}
					console.log(this.fiveDaysWeather);

					// 取出空气质量数据
					let airData = {
						series: [
							{
								data: [
									{
										name: "PM10",
										value: parseInt(air.pm10)
									},
									{
										name: "PM2.5",
										value: parseInt(air.pm2p5)
									},
									{
										name: "NO2",
										value: parseInt(air.no2)
									},
									{
										name: "SO2",
										value: parseInt(air.so2)
									},
									{
										name: "O3",
										value: parseInt(air.o3)
									},
									{
										name: "CO",
										value: parseInt(air.co)
									}
								]
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(airData));
				})
				.catch((error) => {
					console.error("请求失败:", error);
					uni.showToast({
						title: "error",
						duration: 1500
					});
				});
		}
	}
};
</script>

<style lang="scss">
@import "../../common/style/base-style.scss";

/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
	width: 100%;
	background-color: #333132;
	border-radius: 64rpx;
}

.container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	position: relative;
}

.content {
	padding: $page-padding;
	width: 100%;
	flex: 1;
	justify-content: center;
}

.main_weather {
	margin-top: 64rpx;
	margin-bottom:64rpx;
}

.background-image {
	width: 100%;
	height: 115%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	object-fit: cover;
}

.title_air {
	padding: $page-padding;
	font-size: 36rpx;
	font-weight: bolder;
	color: $text-font-color-5;
}

.title_container {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.title_main {
	font-size: 64rpx;
	font-weight: bold;
	color: $text-font-color-5;
}

.icon_location {
	width: 48rpx;
	height: 48rpx;
}

.temperature {
	font-size: 128rpx;
	color: $text-font-color-5;
	text-align: center;
}

.title_second {
	font-size: 32rpx;
	font-weight: bold;
	color: white;
	text-align: center;
}

.list_weather_container {
	width: 100%;
	height: 300rpx;
	margin-top: 64rpx;
	margin-bottom: 64rpx;
	display: flex;
	flex-direction: row;
}

.list_weather {
	width: 20%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #333132;
	padding-top: 2%;
	justify-content: center;
	align-items: center;
}

.week_day {
	text-align: center;
	font-size: 24rpx;
	font-weight: bold;
	color: $text-font-color-5;
}

.date {
	text-align: center;
	font-size: 24rpx;
	font-weight: bold;
	color: $text-font-color-5;
}

.list_weather_icon {
	width: 50%;
	height: 50%;
}

.weather_text {
	text-align: center;
	font-size: 24rpx;
	font-weight: bold;
	color: $text-font-color-5;
}

.temperature_text {
	text-align: center;
	font-size: 32rpx;
	font-weight: bold;
	color: $text-font-color-5;
}

</style>
