export function shiftUpOnScroll(elem) {
  var lastScrollTop;
  window.addEventListener('scroll',function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if((scrollTop - lastScrollTop) > 45){
      elem.className += " is-hidden"
    }
    else if((lastScrollTop - scrollTop) > 45){
      elem.className = elem.className.replaceAll(" is-hidden", "")
    }
    lastScrollTop = scrollTop;
  });
}
