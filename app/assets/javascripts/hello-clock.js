$(() => {
  const $clock = $("#hello-clock")
  
  function zeroPad(value) {
    let str = value.toString()
    
    while (str.length < 2) {
      str = '0' + str
    }
    
    return str
  }
  
  function updateTime() {
    const date = new Date()
    
    let m = 'AM'
    let hours = date.getHours()
    let minutes = date.getMinutes()
    // let seconds = date.getSeconds()
    
    if (hours > 12) {
      hours -= 12
      m = 'PM'
    }
    
    const time = `${hours}:${zeroPad(minutes)} ${m}`
    
    $clock.text(time)
  }
  
  setInterval(updateTime, 10 * 1000)
  
  updateTime()
})