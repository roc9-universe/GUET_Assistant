<template>
	<view class="page-container">
		<view class="top">
			<view class="map_text" v-if="textData.name && !isNavigationMode">
				<view>
					<text>您选择的位置：</text>
					<text class="tip-titile">{{ textData.name }}</text>
					<text class="tip-address">{{ textData.address }}</text>
				</view>
			</view>
			<view class="map_container">
				<map
					v-if="isLocationReady"
					:class="['map', { fullScreen: isNavigationMode }]"
					:id="'map'"
					:longitude="longitude"
					:latitude="latitude"
					:scale="isNavigationMode ? navigationScale : originalScale"
					:show-location="true"
					:markers="markers"
					:polyline="polyline"
					@click="handleMarkerTap"
				></map>
			</view>

			<view v-if="!isNavigationMode" class="place">
				<text style="color: #174e8e; margin-left: 20rpx">猜你想去</text>
				<view v-for="place in recommendedPlaces" :key="place.id" class="place-item" @click="selectPlace(place)">
					{{ place.name }}
				</view>
			</view>

			<view v-if="!isNavigationMode" class="search">
				<view v-show="isSearch" class="searchBox">
					<input
						type="text"
						v-model="searchKey"
						@focus="handleSearchTap"
						@input="handelSearch"
						placeholder="请输入搜索内容"
					/>
					<text style="color: #174e8e; margin-left: 140rpx" @click="handelSearch">搜索</text>
					<text style="color: #174e8e; margin-left: 20rpx" @click="handelCancel">重置</text>
				</view>
			</view>
		</view>
		<view class="buttom">
			<scroll-view scroll-y class="address-list">
				<view v-show="!isSearch" v-if="!isNavigationMode">
					<view
						class="address-list-item"
						v-for="item in addressList"
						:key="item.id"
						@click="sureAddress(item)"
					>
						<view>
							<text class="tip-titile">{{ item.name }}</text>
							<text class="tip-address">{{ (+item.distance).toFixed(0) }}m | {{ item.address }}</text>
						</view>
						<view style="margin-right: 30rpx">
							<img
								v-if="activeId == item.id"
								style="width: 50rpx; height: 50rpx"
								src="../../static/icon/mine/success.svg"
								alt=""
							/>
						</view>
					</view>
				</view>
				<view v-show="isSearch" v-if="!isNavigationMode">
					<view
						class="address-list-item"
						v-for="item in searchAddressList"
						:key="item.id"
						@click="sureAddress(item)"
					>
						<view>
							<text class="tip-titile">{{ item.name }}</text>
							<text class="tip-address">{{ (+item.distance).toFixed(0) }}m | {{ item.address }}</text>
						</view>
						<view style="margin-right: 30rpx">
							<img
								v-if="activeId == item.id"
								style="width: 50rpx; height: 50rpx"
								src="../../static/icon/mine/success.svg"
								alt=""
							/>
						</view>
					</view>
				</view>
			</scroll-view>
			<button class="navigate" v-if="!isNavigationMode" @click="navigateToSelectedLocation">开始导航</button>
			<button class="navigate" v-if="isNavigationMode" @click="exitNavigationMode">退出导航</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as amapFile from "../../utils/amap-wx.130";

const isLocationReady = ref(false);
const longitude = ref(null); // 经度
const latitude = ref(null); // 纬度
const markers = ref([]); // 标记点
const myAmapFun = ref(null);
const key = ref("af701eb29bf0d652372fb76c0b388410"); // 高德地图key
const addressList = ref([]); // 周边列表
const searchAddressList = ref([]); // 搜索返回的周边列表
const activeId = ref(-1); // 当前选中的周边id
const isFirstClick = ref(true); //是否首次搜索
const isSearch = ref(false); // 是否搜索状态
const searchKey = ref(""); // 用户搜索的内容
let throttleTimer = null; // 定时器编号
const polyline = ref([]); //导航路径
const isNavigationMode = ref(false); // 是否处于导航模式
const originalScale = ref(14); // 原始地图缩放级别
const navigationScale = ref(16); // 导航时的地图放大级别
const defaultLongitude = ref(110.416819);
const defaultLatitude = ref(25.311724);
const textData = ref({
	latitude: null,
	longitude: null,
	name: null,
	address: null,
	province: null,
	city: null,
	district: null
});
// 用户当前位置的经纬度
const currentLocation = ref({
	longitude: null,
	latitude: null
});

// 推荐地点数据
const recommendedPlaces = ref([
	{ id: 1, name: "第一教学楼", longitude: 110.41782151470954, latitude: 25.315374761215846 },
	{ id: 2, name: "第二教学楼", longitude: 110.41891363744048, latitude: 25.315879193446925 },
	{ id: 3, name: "第三教学楼", longitude: 110.41941938962384, latitude: 25.31541481096049 },
	{ id: 4, name: "第四教学楼", longitude: 110.41719692114998, latitude: 25.314746358110042 },
	{ id: 5, name: "第五教学楼", longitude: 110.41687037245902, latitude: 25.314296370901115 },
	{ id: 6, name: "第六教学楼", longitude: 110.41670575852856, latitude: 25.313800793990403 },
	{ id: 7, name: "文科楼", longitude: 110.41655433799303, latitude: 25.31291651785881 },
	{ id: 8, name: "第十一教学楼", longitude: 110.41827086673572, latitude: 25.31208859486333 },
	{ id: 9, name: "第十三教学楼", longitude: 110.41711367561174, latitude: 25.31109742554851 },
	{ id: 10, name: "第十四教学楼", longitude: 110.41733270220732, latitude: 25.310791425226192 },
	{ id: 11, name: "第十六教学楼", longitude: 110.41890899999999, latitude: 25.31016200000001 },
	{ id: 12, name: "第十七教学楼", longitude: 110.4189803990372, latitude: 25.309524262307676 },
	{ id: 13, name: "第四十一教学楼", longitude: 110.4176399766751, latitude: 25.306873475822282 },
	{ id: 14, name: "第四十二教学楼", longitude: 110.41839417072856, latitude: 25.30686182085074 },
	{ id: 15, name: "第四十五教学楼", longitude: 110.41684710588527, latitude: 25.306797718498483 },
	{ id: 16, name: "实训楼", longitude: 110.420936997956, latitude: 25.30989185732404 },
	{ id: 17, name: "花江慧谷(四创)", longitude: 110.41368666301423, latitude: 25.315393955525753 },
	{ id: 18, name: "花江智慧谷(观音山)", longitude: 110.408787, latitude: 25.305022 },
	{ id: 19, name: "科技楼", longitude: 110.4193177998419, latitude: 25.314837335504315 },
	{ id: 20, name: "大礼堂(会议中心)", longitude: 110.42005841818025, latitude: 25.310717929644596 }
]);

onMounted(() => {
	myAmapFun.value = new amapFile.AMapWX({ key: key.value });

	uni.getLocation({
		type: "gcj02",
		success: (res) => {
			currentLocation.value.longitude = res.longitude;
			currentLocation.value.latitude = res.latitude;
			longitude.value = res.longitude;
			latitude.value = res.latitude;
			if (longitude.value && latitude.value) {
				getRegeo(true);
				isLocationReady.value = true;
			} else {
				console.log("位置数据未准备好，等待...");
			}
		},
		fail: (err) => {
			console.log("定位失败", err);
			uni.showModal({ title: "定位失败", content: err.message });
		}
	});
});

// 获取地址描述信息
const getRegeo = (isUseResAddress) => {
	const location = `${longitude.value},${latitude.value}`;
	myAmapFun.value.getRegeo({
		iconPath: "../../static/icon/mine/position.svg",
		iconWidth: 22,
		iconHeight: 32,
		location: location,
		success: (data) => {
			addressList.value = data[0].regeocodeData.pois;
			console.log("Data:", addressList.value);
			if (isUseResAddress) {
				latitude.value = data[0].latitude;
				longitude.value = data[0].longitude;
			}
			textData.value = {
				latitude: data[0].latitude,
				longitude: data[0].longitude,
				name: data[0].name,
				address: data[0].desc,
				province: data[0].regeocodeData.addressComponent.province,
				city: data[0].regeocodeData.addressComponent.city,
				district: data[0].regeocodeData.addressComponent.district
			};

			setTimeout(() => {
				console.log("Address list updated:", addressList.value); // 确保视图更新
			}, 100);
		},
		fail: (info) => {
			uni.showModal({ title: info.errMsg });
		}
	});
};

// 用户点击地图
const handleMarkerTap = (ev) => {
	latitude.value = ev.detail.latitude;
	longitude.value = ev.detail.longitude;
	// 更改标记点
	markers.value = [
		{
			id: 1,
			latitude: ev.detail.latitude,
			longitude: ev.detail.longitude
		}
	];
	getRegeo();
};

// 用户点击下方列表选项
const sureAddress = (ev, type) => {
	activeId.value = ev.id;
	const [longitudeStr, latitudeStr] = ev.location.split(",");
	longitude.value = parseFloat(longitudeStr); // 将字符串转换为浮点数
	latitude.value = parseFloat(latitudeStr);

	// 更改标记点
	markers.value = [
		{
			id: 1,
			latitude: latitude.value, // 使用了latitude变量
			longitude: longitude.value // 使用了longitude变量
		}
	];

	textData.value = {
		latitude: latitude.value,
		longitude: longitude.value,
		name: ev.name,
		address: ev.address,
		province: ev.province || "",
		city: ev.city || "",
		district: ev.district || ""
	};
};

// 用户点击推荐地点
const selectPlace = (place) => {
	longitude.value = place.longitude;
	latitude.value = place.latitude;

	// 更改标记点
	markers.value = [
		{
			id: 1,
			latitude: place.latitude,
			longitude: place.longitude
		}
	];
	getRegeo();
};

// 用户点击搜索框
const handleSearchTap = () => {
	if (isFirstClick.value) {
		searchKey.value = ""; // 清空搜索内容
		searchAddressList.value = []; // 清空搜索列表
		isSearch.value = true;
		isFirstClick.value = false;
	}
};
// 用户点击重置按钮（搜索列表页）
const handelCancel = () => {
	searchKey.value = ""; // 清空搜索内容
	searchAddressList.value = []; // 清空搜索列表
	isSearch.value = false;
	isFirstClick.value = true;
};

// 用户搜索内容
const handelSearch = (ev) => {
	if (throttleTimer) {
		clearTimeout(throttleTimer);
	}
	throttleTimer = setTimeout(() => {
		// 只有输入框内有值的时候才会搜索
		if (searchKey.value) {
			const specificPlace = "桂林电子科技大学花江校区";
			const query = `${specificPlace} ${searchKey.value}`; // 拼接模糊搜索关键词
			myAmapFun.value.getPoiAround({
				iconPath: "../../static/icon/mine/position.svg",
				iconWidth: 22,
				iconHeight: 32,
				location: location,
				querykeywords: query,
				success: (data) => {
					if (data.poisData.length == 0) {
						uni.showModal({
							title: "提示",
							content: "没有搜索到结果",
							showCancel: false
						});
					} else {
						searchAddressList.value = data.poisData; // 将搜索回来的数据放在列表中显示
					}
				},
				fail: (data) => {
					console.log("搜索失败", data);
				}
			});
		}
	}, 500);
};

// 哈弗辛公式计算两点间的地理距离（单位：公里）
function haversine(lat1, lon1, lat2, lon2) {
	const R = 6371; // 地球半径，单位为 km
	const rad = Math.PI / 180;
	const dLat = (lat2 - lat1) * rad;
	const dLon = (lon2 - lon1) * rad;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // 返回距离，单位为公里
}

//导航规划路径
const navigateToSelectedLocation = () => {
	if (!longitude.value || !latitude.value || !currentLocation.value.longitude || !currentLocation.value.latitude) {
		uni.showToast({ title: "请先选择位置", icon: "none" });
		return;
	}

	myAmapFun.value.getWalkingRoute({
		origin: `${currentLocation.value.longitude},${currentLocation.value.latitude}`,
		destination: `${longitude.value},${latitude.value}`,
		success: (data) => {
			if (data.paths && data.paths[0] && data.paths[0].steps) {
				const routePoints = data.paths[0].steps.flatMap((step) =>
					step.polyline.split(";").map((point) => {
						const [lng, lat] = point.split(",").map(Number);
						return { longitude: lng, latitude: lat };
					})
				);
				markers.value = [
					{
						id: 0,
						latitude: currentLocation.value.latitude,
						longitude: currentLocation.value.longitude,
						iconPath: "../../static/icon/mine/position.svg",
						width: 30,
						height: 30
					},
					{
						id: 1,
						latitude: latitude.value,
						longitude: longitude.value,
						iconPath: "../../static/icon/mine/position.svg",
						width: 30,
						height: 30
					}
				];
				polyline.value = [{ points: routePoints, color: "#174E8E", width: 6, dottedLine: false }];

				isNavigationMode.value = true;

				// 计算视野边界
				const lngValues = routePoints.map((p) => p.longitude);
				const latValues = routePoints.map((p) => p.latitude);
				const maxLng = Math.max(...lngValues);
				const minLng = Math.min(...lngValues);
				const maxLat = Math.max(...latValues);
				const minLat = Math.min(...latValues);

				// 中心点经纬度
				longitude.value = (maxLng + minLng) / 2;
				latitude.value = (maxLat + minLat) / 2;

				// 动态缩放比例
				const distance = haversine(minLat, minLng, maxLat, maxLng);
				console.log("distance:", distance);
				const recommendedScale = ref();
				if (distance < 1) {
					recommendedScale.value = 17; // 1km以内使用最大缩放级别
				} else if (distance < 5) {
					recommendedScale.value = 15; // 1km到5km之间使用较大缩放级别
				} else if (distance < 50) {
					recommendedScale.value = 13; // 5km到50km之间使用中等缩放级别
				} else {
					recommendedScale.value = 11; // 超过50km时使用较小缩放级别
				}
				navigationScale.value = recommendedScale.value;
				uni.showToast({ title: "导航路径已生成", icon: "none" });
			} else {
				uni.showToast({ title: "路径规划失败", icon: "none" });
			}
		},
		fail: (info) => uni.showToast({ title: "路径规划失败", icon: "none" })
	});
};

//退出导航模式
const exitNavigationMode = () => {
	isNavigationMode.value = false; // 退出导航模式
	polyline.value = []; // 清除导航路径
	markers.value = []; // 清除标记点
	setTimeout(() => {
		longitude.value = currentLocation.value.longitude;
		latitude.value = currentLocation.value.latitude;
	}, 300);
};
</script>

<style lang="scss" scoped>
//@import url(@/common/style/base-style.scss);
.page-container {
	display: flex;
	flex-direction: column;
	height: 100vh; /* 全屏高度 */
}

.top {
	flex: 0 0 auto; /* 前置内容占据自适应高度 */
	margin-bottom: 20rpx;
}
.buttom {
	flex: 1; /* 剩余空间填充 */
}

.tip-titile {
	font-size: 28rpx;
	color: $text-font-color-1;
	font-weight: 400;
}
.tip-address {
	font-size: 20rpx;
	color: gray;
}

.map_container {
	position: flex;
	top: 0;
	bottom: calc(env(safe-area-inset-bottom) + 90rpx); /* 底部留出的空间 */
	left: 0;
	right: 0;
}
.map {
	width: 100%;
	height: 450rpx;
	transition: height 0.3s ease;
}
.fullScreen {
	height: calc(100vh - env(safe-area-inset-bottom));
}
.map_text {
	background: $bg-color-grey;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
text {
	margin: 5px;
	display: block;
	font-size: 12px;
}
.h1 {
	margin: 15px 0;
	font-size: 15px;
}

.place {
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: left;
	overflow-x: auto; /* 允许横向滚动 */
	white-space: nowrap; /* 禁止内容换行 */
	font-size: 20rpx;
	margin-left: 20rpx;
}
.place-item {
	padding-left: 10px;
	padding-right: 10px;
	color: $brand-theme-color;
	cursor: pointer;
}

.search {
	width: 750rpx;
	padding: 8rpx;
	background-color: #fff;
	border-radius: 10rpx;
	align-items: center;
	margin-left: 40rpx;
	height: 65rpx;

	.searchBox {
		height: 65rpx;
		width: 90%;
		background-color: $bg-color-grey;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
	}

	.searchInput {
		height: 45rpx;
		padding: 8px;
		outline: none;
		border: 1px solid $border-color;
		border-radius: 5px;
		background-color: $bg-color-grey;
		margin-top: 20rpx;
		margin-right: 50rpx;
	}
}

.address-list {
	//position: relative;
	top: auto;
	bottom: calc(env(safe-area-inset-bottom) + 90rpx);
	margin-left: 50rpx;
	margin-right: 50rpx;
	height: 550rpx;
	width: 650rpx;
	overflow-y: auto; /* 添加滚动条 */
	.address-list-item {
		border-bottom: 1px solid $border-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

.navigate {
	width: 750rpx;
	height: 90rpx;
	background-color: $brand-theme-color;
	font-size: 36rpx;
	color: white;
	bottom: env(safe-area-inset-bottom);
	position: fixed;
	align-items: center;
	justify-content: center;
	border-radius: 5px 5px 0 0;
	box-sizing: border-box;
}
</style>
