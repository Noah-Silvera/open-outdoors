class PubSub {
  constructor() {
    this.events = {

    }
  }

  subscribe(event, subscriber){
    if(!this.events[event]){
      this.events[event] = []
    }

    this.events[event].push(subscriber)
  }

  publish(event, args){
    if(this.events[event].length > 0){
      this.events[event].forEach(subscriber => {
        subscriber(args)
      });
    }
  }
}

export const GlobalPubSub = new PubSub();

export function hideOnScroll(elem, identifer) {
  var lastScrollTop;

  const hideElement = () => {
    elem.classList.remove("is-visible")
    elem.classList.add("is-hidden")
  }

  const dispatchHiddenEvent = () => {
    GlobalPubSub.publish("hidden-on-scroll", { identifer: identifer })
  }

  const showElement = () => {
    elem.classList.remove("is-hidden")
    elem.classList.add("is-visible")
  }

  const dispatchShownEvent = () => {
    GlobalPubSub.publish("shown-on-scroll", { identifer: identifer })
  }

  window.addEventListener('scroll',function(){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if((scrollTop - lastScrollTop) > 25 && scrollTop > 200){
      if(!elem.classList.contains("is-hidden")) {
        hideElement()
        dispatchHiddenEvent()
      }
    }
    else if(((lastScrollTop - scrollTop) > 60) || scrollTop < 50){
      if(!elem.classList.contains("is-visible")) {
        showElement()
        dispatchShownEvent()
      }
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
