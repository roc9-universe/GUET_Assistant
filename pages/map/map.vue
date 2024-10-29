<template>
    <view>
        <view class="map_text" v-if="textData.name">
            <view>
                <text>您选择的位置：</text>
                <text class="tip-titile">{{ textData.name }}</text>
                <text class="tip-address">{{ textData.address }}</text>
            </view>
            <view @click="choiceAddress" style="color: #0079ff">确定</view>
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
                @click="handleMarkerTap"></map>
        </view>

        <scroll-view scroll-y class="address-list">
            <view v-show="!isSearch">
                <view class="search">
                    <view class="searchBox" @click="handleSearchTap">
                        <text style="font-size: 26rpx; color: gray"> 搜索地点 </text>
                    </view>
                </view>
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
                <view class="search">
                    <view class="searchBox">
                        <input type="text" v-model="searchKey" @change="handelSearch" placeholder="请输入搜索内容" />
                        <text style="color: #0079ff" @click="handelCancel">取消</text>
                    </view>
                </view>
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
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as amapFile from '../../utils/amap-wx.130';

const longitude = ref(null); // 经度
const latitude = ref(null); // 纬度
const markers = ref([]); // 标记点
const myAmapFun = ref(null);
const key = ref('	af701eb29bf0d652372fb76c0b388410'); // 高德地图key
const addressList = ref([]); // 周边列表
const searchAddressList = ref([]); // 搜索返回的周边列表
const activeId = ref(-1); // 当前选中的周边id
const isSearch = ref(false); // 是否搜索状态
const searchKey = ref(''); // 用户搜索的内容
let throttleTimer = null; // 定时器编号
const textData = ref({
    latitude: '', // 纬度
    longitude: '', // 经度
    name: '', // 名称
    address: '', // 详细地址
    province: '', // 省份
    city: '', // 城市
    district: '', // 区县
});

onMounted(() => {
    myAmapFun.value = new amapFile.AMapWX({ key: key.value });
    getRegeo(true);
});

// 获取地址描述信息
const getRegeo = (isUseResAddress) => {
    let location = null;
    if (longitude.value != null && latitude.value != null) {
        location = longitude.value + ',' + latitude.value;
    }

    myAmapFun.value.getRegeo({
        iconPath: '标记坐标图片',
        iconWidth: 22,
        iconHeight: 32,
        location: location,
        success: (data) => {
            console.log('成功的数据', data[0].regeocodeData);
            addressList.value = data[0].regeocodeData.pois;
            if (isUseResAddress) {
                latitude.value = data[0].latitude;
                longitude.value = data[0].longitude;
            }
        },
        fail: function (info) {
            wx.showModal({ title: info.errMsg });
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
};
// 用户点击搜索按钮
const handleSearchTap = () => {
    searchKey.value = ''; // 清空搜索内容
    searchAddressList.value = []; // 清空搜索列表
    isSearch.value = true;
};
// 用户点击取消按钮（搜索列表页）
const handelCancel = () => {
    searchKey.value = ''; // 清空搜索内容
    searchAddressList.value = []; // 清空搜索列表
    isSearch.value = false;
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
                iconPath: '标记图片',
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
// 用户选择了位置
const choiceAddress = () => {
    secretStore.addressInfo = textData.value; // 将数据存到内存中
    uni.navigateBack();
};
</script>

<style lang="scss" scoped>
:deep(.uni-easyinput__placeholder-class) {
    background-color: red !important;
}
.container {
    width: 680.56rpx;
    height: 416.67rpx;
    margin: 6.94rpx 0;
    border: 1px solid #e3e3e3;

    .coordinate {
        z-index: 9999;
        position: relative;
        top: 50%;
        left: 50%;
    }
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
    height: calc((100vh - 80px) * 0.45);
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
    left: 0;
    right: 0;
    /* 同样计算剩余的高度，取剩下的45% */
    height: calc((100vh - 80px) * 0.7);
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
    padding: 8px 15px;
    background-color: #fff;
    border-radius: 10rpx;
    border-bottom: 1px solid #eee;

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
        padding: 8px 15px;
        outline: none;
        border: 1px solid #d3d3d3;
        border-radius: 5px;
        background-color: #ebebeb;
        margin-top: 10px;
    }
}
</style>