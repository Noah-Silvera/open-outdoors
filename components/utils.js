export function shiftUpOnScroll(elem) {
  var lastScrollTop;
  window.addEventListener('scroll',function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let transitionThreshold = 30
    if((scrollTop - lastScrollTop) > transitionThreshold){
      elem.className = elem.className.replaceAll(" is-visible", "")
      elem.className += " is-hidden"
    }
    else if(((lastScrollTop - scrollTop) > transitionThreshold) || scrollTop == 0){
      elem.className = elem.className.replaceAll(" is-hidden", "")
      elem.className += " is-visible"
    }
    lastScrollTop = scrollTop;
  });
}
