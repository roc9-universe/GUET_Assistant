"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      selectedIdentity: "student",
      showDropdown: false,
      selectedOption: "",
      options: ["选项1", "选项2", "选项3", "选项4", "选项5", "选项6", "选项7", "选项8"]
      // 示例选项
    };
  },
  methods: {
    handleIdentitychange(event) {
      this.selectedIdentity = event.detail.value;
      console.log("选择的身份:", this.selectedIdentity);
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.showDropdown = false;
    },
    goTologin() {
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_assets._imports_1$2,
    c: common_assets._imports_2$2,
    d: common_vendor.o((...args) => $options.handleIdentitychange && $options.handleIdentitychange(...args)),
    e: common_vendor.t($data.selectedOption || "请选择学院"),
    f: common_vendor.t($data.showDropdown ? "▲" : "▼"),
    g: common_vendor.o((...args) => $options.toggleDropdown && $options.toggleDropdown(...args)),
    h: common_vendor.f($data.options, (option, index, i0) => {
      return {
        a: common_vendor.t(option),
        b: index,
        c: common_vendor.o(($event) => $options.selectOption(option), index)
      };
    }),
    i: $data.showDropdown,
    j: common_vendor.o((...args) => $options.goTologin && $options.goTologin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
