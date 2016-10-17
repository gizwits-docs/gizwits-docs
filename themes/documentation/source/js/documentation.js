// header nav dropdown
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



// index redirect
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



// lang switch
+function($) {
  $(function() {
    $('.lang-switch').click(function() {
      var lang = $(this).data('lang')
      var paths = location.pathname.split('/').slice(2)
      paths.unshift(lang)
      location.href = '/' + paths.join('/')

      if (localStorage) {
        localStorage.setItem('lang', lang)
      }
    })
  })
}(jQuery)



// documentation's navigation
+function($) {
  $(function() {
    var headings = $('.body').find('h1, h2, h3')
    var navigation = ''
    headings.each(function() {
      var $this = $(this)
      var className = $this.prop('tagName').toLowerCase()
      var anchor = $this.attr('id')
      var text = $this.text()
      var element = '<a class="' + className + '" href="#' + anchor + '">' + text + '</a>'
      navigation += element
    })
    $('.navigation').append(navigation)
  })
}(jQuery)