import ShareLocation from './share-location.js'
import defaultServices from './share-defaults.js'

class ShareLink extends HTMLElement {
	constructor() {
		super()

		this.canShare = false
		this.shareUrl = null
		this.shareLabel = ''
		this.enabled = !this.hasAttribute('disabled')
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

		this.canShare = this.enabled && this.shareUrl != null && this.canUseWebShare(this.shareUrl)

		let shareButton = this.createShareButton()
		shareButton.addEventListener('click', (event) => {
			const target = event.target.closest('button')
			const state = target.getAttribute('aria-pressed') == 'true'
			target.setAttribute('aria-pressed', !state)
		})

		this.replaceChildren()
		this.appendChild(shareButton)

		if (this.canShare) {
			shareButton.addEventListener('click', (event) => {
				navigator.share({ url: this.shareUrl })
				.finally(result => {
					shareButton.setAttribute('aria-pressed', false)
				})
			})
		} else {
			const fallbackLinks = this.createFallbackLinks()
			this.appendChild(fallbackLinks)
		}
	}

	canUseWebShare(url) {
		return navigator.canShare && navigator.canShare({ url })
	}

	createShareButton() {
		let shareButton = document.createElement('button')
		shareButton.setAttribute('type', 'button')
		shareButton.setAttribute('aria-pressed', false)
		let label = document.createElement('span')
		label.textContent = this.shareLabel
		shareButton.classList.add(...this.classList)
		this.removeAttribute('class')
		shareButton.appendChild(label)
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

		let copyLink = document.createElement('a')
		copyLink.setAttribute('href', '#copy')
		copyLink.textContent = 'Copy'
		copyLink.addEventListener('click', this.copyToClipboard.bind(this))

		let copyItem = document.createElement('li')
		copyItem.appendChild(copyLink)
		links.appendChild(copyItem)

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

	copyToClipboard(event) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(this.shareUrl).then((result) => {
				this.dispatchShareEvent('didcopy')
			}, (error) => {
				this.dispatchShareEvent('didnotcopy')
			})
		}

		event.preventDefault()
	}

	dispatchShareEvent(name) {
		const event = new Event(`share:${name}`)
		this.dispatchEvent(event)
	}
}


export default function defineShareLink() {
	customElements.define('share-link', ShareLink)
}
