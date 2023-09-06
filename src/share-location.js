class ShareLocation {
	constructor(name = '', url = '', params = {}) {
		this.name = name
		this.url = url
		this.params = params
	}

	getShareUrl() {
		let queryParams = new URLSearchParams(this.params)
		return `${this.url}?${queryParams.toString()}`
	}


}

export default ShareLocation
