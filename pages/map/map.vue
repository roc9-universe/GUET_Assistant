<template>
    <view>
        <view class="map_text" v-if="textData.name">
            <view>
                <text>您选择的位置：</text>
                <text class="tip-titile">{{ textData.name }}</text>
                <text class="tip-address">{{ textData.address }}</text>
            </view>
        </view>
        <view class="map_container">
            <map
                :class="['map']"
                :id="'map'"
                :longitude="longitude"
                :latitude="latitude"
                :scale="14"
                :show-location="true"
                :markers="markers"
				:polyline="polyline"
                @click="handleMarkerTap"></map>
        </view>

		<view class="search">
			<view v-show="isSearch" class="searchBox">
			    <input type="text" v-model="searchKey" @focus="handleSearchTap" @input="handelSearch" placeholder="请输入搜索内容" />
			    <text style="color: #174E8E; margin-left: 140rpx;" @click="handelSearch">搜索</text>
				<text style="color: #174E8E; margin-left: 20rpx;" @click="handelCancel">重置</text>
			</view>
		</view>	
        <scroll-view scroll-y class="address-list">
            <view v-show="!isSearch">
                <view class="address-list-item" v-for="item in addressList" :key="item.id" @click="sureAddress(item)">
                    <view>
                        <text class="tip-titile">{{ item.name }}</text>
                        <text class="tip-address">{{ (+item.distance).toFixed(0) }}m | {{ item.address }}</text>
                    </view>
                    <view style="margin-right: 30rpx">
                        <img v-if="activeId == item.id" style="width: 50rpx; height: 50rpx" src="../../static/icon/mine/success.svg" alt="" />
                    </view>
                </view>
            </view>
            <view v-show="isSearch">
                <view class="address-list-item" v-for="item in searchAddressList" :key="item.id" @click="sureAddress(item)">
                    <view>
                        <text class="tip-titile">{{ item.name }}</text>
                        <text class="tip-address">{{ (+item.distance).toFixed(0) }}m | {{ item.address }}</text>
                    </view>
                    <view style="margin-right: 30rpx">
                        <img v-if="activeId == item.id" style="width: 50rpx; height: 50rpx" src="../../static/icon/mine/success.svg" alt="" />
                    </view>
                </view>
            </view>
        </scroll-view>
		<button class="navigate" @click="navigateToSelectedLocation">开始导航</button>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as amapFile from '../../utils/amap-wx.130';

const longitude = ref(null); // 经度
const latitude = ref(null); // 纬度
const markers = ref([]); // 标记点
const myAmapFun = ref(null);
const key = ref('af701eb29bf0d652372fb76c0b388410'); // 高德地图key
const addressList = ref([]); // 周边列表
const searchAddressList = ref([]); // 搜索返回的周边列表
const activeId = ref(-1); // 当前选中的周边id
const isFirstClick = ref(true); //是否首次搜索
const isSearch = ref(false); // 是否搜索状态
const searchKey = ref(''); // 用户搜索的内容
let throttleTimer = null; // 定时器编号
const polyline = ref([]); //导航路径
const textData = ref({
    latitude: null,
    longitude: null,
    name: null,
    address: null,
    province: null,
    city: null,
    district: null,
});
// 用户当前位置的经纬度
const currentLocation = ref({
    longitude: null,
    latitude: null,
});


onMounted(() => {
    myAmapFun.value = new amapFile.AMapWX({ key: key.value });
    uni.getLocation({
		type: 'gcj02',
        success: (res) => {
            currentLocation.value.longitude = res.longitude;
            currentLocation.value.latitude = res.latitude;
            longitude.value = res.longitude;
            latitude.value = res.latitude;
            getRegeo(true);
        },
    });
});

// 获取地址描述信息
const getRegeo = (isUseResAddress) => {
    const location = `${longitude.value},${latitude.value}`;
    myAmapFun.value.getRegeo({
        iconPath: '../../static/icon/mine/position.svg',
        iconWidth: 22,
        iconHeight: 32,
        location: location,
        success: (data) => {
            addressList.value = data[0].regeocodeData.pois;
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
                district: data[0].regeocodeData.addressComponent.district,
            };
        },
        fail: (info) => {
            uni.showModal({ title: info.errMsg });
        },
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
            longitude: ev.detail.longitude,
        },
    ];
    getRegeo();
};

// 用户点击下方列表选项
const sureAddress = (ev, type) => {
    activeId.value = ev.id;
    const [longitudeStr, latitudeStr] = ev.location.split(',');
    longitude.value = parseFloat(longitudeStr); // 将字符串转换为浮点数
    latitude.value = parseFloat(latitudeStr);

    // 更改标记点
    markers.value = [
        {
            id: 1,
            latitude: latitude.value, // 正确地使用了latitude变量
            longitude: longitude.value, // 正确地使用了longitude变量
        },
    ];
	
	textData.value = {
	    latitude: latitude.value,
	    longitude: longitude.value,
	    name: ev.name,
	    address: ev.address,
	    province: ev.province || '',
	    city: ev.city || '',
	    district: ev.district || '',
	};
};

// 用户点击搜索框
const handleSearchTap = () => {
	if (isFirstClick.value) {
		searchKey.value = ''; // 清空搜索内容
		searchAddressList.value = []; // 清空搜索列表
		isSearch.value = true;
		isFirstClick.value = false;
	}
};
// 用户点击重置按钮（搜索列表页）
const handelCancel = () => {
    searchKey.value = ''; // 清空搜索内容
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
            myAmapFun.value.getPoiAround({
                iconPath: '../../static/icon/mine/position.svg',
                iconWidth: 22,
                iconHeight: 32,
                location: location,
                querykeywords: searchKey.value,
                success: (data) => {
                    if (data.poisData.length == 0) {
                        uni.showModal({
                            title: '提示',
                            content: '没有搜索到结果',
                            showCancel: false,
                        });
                    } else {
                        searchAddressList.value = data.poisData; // 将搜索回来的数据放在列表中显示
                    }
                },
                fail: (data) => {
                    console.log('搜索失败', data);
                },
            });
        }
    }, 500);
};

//导航规划路径
const navigateToSelectedLocation = () => {
    if (!longitude.value || !latitude.value || !currentLocation.value.longitude || !currentLocation.value.latitude) {
        uni.showToast({ title: '请先选择位置', icon: 'none' });
        return;
    }

    myAmapFun.value.getWalkingRoute({
        origin: `${currentLocation.value.longitude},${currentLocation.value.latitude}`,
        destination: `${longitude.value},${latitude.value}`,
        success: (data) => {
            if (data.paths && data.paths[0] && data.paths[0].steps) {
                const routePoints = data.paths[0].steps.flatMap(step =>
                    step.polyline.split(';').map(point => {
                        const [lng, lat] = point.split(',').map(Number);
                        return { longitude: lng, latitude: lat };
                    })
                );
                markers.value = [
                    { id: 0, latitude: currentLocation.value.latitude, longitude: currentLocation.value.longitude, iconPath: 'start_icon', width: 30, height: 30 },
                    { id: 1, latitude: latitude.value, longitude: longitude.value, iconPath: 'end_icon', width: 30, height: 30 },
                ];
                polyline.value = [{ points: routePoints, color: "#174E8E", width: 6, dottedLine: false }];
                uni.showToast({ title: '导航路径已生成', icon: 'none' });
            } else {
                uni.showToast({ title: '路径规划失败', icon: 'none' });
            }
        },
        fail: (info) => uni.showToast({ title: '路径规划失败', icon: 'none' }),
    });
};
</script>

<style lang="scss" scoped>
//@import url(@/common/style/base-style.scss);
:deep(.uni-easyinput__placeholder-class) {
    background-color: red !important;
}

.map_container {
    position: relative;
    top: 0;
    bottom: 80px; /* 底部留出的空间 */
    left: 0;
    right: 0;
}
.map {
    width: 100%;
    /* 计算总的高度，减去底部空间，然后取45% */
    height: 450rpx;
}
.map_text {
    background: #fff;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
text {
    margin: 5px 0;
    display: block;
    font-size: 12px;
}
.h1 {
    margin: 15px 0;
    font-size: 15px;
}
.address-list {
    position: relative;
    top: auto; /* 移除绝对定位 */
    bottom: auto;
    left: 50rpx;
    right: 50rpx;
    height: 650rpx;
	width: 650rpx;
    overflow-y: auto; /* 添加滚动条 */
    .address-list-item {
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
.tip-titile {
    font-size: 28rpx;
    color: #333;
    font-weight: 400;
}
.tip-address {
    font-size: 20rpx;
    color: gray;
}
.search {
    width: 750rpx;
    padding: 8rpx;
    background-color: #fff;
    border-radius: 10rpx;
    border-bottom: 1px solid #eee;
	align-items: center;
	margin-left: 40rpx;
	
    .searchBox {
        height: 65rpx;
        width: 90%;
        background-color: #ebebeb;
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
        border: 1px solid #d3d3d3;
        border-radius: 5px;
        background-color: #ebebeb;
        margin-top: 20rpx;
		margin-right: 50rpx;
    }
}
.navigate{
	width: 750rpx;
	height: 90rpx;
	background-color: #174E8E;
	font-size: 36rpx;
	color: white;
	align-items: center;
	justify-content: center;
}
</style>