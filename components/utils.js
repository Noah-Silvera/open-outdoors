export function shiftUpOnScroll(elem) {
  var lastScrollTop;
  window.addEventListener('scroll',function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if((scrollTop - lastScrollTop) > 25 && scrollTop > 200){
      elem.classList.remove("is-visible")
      elem.classList.add("is-hidden")
    }
    else if(((lastScrollTop - scrollTop) > 60) || scrollTop < 50){
      elem.classList.remove("is-hidden")
      elem.classList.add("is-visible")
    }
    lastScrollTop = scrollTop;
  });
}


export const navLinks = [
  {
    "href": "/gear-library",
    "text": "Gear Library",
    "hiddenOnDesktop": false
  },
  {
    "href": "/about",
    "text": "About Us",
    "hiddenOnDesktop": false
  },
  {
    "href": "/contact",
    "text": "Contact",
    "hiddenOnDesktop": false
  }
]
