document.addEventListener('turbolinks:load', function() {
	const e = {}
	const el = {
		container: document.getElementById('widget-editor-container'),
		editor: document.getElementById('widget-editor'),
		textarea: document.getElementById('widget-code'),
		toolbar: document.getElementById('editor-toolbar'),
	}
	let currentWidget;
	let currentCode;

	const editor = CodeMirror.fromTextArea(el.textarea, {
		mode: 'javascript',
    matchBrackets: true,
    styleActiveLine: true,
    closeBrackets: `()[]{}''""`,
    lineNumbers: true,
    tabSize: 2,
    smartIndent: true,
	})

	// Wire up toolbar actions.

	const toolbarActions = {
		save() {
			if (currentCode) {
				currentCode.widget_code = editor.getValue()

				$.ajax({
					url: `/widget_codes/${currentCode.id}.json`,
					data: {
						widget_code: currentCode,
						authenticity_token: $('[name="csrf-token"]')[0].content,
					},
					dataType: 'json',
					method: 'PUT',
					complete(response) {
						console.log('saved')
					},
					error(err) {
						console.error('save failed', err)
					}
				})
			}
		},
		close() {
			if (currentCode && currentCode.widget_code !== editor.getValue()) {
				const doSave = confirm('You have unsaved changes. Do you want to save them?')

				if (doSave) this.save()
			}
			e.close()
		}
	}

	document.querySelectorAll('[data-toolbar-action]').forEach(item => {
		const action = item.getAttribute('data-toolbar-action')

		// Run whichever action is specified in the data attribute.
		item.addEventListener('click', (e) => {
			e.preventDefault()
			toolbarActions[action]()
		})
	})

	e.setCurrentWidget = function(widgetData) {
		currentWidget = widgetData
		currentCode = currentWidget.codes[0]
	}

	e.open = function(widgetData) {
		if (widgetData) {
			e.setCurrentWidget(widgetData)
		}

		console.log(currentWidget, currentCode)

		let content = currentCode.widget_code

		// const content = currentCode.widget_code

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

	console.log('Widget Editor loaded')
})
