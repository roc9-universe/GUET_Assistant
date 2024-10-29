"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    goToquestion() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    goToregister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    },
    goToforget() {
      common_vendor.index.navigateTo({
        url: "/pages/forgetPassword/forgetPassword"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.o((...args) => $options.goToquestion && $options.goToquestion(...args)),
    c: common_vendor.o((...args) => $options.goToregister && $options.goToregister(...args)),
    d: common_vendor.o((...args) => $options.goToforget && $options.goToforget(...args)),
    e: common_assets._imports_1$1,
    f: common_assets._imports_2$1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
