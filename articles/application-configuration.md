---
title: Application Configuration
layout: page
---

## Application Configuration <!-- omit in toc -->

Exteranto skeleton ships with a default configuration file which is located at
`config/index.ts`. This article goes line by line through this file and
describes the purpose of each section. It also tackles on environment variables
and how to handle them.

- [Overview](#overview)
- [Providers](#providers)
- [Bound](#bound)
- [Environment](#environment)

### Overview

The configuration file is just a plain JavaScript object and after a fresh
installation will have a following structure:

``` typescript
export default {
  providers: [
    // ...
  ],

  bound: {
    // ...
  },
}
```

### Providers

This array is usually prepopulated with Exteranto specific providers that
register the browser API services, such as `TabsProvider`, `MessagingProvider`
and similar.

> Not that the [Service Providers][service-providers] article directly descrives
> what is a service provider used for. This topic is also directly connected to
> the [IOC Container][ioc-container].

### Bound

The bound objects allows the developer to specify any parameters that are later
available via the Container `@Param` decorator. Note that these values are not
restriced in any way and references to specific instances are kept. In the
following example, a parameter is defined in the container via the `bound`
confuguration object. It is also shown how to resolve this parameter in a class
context.

The `@Param` decorator accepts an argument which corresponds to a path to the
desired variable inside the `bound` object via the _dot notation_.

> More information about these decorators is provided in the
> [IOC Container][ioc-container] article.

```typescript
export default {
  // ...
  bound: {
    app: { name: 'my-extension' }
  }
}
```

```typescript
import { Param } from '@exteranto/core'

export class MyService {
  @Param('app.name')
  private name: string

  public run () {
    console.assert(this.name === 'my-extension')
  }
}
```

### Environment

Exteranto provides example environment files in its skeleton application named
`.env.dev` and `.env.prod`, both in the root directory. All variables in this
file **have to** be prepended with `"ETX_"`, otherwise the parser will skip
them. The data is then available via Exteranto's custom global variable `$env`.
Consider the following example.

> Note: it is recommended to only access the `$env` object in your config files
> and provide the data via `@Param`.

`.env.prod`
```
EXT_NAME="Awesome Extension"
```

`config/index.ts`
```typescript
export default {
  // ...
  bound: {
    app: { name: $env.NAME }
  }
}
```

To build the extension for different environments refer to the Exteranto CLI
command via `ext build --help`.

<!-- References -->
[Dependency]: TODO

[service-providers]: /articles/service-providers
[ioc-container]: /articles/ioc-container
