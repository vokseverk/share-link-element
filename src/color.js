class Color {
	constructor(value = '#fff', label = 'White') {
		this.value = value
		this.label = label
	}
	
	set value(newValue) {
		if (newValue != '' && newValue.startsWith('#')) {
			this._value = newValue
		}
	}
	
	get value() { return this._value }
	
	set label(newLabel) {
		if (newLabel != "") {
			this._label = newLabel
		}
	}
	
	get label() { return this._label }
}

export default Color
