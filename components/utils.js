export function shiftUpOnScroll(elem) {
  var lastScrollTop;
  window.addEventListener('scroll',function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if((scrollTop - lastScrollTop) > 25 && scrollTop > 200){
      elem.className = elem.className.replaceAll(" is-visible", "")
      elem.className += " is-hidden"
    }
    else if(((lastScrollTop - scrollTop) > 60) || scrollTop < 50){
      elem.className = elem.className.replaceAll(" is-hidden", "")
      elem.className += " is-visible"
    }
    lastScrollTop = scrollTop;
  });
}
