// pages/register/register.js
var validate = require("../../lib/validate.js")
var api = require("../../interface/interface.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		one: false,
		two: false,
		three: false,
		four: false,
		phone: "",
		username: "",
		password: "",
		repeatPassword: "",
		isdark: false

	},
	dealInput(e) {
		var v = e.detail.value
		var id = e.currentTarget.id
		var dict = {}
		dict[id] = v
		this.setData(dict)
		if (this.data.phone) {
			this.setData({
				one: true
			})
		} else {
			this.setData({
				one: false
			})
		}
		if (this.data.username) {
			this.setData({
				two: true
			})
		} else {
			this.setData({
				two: false
			})
		}
		if (this.data.password) {
			this.setData({
				three: true
			})
		} else {
			this.setData({
				three: false
			})
		}
		if (this.data.repeatPassword) {
			this.setData({
				four: true
			})
		} else {
			this.setData({
				four: false
			})
		}
	},
	dealReg() {
		//数据校验
		//用户名 4-20
		//密码 4-20
		//手机号  手机号规则
		//密码和重复密码一致
		//真正的注册
		if (!(this.data.one && this.data.two && this.data.three && this.data.four)) {
			return
		}
		if (!validate.checkMobile(this.data.phone)) {
			wx.showModal({
				title: '',
				content: '请输入格式正确的手机号',
				showCancel: false
			})
			return
		}
		if (!validate.checkStringLength(this.data.username, 4, 20)) {
			wx.showModal({
				title: '',
				content: '用户名长度应为4~20位',
				showCancel: false
			})
			return
		}
		if (!validate.checkStringLength(this.data.password, 4, 20)) {
			wx.showModal({
				title: '',
				content: '密码长度应为4~20位',
				showCancel: false
			})
			return
		}

		if (!validate.checkStringLength(this.data.repeatPassword, 4, 20)) {
			wx.showModal({
				title: '',
				content: '密码长度应为4~20位',
				showCancel: false
			})
			return
		}

		if (this.data.password != this.data.repeatPassword) {
			wx.showModal({
				title: '',
				content: '密码和重复密码不一致',
				showCancel: false
			})
			return
		}


		//真正注册
		var url = api.registerUrl
		var self = this
		wx.showLoading({
			title: '正在注册',
		})
		wx.request({
			url: url,
			data: {
				username: self.data.username,
				password: self.data.password,
				phone: self.data.phone
			},
			success: function(res) {
				var data = res.data
				wx.hideLoading()
				if (data.code == 1) {
					wx.showModal({
						title: '注册结果',
						content: "注册成功,是否跳转到登录界面?",
						success: function(res) {
							if (res.confirm) {
								wx.navigateTo({
									url: '/pages/login/login',
								})

							} else if (res.cancel) {
								//console.log('用户点击取消')
							}

						}
					})
				} else {
					wx.showModal({
						title: '注册结果',
						content: "注册失败,desc=" + data.desc,
						showCancel: false
					})
				}
			},
			fail() {
				wx.hideLoading()
				wx.showModal({
					title: '错误提示',
					content: "请求超时，请重试",
					showCancel: false
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
