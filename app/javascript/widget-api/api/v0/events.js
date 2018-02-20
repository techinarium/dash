export default function events() {
  const listeners = {}

  return {
    on(event, func) {
      if (!listeners[event]) {
        listeners[event] = []
      }

      listeners[event].push(func)
    },
    once(event, func) {
      if (!listeners[event]) {
        listeners[event] = []
      }
      
      const selfDestruct = function(...args) {
        func(...args)
        listeners[event] = listeners[event].filter(f => f !== selfDestruct)
        console.log('once listener self destructed')
      }
      
      listeners[event].push(selfDestruct)
    },
    emit(event, ...data) {
      if (listeners[event]) {
        listeners[event].forEach(func => func(...data))
      }
    }
  }
}