// pages/wodeSC/wodeSC.js
Page({

	data: {
		p: 1,
		list: [],
		hisMore: true
	},
	goVxiangqing: function (e) {
		wx.navigateTo({
			url: '../video_xiangqing/video_xiangqing?goods_id=' + e.currentTarget.dataset.goods_id,
		})
	},
	// 触底分页
	onReachBottom: function () {
		var that = this;
		// console.log('44')
		wx.request({
			url: getApp().heads + 'Center/getWatch',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {
				p: that.data.p+1,  //分页
				m_id: wx.getStorageSync('m_id')
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
            title: 'རྙེད་མ་སོང་།'
					})
				}
			}
		})
	},
	goSend: function () {
		var that = this;
		wx.request({
			url: getApp().heads + 'Center/getWatch',
			data: {
				p: that.data.p,
				m_id: wx.getStorageSync('m_id'),
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'post',
			success: function (e) {
				console.log(e.data.data.list);
				that.setData({
					list: e.data.data.list,
					p: that.data.p
				})
			}
		})
	},
  // 单个清除
  de_clear:function(e){
    var that=this;
    var goods_id=e.currentTarget.dataset.goods_id;
    wx.request({
      url: getApp().heads + 'Center/delWatch',
      data: {
        m_id: wx.getStorageSync('m_id'),
        goods_id: goods_id  //视频ID字符串,全部--0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (e) {
        console.log(e);
        wx.showToast({
          title: e.data.message,
          icon: 'success',
          duration: 2000,
          success: function () {
            that.onLoad();
          }
        })
      }
    })
  },
  // 全部清除
  de_clearAll: function () {
    var that = this;
    wx.request({
      url: getApp().heads + 'Center/delWatch',
      data: {
        m_id: wx.getStorageSync('m_id'),
        goods_id: 0  //视频ID字符串,全部--0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function (e) {
        console.log(e);
        wx.showToast({
          title: e.data.message,
          icon: 'success',
          duration: 2000,
          success: function () {
            that.onLoad();
          }
        });
      }
    })
  },
	onLoad: function (options) {
		this.goSend();
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