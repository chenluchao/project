// pages/userCenter/userCenter.js
var api = require("../../interface/interface.js")
var validate = require("../../lib/validate.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		item: {},
		imagePrefix: api.imagePrefix,
		isNickName: false,
		nickname: "",
		isPassword: false,
		password: "",
		twopassword: "",
		tempFilePaths: "",
		isdark: false
	},
	//旧密码为password 新密码为twopassword

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.downloadData()
	},
	dealImg() {
		var self = this
		wx.showActionSheet({
			itemList: ['拍照', '从相册选择'],
			success(res) {
				if (res.tapIndex == 0) {
					//调用拍照接口
					wx.chooseImage({
						count: 1,
						sourceType: ['camera'],
						success(res) {
							self.setData({
								tempFilePaths: res.tempFilePaths[0]
							})
							var user = wx.getStorageSync("artist_user")
							var userId = user.id
							var token = wx.getStorageSync("artist_token")
							var url = api.changeHeadImageUrl
							wx.uploadFile({
								url: url,
								formData: {
									m: "user",
									a: "changeHeadImage",
									userId: userId,
									token: token
								},
								filePath: self.data.tempFilePaths,
								name: 'newHeadImage',
								success(res) {
									res.data = res.data.trim();
									if (/{/.test(res.data)) { //判断返回的是对象 
										res.data = JSON.parse(res.data); //字符串转换为对象
									}
									var data = res.data
									self.downloadData()
									if (data.code == 1) {
										wx.showToast({
											title: '头像上传成功',
											icon: 'success',
										})
										//修改store中user的image属性
										user.image = data.data.url
										wx.setStorageSync("artist_user", user)
									} else {
										wx.showModal({
											title: '失败',
											content: '头像上传失败',
											showCancel: false
										})
									}
								}
							})
						}
					})
				}
				if (res.tapIndex == 1) {
					//调用相册接口
					wx.chooseImage({
						count: 1,
						sourceType: ['album'],
						success(res) {
							self.setData({
								tempFilePaths: res.tempFilePaths[0]
							})
							var user = wx.getStorageSync("artist_user")
							var userId = user.id
							var token = wx.getStorageSync("artist_token")
							var url = api.changeHeadImageUrl
							wx.uploadFile({
								url: url,
								formData: {
									m: "user",
									a: "changeHeadImage",
									userId: userId,
									token: token
								},
								filePath: self.data.tempFilePaths,
								name: 'newHeadImage',
								success(res) {
									res.data = res.data.trim();
									if (/{/.test(res.data)) { //判断返回的是对象 
										res.data = JSON.parse(res.data); //字符串转换为对象
									}
									var data = res.data
									self.downloadData()
									if (data.code == 1) {
										wx.showToast({
											title: '头像上传成功',
											icon: 'success',
										})
										//修改store中user的image属性
										user.image = data.data.url
										wx.setStorageSync("artist_user", user)
									} else {
										wx.showModal({
											title: '失败',
											content: '头像上传失败',
											showCancel: false
										})
									}
								}
							})
						}
					})
				}
			}
		})
	},
	doItPassword() { //执行修改密码
		if (!validate.checkStringLength(this.data.password, 4, 20)) {
			wx.showModal({
				title: '',
				content: '密码长度应为4~20位',
				showCancel: false
			})
			return
		}

		if (!validate.checkStringLength(this.data.twopassword, 4, 20)) {
			wx.showModal({
				title: '',
				content: '密码长度应为4~20位',
				showCancel: false
			})
			return
		}
		var self = this
		wx.showLoading({
			title: '保存中...',
		})
		var userId = wx.getStorageSync("artist_user").id
		var token = wx.getStorageSync("artist_token")
		var password = self.data.password
		var twopassword = self.data.twopassword
		var url = api.changePasswordUrl
		wx.request({
			url: url,
			data: {
				userId: userId,
				token: token,
				password: password,
				newPassword: twopassword
			},
			success: function(res) {
				wx.hideLoading()
				if (res.data.code == 1) {
					wx.showToast({
						title: '修改成功',
						icon: 'success',
					})
					self.setData({
						isPassword: false
					})
				} else {
					wx.showModal({
						title: '密码修改错误',
						content: '错误信息:' + res.data.desc,
						showCancel: false
					})
				}
			}
		})
	},
	doIt() { //执行修改昵称
		var self = this
		wx.showLoading({
			title: '保存中...',
		})
		var userId = wx.getStorageSync("artist_user").id
		var token = wx.getStorageSync("artist_token")
		var newNickname = self.data.nickname
		var url = api.changeNicknameUrl
		wx.request({
			url: url,
			data: {
				userId: userId,
				token: token,
				newNickname: newNickname
			},
			success: function(res) {
				wx.hideLoading()
				if (res.data.code == 1) {
					wx.showToast({
						title: '修改成功',
						icon: 'success',
					})
					self.setData({
						isNickName: false
					})
					self.downloadData()
				} else {
					wx.showModal({
						title: '昵称修改错误',
						content: '错误信息:' + res.data.desc,
						showCancel: false
					})
				}
			}
		})
	},
	clearInput() { //清空昵称输入框
		this.setData({
			nickname: ""
		})
	},
	clearPassword() { //清空密码输入框
		this.setData({
			password: ""
		})
	},
	cleartwoPassword() { //清空确认密码输入框
		this.setData({
			twopassword: ""
		})
	},
	dealChange(e) { //监听所有input框变化
		var dict = {}
		var id = e.currentTarget.id
		var nickname = e.detail.value
		dict[id] = nickname
		this.setData(dict)
	},
	goBack() { //昵称修改退出
		this.setData({
			isNickName: false
		})
	},
	goBackPassword() { //密码修改退出
		this.setData({
			isPassword: false
		})
	},
	dealNickName() { //进入修改昵称
		this.setData({
			isNickName: true
		})
	},
	dealPassword() { //进入修改密码
		this.setData({
			isPassword: true
		})
	},
	downloadData() { //页面加载
		wx.showLoading({
			title: '加载中...',
		})
		var self = this
		var userId = wx.getStorageSync("artist_user").id
		var token = wx.getStorageSync("artist_token")
		var url = api.userInfoUrl
		wx.request({
			url: url,
			data: {
				userId: userId,
				token: token,
			},
			success: function(res) {
				wx.hideLoading()
				if (!(res.data.data.nickname)) {
					res.data.data.realnickname = "未设置"
				}
				self.setData({
					item: res.data.data
				})
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
