---
title: IOC Container
layout: page
---

## Handling the IOC Container <!-- omit in toc -->

The IOC container is the heart of Exteranto. It provides an easy and convenient
way to handle your services and their dependencies. When using TypeScript,
Exteranto delivers a set of TypeScript decorators that let you bind and resolve
dependencies from the container on a single line while retaining flexibility.

- [Basic Example](#basic-example)
- [Binding Dependencies to the Container](#binding-dependencies-to-the-container)
  - [Via the Container Class & Service Providers](#via-the-container-class--service-providers)
  - [Via Class Decorators](#via-class-decorators)
- [Resolving Dependencies from the Container](#resolving-dependencies-from-the-container)
  - [Via the Container Class](#via-the-container-class)
  - [Via Property Decorators](#via-property-decorators)
- [Container Parameters](#container-parameters)
- [Advanced Functionality](#advanced-functionality)
  - [Binding to a Superclass](#binding-to-a-superclass)
  - [Browser-dependant & Tagged Services](#browser-dependant--tagged-services)
  - [Resolving Optional Dependencies](#resolving-optional-dependencies)
- [Error Handling](#error-handling)

### Basic Example

```typescript
// MyService.ts
import { Singleton } from '@exteranto/core'

@Singleton
export class MyService {
  // Service implementation...
}
```

```typescript
// DependentService.ts
import { MyService } from './MyService'
import { Autowired } from '@exteranto/core'

export class DependentService {
  @Autowired
  private service: MyService
}
```

The example defines a `MyService` dependency to the container in the singleton
scope and the later in the `DependentService`, it is resolved using the
`@Autowired` decorator. No arguments are required for the decorator as it looks
at the class field type while resolving a dependency.

### Binding Dependencies to the Container

There are three main ways to bind dependencies to the container. We shall
discuss all three in this chapter.

#### Via the Container Class & Service Providers

The most straightforward way to define dependencies to the container is to use
the `Container` class itself. It provides the `bind<T>` method that accepts the
dependency constructor and returns a `Dependency<T>` instance. Further
configuration can be attached to the dependency using the `Dependency<T>`
interface.

> See the whole [`Dependency<T>`][Dependency] interface in Exteranto
> [API Reference][api-reference].

```typescript
import { MyService } from './MyService'
import { Container } from '@exteranto/core'

Container
  .getInstance()
  .bind<MyService>(MyService)
  .toSelf()
```

To avoid the `Container.getInstance()` call, the package provides a `@Self`
property decorator that resolves the current container instance and assigns it
to the decorated class property.

```typescript
import { MyService } from './MyService'
import { Container } from '@exteranto/core'

export class Provider {
  @Self
  private container: Container

  public bindMyService () : void {
    this.container.bind<MyService>(MyService).toSelf()
  }
}
```

The standard way to define dependencies (this is especially useful when
building a separate package) is to use a **service provider**. Service providers
are classes that are specified in the application configuration. Exteranto
executes these classes on application boot and provides essential services like
the container instance to the provider methods.

> Read more on [Service Providers][service-providers] and
> [Application Configuration][app-configuration].

```typescript
import { MyService } from './MyService'
import { Provider } from '@exteranto/core'

export class AppProvider extends Provider {
  public boot () : void {
    // The boot method usually binds dependencies to
    // the container. Note that the container instance
    // is automatically available on the provider class.
    this.container.bind<MyService>(MyService).toSelf()
  }
}
```

#### Via Class Decorators

Exteranto provides a set of class decorators that make binding dependencies to
the container a piece of cake. There are two annotations, and the only
difference is the scope that the dependency is bound in. Either `@Singleton` to
bind a service in a singleton scope or `@Binding`.

> Note that, however, these decorators are convenient to use, it is discouraged
> to use them in standalone packages to prevent container pollution. Packages
> _should_ define their functionalities in service providers.

```typescript
import { Singleton } from '@exteranto/core'

@Singleton
export class MyService {
  //
}
```

### Resolving Dependencies from the Container

#### Via the Container Class

The `Container` class itself provides a `resolve<T>` method that tries to
resolve a dependency from the container. It takes in the service constructor and
returns an instance.

> Note that while this approach is perfectly okay, property decorators should be
> your go-to option for resolving dependencies. Not only do they provide a clean
> syntax, but they also support good practices and object-oriented code
> structure.

```typescript
import { MyService } from './MyService'
import { Container } from '@exteranto/core'

const service: MyService = Container
  .getInstance()
  .resolve<MyService>(MyService)

console.assert(service instanceof MyService)
```

#### Via Property Decorators

Property decorators should be the go-to way to resolve dependencies in
Exteranto. There are two basic decorators.

- `@Autowired` decorator that resolves the dependency automatically based on the
  type of the decorated class property.
- `@With<T>` this decorator also resolve the dependency based on type but it
  also accepts an array of arguments to supply to the dependency constructor.

```typescript
import {
  With,
  Autowired,
  Singleton,
} from '@exteranto/core'

@Singleton
class MyService {
  //
}

@Singleton
class MyServiceWithConstructor {
  constructor (private type: string) {
    //
  }
}

class Dependant {
  @Autowired
  private mySerivce: MySerivce

  @With<MyServiceWithConstructor>(['normal'])
  private myOtherService: MyServiceWithConstructor
}
```

### Container Parameters

Exteranto also allows you to bind parameters to the container. This is achieved
either via the application configuration file (which is also the prefered way)
or via the `Container`'s `bindParam` method.

These parameters can then be resolved using the `Container.resolveParam<T>`
method or the `@Param<T>` property decorator.

> Read more on [Application Configuration][app-configuration].

```typescript
import { Container } from '@exteranto/core'

Container
  .getInstance()
  .bindParam('version', '1.0.0')

// Resolve via `resolveParam<T>`.
const version: string = Container
  .getInstance()
  .resolveParam<string>('version')

// Resolve via the `@Param<T>` decorator.
class MyService {
  @Param<string>('version')
  private version: string
}
```

### Advanced Functionality

Although the basic funcionality is often sufficient, some edge cases require the
container to be more flexible. That's why the container has various advanced
features like binding to a superclass, service tagging, and resolving
dependencies as an `Optional<T>`.

#### Binding to a Superclass

Exteranto's IOC Container allows you to bind dependencies to a superclass. This
allows to switch implementations in the application if the new implementation
extends the same superclass. Consider the following example:

> Note that you cannot bind a dependency to an interface in TypeScript as
> all interfaces are removed at compilation.

```typescript
import { Container } from '@exteranto/core'

abstract class Storage {
  abstract get<T> (key: string) : T
  abstract set<T> (key: string, value: T) : void
}

class LocalStorage extends Storage {
  get<T> (key: string) : T {
    // Implemetation...
  }

  set<T> (key: string, value: T) : void {
    // Implemetation...
  }
}

// Now we can bind the concrete implementation
// to the abstract superclass.
Container.bind<Storage>(LocalStorage).to(Storage)

console.assert(
  Container.resolve<Storage>(Storage) instanceof Storage
)
```

> Note that subsequent bindings to the same superclass override the previous
> binding. If you want to be able to swap implementations dynamically, consider
> tagging the bindings.

#### Browser-dependant & Tagged Services

As previously noted, binding a new implementations to the same superclass
overrides the previously bound implementation. To avoid this behaviour, one has
to differentiate the implementations by either tagging each one of them or by
binding them to a specific browser. In the following example, we have a service
that behaves differently in each browser. Exteranto automatically resolves the
current instance based on the environment.

```typescript
import { Container, Browser } from '@exteranto/core'
// Three different implementations of the
// `Service` superclass.
import {
  Service,
  ChromeService,
  SafariService,
  FirefoxSerivice,
} from '...'

// Now we can bind the implementations to the
// abstract superclass based on the browser
// environment.
Container.bind<Service>(ChromeService)
  .to(Service).for(Browser.CHROME)

Container.bind<Service>(SafariService)
  .to(Service).for(Browser.SAFARI)

Container.bind<Service>(FirefoxSerivice)
  .to(Service).for(Browser.EXTENSIONS)
```

#### Resolving Optional Dependencies

Exteranto provides a convenient way of resolving dependencies that might not be
present in the container via the `resolveOptional` container method. This method
always resolves and instance of `Optional<T>`. If the binding is present, the
optional is `Some<T>`, otherwise it is `None<T>`. No exceptions are thrown in
the process.

```typescript
import { Service } from '...'
import { Container, Optional } from '@exteranto/core'

const service: Optional<Service> = Container
  .resolveOptional<Service>(Service)

console.assert(
  typeof service.isSome() === 'boolean'
)
```

> Read more on the `Optional<T>` interface in the Exteranto
> [API Reference][api-reference].

### Error Handling

If the desired dependency is not present in the container, the `resolve` method
throws a `DependencyNotFoundException`. Similarly, the `resolveParam` method
throws a `ParameterNotFoundException`. If you do not desire to throw an error
when resolving a non-existent dependency, consider reading up on
[Resolving Optional Dependencies](#resolving-optional-dependencies).

<!-- References -->
[Dependency]: TODO

[app-configuration]: /articles/application-configuration
[service-providers]: /articles/service-providers
[api-reference]: TODO
