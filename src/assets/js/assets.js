const throttle = function(fn, delay) {
  let timer = null
  return function() {
    let context = this
    // let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context)
    }, delay)
  }
}

export default{
  throttle
}
