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
  var lang

  function getCookie(name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length == 2)
      return parts.pop().split(';').shift()
  }

  function getLang(prefLang, savePref) {
    var browserLang = /zh/.test(navigator.userLanguage || navigator.language) ? 'zh-cn' : 'en-us'
    if (/zh-cn/.test(prefLang) || /en-us/.test(prefLang)) {
      lang = prefLang
    } else {
      lang = browserLang
      savePref(lang)
    }
  }

  if (localStorage) {
    var prefLang = localStorage.getItem('lang')
    var setStorage = function(lang) {
      localStorage.setItem('lang', lang)
    }
    getLang(prefLang, setStorage)
  } else {
    var prefLang = getCookie('lang')
    var setCookie = function(lang) {
      document.cookie = 'lang=' + lang + '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    }
    getLang(prefLang, setCookie)
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
      } else {
        document.cookie = 'lang=' + lang + '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
      }
    })
  })
}(jQuery)



// doc editing
+function($) {
  $(function() {
    var path = location.pathname
    var editPath = 'https://github.com/gizwits-docs/gizwits-docs/edit/develop/source' + path.slice(0, path.length - 4) + 'md'
    $('.edit-link').attr('href', editPath)
  }) 
}(jQuery)



// documentation's navigation
+function($) {
  $(function() {
    var headings = $('.markdown-body').find('h1, h2')
    var navigation = '<ul>'
    headings.each(function(index) {
      var $this = $(this)
      var className = $this.prop('tagName').toLowerCase()
      var anchor = $this.attr('id')
      var text = $this.text()
      var element = '<a class="' + className + '" href="#' + anchor + '">' + text + '</a>'
      $this.append($('<a class="anchor" href="#' + anchor + '">#</a>'))
      navigation += '<li class="' + className + '"><a href="#' + anchor + '">'+ text + '</a>' + '</li>'
    })
    navigation += '</ul>'
    $('.navigation').find('.nav').append(navigation)
    $('.navigation').append($('<div class="nav-control" data-show="false">' + (localStorage.getItem('lang') === 'en-us' ?  'Show' : '展开全部') +'</div>'))
  })

  $(function() {
    var timeoutHandler
    var $nav = $('.nav')
    var navHeight = $nav.height()
    var lastScrollTop = $(window).scrollTop()

    $('body').scrollspy({target: '.navigation'})

    $(window).scroll(function() {
      clearTimeout(timeoutHandler)
      var $active = $('.nav .active')
      var pos = $active.position().top
      var curScrollTop = $(window).scrollTop()

      timeoutHandler = setTimeout(function() {
        if (pos + $nav.scrollTop() > navHeight) {
          $nav.animate({
            scrollTop: pos + $nav.scrollTop()
          })
        } else if (pos - navHeight < 376) {
          $nav.animate({
            scrollTop: - pos - $nav.scrollTop()
          })
        }
      }, 200)

      if (!$('.nav-control').data().show) {
        if (curScrollTop > lastScrollTop) {
          if ($active.hasClass('h1')) {
            $active.prevAll('.h2').hide()
            $active.nextUntil('.h1').show()
          }
        } else {
          if ($active.hasClass('h2') && $active.next().hasClass('h1')) {
            $active.nextAll('.h2').hide()
            $active.next().prevUntil('.h1').show()
          }
        }
        lastScrollTop = curScrollTop
      } 
    })
  })

  $(function() {
    $('.nav-control').click(function() {
      var $this = $(this)
      var langIsEn = localStorage.getItem('lang') === 'en-us'
      if ($this.data().show) {
        $this.text(langIsEn ? 'Show' : '展开全部')
        $this.data('show', false)
        $('.nav .h2').hide()
      } else {
        $this.text(langIsEn ?  'Hide' : '折叠全部')
        $this.data('show', true)
        $('.nav .h2').show()
      }
    })
  })
}(jQuery)



// clipboard
+function($) {
  $(function() {
    $('.code pre').prepend($('<i class="fa fa-clipboard fa-lg tooltip" title="' + (localStorage.getItem('lang') === 'zh-cn' ? '复制' : 'COPY') + '"aria-hidden="true"><i class="tooltiptext">'+ (localStorage.getItem('lang') === 'zh-cn' ? '已复制' : 'COPIED') + '</i></i>'))

    new Clipboard('.fa-clipboard', {
      text: function(trigger) {
        var $trigger = $(trigger)
        var text = ''
        var tooltip = $trigger.find('.tooltiptext')

        $trigger.parent().find('.line').each(function() {
          text += $(this).text() + '\n'
        })
        tooltip.show()
        setTimeout(function() {
          tooltip.hide()
        }, 1000)
        return text
      }
    })
  })
}(jQuery)
