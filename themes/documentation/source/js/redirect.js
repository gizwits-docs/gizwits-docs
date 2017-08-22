var redirectMap = {
  // 在这里添加重定向，注意逗号

  '/zh-cn/old.html': '/zh-cn/new.html',
  '/zh-cn/旧.html': '/zh-cn/新.html'
}

var pathname = decodeURI(window.location.pathname)

if (redirectMap[pathname]) {
  window.location.href = encodeURI(redirectMap[pathname])
}