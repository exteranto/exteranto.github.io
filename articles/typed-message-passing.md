---
title: Typed message passing
layout: page
---

## Typed message passing <!-- omit in toc -->

### Prerequisites
This article assumes you are familiar with a basic extension architecture.
If you are just getting started with browser extensions, see
[this overview][ext-overview] by Chrome.

It is also beneficial to understand the [IOC Container][ioc-container] and
[App booting][app-booting]. Especially if you experiment with the code samples.

- [Prerequisites](#prerequisites)
- [Events](#events)
  - [Firing an event](#firing-an-event)
  - [Handling an event](#handling-an-event)
  - [Putting it together](#putting-it-together)
- [Messaging](#messaging)
  - [Communication channels](#communication-channels)
  - [Messages](#messages)
  - [Background script to content script](#background-script-to-content-script)
  - [Content script to background script](#content-script-to-background-script)
- [Middleware](#middleware)
- [Routing](#routing)
- [Known drawbacks](#known-drawbacks)

### Events
Events are messages fired only within the context of a single script. If you
fire an event in tab A's content, other scripts will have no knowledge of it.
Events are baked into Exteranto. They are
- a bridge between native browser events and your app. For example the
[chrome.runtime.onInstalled][ext-onInstalled] event is in Exteranto fired as
[`ExtensionInstalledEvent`][ExtensionInstalledEvent] and
[`ExtensionUpdatedEvent`][ExtensionUpdatedEvent];

- a convenient way to inform about changes in application. For example events
[`WindowLoadedEvent`][WindowLoadedEvent] and [`AppBootedEvent`][AppBootedEvent];

- useful if you have to handle interaction between multiple independent
parts of your app.

#### Firing an event
Creating a new event is very simple. Any class can be an event in exteranto as
long as it extends [`Event`][Event] class.

The `SampleEvent.ts` file:
```typescript
import { Event } from '@exteranto/core'

export class SampleEvent extends Event {

  /**
   * @param message Payload to be sent with an event
   */
  public constructor (public message: string) {
    //
  }

}
```

We have to trigger the `SampleEvent` somewhere. Let's create another listener
that listens to `AppBootedEvent` and then fires `SampleEvent` every second.
The `FiresSampleEventAfterBoot.ts` file:
```typescript
import { SampleEvent } from './SampleEvent'
import { AppBootedEvent, Dispatcher, Listener } from '@exteranto/core'

export class FiresSampleEventAfterBoot implements Listener {

  /**
   * Dispatcher to fire events with.
   */
  @Autowired
  private dispatcher: Dispatcher

  /**
   * Starts firing events after app boot.
   *
   * @param event Exteranto app is ready
   */
  public handle (event: AppBootedEvent) : void {
    setInterval(() => {
      this.dispatcher.fire(new SampleEvent('Hello world!'))
    }, 1000)
  }

}
```

#### Handling an event
Now we have to create a listener that handles the event.
The `PrintsContent.ts` file:
```typescript
import { Listener } from '@exteranto/core'
import { SampleEvent } from './SampleEvent'

export class PrintsContent implements Listener {

  /**
   * Prints an event message.
   *
   * @param event Typed event
   */
  public handle (event: SampleEvent) : void {
    console.log(`[${new Date}] ${event.message}`)
  }

}
```

Let's route the event to its listener.
The `events.ts` file:
```typescript
import { SampleEvent } from './SampleEvent'
import { PrintsContent } from './PrintsContent'
import { AppBootedEvent } from '@exteranto/core'
import { FiresSampleEventAfterBoot } from './FiresSampleEventAfterBoot'

export default (touch: (event: Class<Event>) => ListenerBag) => {

  touch(AppBootedEvent)
    .addListener(new FiresSampleEventAfterBoot)

  touch(SampleEvent)
    .addListener(new PrintsContent)

}
```

#### Putting it together
And finally booting the app. After we run this code, we have to open the
background console. Every second, a new `Hello world!` string is printed along
with the timestamp.
The `main.js` file:
```typescript
import events from './events'
import { App, Script } from '@exteranto/core'

const app: App = new App(
  Script.BACKGROUND,
  {
    providers: [],
    bound: {},
  },
  events,
)

app.bootstrap()
```

### Messaging
There are two actor types. Background, _server-like_ master script, and content.
There is always one background and an arbitrary number of contents.

Background can send a message to any content, and each content can only send
messages to the background. This is not different from the usual extension
architecture.

#### Communication channels
Before we can start sending messages around, we have to boot the channels.
Messaging directly depends on [`MessagingProvider`][MessagingProvider]. Sending
messages from background to content depends on [`TabsProvider`][TabsProvider].

#### Messages
All messages have to extend [`Message`][Message] class, which is a child of
[`Event`][Event]. A message has to have `public payload: T` constructor
parameter which is not cyclic neither contains a cyclic object. This `payload`
property goes through `JSON.stringify` and is sent to the receiving script.
There the message is instantiated again with the `JSON.parse`d payload which is
passed into the constructor.

The whole process looks like this:

1. `SampleMessage` class accepts object into its constructor
2. We `send(new SampleMessage({ text: 'hello' }))`
3. Payload `{ text: 'hello' }` is stringified to `"{"text":"hello"}"` and sent
to the receiving script
4. Receiving script `JSON.parse`s the payload which results in `{ text: 'hello '}`
5. Receiving script instantiates `new SampleMessage('hello')` and it is routed to
appropriate listener

The `SampleMessage.ts` file has to be somewhere in between background and content
files as it's a common language:
```typescript
import { Message } from `@exteranto/api`

export interface SampleMessagePayload {

  text: string

}

export class SampleMessage extends Message {

  /**
   * We can also define methods that work with the data in the payload.
   *
   * @return Upper-cased text
   */
  public get textUppercase () : string {
    return this.payload.text.toUpperCase()
  }

  public constructor (public payload: SampleMessagePayload) {
    //
  }

}
```

A **background** listener in the `PrintsContent.ts` file:
```typescript
import { Listener } from '@exteranto/core'
import { SampleMessage } from '...'

export class PrintsContent {

  /**
   * Prints out uppercase text.
   *
   * @param message Typed message
   */
  public handle (message: SampleMessage) : void {
    console.log(`Message sent from tab ${message.context.tabId}:`)
    console.log(`[${new Date}] ${message.textUppercase}`)
  }

}
```

And now we can send the message from **content** in similar manner we have sent
the events in previous section:
```typescript
import { SampleMessage } from '...'
import { Messaging } from '@exteranto/api'
import { Autowired, Listener, WindowLoadedEvent } from '@exteranto/core'

export class FiresSampleMessagesOnWindowLoad {

  /**
   * Messaging instance to send the messages.
   */
  @Autowired
  private messaging: Messaging

  /**
   * Once the window object is loaded in the content script, we fire SampleMessage.
   *
   * @param _ Typed event
   */
  public handle (_: WindowLoadedEvent) : void {
    setTimeout(() => {
      this.messaging.send(new SampleMessage({
        text: 'Hello world from content script!',
      }))
    }, 1000)
  }

}
```

We boot the app in both content and background script and route the messages
in `events.ts`-like file as we did in the previous section.

#### Background script to content script

#### Content script to background script

### Middleware

### Routing

### Known drawbacks
- [Issue #125](https://github.com/exteranto/framework/issues/125)

<!-- References -->
[ext-overview]: https://developer.chrome.com/extensions/overview
[ext-onInstalled]: https://developer.chrome.com/apps/runtime#event-onInstalled

[ExtensionInstalledEvent]: TODO
[ExtensionUpdatedEvent]: TODO
[WindowLoadedEvent]: TODO
[AppBootedEvent]: TODO
[MessagingProvider]: TODO
[TabsProvider]: TODO
[Event]: TODO
[Message]: TODO

[app-booting]: TODO
[ioc-container]: /articles/ioc-container
