"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../utils/amap-wx.130.js");
const _sfc_main = {
  __name: "map",
  setup(__props) {
    const longitude = common_vendor.ref(null);
    const latitude = common_vendor.ref(null);
    const markers = common_vendor.ref([]);
    const myAmapFun = common_vendor.ref(null);
    const key = common_vendor.ref("	af701eb29bf0d652372fb76c0b388410");
    const addressList = common_vendor.ref([]);
    const searchAddressList = common_vendor.ref([]);
    const activeId = common_vendor.ref(-1);
    const isSearch = common_vendor.ref(false);
    const searchKey = common_vendor.ref("");
    let throttleTimer = null;
    const textData = common_vendor.ref({
      latitude: "",
      // 纬度
      longitude: "",
      // 经度
      name: "",
      // 名称
      address: "",
      // 详细地址
      province: "",
      // 省份
      city: "",
      // 城市
      district: ""
      // 区县
    });
    common_vendor.onMounted(() => {
      myAmapFun.value = new (void 0)({ key: key.value });
      getRegeo(true);
    });
    const getRegeo = (isUseResAddress) => {
      let location2 = null;
      if (longitude.value != null && latitude.value != null) {
        location2 = longitude.value + "," + latitude.value;
      }
      myAmapFun.value.getRegeo({
        iconPath: "标记坐标图片",
        iconWidth: 22,
        iconHeight: 32,
        location: location2,
        success: (data) => {
          console.log("成功的数据", data[0].regeocodeData);
          addressList.value = data[0].regeocodeData.pois;
          if (isUseResAddress) {
            latitude.value = data[0].latitude;
            longitude.value = data[0].longitude;
          }
        },
        fail: function(info) {
          common_vendor.wx$1.showModal({ title: info.errMsg });
        }
      });
    };
    const handleMarkerTap = (ev) => {
      latitude.value = ev.detail.latitude;
      longitude.value = ev.detail.longitude;
      markers.value = [
        {
          id: 1,
          latitude: ev.detail.latitude,
          longitude: ev.detail.longitude
        }
      ];
      getRegeo();
    };
    const sureAddress = (ev, type) => {
      activeId.value = ev.id;
      const [longitudeStr, latitudeStr] = ev.location.split(",");
      longitude.value = parseFloat(longitudeStr);
      latitude.value = parseFloat(latitudeStr);
      markers.value = [
        {
          id: 1,
          latitude: latitude.value,
          // 正确地使用了latitude变量
          longitude: longitude.value
          // 正确地使用了longitude变量
        }
      ];
    };
    const handleSearchTap = () => {
      searchKey.value = "";
      searchAddressList.value = [];
      isSearch.value = true;
    };
    const handelCancel = () => {
      searchKey.value = "";
      searchAddressList.value = [];
      isSearch.value = false;
    };
    const handelSearch = (ev) => {
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
      throttleTimer = setTimeout(() => {
        if (searchKey.value) {
          myAmapFun.value.getPoiAround({
            iconPath: "标记图片",
            iconWidth: 22,
            iconHeight: 32,
            location,
            querykeywords: searchKey.value,
            success: (data) => {
              if (data.poisData.length == 0) {
                common_vendor.index.showModal({
                  title: "提示",
                  content: "没有搜索到结果",
                  showCancel: false
                });
              } else {
                searchAddressList.value = data.poisData;
              }
            },
            fail: (data) => {
              console.log("搜索失败", data);
            }
          });
        }
      }, 500);
    };
    const choiceAddress = () => {
      secretStore.addressInfo = textData.value;
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: textData.value.name
      }, textData.value.name ? {
        b: common_vendor.t(textData.value.name),
        c: common_vendor.t(textData.value.address),
        d: common_vendor.o(choiceAddress)
      } : {}, {
        e: longitude.value,
        f: latitude.value,
        g: markers.value,
        h: common_vendor.o(handleMarkerTap),
        i: common_vendor.o(handleSearchTap),
        j: common_vendor.f(addressList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t((+item.distance).toFixed(0)),
            c: common_vendor.t(item.address),
            d: activeId.value == item.id
          }, activeId.value == item.id ? {
            e: common_assets._imports_0$3
          } : {}, {
            f: item.id,
            g: common_vendor.o(($event) => sureAddress(item), item.id)
          });
        }),
        k: !isSearch.value,
        l: common_vendor.o(handelSearch),
        m: searchKey.value,
        n: common_vendor.o(($event) => searchKey.value = $event.detail.value),
        o: common_vendor.o(handelCancel),
        p: common_vendor.f(searchAddressList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t((+item.distance).toFixed(0)),
            c: common_vendor.t(item.address),
            d: activeId.value == item.id
          }, activeId.value == item.id ? {
            e: common_assets._imports_0$3
          } : {}, {
            f: item.id,
            g: common_vendor.o(($event) => sureAddress(item), item.id)
          });
        }),
        q: isSearch.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e06b858f"]]);
wx.createPage(MiniProgramPage);
