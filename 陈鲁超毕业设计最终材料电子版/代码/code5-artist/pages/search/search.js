// pages/search/search.js
var api = require("../../interface/interface.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		read: [],
		music: [],
		movie: [],
		keyword: "",
		show: [],
		imgUrl: api.imagePrefix,
		history: [],
		focus: false,
		isdark: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getHistory()

	},
	getHistory() {
		if (wx.getStorageSync("artist_history")) {
			var history = wx.getStorageSync("artist_history")
			this.setData({
				history: history
			})
		}
	},
	clickHistory(e) {
		var keyword = e.currentTarget.dataset.info
		this.setData({
			keyword: keyword
		})
		this.dealSearch()
	},
	dealHistory() {
		this.getHistory()
		var self = this
		self.setData({
			focus: true
		})
	},
	closeHistory() {
		var self = this
		setTimeout(function() {
			self.setData({
				focus: false
			})
		}, 100)

	},
	dealChange(e) {
		var dict = {}
		var id = e.currentTarget.id
		var keyword = e.detail.value
		dict[id] = keyword
		this.setData(dict)
	},
	dealSearch() {
		var self = this;
		var keyword = self.data.keyword
		if (!keyword) {
			return
		}
		wx.showLoading({
			title: '加载中...',
		})
		//去重
		var history = self.data.history
		var isRepeat = false; //设置isRepeat变量判断是否有重复 false-无重复| true-有重复
		for (var m = history.length - 1; m >= 0; m--) {
			if (history[m] == keyword) {
				var repeat = history.splice(m, 1)
				isRepeat = true
				break;
			}
		}
		if (!isRepeat) {
			history.unshift(keyword)
		} else {
			history.unshift(repeat[0])
		}
		if (history.length > 6) {
			history.pop()
		}
		var url = api.searchUrl
		wx.request({
			url: url,
			data: {
				keyword: keyword
			},
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				var read = []
				var music = []
				var movie = []
				var show = res.data.data
				for (var i = 0; i < show.length; i++) {
					if (show[i].category == 1) {
						read.push(show[i])
						show[i].categoryName = "阅读"
						show[i].pageName = "/pages/readDetail/readDetail"
					}
					if (show[i].category == 4) {
						music.push(show[i])
						show[i].categoryName = "音乐"
						show[i].pageName = "/pages/musicDetail/musicDetail"
					}
					if (show[i].category == 5) {
						movie.push(show[i])
						show[i].categoryName = "影视"
						show[i].pageName = "/pages/movieDetail/movieDetail"
					}
				}
				wx.setStorageSync("artist_history", history)
				self.setData({
					read: read,
					mucic: music,
					movie: movie,
				})
				wx.hideLoading()
				wx.showToast({
					title: '搜索完成'
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
