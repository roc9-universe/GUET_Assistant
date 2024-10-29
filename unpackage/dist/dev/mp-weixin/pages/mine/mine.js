"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    editinfo() {
      common_vendor.index.navigateTo({
        url: "/pages/setting/setting"
      });
    },
    goTomap() {
      common_vendor.index.navigateTo({
        url: "/pages/map/map"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $options.editinfo && $options.editinfo(...args)),
    c: common_assets._imports_1,
    d: common_assets._imports_2,
    e: common_vendor.o((...args) => $options.goTomap && $options.goTomap(...args)),
    f: common_assets._imports_3,
    g: common_assets._imports_4,
    h: common_assets._imports_5,
    i: common_vendor.o((...args) => $options.editinfo && $options.editinfo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
