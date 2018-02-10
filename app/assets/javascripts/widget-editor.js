document.addEventListener('DOMContentLoaded', function() {
	const e = {}
	const el = {
		container: document.getElementById('widget-editor-container'),
		editor: document.getElementById('widget-editor'),
		textarea: document.getElementById('widget-code'),
		toolbar: document.getElementById('editor-toolbar'),
	}

	const editor = CodeMirror.fromTextArea(el.textarea, {
		mode: 'javascript'
	})

	// Wire up toolbar actions.

	const toolbarActions = {
		save() {
			console.log('SAVING', editor.getValue())
		},
		close() {
			e.close()
		}
	}

	document.querySelectorAll('[data-toolbar-action]').forEach(item => {
		console.log(item)
		const action = item.getAttribute('data-toolbar-action')

		// Run whichever action is specified in the data attribute.
		item.addEventListener('click', (e) => {
			e.preventDefault()
			toolbarActions[action]()
		})
	})

	e.open = function(content) {
		if (!content) {
			content = `
Dash.widget('v0', widget => {
	widget.layout({
		name: 'main',
		size: '2x2',
		default: true,
		render() {
			return widget.element.text('Hello, world!')
		}
	})
})
`
		}

		editor.setValue(content)
		el.container.classList.add('open')
	}

	e.close = function() {
		el.container.classList.remove('open')
	}

	window.WidgetEditor = e

	console.log('hello')
})
