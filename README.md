# ShareLink Custom Element

This is a [Custom Element][CE] to handle sharing a URL using either the [Web Share API][WSA] or,
if that's not available, a couple of default services' share URLs, so as to not have to
use their ginormous JS-embeds, that preload a multitude of scripts on *every.single.page*
using them.

The goal is to be able to add this to a page:

```html
<share-link>
	<a href="https://test.com/path/to/page">Link to this page</a>
</share-link>
```

— and have it render a button that triggers the **Web Share API**'s `share()` method,
when clicked (the Web Share API requires [transient activation][TACT]).

If necessary, the URL and/or the button's label can be overriden with attributes on the
element, e.g. to use the label "Share this" instead of "Link to this page" from the
embedded link, do this:

```html
<share-link data-label="Share this">
	<a href="https://test.com/path/to/page">Link to this page</a>
</share-link>
```

Similarly, using the `data-url` attribute would allow you to modify the link destination, e.g.
for tracking purposes etc.:

```html
<share-link data-url="https://test.com/path/to/page/?from=web-share-api" data-label="Share this link">
	<a href="https://test.com/path/to/page/?from=no-js-fallback">Link to this page</a>
</share-link>
```



## Notes

* The rendered button can be styled with the global styles as any other element.

* If the browser doesn't support the Web Share API, we should get a couple of links to
**Facebook**'s and *maybe* **X**'s public share URLs, along with a generic "Copy link"
button.

* If the browser doesn't support custom elements, the content inside should be rendered. (This would
have to be manually specified by your CMS - *please don't use JavaScript to do this!* - this
is the "last resort" case where if all else fails, at least we can have a link for manually copying).


[CE]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
[WSA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
[TACT]: https://developer.mozilla.org/en-US/docs/Glossary/Transient_activation
