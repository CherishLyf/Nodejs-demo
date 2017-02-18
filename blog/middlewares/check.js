// 注释来源于 https://github.com/nswbmw/N-blog/blob/master/book/4.4%20%E5%8A%9F%E8%83%BD%E8%AE%BE%E8%AE%A1.md#441-%E5%8A%9F%E8%83%BD%E4%B8%8E%E8%B7%AF%E7%94%B1%E8%AE%BE%E8%AE%A1

// 会话
// session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user。

// 页面通知
// connect-flash 是基于 session 实现的，它的原理很简单：设置初始值 req.session.flash={}，通过 req.flash(name, value) 设置这个对象下的字段和值，通过 req.flash(name) 获取这个对象下的值，同时删除这个字段。

// 权限控制
// 不管是论坛还是博客网站，我们没有登录的话只能浏览，登陆后才能发帖或写文章，即使登录了你也不能修改或删除其他人的文章，这就是权限控制。我们也来给博客添加权限控制，如何实现页面的权限控制呢？我们可以把用户状态的检查封装成一个中间件，在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制。在 myblog 下新建 middlewares 文件夹，在该目录下新建 check.js，添加如下代码：

module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登陆')
      return res.redirect('/signin')
    }
    next()
  },
  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登陆')
      return res.redirect('back')     // 返回之前的页
    }
    next()
  }
}
