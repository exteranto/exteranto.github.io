## Browser Extension Basics

Useful Resources:

- [MDN Anatomy of an Extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
- [Mozilla Extension Workshop](https://extensionworkshop.com/)
- [Chrome Developer Overview](https://developer.chrome.com/extensions/overview)
- [Chrome Developer Guide](https://developer.chrome.com/extensions/devguide)


### Standard Extension Architecture

1. `manifest.json` ([Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json), [Chrome](https://developer.chrome.com/extensions/manifest)) is the only required file for an extension. The main purposes of the manifest are as follows:
    - specify extension metadata, e.g. `name`, `version`, `locale` etc.
    - point to core files, e.g. `background`, `content_scripts`, `devtools_page`, `options` and bundled `web_accessible_resources`
    - assert permissions on browser APIs and other resources, urls etc. e.g.`storage`, `tabs`, `bookmarks`, `https://*/*`
    - declare UI elements e.g. `browser_action` icon

2. Content ([Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts), [Chrome](https://developer.chrome.com/extensions/content_scripts)): The content scripts (`.js` or `.css`) are loaded into and executed within the context of a given web page. They have access to the DOM and as such can read and manipulate the existing HTML. These scripts can dispatch XHRs. In order to interact with most other browser APIs/resources or with other extension elements (e.g. to tell them about certain DOM elements present) they must usually communicate via the intermediary of a `background script`, through message passing (see below). In order to communicate with a page `<script>` (or vice-versa) the `window.postMessage()` API must be used.

3. Background: The background script(s) (`.js`, or a single `.html` background page) are loaded into and execute within the browser environment. They access most of the browser APIs (depending on their permissions as specified in `manifest.json`) and can listen to browser events etc. Background scripts tend either to run for an extended duration in order to maintain state or to serve as a semi-dormant event handler. They are provided their own `window` for DOM access (with limitations) and can dispatch XHRs. The background scripts cannot interact directly with a loaded webpage, but must act via a content script that they load into that page context (see above).

4. UI Elements: Possible UI items include
    - 'browser action': the clickable icon in the browser toolbar - an `.html` popup may be specified in the manifest
    - 'context menus': the user may want to interact with page items etc. via a dropdown menu on right mouseclick
    - a keyboard shortcut
    - page elements (popups, iframes etc.) defined and injected by the extension content script itself

5. Options: An options page should allow extension users to specify certain preferences and choose extension settings.
