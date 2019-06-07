// pages/setting/setting.js
var api = require("../../interface/interface.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isdark: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	dealclear() {
		wx.showModal({
			title: '确认提示',
			content: '请确认是否清理缓存',
			success: function(res) {
				if (res.confirm) {
					wx.showLoading({
						title: '清理缓存中...',
					})
					setTimeout(function() {
						wx.hideLoading()
						wx.showToast({
							title: '清理完成',
							icon: 'success',
						})
					}, 2000)
				}
			}
		})
	},
	dealgrade() {
		wx.showModal({
			title: '温馨提示',
			content: '当前不能进行此项操作，敬请期待',
			showCancel: false
		})
	},
	dealLogout() {
		wx.showModal({
			title: '确认退出',
			content: '请确认是否退出登录',
			success: function(res) {
				if (res.confirm) {
					//删除登录信息
					wx.removeStorageSync("artist_isLogin")
					wx.removeStorageSync("artist_user")
					wx.removeStorageSync("artist_token")
					//退出登录后跳转到主页
					wx.switchTab({
						url: '/pages/home/home',
					})
				}

			}
		})
	},
	switchChange(e) {
		var self = this
		if (e.detail.value) {
			wx.setStorageSync("artist_isdark", true)
			self.setData({
				isdark: true
			})
		} else {
			wx.setStorageSync("artist_isdark", false)
			self.setData({
				isdark: false
			})
		}
		var isdark = wx.getStorageSync("artist_isdark")
		this.setData({
			isdark: isdark
		})
		if (isdark) {
			wx.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#08192D',
				animation: {
					duration: 300,
					timingFunc: 'easeIn'
				}
			})
			wx.setTabBarStyle({
				color: '#ccc',
				selectedColor: '#919191',
				backgroundColor: '#0B1B32',
				borderStyle: 'white'
			})
		} else {
			wx.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#fff',
				animation: {
					timingFunc: 'linear'
				}
			})
			wx.setTabBarStyle({
				color: '#ccc',
				selectedColor: '#919191',
				backgroundColor: '#F7F7FA',
				borderStyle: 'black'
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var isdark = wx.getStorageSync("artist_isdark")
		this.setData({
			isdark: isdark
		})
		if (isdark) {
			wx.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#08192D',
				animation: {
					timingFunc: 'linear'
				}
			})
			wx.setTabBarStyle({
				color: '#ccc',
				selectedColor: '#919191',
				backgroundColor: '#0B1B32',
				borderStyle: 'white'
			})
		} else {
			wx.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#fff',
				animation: {
					duration: 300,
					timingFunc: 'easeIn'
				}
			})
			wx.setTabBarStyle({
				color: '#ccc',
				selectedColor: '#919191',
				backgroundColor: '#F7F7FA',
				borderStyle: 'black'
			})
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {
		return {
			title: '快来围观，我在看文艺范小程序',
			path: '/pages/home/home?id=123',
			imageUrl: 'http://pic1.win4000.com/mobile/2017-12-29/5a45981679170.jpg'
		}

	}
})
