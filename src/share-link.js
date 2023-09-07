import ShareLocation from './share-location.js'
import defaultServices from './share-defaults.js'

class ShareLink extends HTMLElement {
	constructor() {
		super()

		this.canShare = false
		this.shareUrl = null
		this.shareLabel = ''
	}

	connectedCallback() {
		// Try to take URL + label from embedded link
		if (this.childElementCount == 1 && this.firstElementChild.hasAttribute('href')) {
			this.shareUrl = this.firstElementChild.getAttribute('href')
			this.shareLabel = this.firstElementChild.textContent
		}

		// Override URL, if specified
		if (this.hasAttribute('url')) {
			this.shareUrl = this.getAttribute('url')
		}

		// Override label, if specified
		if (this.hasAttribute('label')) {
			this.shareLabel = this.getAttribute('label')
		}

		this.canShare = this.shareUrl != null && this.canUseWebShare(this.shareUrl)

		if (this.canShare) {
			this.replaceChildren(this.createShareButton())
		} else {
			this.replaceChildren(this.createFallbackLinks())
		}
	}

	canUseWebShare(url) {
		return navigator.canShare && navigator.canShare({ url })
	}

	createShareButton() {
		let shareButton = document.createElement('button')
		shareButton.setAttribute('type', 'button')
		let label = document.createElement('span')
		label.textContent = this.shareLabel
		shareButton.classList.add(...this.classList)
		this.removeAttribute('class')
		shareButton.appendChild(label)

		shareButton.addEventListener('click', (event) => {
			navigator.share({ url: this.shareUrl })
		})

		return shareButton
	}

	createFallbackLinks() {
		let links = document.createElement('ul')

		defaultServices.forEach(service => {
			let serviceParams = service.params
			service.params[service.urlParam] = this.shareUrl

			const location = new ShareLocation(service.name, service.url, serviceParams)
			const serviceLink = this.createExternalLink(location.getShareUrl(), location.name)

			let listItem = document.createElement('li')
			listItem.appendChild(serviceLink)
			links.appendChild(listItem)
		})

		return links
	}

	createExternalLink(url, label) {
		let link = document.createElement('a')
		link.setAttribute('href', url)
		link.setAttribute('target', '_blank')
		link.setAttribute('rel', 'noopener noreferrer')
		link.textContent = label
		return link
	}
}

customElements.define('share-link', ShareLink)
