/**
 * 系统信息
 */
const SYSTEM_INFO = uni.getSystemInfoSync();

/**
 * 获取状态栏的高度
 */
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;

/** 
 * 获取胶囊按钮具体高度
 */
export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight()) * 2
	} else {
		return 40;
	}
}

/**
 * 获取导航栏高度
 */
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();

/**
 * 适应抖音导航栏左侧距离（抖音小程序左侧有应用图标，需要空出距离）
 */
export const getLeftIconLeft = () => {
	// #ifdef MP-TOUTIAO
	let {
		leftIcon: {
			left,
			width
		}
	} = tt.getCustomButtonBoundingClientRect();
	return left + parseInt(width);
	// #endif

	// #ifndef MP-TOUTIAO
	return 0
	// #endif	
}