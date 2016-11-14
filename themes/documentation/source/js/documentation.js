// common variables
var BODY_BP = 1119
var HEADER_BP = 915



// header nav dropdown
+function($) {
  $(function() {
    dropdownToggle('.levelA', '.levelB')
    dropdownToggle('.levelB', '.levelC')
  })

  function dropdownToggle(sup, sub) {
    var subWrapper
    $(sup).hover(function() {
      if ($(window).width() <= HEADER_BP) {
        return
      }
      subWrapper = $(this).find(sub + '-wrapper')
      subWrapper.show()
    }, function() {
      if ($(window).width() <= HEADER_BP) {
        return
      }
      subWrapper = $(this).find(sub + '-wrapper')
      subWrapper.hide()
    })

    $(sup).click(function(evt) {
      if ($(window).width() > HEADER_BP) {
        return
      }
      subWrapper = $(this).find(sub + '-wrapper')
      evt.stopPropagation()
      subWrapper.toggle()
    })
  }
}(jQuery)



// mobile header nav menu dropdown
+function($) {
  $(function() {
    $('.mobile-header .fa').click(function() {
      $('.menu').toggle()
      $('.lang-switch-wrapper').toggle()
    })
  })
}(jQuery)



// index redirect
+function() {

    // DELETE THIS SHIT BEFORE LONG
    var lang = 'zh-cn'
    localStorage.setItem('lang', lang)


    // THE CODES BELOW ARE TEMP COMMENTED OUT BECAUSE OF MY SHITTY CO-WORKERS

    // var lang

    // function getCookie(name) {
    //   var value = '; ' + document.cookie
    //   var parts = value.split('; ' + name + '=')
    //   if (parts.length == 2) {
    //     return parts.pop().split(';').shift()
    //   }
    // }

    // function getLang(prefLang, savePref) {
    //   var browserLang = /zh/.test(navigator.userLanguage || navigator.language) ? 'zh-cn' : 'en-us'
    //   if (/zh-cn/.test(prefLang) || /en-us/.test(prefLang)) {
    //     lang = prefLang
    //   } else {
    //     lang = browserLang
    //     savePref(lang)
    //   }
    // }

    // if (localStorage) {
    //   var prefLang = localStorage.getItem('lang')
    //   var setStorage = function(lang) {
    //     localStorage.setItem('lang', lang)
    //   }
    //   getLang(prefLang, setStorage)
    // } else {
    //   var prefLang = getCookie('lang')
    //   var setCookie = function(lang) {
    //     document.cookie = 'lang=' + lang + '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    //   }
    //   getLang(prefLang, setCookie)
    // }

    if (location.pathname === '/') {
      location.href = lang + '/overview/overview.html'
    }
  }()
}()



// lang switch
// +function($) {
//   $(function() {
//     $('.lang-switch').click(function() {
//       var lang = $(this).data('lang')
//       var paths = location.pathname.split('/').slice(2)
//       paths.unshift(lang)
//       location.href = '/' + paths.join('/')

//       if (localStorage) {
//         localStorage.setItem('lang', lang)
//       } else {
//         document.cookie = 'lang=' + lang + '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
//       }
//     })
//   })
// }(jQuery)



// TEMP LANG SWITCH. KILL THEM ALL PLZ
+function($) {
  $(function() {
    $('.lang-switch').click(function() {
      location.href = 'https://gizwitsen.kf5.com/hc/'
    })
  })
}(jQuery)



// doc editing
+function($) {
  $(function() {
    var path = location.pathname
    var editPath = 'https://github.com/gizwits-docs/gizwits-docs/edit/master/source' + path.slice(0, path.length - 4) + 'md'
    $('.edit-link').attr('href', editPath)
  }) 
}(jQuery)



// documentation's navigation
+function($) {

  // generate navigation
  $(function() {
    var headings = $('.markdown-body').find('h1, h2, h3, h4, h5, h6')
    var navigation = '<ul>'
    var group = 0
    headings.each(function() {
      var $this = $(this)
      var className = $this.prop('tagName').toLowerCase()
      var anchor = $this.attr('id')
      var text = $this.text()

      if (className === 'h1') {
        group += 1
      }
      $this.append($('<a class="anchor" href="#' + anchor + '">#</a>'))
      if (className === 'h1' || className === 'h2') {
        navigation += '<li class="' + className + '" data-group="' + group + '"><a href="#' + anchor + '">'+ text + '</a>' + '</li>'
      }
    })
    navigation += '</ul>'
    $('.navigation').find('.nav').append(navigation)
    $('.navigation-inner').append($('<div class="nav-control" data-show="false">' + (localStorage.getItem('lang') === 'en-us' ?  'Show' : '展开全部') +'</div>'))
  })

  $(function() {
    var timeoutHandler
    var $nav = $('.nav')
    var navHeight = $nav.height()

    $('body').scrollspy({target: '.navigation'})

    // scrollspy behavior
    $(window).scroll(function() {
      if ($(window).width() <= BODY_BP) {
        return
      }
      var $active = $('.nav .active')
      var pos = $active.position().top

      // nav auto scroll
      if (!$('.nav:hover').length) {
        clearTimeout(timeoutHandler)
        timeoutHandler = setTimeout(function() {
          if (pos + $nav.scrollTop() > navHeight) {
            $nav.animate({
              scrollTop: pos + $nav.scrollTop() - 120
            })
          } else if (pos - navHeight < 376) {
            $nav.animate({
              scrollTop: - pos - $nav.scrollTop()
            })
          }
        }, 200)
      }

      // auto dipslay sub-menu
      if (!$('.nav-control').data().show) {
        var activeGroup = $active.data().group
        $('.nav > ul > .h2[data-group=' + activeGroup + ']').show()
        $('.nav ul > .h2').not('[data-group=' + activeGroup + ']').hide()
      }
    })
  })

  // click the main-menu to show the sub-menu
  $(function() {
    $('.nav .h1').click(function() {
      if (!$('.nav-control').data().show) {
        var activeGroup = $(this).data().group
        $('.nav > ul > .h2[data-group=' + activeGroup + ']').show()
        $('.nav ul > .h2').not('[data-group=' + activeGroup + ']').hide()
      }
    })
  })

  // nav's sub-menu show/hide
  $(function() {
    $('.nav-control').click(function() {
      var $this = $(this)
      var langIsEn = localStorage.getItem('lang') === 'en-us'
      if ($this.data().show) {
        var activeGroup = $('.active').data().group
        $this.text(langIsEn ? 'Show' : '展开全部')
        $this.data('show', false)
        $('.nav > ul > .h1[data-group=' + activeGroup + ']').addClass('active')
        $('.nav .h2').removeClass('active').hide()
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



// open doc anchor in new page
+function($) {
  $(function() {
    $('.markdown-body a').not('.anchor').attr('target', '_blank')
  })
}(jQuery)



// spin
+function() {
  var opts = {
    lines: 13 // The number of lines to draw
  , length: 28 // The length of each line
  , width: 14 // The line thickness
  , radius: 42 // The radius of the inner circle
  , scale: 1 // Scales overall size of the spinner
  , corners: 1 // Corner roundness (0..1)
  , color: 'black' // #rgb or #rrggbb or array of colors
  , opacity: 0.25 // Opacity of the lines
  , rotate: 0 // The rotation offset
  , direction: 1 // 1: clockwise, -1: counterclockwise
  , speed: 1 // Rounds per second
  , trail: 60 // Afterglow percentage
  , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
  , zIndex: 2e9 // The z-index (defaults to 2000000000)
  , className: 'spinner' // The CSS class to assign to the spinner
  , top: '50%' // Top position relative to parent
  , left: '50%' // Left position relative to parent
  , shadow: false // Whether to render a shadow
  , hwaccel: false // Whether to use hardware acceleration
  , position: 'absolute' // Element positioning
  }
  if (location.pathname === '/') {
    var target = document.getElementsByTagName('body')[0]
    var spinner = new Spinner(opts).spin(target)
  }
}()