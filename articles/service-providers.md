---
title: Service Providers
layout: page
---

## Service Providers <!-- omit in toc -->

As in many other frameworks, providers in Exteranto serve as primary means of
registering services. These services can be native from Exteranto, third-party
services or even those created in the application itself.

- [Methods](#methods)
- [Registering the Provider](#registering-the-provider)

### Methods

Exteranto provides an abstract class [`Provider`][Provider] that comes with
three methods:

- `boot`—method that is desiged to bind dependencies to the container. These are
  executed first and all provider `boot` methods run before the `register`
  methods.
- `register`—method that should register application or package events. This
  method is executed in a booted scope of the application.
- `only`—specifies an array of scripts this providers should be registered for.
  Providers are registered for both content and background scripts by default.

All providers have access to a `container` class variable that references the
current instance of the [IOC Container][ioc-container], and a `dispatcher`
class variable containing a reference to the
[Event Dispatcher][typed-message-passing].

Here is an example of a healthy service provider:

```typescript
import { Event } from '...'
import { Service } from '...'
import { Listener } from '...'

import {
  Script,
  Provider,
  Dispatcher,
} from '@exteranto/core'

export class AppProvider extends Provider {
  public only () : Script[] {
    return [Script.BACKGROUND]
  }

  public boot () : void {
    this.container.bind(Service).toSelf()
  }

  public register () : void {
    this.dispatcher.touch(Event)
      .addLisgtener(Listener)
  }
}
```

### Registering the Provider

All providers are registered in the
[Application Configuration][application-configuration] file in the `providers`
array. If using the exteranto skeleton application, the correct place to
register a provider is demarcated by a comment.

<!-- References -->
[Provider]: TODO

[ioc-container]: /articles/ioc-container
[typed-message-passing]: /articles/typed-message-passing
[application-configuration]: /articles/application-configuration
