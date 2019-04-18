// pages/zhuanti_list/zhuanti_list.js
Page({

	data: {
		goods_cate_id:'',//专题id
		p:1 , //分页
		list:[],//数据
		shuju:-1
	},
	goVxiangqing:function(e){
		wx.navigateTo({
			url: '../video_xiangqing/video_xiangqing?goods_id=' + e.currentTarget.dataset.goods_id,
		})
	},
	// 触底分页
	onReachBottom: function () {
		var that = this;
		// console.log('44')
		wx.request({
			url: getApp().heads + 'Video/getSpeVideo',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {
				goods_cate_id: that.data.goods_cate_id,
				p: that.data.p+1//分页
			},
			method: 'post',
			success: function (e) {
				console.log(e.data.data)
				var Oldsong = that.data.list;//初始数组
				var Newsong = e.data.data.list;//新数组
				if (Newsong.length !== 0) {
					that.setData({
						list: Oldsong.concat(Newsong),
						p: that.data.p + 1,
						hisMore: true //有更多数据
					})
				} else {
					that.setData({
						hisMore: false //无更多数据
					})
					wx.showToast({
						title: '暂无更多数据！'
					})
				}
			}
		})
	},
	goSend:function(){
		var that=this;
		wx.request({
			url: getApp().heads + 'Video/getSpeVideo',
			data: {
				goods_cate_id:that.data.goods_cate_id,
				p:that.data.p
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'post',
			success: function (e) {
				console.log(e.data.data.list);
				if (e.data.data.list.length!==0){
					that.setData({
						list: e.data.data.list,
						p: that.data.p,
						shuju: 1 //有数据
					})
				}else{
					that.setData({
						shuju:0
					})
				}
			}
		})
	},
	onLoad: function (options) {
		console.log(options)
     this.setData({
			 goods_cate_id: options.goods_cate_id
		 })
		 this.goSend();
		wx.setNavigationBarTitle({
			title: options.title
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		var that = this;
		wx.showNavigationBarLoading();
		// 隐藏导航栏加载框
		that.goSend();
		setTimeout(function () {
			// 隐藏导航栏加载框
			wx.hideNavigationBarLoading();
			// 停止下拉动作
			wx.stopPullDownRefresh();
		}, 1000)
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})