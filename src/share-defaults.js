const defaultServices = [
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/sharer/sharer.php',
		params: { u: '' },
		urlParam: 'u'
	},
	{
		name: 'Twitter (X)',
		url: 'https://twitter.com/intent/tweet/',
		params: { url: '' },
		urlParam: 'url'
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/shareArticle',
		params: { mini: true, url: '' },
		urlParam: 'url'
	}
]

export default defaultServices
