// pages/home/home.js
var api = require("../../interface/interface.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		rightUrl: "/pages/login/login",
		imgUrl: api.imagePrefix,
		ads: [],
		list: [],
		isdark: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.downloadAds()
		this.downloadData()
	},
	downloadAds() {
		var self = this
		var url = api.adsUrl
		wx.request({
			url: url,
			success: function(res) {
				var ads = res.data.data
				for (var i = 0; i < ads.length; i++) {
					if (ads[i].category == 1) {
						ads[i].categoryName = "阅读"
						ads[i].pageName = "/pages/readDetail/readDetail"
					}
					if (ads[i].category == 4) {
						ads[i].categoryName = "音乐"
						ads[i].pageName = "/pages/musicDetail/musicDetail"
					}
					if (ads[i].category == 5) {
						ads[i].categoryName = "影视"
						ads[i].pageName = "/pages/movieDetail/movieDetail"
					}
				}
				self.setData({
					ads: ads
				})
			}
		})
	},
	downloadData() {
		var self = this
		var url = api.mainListUrl
		wx.request({
			url: url,
			success: function(res) {
				var list = res.data.data
				for (var i = 0; i < list.length; i++) {
					if (list[i].category == 1) {
						list[i].categoryName = "阅读"
						list[i].pageName = "/pages/readDetail/readDetail"
					}
					if (list[i].category == 4) {
						list[i].categoryName = "音乐"
						list[i].pageName = "/pages/musicDetail/musicDetail"
					}
					if (list[i].category == 5) {
						list[i].categoryName = "影视"
						list[i].pageName = "/pages/movieDetail/movieDetail"
					}
				}
				self.setData({
					list: list
				})
			}
		})
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
		//检测是否登录
		if (wx.getStorageSync("artist_isLogin") == "1") {
			this.setData({
				rightUrl: "/pages/mine/mine"
			})
		} else {
			this.setData({
				rightUrl: "/pages/login/login"
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
					timingFunc: 'linear'
				}
			})
			wx.setTabBarStyle({
				color: '#ccc',
				selectedColor: '#919191',
				backgroundColor: '#0B1B32',
				borderStyle: 'white'
			})
		}else{
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
		
	}
})
