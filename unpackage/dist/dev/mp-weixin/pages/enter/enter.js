"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      timer: null
    };
  },
  methods: {
    goTologin() {
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
      clearTimeout(this.timer);
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goTologin && $options.goTologin(...args)),
    b: common_assets._imports_0$2
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
