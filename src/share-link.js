import ShareLocation from './share-location.js'

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

		const facebook = new ShareLocation('Facebook', 'https://www.facebook.com/sharer/sharer.php', { u: this.shareUrl })
		const twitter = new ShareLocation('Twitter (X)', 'https://twitter.com/intent/tweet/', { url: this.shareUrl })
		const linkedIn = new ShareLocation('LinkedIn', 'https://www.linkedin.com/shareArticle', { mini: true, url: this.shareUrl })

		const facebookLink = this.createExternalLink(facebook.getShareUrl(), facebook.name)
		const twitterLink = this.createExternalLink(twitter.getShareUrl(), twitter.name)
		const linkedInLink = this.createExternalLink(linkedIn.getShareUrl(), linkedIn.name)

		Array.from([facebookLink, twitterLink, linkedInLink]).forEach(link => {
			let listItem = document.createElement('li')
			listItem.appendChild(link)
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
