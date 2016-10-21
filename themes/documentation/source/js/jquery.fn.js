$.fn.isOnScreen = function(){
  var element = this.get(0)
  var bounds = element.getBoundingClientRect()
  return bounds.top < window.innerHeight && bounds.bottom > 0
}