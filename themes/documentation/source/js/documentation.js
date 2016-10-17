// nav dropdown
+function($) {
  
  $(function() {
    dropdownToggle('.levelA', '.levelB')
    dropdownToggle('.levelB', '.levelC')
  })

  function dropdownToggle(sup, sub) {
    var subWrapper
    $(sup).hover(function() {
      subWrapper = $(this).find(sub + '-wrapper')
      subWrapper.show()
    }, function() {
      subWrapper = $(this).find(sub + '-wrapper')
      subWrapper.hide()
    })
  }
}(jQuery)



// 首页重定向
+function() {
  var browserLang = /zh/.test(navigator.userLanguage || navigator.language) ? 'zh-cn' : 'en-us'
  var lang

  if (localStorage) {
    var prefLang = localStorage.getItem('lang')
    if (prefLang) {
      lang = prefLang
    } else {
      lang = browserLang
      localStorage.setItem('lang', lang)
    }
  } else {
    lang = browserLang
  }

  if (location.pathname === '/')
    location.href = lang + '/overview/overview.html'
}()