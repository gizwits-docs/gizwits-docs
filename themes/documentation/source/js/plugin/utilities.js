import $ from './jquery.min.js'

export function dropdownToggle(sup, sub) {
  var subWrapper
  $(sup).hover(function() {
    subWrapper = $(this).find(sub + '-wrapper')
    subWrapper.show()
  }, function() {
    subWrapper = $(this).find(sub + '-wrapper')
    subWrapper.hide()
  })
}

export function getCookie(name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length == 2) {
    return parts.pop().split(';').shift()
  }
}