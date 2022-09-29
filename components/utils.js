export function shiftUpOnScroll(elem) {
  var lastScrollTop;
  window.addEventListener('scroll',function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if((scrollTop - lastScrollTop) > 25){
      elem.className = elem.className.replaceAll(" is-visible", "")
      elem.className += " is-hidden"
    }
    else if(((lastScrollTop - scrollTop) > 60) || scrollTop == 0){
      elem.className = elem.className.replaceAll(" is-hidden", "")
      elem.className += " is-visible"
    }
    lastScrollTop = scrollTop;
  });
}
