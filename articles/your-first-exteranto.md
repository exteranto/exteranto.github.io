---
title: Your First Exteranto
layout: page
---

## Your First Exteranto <!-- omit in toc -->

- [First Steps](#first-steps)
- [Run Development Server](#run-development-server)
- [Load the Unpacked Extension](#load-the-unpacked-extension)
- [Outline](#outline)
- [Create a Message](#create-a-message)
- [Create a Background Script Listener](#create-a-background-script-listener)
- [Create a Content Script Listener](#create-a-content-script-listener)
- [Wrapping Up](#wrapping-up)

### First Steps

Check that you have installed the exteranto cli.

```bash
ext -v
```

You should see a version number of `3.1.5` or greater.

Create a new project as described in [Installation][installation].

```bash
ext create my-extension
```

The `create` command will generate a `my-extension` project in your current
directory:

```
my-extension/
  config/
    index.ts
  src/
    app/
      background/
      content/
    assets/
    exceptions/
    messages/
    providers/
  static/
    logo.png
  test/
  .env
  manifest.json
  package.json
  ...
```

Refer to the [Directory Structure][directory-structure] article for detailed
description of generated contents.

For the purpose of this tutorial we restrict ourselves to working within the
`src/app` and `src/messages` folders mainly.


### Run Development Server

Run the development sever with the `watch` command:

```bash
npm run watch
```

Warning of unresolved dependencies can be fixed with a fresh npm install.

Once the script is active you should see the following output:

```bash
  DONE  Compiled successfully

  ✔ Manifest file found.
  ✔ [chrome] extension packed.
  ✔ [safari] extension packed.
  ✔ [extensions] extension packed.

  Your extension was successfully built.
```

### Load the Unpacked Extension

Running `watch` will execute a project build, resulting in `dist` and `packs`
folders being created in the project root directory.

`dist` contains the transpiled extension files `background.js` and `content.js`.

`packs` contains uncompressed browser extension packages to be loaded in the
browser locally. Loading from packs into the browser, we have the benefit of hot
reloading during debugging and development, though the extension still needs to
be manually refreshed from within the browser itself.

To install the extension locally for develpment and debugging open Chrome and
navigate to the `chrome://extensions` page where you can toggle developer mode,
'load unpacked' extension and choose the 'chromeextension' folder from `packs`.
[Browser Extension Basics][browser-extension-basics] has further details.

You will see an entry for 'Browser Extension 0.0.1' listed (the extension name
and version are specified in `manifest.json`). Click the link to the 'background
page' and a console window will open displaying the Exteranto welcome message.


### Outline

For this tutorial, we will create a very simple extension with no UI, just a
background script that listens for a specific browser event and then dispatches
a message to the content script, which will perform some action.

1. Define a message to be dispatched between background and content
2. Define and register the background script listener
3. Define and register the content script listener

The browser event that triggers our background script will be 'Browser Action'
click, meaning that the toolbar icon associated to our installed extension has
been clicked by the user.

In order to register this event we must provide access in the project config.
Navigate to to `config/index.ts` and under `providers` add an entry for
`BrowserActionProvider`. We will need to ensure that the provider is imported by
the config:

```typescript
  import { BrowserActionProvider } from '@exteranto/api'
```

### Create a Message

In `src/messages` create a `PingContentScriptMessage.ts`, open and add the
following:

```typescript
  import { Message } from '@exteranto/core'

  export class PingContentScriptMessage extends Message {
    //
  }
```

The `Message` class itself extends `Event` and is defined in Exteranto core
modules. We need not define any properties on the `PingContentScriptMessage`
class, since the action of receiving it will be enough for our purposes here,
but we could provide additional data in the constructor that can be accessed by
the message receiver.


### Create a Background Script Listener

Now, in `src/background` open `events.ts`. You will see that a few events are
already imported by default (`AppBootedEvent` and `Exception`). Below these,
some 'listeners' are imported. You will see that two of these listeners are
local to the `/listeners` folder.

Below these imports, `events.ts` exports a sequence of listener -> event
registrations using `touch(...).addListener(...)`. For example,
`ShowWelcomeMessage` is registered to `AppBootedEvent`.

Let's import a new event, `BrowserActionClicked`, which we import not from
`exteranto/core` but `exteranto/api`.

```typescript
  import { BrowserActionClickedEvent } from '@exteranto/api'
  import { AppBootedEvent, Exception } from '@exteranto/core'
```

Now we can register a listener on this event:

```typescript
  touch(BrowserActionClickedEvent)
    .addListener(new PingContentScriptListener)
```

The editor should complain that no `PingContentScriptListener` can be found. We
must create and then import it.

In `/listeners` create a new file `PingContentScriptListener.ts` and add the
following:

```typescript
  import { Listener } from '@exteranto/core'

  export class PingContentScriptListener implements Listener {
    //
  }
```

We implement the `Listener` interface, which defines a `handle` method expecting
an optional `Event` argument. To stop the Editor complaining let's add a public
`handle` method:

```typescript
  export class PingContentScriptListener implements Listener {

    public handle () : void {
      //
    }
  }
```

The `handle` method will need to dispatch our message to the content script. In
order to obtain a reference to the content script, which runs in the context of
a browser tab, we must register our listener as dependent on the tabs service.
Then we can import the message and send it from the handler. Exteranto provides
the `@Autowired` annotation to easily resolve dependencies - here we can use it
to resolve the listener's dependency on 'Tabs'. For more on extranto dependency
management see [Handling the IOC Container][ioc-container]

```typescript
  import { Tabs } from '@exteranto/api'
  import { Autowired, Listener } from '@exteranto/core'
  import { PingContentScriptMessage } from '../../../messages/PingContentScriptMessage'

  export class PingContentScriptListener implements Listener {

    @Autowired
    private tabs: Tabs

    public handle () : void {
      //
    }
  }
```

Now we can dispatch our message to the active tab:

```typescript
    public handle () : void {
      this.tabs.active()
        .then(tab => tab.send(new PingContentScriptMessage))
        .catch(() => console.error('Could not deliver message'))
    }
```

Don't forget to import your listener in `events.ts`.

```typescript
  import { PingContentScriptListener } from './listeners/PingContentScriptListener'
```

### Create a Content Script Listener

The process of defining and registering a listener in the content script is more
or less identical.

Navigate to the `app/content` directory and open `events.ts`. Here we can import
the message we defined and register a listener, just as we did for the
`BrowserActionClicked` event in `background`.

```typescript
  import { PingContentScriptMessage } from '../../messages/PingContentScriptMessage'
```

> Note: for larger projects, keep imports organised into 'Events' and 'Messages'
> categories.

Now register a listener and create it in the `listeners` directory:

```typescript
  touch(PingContentScriptMessage)
    .addListener(new LogMessageReceivedListener)
```

Create `listeners/LogMessageReceivedListener.ts` and define the class with a
handler expecting an instance of `PingContentScriptMessage` as an argument
(remember to import the message).

``` typescript
  import { Listener } from '@exteranto/core'
  import { PingContentScriptMessage } from '../../../messages/PingContentScriptMessage'


  export class LogMessageReceivedListener implements Listener {

    public handle (message: PingContentScriptMessage) : void {
      console.log('Message Received!')
    }

  }
```

### Wrapping Up

Now return to the browser - if everything has saved properly, you should be able
to update the loaded extension by clicking the refresh icon. Now, in a new tab
open on any url other than `chrome://` or webstore (unless these have been
specified beforehand in the `manifest.json` permissions), open the console and
click the browser action icon. A message should read 'Message Received!'

<!-- References -->

[browser-extension-basics]: /articles/browser-extension-basics
[directory-structure]: /articles/directory-structure
[ioc-container]: /articles/ioc-container
[installation]: /articles/installation
