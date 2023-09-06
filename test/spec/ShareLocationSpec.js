import ShareLocation from '../../src/share-location.js'

describe('ShareLocation', function() {
	beforeEach(function() {
		this.testLocation = new ShareLocation()
	})

	it('has a name and a url', function() {
		expect(this.testLocation.name).toBeDefined()
		expect(this.testLocation.url).toBeDefined()
	})

	it('defaults to blank', function() {
		expect(this.testLocation.name).toBe('')
		expect(this.testLocation.url).toBe('')
		expect(this.testLocation.params).toEqual({})
	})

	it('can be initialized', function() {
		this.localTest = new ShareLocation('MySharer', 'https://domain.com', { name: 'value' })

		expect(this.localTest.name).toBe('MySharer')
		expect(this.localTest.url).toBe('https://domain.com')
		expect(this.localTest.params).toEqual({ name: 'value' })
	})

	describe('getShareUrl', function() {
		beforeEach(function() {
			this.testLocation = new ShareLocation('UltraShare', 'https://ultrashare.here', {
				key: 'value for escaping'
			})
		})

		it('returns a full share URL with params added (and encoded)', function() {
			expect(this.testLocation.getShareUrl()).toBe('https://ultrashare.here?key=value+for+escaping')
		})
	})
})
