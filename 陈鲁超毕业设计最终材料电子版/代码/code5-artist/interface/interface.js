//所有下面URL的前缀
//所有图片URL的前缀
// var urlPrefix = "http://127.0.0.1/project/artist-v3/api/";
// var imagePrefix = "http://127.0.0.1/project/artist-v3/";

//热点
var urlPrefix = "https://www.chenluchao.com/project/artist-v3/api/";
var imagePrefix = "https://www.chenluchao.com/project/artist-v3/";
// 
//首页列表接口
//类型: GET
//Request:
//	参数1: m=main   m表示module/模块, main模块
//	参数2: a=list	a表示action动作
//Response
//	json:  {"code":0,desc:"ok",data:{}}
//		total 表示总数
//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=main&a=list
var mainListUrl = urlPrefix + "index.php?m=main&a=list";


//首页广告接口
//类型: GET
//Request:
//	参数1: m=main   m表示module/模块, main模块
//	参数2: a=ads	a表示action动作
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//
//		total 表示总数
//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=main&a=ads
var adsUrl = urlPrefix + "index.php?m=main&a=ads";

//阅读列表接口
//类型: GET
//Request:
//	参数1: m=read   m表示module/模块,
//	参数2: a=list	a表示action动作
//	参数3: start=0	表示数据起始的位置, 从第几个开始, 默认为0
//	参数4: count=10	每页的数据个数,默认为10
//	参数5: type1		类型1
//	参数6: type2		类型2
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//
//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=read&a=list
var readListUrl = urlPrefix + "index.php?m=read&a=list";


//阅读详情接口
//类型: GET
//Request:
//	参数1: m=read   m表示module/模块,
//	参数2: a=detail	a表示action动作
//	参数3: id=10813	id是文章的id, 这个是变的, 使用的要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		pre数据, 上一页
//		next数据,下一页
//
//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=read&a=detail&id=10813
var readDetailUrl = urlPrefix + "index.php?m=read&a=detail";


//音乐列表接口
//类型: GET
//Request:
//	参数1: m=music   m表示module/模块,
//	参数2: a=list	a表示action动作
//	参数3: start=0	表示数据起始的位置, 从第几个开始, 默认为0
//	参数4: count=10	每页的数据个数,默认为10
//	参数5: type1		类型1
//	参数6: type2		类型2
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//
//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=music&a=list
var musicListUrl = urlPrefix + "index.php?m=music&a=list";


//音乐详情接口
//类型: GET
//Request:
//	参数1: m=music   m表示module/模块,
//	参数2: a=detail	a表示action动作
//	参数3: id=10817	id是文章的id, 这个是变的, 使用的要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//
//		pre数据, 上一页
//		next数据,下一页
//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=music&a=detail&id=10807
var musicDetailUrl = urlPrefix + "index.php?m=music&a=detail";


//影视列表接口
//类型: GET
//Request:
//	参数1: m=movie   m表示module/模块,
//	参数2: a=list	a表示action动作
//	参数3: start=0	表示数据起始的位置, 从第几个开始, 默认为0
//	参数4: count=10	每页的数据个数,默认为10
//	参数5: type1		类型1
//	参数6: type2		类型2
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//

//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=movie&a=list
var movieListUrl = urlPrefix + "index.php?m=movie&a=list";


//影视详情接口
//类型: GET
//Request:
//	参数1: m=movie   m表示module/模块,
//	参数2: a=detail	a表示action动作
//	参数3: id=10742	id是文章的id, 这个是变的, 使用的要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//
//		pre数据, 上一页
//		next数据,下一页
//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=movie&a=detail&id=10742
var movieDetailUrl = urlPrefix + "index.php?m=movie&a=detail";



//搜索接口
//类型: GET
//Request:
//	参数1: m=search   m表示module/模块,
//	参数2: a=search	a表示action动作
//	参数3: keyword=123	搜索关键字, title中有关键字,返回
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//
//		返回的数据, 只有一个数组, 返回的值还有total, 用于分页
//实例: 
//http://192.168.111.3/project/artist/api/index.php?m=search&a=search&userId=1&keyword=121
var searchUrl = urlPrefix + "index.php?m=search&a=search";



///================================用户=======================
//登陆接口
//类型: GET
//Request:
//	参数1: m=user   m表示module/模块,
//	参数2: a=login	a表示action动作
//	参数3: username=zz			是变的, 要拼接
//	参数4: password=12313		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0

//实例: 
//http://127.0.0.1/project/artist-v3/api/index.php?m=user&a=login&username=zz&password=21212
var loginUrl = urlPrefix + "index.php?m=user&a=login";


//注册接口
//类型: GET
//Request:
//	参数1: m=user   m表示module/模块,
//	参数2: a=register	a表示action动作
//	参数3: username=zz			是变的, 要拼接
//	参数4: password=12313		是变的, 要拼接
//	参数5: phone=12313			是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//http://127.0.0.1/project/artist-v3/api/index.php?m=user&a=register&username=zz&password=21212&phone=13600001111
var registerUrl = urlPrefix + "index.php?m=user&a=register";



//修改密码接口
//类型: GET
//Request:
//	参数1: m=user   m表示module/模块,
//	参数2: a=changePasword	a表示action动作
//	参数3: userId=1			是变的, 要拼接
//	参数4: password=12313		是变的, 要拼接
//	参数5: newPassword=12313			是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//http://127.0.0.1/project/artist-v3/api/index.php?m=user&a=changePassword&userId=1&&password=444&newPassword=5555
var changePasswordUrl = urlPrefix + "index.php?m=user&a=changePassword";



//修改昵称接口
//类型: GET
//Request:
//	参数1: m=user   m表示module/模块,
//	参数2: a=changeNickname	a表示action动作
//	参数3: userId=1			是变的, 要拼接
//	参数4: newNickname=12313			是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//http://127.0.0.1/project/artist-v3/api/index.php?m=user&a=changeNickname&userId=1&&newNickname=haha
var changeNicknameUrl = urlPrefix + "index.php?m=user&a=changeNickname";


//修改头像接口
//类型: POST
//Request:
//	参数1: m=user   m表示module/模块,
//	参数2: a=changeHeadImage		a表示action动作
//	参数3: userId=1			是变的, 要拼接
//	参数4: newHeadImage=12313			是变的, 要拼接
//		post请求的数据, 类型是文件

//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//http://127.0.0.1/project/artist-v3/api/index.php
//	参数1: m
//	参数2: a
//  参数3: userId
//	参数4: newHeadImage
var changeHeadImageUrl = urlPrefix + "index.php";



//获取用户信息接口
//类型: GET
//Request:
//	参数1: m=user   m表示module/模块,
//	参数2: a=userInfo	a表示action动作
//	参数3: userId=1			是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//http://127.0.0.1/project/artist-v3/api/index.php?m=user&a=userInfo&userId=1
var userInfoUrl = urlPrefix + "index.php?m=user&a=userInfo";


///================================收藏=======================

//收藏-获取收藏接口
//类型: GET
//Request:
//	参数1: m=favorite   m表示module/模块,
//	参数2: a=getFavorite	a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: type=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//http://127.0.0.1/project/artist-v3/api/
//index.php?m=favorite&a=getFavorite&userId=1&type=1   阅读
//index.php?m=favorite&a=getFavorite&userId=1&type=4   音乐
//index.php?m=favorite&a=getFavorite&userId=1&type=5   影视
var getFavoriteUrl = urlPrefix + "index.php?m=favorite&a=getFavorite";


//收藏-添加收藏接口
//类型: GET
//Request:
//	参数1: m=favorite   m表示module/模块,
//	参数2: a=saveFavorite	a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: itemId=1		是变的, 要拼接
//	参数5: type=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//
//http://127.0.0.1/project/artist-v3/api/index.php?m=favorite&a=saveFavorite&userId=1&itemId=10813&type=1
var saveFavoriteUrl = urlPrefix + "index.php?m=favorite&a=saveFavorite";


//收藏-取消收藏接口
//类型: GET
//Request:
//	参数1: m=favorite   m表示module/模块,
//	参数2: a=cancelFavorite	a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: itemId=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//
//http://127.0.0.1/project/artist-v3/api/index.php?m=favorite&a=cancelFavorite&userId=6&itemId=1&type=1
var cancelFavoriteUrl = urlPrefix + "index.php?m=favorite&a=cancelFavorite";

//收藏-判断是否收藏接口
//类型: GET
//Request:
//	参数1: m=favorite   m表示module/模块,
//	参数2: a=isFavorite	a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: itemId=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		data是一个字典, 字典中有个值 isFavorite
//		注意: 如果是收藏了返回字符串 "true", 不是真假值
//http://127.0.0.1/project/artist-v3/api/index.php?m=favorite&a=isFavorite&userId=1&itemId=10813
var isFavoriteUrl = urlPrefix + "index.php?m=favorite&a=isFavorite";


///================================点赞=======================
//点赞-点赞接口
//类型: GET
//Request:
//	参数1: m=good   		m表示module/模块,
//	参数2: a=addGood		a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: itemId=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//
//http://127.0.0.1/project/artist-v3/api/index.php?m=good&a=addGood&userId=1&itemId=10813
var addGoodUrl = urlPrefix + "index.php?m=good&a=addGood";



//点赞-取消点赞接口
//类型: GET
//Request:
//	参数1: m=good   		m表示module/模块,
//	参数2: a=cancelGood		a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: itemId=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//
//http://127.0.0.1/project/artist-v3/api/index.php?m=good&a=cancelGood&userId=1&itemId=10813
var cancelGoodUrl = urlPrefix + "index.php?m=good&a=cancelGood";

//点赞-是否点赞接口
//类型: GET
//Request:
//	参数1: m=good   		m表示module/模块,
//	参数2: a=isGood		a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: itemId=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//
//http://127.0.0.1/project/artist-v3/api/index.php?m=good&a=isGood&itemId=10813
var isGoodUrl = urlPrefix + "index.php?m=good&a=isGood";


//点赞-获取点赞个数接口
//类型: GET
//Request:
//	参数1: m=good   		m表示module/模块,
//	参数2: a=getGoodCount		a表示action动作
//	参数3: itemId=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//	data中有个属性值 goodCount是点赞个数
//http://127.0.0.1/project/artist-v3/api/index.php?m=good&a=getGoodCount&itemId=10813
var getGoodCountUrl = urlPrefix + "index.php?m=good&a=getGoodCount";

///================================评论=======================
//评论-添加评论接口
//类型: GET
//Request:
//	参数1: m=comment   		m表示module/模块,
//	参数2: a=addComment		a表示action动作
//	参数3: userId=12			是变的, 要拼接
//	参数4: itemId=1			是变的, 要拼接
//	参数5: commnet=aaaaa		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//
//http://127.0.0.1/project/artist-v3/api/index.php?m=comment&a=addComment&userId=1&itemId=10813&comment=aaaa
var addCommentUrl = urlPrefix + "index.php?m=comment&a=addComment";



//评论-获取评论接口
//类型: GET
//Request:
//	参数1: m=comment   		m表示module/模块,
//	参数2: a=getComment		a表示action动作
//	参数3: itemId=1		是变的, 要拼接
//Response
//	json:  {"code":0,desc:"ok",data:[]}
//		成功: code=0
//		失败: code非0
//
//http://127.0.0.1/project/artist-v3/api/index.php?m=comment&a=getComment&itemId=10813
var getCommentUrl = urlPrefix + "index.php?m=comment&a=getComment";


//v2版本新的接口
//

//推荐接口

//推荐列表接口
//类型: GET
//Request:
//	参数1: m=recommond   m表示module/模块,
//	参数2: a=list	a表示action动作
//	参数3: start=0	表示数据起始的位置, 从第几个开始, 默认为0
//	参数4: count=10	每页的数据个数,默认为10
//Response
//	json:  {"code":0,desc:"ok",data:[],total:10}
//
var recommendListUrl = urlPrefix + "index.php?m=recommend&a=list";


//随机推荐列表接口
//类型: GET
//Request:
//	参数1: m=recommond   m表示module/模块,
//	参数2: a=random	a表示action动作
//	参数3: start=0	表示数据起始的位置, 从第几个开始, 默认为0
//	参数4: count=10	每页的数据个数,默认为10
//Response
//	json:  {"code":0,desc:"ok",data:[],total:10}
var recommendRandomListUrl = urlPrefix + "index.php?m=recommend&a=random";



//排行接口
//类型: GET
//Request:
//	参数1: m=ranking   m表示module/模块,
//	参数2: a=list	a表示action动作
//	参数3: start=0	表示数据起始的位置, 从第几个开始, 默认为0
//	参数4: count=10	每页的数据个数,默认为10
//Response
//	json:  {"code":0,desc:"ok",data:[],total:10}
var rankingListUrl = urlPrefix + "index.php?m=ranking&a=list";
//http://127.0.0.1/project/artist-v3/api/index.php?m=ranking&a=list



//用户反馈接口
//类型: GET
//Request:
//	参数1: m=feedback   m表示module/模块,
//	参数2: a=add	a表示action动作
//	参数3: userId=0	表示用户id
//	参数4: type=1或者2	表示反馈类型
//	参数5: message=1111   提交的反馈
//	参数4: connectType=13611112222   用户联系方式(邮箱或者电话))
//Response
//	json:  {"code":0,desc:"ok",data:[],total:10}
var addFeedbackUrl = urlPrefix + "index.php?m=feedback&a=add";
//http://127.0.0.1/project/artist-v3/api/index.php?m=feedback&a=add&userId=5&type=1&message=goooooooood&connectType=13611112222&token=01858163690ee3c36b12641be6b13946


module.exports = {
    imagePrefix: imagePrefix,

    adsUrl: adsUrl,
    mainListUrl: mainListUrl,
    readListUrl: readListUrl,
    musicListUrl: musicListUrl,
    movieListUrl: movieListUrl,
    readDetailUrl: readDetailUrl,
    musicDetailUrl: musicDetailUrl,
    movieDetailUrl: movieDetailUrl,

    searchUrl: searchUrl,
    loginUrl: loginUrl,
    registerUrl: registerUrl,
    changePasswordUrl: changePasswordUrl,
    changeNicknameUrl: changeNicknameUrl,
    changeHeadImageUrl: changeHeadImageUrl,
    userInfoUrl: userInfoUrl,
    getFavoriteUrl: getFavoriteUrl,
    saveFavoriteUrl: saveFavoriteUrl,
    cancelFavoriteUrl: cancelFavoriteUrl,
    isFavoriteUrl: isFavoriteUrl,
    addGoodUrl: addGoodUrl,
    cancelGoodUrl: cancelGoodUrl, //点赞-取消点赞接口
    isGoodUrl: isGoodUrl, //点赞-是否点赞接口
    getGoodCountUrl: getGoodCountUrl, //点赞-获取点赞个数接口
    addCommentUrl: addCommentUrl, //评论-添加评论接口
    getCommentUrl: getCommentUrl, //评论-获取评论接口
    recommendListUrl: recommendListUrl, //推荐列表接口
    recommendRandomListUrl: recommendRandomListUrl, //随机推荐列表接口
    rankingListUrl: rankingListUrl, //排行接口
	addFeedbackUrl: addFeedbackUrl  //用户反馈接口
}