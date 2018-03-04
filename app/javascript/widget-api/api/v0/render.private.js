import _element from './element.js'

export default function(state, events) {
  return function(root) {
    if (state.isRendered) {
      return false
    }

    const { RAW } = _element(state)

    root = root || state.root
    state.root = root

    const layouts = state.layouts
      .filter(l => l.size === state.size)

    if (state.dom) {
      state.dom.parentNode.removeChild(state.dom)
    }

    if (state.layoutName) {
      const layout = layouts.find(l => l.name === state.layoutName)

      if (layout) {
        state.dom = layout.render()
      } else {
        state.dom = layouts[0].render()
      }
    } else if (layouts[0] || state.layouts[0]) {
      state.dom = layouts[0].render()
    }
  
    const toolbar = RAW('div', { class: 'widget-toolbar' }, [
      RAW('a', {
        href: '#',
        class: 'widget-toolbar-button',
        onClick: e => {
          e.preventDefault()
          events.emit('destroyRequested', state.instanceID)
        }
      }, 'X')
    ])
    
    root.appendChild(toolbar)

    // root.appendChild(toolbar)
    root.appendChild(state.dom)

    state.isRendered = true
  }
}
