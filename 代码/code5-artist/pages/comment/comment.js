// pages/comment/comment.js
var api = require("../../interface/interface.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isCollection: false,
		isGood: false,
		itemId: "",
		list: [],
		imagePrefix: api.imagePrefix,
		isComment: false,
		commentLength: "500",
		comment: "",
		type: "",
		isShell: false,
		start: 0,
		count: 10,
		isdark: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var itemId = options.id
		var type = options.type
		this.setData({
			itemId: itemId,
			type: type
		})
		this.downloadData(itemId)
		this.isCollection(itemId)
		this.isGood(itemId)

	},
	putComment() {
		var self = this
		var comment = self.data.comment
		if (!comment) {
			wx.showModal({
				title: "提示",
				content: '评论内容不能为空',
				showCancel: false
			})
		} else {
			var userId = wx.getStorageSync("artist_user").id
			var token = wx.getStorageSync("artist_token")
			var itemId = self.data.itemId
			var url = api.addCommentUrl
			wx.request({
				url: url,
				data: {
					itemId: itemId,
					userId: userId,
					token: token,
					comment: comment
				},
				success: function(res) {
					if (res.data.code == 1) {
						wx.showToast({
							title: '发表评论成功',
							icon: 'success',
							duration: 2000
						})
						self.setData({
							isComment: false,
							comment: ""
						})
						//发表成功重新加载评论
						var itemId = self.data.itemId
						self.downloadData(itemId)
					}
				}
			})
		}
	},
	commentInput(e) {
		var dict = {}
		var id = e.currentTarget.id
		var comment = e.detail.value
		dict[id] = comment
		this.setData(dict)
		var commentLength = 500 - parseInt(this.data.comment.length)
		this.setData({
			commentLength: commentLength
		})
	},
	dealComment() {
		//判断是否登录
		var self = this
		if (wx.getStorageSync("artist_isLogin") != 1) {
			wx.showModal({
				title: "跳转",
				content: "您未登录，是否跳转到登录界面",
				success: function(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: "/pages/login/login"
						})
					}
				}
			})
		} else {
			self.setData({
				isComment: true
			})
		}
	},
	closeComment() {
		this.setData({
			isComment: false
		})
	},

	//加载页面判断是否为喜欢
	isGood(itemId) {
		var self = this
		if (wx.getStorageSync("artist_isLogin") == 1) {
			var userId = wx.getStorageSync("artist_user").id
			var token = wx.getStorageSync("artist_token")
			var url = api.isGoodUrl
			wx.request({
				url: url,
				data: {
					itemId: itemId,
					userId: userId,
					token: token
				},
				success: function(res) {
					if (res.data.code == 1) {
						self.setData({
							isGood: res.data.data.isGood
						})
					}
				}
			})
		} else {
			return
		}
	},
	//点击添加喜欢/取消喜欢
	dealGood() {
		var self = this
		if (wx.getStorageSync("artist_isLogin") != 1) {
			wx.showModal({
				title: "跳转",
				content: "您未登录，是否跳转到登录界面",
				success: function(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: "/pages/login/login"
						})
					}
				}
			})
		} else {
			if (self.data.isGood) { //如果为真则点击取消收藏
				var userId = wx.getStorageSync("artist_user").id
				var token = wx.getStorageSync("artist_token")
				var itemId = self.data.itemId
				var url = api.cancelGoodUrl
				wx.request({
					url: url,
					data: {
						itemId: itemId,
						userId: userId,
						token: token,
						type: self.data.type
					},
					success: function(res) {
						self.setData({
							isGood: false
						})
					}
				})
			} else { //如果为假则点击添加收藏
				var userId = wx.getStorageSync("artist_user").id
				var token = wx.getStorageSync("artist_token")
				var itemId = self.data.itemId
				var url = api.addGoodUrl
				wx.request({
					url: url,
					data: {
						itemId: itemId,
						userId: userId,
						token: token,
						type: self.data.type
					},
					success: function(res) {
						self.setData({
							isGood: true
						})
					}
				})
			}
		}
	},
	//点击收藏/取消收藏
	dealCollection() {
		var self = this
		if (wx.getStorageSync("artist_isLogin") != 1) {
			wx.showModal({
				title: "跳转",
				content: "您未登录，是否跳转到登录界面",
				success: function(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: "/pages/login/login"
						})
					}
				}
			})
		} else {
			//console.log(self.data.isCollection)
			if (self.data.isCollection) { //如果为真则点击取消收藏
				wx.showModal({
					title: "提示",
					content: "是否确认取消收藏",
					success: function(res) {
						if (res.confirm) {
							var userId = wx.getStorageSync("artist_user").id
							var token = wx.getStorageSync("artist_token")
							var itemId = self.data.itemId
							var url = api.cancelFavoriteUrl
							wx.request({
								url: url,
								data: {
									itemId: itemId,
									userId: userId,
									token: token,
									type: self.data.type
								},
								success: function(res) {
									self.setData({
										isCollection: false
									})
								}
							})
						}
					}
				})
			} else { //如果为假则点击添加收藏
				var userId = wx.getStorageSync("artist_user").id
				var token = wx.getStorageSync("artist_token")
				var itemId = self.data.itemId
				var url = api.saveFavoriteUrl
				wx.request({
					url: url,
					data: {
						itemId: itemId,
						userId: userId,
						token: token,
						type: self.data.type
					},
					success: function(res) {
						if (res.data.code == 1) {
							self.setData({
								isCollection: true
							})
							wx.showToast({
								title: '收藏成功',
								icon: 'success',
							})
						}
					}
				})
			}
		}
	},
	// 是否收藏
	isCollection(itemId) {
		var self = this
		if (wx.getStorageSync("artist_isLogin") == 1) {
			var userId = wx.getStorageSync("artist_user").id
			var token = wx.getStorageSync("artist_token")
			var url = api.isFavoriteUrl
			wx.request({
				url: url,
				data: {
					itemId: itemId,
					userId: userId,
					token: token
				},
				success: function(res) {
					self.setData({
						isCollection: res.data.data.isFavorite
					})
				}
			})
		} else {
			return
		}
	},
	downloadData(itemId) {
		var self = this
		wx.showLoading({
			title: '加载中...',
		})
		var url = api.getCommentUrl
		wx.request({
			url: url,
			data: {
				itemId: itemId,
				start: this.data.start,
				count: this.data.count,
				order: "desc"
			},
			success: function(res) {
				wx.hideLoading()
				wx.stopPullDownRefresh()
				var list = res.data.data
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
		var itemId = this.data.itemId
		this.downloadData(itemId)
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
		var itemId = this.data.itemId
		this.downloadData(itemId)
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
