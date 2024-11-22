<script setup>
// 基础
import { ref, reactive, onMounted, computed, getCurrentInstance } from "vue";
import { onShow } from "@dcloudio/uni-app";

const readOnly = ref(false);
const formats = reactive({});
/** 富文本内容 */
let editorContent = "";
/** 编辑器上下文对象 */
let editorCtx = null;

onShow(() => {
	editorContent = uni.getStorageSync("publishDraft").content;
});

// 切换只读模式
const readOnlyChange = () => {
	readOnly.value = !readOnly.value;
};

// 编辑器准备好后
const onEditorReady = () => {
	// #ifdef MP-BAIDU
	editorCtx = requireDynamicLib("editorLib").createEditorContext("editor");
	// #endif

	// #ifdef APP-PLUS || MP-WEIXIN || H5
	uni
		.createSelectorQuery()
		.select("#editor")
		.context((res) => {
			editorCtx = res.context;
			editorCtx.setContents({
				html: editorContent
			});
		})
		.exec();
	// #endif
};

// 撤销操作
const undo = () => {
	editorCtx.undo();
};

// 重做操作
const redo = () => {
	editorCtx.redo();
};

// 格式化文本
const format = (e) => {
	const { name, value } = e.target.dataset;
	if (!name) return;
	editorCtx.format(name, value);
};

// 状态改变时更新 formats
const onStatusChange = (e) => {
	Object.assign(formats, e.detail);
};

// 插入分割线
const insertDivider = () => {
	editorCtx.insertDivider({
		success: () => {
			console.log("insert divider success");
		}
	});
};

// 清空编辑器
const clear = () => {
	uni.showModal({
		title: "清空编辑器",
		content: "确定清空编辑器全部内容？",
		success: (res) => {
			if (res.confirm) {
				editorCtx.clear({
					success: () => {
						console.log("clear success");
					}
				});
			}
		}
	});
};

// 移除格式
const removeFormat = () => {
	editorCtx.removeFormat();
};

// 插入日期
const insertDate = () => {
	const date = new Date();
	const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
	editorCtx.insertText({
		text: formatDate
	});
};

// 插入图片
const insertImage = () => {
	uni.chooseImage({
		count: 1,
		success: (res) => {
			editorCtx.insertImage({
				src: res.tempFilePaths[0],
				alt: "图像",
				success: () => {
					console.log("insert image success");
				}
			});
		}
	});
};

function whenInput(e) {
	editorContent = e.detail.html;
}

/** 保存提交结果 */
function clickBtnSubmit() {
	const submitForm = uni.getStorageSync("publishDraft");
	uni.setStorageSync("publishDraft", { ...submitForm, content: editorContent });
	uni.navigateBack();
}
</script>

<template>
	<view>
		<view>
			<view class="wrapper">
				<view class="toolbar" @tap="format" style="height: 120px; overflow-y: auto">
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
					<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
					<view
						:class="formats.underline ? 'ql-active' : ''"
						class="iconfont icon-zitixiahuaxian"
						data-name="underline"
					></view>
					<view
						:class="formats.strike ? 'ql-active' : ''"
						class="iconfont icon-zitishanchuxian"
						data-name="strike"
					></view>
					<!-- #ifndef MP-BAIDU -->
					<view
						:class="formats.align === 'left' ? 'ql-active' : ''"
						class="iconfont icon-zuoduiqi"
						data-name="align"
						data-value="left"
					></view>
					<!-- #endif -->
					<view
						:class="formats.align === 'center' ? 'ql-active' : ''"
						class="iconfont icon-juzhongduiqi"
						data-name="align"
						data-value="center"
					></view>
					<view
						:class="formats.align === 'right' ? 'ql-active' : ''"
						class="iconfont icon-youduiqi"
						data-name="align"
						data-value="right"
					></view>
					<view
						:class="formats.align === 'justify' ? 'ql-active' : ''"
						class="iconfont icon-zuoyouduiqi"
						data-name="align"
						data-value="justify"
					></view>
					<!-- #ifndef MP-BAIDU -->
					<view
						:class="formats.lineHeight ? 'ql-active' : ''"
						class="iconfont icon-line-height"
						data-name="lineHeight"
						data-value="2"
					></view>
					<view
						:class="formats.letterSpacing ? 'ql-active' : ''"
						class="iconfont icon-Character-Spacing"
						data-name="letterSpacing"
						data-value="2em"
					></view>
					<view
						:class="formats.marginTop ? 'ql-active' : ''"
						class="iconfont icon-722bianjiqi_duanqianju"
						data-name="marginTop"
						data-value="20px"
					></view>
					<view
						:class="formats.marginBottom ? 'ql-active' : ''"
						class="iconfont icon-723bianjiqi_duanhouju"
						data-name="marginBottom"
						data-value="20px"
					></view>
					<!-- #endif -->

					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>

					<!-- #ifndef MP-BAIDU -->
					<!-- 					<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font"
					data-name="fontFamily" data-value="Pacifico"></view> -->
					<view
						:class="formats.fontSize === '24px' ? 'ql-active' : ''"
						class="iconfont icon-fontsize"
						data-name="fontSize"
						data-value="24px"
					></view>
					<!-- #endif -->
					<view
						:class="formats.color === '#0000ff' ? 'ql-active' : ''"
						class="iconfont icon-text_color"
						data-name="color"
						data-value="#0000ff"
					></view>
					<view
						:class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
						class="iconfont icon-fontbgcolor"
						data-name="backgroundColor"
						data-value="#00ff00"
					></view>
					<view class="iconfont icon-date" @tap="insertDate"></view>
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view
						:class="formats.list === 'ordered' ? 'ql-active' : ''"
						class="iconfont icon-youxupailie"
						data-name="list"
						data-value="ordered"
					></view>
					<view
						:class="formats.list === 'bullet' ? 'ql-active' : ''"
						class="iconfont icon-wuxupailie"
						data-name="list"
						data-value="bullet"
					></view>

					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>

					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view
						:class="formats.header === 1 ? 'ql-active' : ''"
						class="iconfont icon-format-header-1"
						data-name="header"
						:data-value="1"
					></view>
					<view
						:class="formats.script === 'sub' ? 'ql-active' : ''"
						class="iconfont icon-zitixiabiao"
						data-name="script"
						data-value="sub"
					></view>
					<view
						:class="formats.script === 'super' ? 'ql-active' : ''"
						class="iconfont icon-zitishangbiao"
						data-name="script"
						data-value="super"
					></view>

					<view class="iconfont icon-shanchu" @tap="clear"></view>

					<view
						:class="formats.direction === 'rtl' ? 'ql-active' : ''"
						class="iconfont icon-direction-rtl"
						data-name="direction"
						data-value="rtl"
					></view>
				</view>

				<view class="editor-wrapper">
					<editor
						id="editor"
						class="ql-container"
						placeholder="编辑信息..."
						show-img-size
						show-img-toolbar
						show-img-resize
						@statuschange="onStatusChange"
						:read-only="readOnly"
						@ready="onEditorReady"
						@blur="blur"
						@input="whenInput"
					></editor>
					<view class="pubish-button-box">
						<button class="pubish-button" hover-class="is-hover" @click="clickBtnSubmit()">保存</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style>
@import "../../common/style/editor-icon.css";
</style>

<style lang="scss">
.page-body {
	height: calc(100vh - var(--window-top) - var(--status-bar-height));
}

.wrapper {
	height: 100%;
}

.editor-wrapper {
	background: #fff;

	/* 编辑器高度 - 满屏 */
	/* height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px); */

	/* 编辑器高度 - 满屏矮一点 */
	height: calc(100vh - var(--window-top) - var(--status-bar-height) - 240px);

	.pubish-button-box {
		padding: $page-padding;

		.pubish-button {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $brand-theme-color;
			color: white;
		}

		.is-hover {
			background-color: darken($brand-theme-color, 10%);
		}
	}
}

.iconfont {
	display: inline-block;
	padding: 10px 10px;
	cursor: pointer;
	font-size: 20px;
}

.toolbar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	box-sizing: border-box;
	border-bottom: 0;
	font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
	background-color: $uni-bg-color-grey;
}

.ql-container {
	box-sizing: border-box;
	padding: 12px 15px;
	width: 100%;
	min-height: 30vh;
	height: 100%;
	margin-top: 20px;
	font-size: 16px;
	line-height: 1.5;
}

.ql-active {
	color: #06c;
}
</style>
