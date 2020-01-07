---
title: Browser Extension Basics
layout: page
---


## Browser Extension Basics <!-- omit in toc -->

- [Standard Extension Architecture](#standard-extension-architecture)
- [Running Extensions Locally](#running-extensions-locally)
  - [Chrome](#chrome)
  - [Firefox](#firefox)
- [Useful Resources](#useful-resources)

### Standard Extension Architecture

1. `manifest.json` ([FF][firefox-manifest-guide], [CHR][chrome-manifest-guide])
is the only required file for an extension. The main purposes of the manifest
are as follows:
    - specify extension metadata, e.g. `name`, `version`, `locale` etc.
    - point to core files, e.g. `background`, `content_scripts`, `devtools_page`,
    `options` and bundled `web_accessible_resources`
    - assert permissions on browser APIs and other resources, urls etc. e.g.
    `storage`, `tabs`, `bookmarks`, `https://*/*`
    - declare UI elements e.g. `browser_action` icon

2. Content ([FF][firefox-content-guide], [CHR][chrome-content-guide]):
Depending on the correct permissions being specified in `manifest.json` (both
under `permissions` and under `content_scripts.*.matches` fields), the content
scripts (`.js` or `.css`) are loaded into and executed within the context of a
given web page. They have access to the DOM and as such can read and manipulate
the existing HTML. These scripts can dispatch XHRs. In order to interact with
most other browser APIs/resources or with other extension elements (e.g. to tell
them about certain DOM elements present) they must usually communicate via the
intermediary of a `background script`, through message passing (see below). In
order to communicate with a page `<script>` (or vice-versa) the
`window.postMessage()` API must be used.

    > Note: content script loading is limited to a specified url e.g.
    `https://www.example.com`, but we can widen the permission using wildcards,
    as in `https://*/*`

3. Background ([FF][firefox-content-guide], [CHR][chrome-content-guide]):
The background script(s) (`.js`, or a single `.html` background page) are loaded
into and executed within the browser environment. They access most of the
browser APIs (depending on their permissions as specified in `manifest.json`)
and can listen to browser events etc. Background scripts tend either to run for
an extended duration in order to maintain state or to serve as a semi-dormant
event handler. They are provided their own `window` for DOM access (with
limitations) and can dispatch XHRs. The background scripts cannot interact
directly with a loaded webpage, but must act via a content script that they load
into that page context. This communication is via asynchronous 'message passing'
with either side registering message listeners to trigger actions on receipt
([FF][firefox-messaging-guide], [CHR][chrome-messaging-guide]).

4. UI Elements: Possible UI items include
    - 'browser action': the clickable icon in the browser toolbar - an `.html`
    popup may be specified in the manifest
    - 'context menus': the user may want to interact with page items etc. via a
    dropdown menu on right mouseclick
    - a keyboard shortcut
    - page elements (popups, iframes etc.) defined and injected by the extension
    content script itself
    - interactive items in the browser 'devtools' panel (a `devtools.html`
    script must be registered)

5. Options: An options page should allow extension users to specify certain
preferences and choose extension settings.

### Running Extensions Locally

During development, the extension can be loaded from a local folder or file (in
case of Firefox) for testing.
The process is very similar for Chrome and Firefox.

#### Chrome

- navigate to `chrome://extensions/`
- toggle 'developer mode' in top right corner
- select 'load unpacked' from top left options
- choose the extension folder from the displayed file browser

#### Firefox

- compress the extension directory
- navigate to `about:addons`
- select 'Install Add-On from File...' from the settings button on right
- choose the compressed extension from the displayed file browser

### Useful Resources

- [MDN Anatomy of an Extension][mdn-anatomy-webextension]
- [Mozilla Extension Workshop][mozilla-extension-workshop]
- [Chrome Developer Overview][chrome-developer-overview]
- [Chrome Developer Guide][chrome-developer-guide]

<!-- References -->
[mdn-anatomy-webextension]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension
[mozilla-extension-workshop]: https://extensionworkshop.com
[chrome-developer-overview]: https://developer.chrome.com/extensions/overview
[chrome-developer-guide]: https://developer.chrome.com/extensions/devguide
[firefox-manifest-guide]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json
[chrome-manifest-guide]: https://developer.chrome.com/extensions/manifest
[firefox-content-guide]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts
[chrome-content-guide]: https://developer.chrome.com/extensions/content_scripts
[firefox-messaging-guide]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#Communicating_with_background_scripts
[chrome-messaging-guide]: https://developer.chrome.com/extensions/messaging
