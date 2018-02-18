export default function(state) {
  function _applyStyles(el, styles) {
    for (const prop in styles) {
      const name = prop.replace(/([a-z\d])([A-Z])/, '$1-$2').toLowerCase()

      // console.log('style: ', name, styles[prop])

      el.style[name] = styles[prop]
    }
  }

  function _attachHandler(el, name, handler) {
    // Handle properties starting with 'on'

    const eventName = name.slice(2).toLowerCase()

    // console.log(eventName)

    el.addEventListener(eventName, handler)
  }
  
  function _attachChildren(el, children = []) {
    children.forEach(child => {
      if (typeof child === 'string') {
        child = text(child)
      }
      
      try {
        el.appendChild(child)
      } catch (err) {
        console.warn('failed to attach child', child, 'to parent', el, err)
      }
    })
  }

  function _applyAttribute(el, name, value) {
    switch(name.toLowerCase()) {
    default:
      el.setAttribute(name, value)
      break
    }
  }

  function _applyProps(el, props) {
    for (const key in props) {
      const k = key.toLowerCase()

      if (/^on/.test(k)) {
        // Is an event handler
        _attachHandler(el, key, props[key])
      } else if (k === 'styles') {
        _applyStyles(el, props[key])
      } else {
        // Treat as a regular attribute.
        _applyAttribute(el, key, props[key])
      }
    }
  }

  function _el(tag, props, children) {
    // console.log('creating element', tag, props, children)
    
    // Create DOM nodes.
    const el = document.createElement(tag)
    if (props) {
      if (Array.isArray(props) && !children) {
        // Assume children was passed as the second prop.
        children = props
        props = null
      } else if (typeof props === 'object') {
        _applyProps(el, props)
      }
    }
    if (children && !Array.isArray(children)) {
      children = [children]
    }
    _attachChildren(el, children)
    return el
  }

  function textbox(props, value) {
    const el = _el('textarea', props)

    _applyStyles(el, {
      position: 'relative',
      border: 0,
      resize: 'none',
    })
    
    if (typeof value === 'string') {
      el.value = value
    }

    return el
  }

  function text(value) {
    // console.log('Instantiating a text element')

    return document.createTextNode(value)
  }

  return {
    text,
    textbox,
    RAW: _el
  }
}
