import Color from '../../src/color.js'

describe('Color', function() {
	beforeEach(function() {
		this.testColor = new Color()
	})
	
	it('has a value and a label', function() {
		expect(this.testColor.value).toBeDefined()
		expect(this.testColor.label).toBeDefined()
	})
	
	it('defaults to white', function() {
		expect(this.testColor.value).toBe('#fff')
		expect(this.testColor.label).toBe('White')
	})
})
