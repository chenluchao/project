// pages/music/music.js
var api = require("../../interface/interface.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		start: 0,
		count: 10,
		isRefresh: false,
		imgUrl: api.imagePrefix,
		list: [],
		isdark: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.downloadData()

	},
	downloadData() {
		var self = this
		wx.showLoading({
			title: '加载中...',
		})
		var url = api.musicListUrl + "&start=" + this.data.start + "&count=" + this.data.count
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
				if (self.data.start == 0) {
					self.setData({
						isRefresh: false,
						list: list
					})
				} else {
					var newList = self.data.list
					newList = newList.concat(list)
					self.setData({
						isRefresh: false,
						list: newList
					})
				}
				wx.hideLoading()
				wx.stopPullDownRefresh()
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
		if (this.data.isRefresh) {
			return
		}
		this.setData({
			isRefresh: true,
			start: 0
		})
		this.downloadData()

	},


	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		if (this.data.isRefresh) {
			return
		}
		var newStart = this.data.start += this.data.count
		this.setData({
			isRefresh: true,
			start: newStart
		})

		this.downloadData()

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
