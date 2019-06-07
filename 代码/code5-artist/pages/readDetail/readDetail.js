// pages/readDetail/readDetail.js
var api = require("../../interface/interface.js")
var base64js = require("../../base64/base64.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isCollection: false,
		isGood: false,
		item: {},
		isComment: false,
		commentLength: "500",
		comment: "",
		isdark: false,
		id:""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var id = options.id
		this.downloadData(id)
		this.isCollection(id)
		this.isGood(id)
		this.setData({
			id:id
		})
	},
	goComment(e) {
		wx.navigateTo({
			url: "/pages/comment/comment" + "?id=" + this.data.item.id + "&type=" + this.data.item.category
		})
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
			var itemId = self.data.item.id
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
				var itemId = self.data.item.id
				var url = api.cancelGoodUrl
				wx.request({
					url: url,
					data: {
						itemId: itemId,
						userId: userId,
						token: token,
						type: self.data.item.category
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
				var itemId = self.data.item.id
				var url = api.addGoodUrl
				wx.request({
					url: url,
					data: {
						itemId: itemId,
						userId: userId,
						token: token,
						type: self.data.item.category
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
			if (self.data.isCollection) { //如果为真则点击取消收藏
				wx.showModal({
					title: "提示",
					content: "是否确认取消收藏",
					success: function(res) {
						if (res.confirm) {
							var userId = wx.getStorageSync("artist_user").id
							var token = wx.getStorageSync("artist_token")
							var itemId = self.data.item.id
							var url = api.cancelFavoriteUrl
							wx.request({
								url: url,
								data: {
									itemId: itemId,
									userId: userId,
									token: token,
									type: self.data.item.category
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
				var itemId = self.data.item.id
				var url = api.saveFavoriteUrl
				wx.request({
					url: url,
					data: {
						itemId: itemId,
						userId: userId,
						token: token,
						type: self.data.item.category
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
	downloadData(id) {
		var self = this
		wx.showLoading({
			title: '加载中...',
		})
		var url = api.readDetailUrl + "&id=" + id
		wx.request({
			url: url,
			success: function(res) {
				var item = res.data.data
				//把item.hp_content base64加密数据解析
				var base64 = new base64js.Base64()
				var real_content = base64.decode(item.hp_content)
				item.real_content = real_content
				self.setData({
					item: item
				})
				wx.hideLoading()
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
		this.isCollection(this.data.id)
		this.isGood(this.data.id)
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
