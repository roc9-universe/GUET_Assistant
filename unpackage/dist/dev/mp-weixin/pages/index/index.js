"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const goEnter = () => {
      common_vendor.index.redirectTo({
        url: "/pages/enter/enter"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goEnter)
      };
    };
  }
};
wx.createPage(_sfc_main);
