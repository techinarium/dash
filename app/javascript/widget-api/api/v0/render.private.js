import _element from './element.js'

export default function(state, events) {
  return function(root) {
    const { RAW } = _element(state)
    
    state.root = root || state.root

    const layouts = state.layouts
      .filter(l => l.size === state.size)

    if (state.dom) {
      state.dom.parentNode.removeChild(state.dom)
    }
    
    state.dom = layouts[0].render()
  
    const toolbar = RAW('div', { class: 'widget-toolbar' }, [
      RAW('a', {
        href: '#',
        class: 'widget-toolbar-button',
        onClick: e => {
          e.preventDefault()
          events.emit('destroyRequested', state.instanceID)
        }
      }, '×')
    ])
    
    root.appendChild(toolbar)

    // root.appendChild(toolbar)
    root.appendChild(state.dom)
  }
}
