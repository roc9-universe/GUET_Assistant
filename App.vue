<script>
import { socket } from "@/utils/socket.js";
import { wsBaseURL } from "@/api/utils/url.js";

export default {
	onLaunch: function () {
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show");
		/** 开启webSocket服务 */
		socket();
	},
	onHide: function () {
		console.log("App Hide");
		uni.closeSocket();
	},
	beforeDestroy: function () {
		console.log("App Destroy");
		uni.closeSocket();
	}
};
</script>

<style lang="scss">
@import "common/style/common-style.scss";
</style>
