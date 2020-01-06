---
title: Directory Structure
layout: page
---

## Directory Structure <!-- omit in toc -->

- [Base directory](#base-directory)
  - [/config](#config)
  - [/src](#src)
  - [/static](#static)
  - [/test](#test)
- [The /src directory](#the-src-directory)
  - [/app](#app)
  - [/assets](#assets)
  - [/exceptions](#exceptions)
  - [/messages](#messages)
  - [/providers](#providers)

### Base directory

#### `/config`

A folder containing a single `index.ts` file that exports the application
config. Read more about configuration in the
[Application Configuration][application-configuration] article.

#### `/src`

This folder contains all your extension's source code. All of its contents and
subfolders will be covered in more detail in the next section of this article.

#### `/static`

A space dedicated to store your static assets, like images or documents. These
assets can then be accessed from the codebase via the [`Extension`][Extension]
APIs.

#### `/test`

The `test` directory contains a unit test scaffold based on [`mocha`][mocha].

---

### The `/src` directory

#### `/app`

The `app` folder contains all main application logic that **needs to be split**
between the _background_ script and the _content_ script&mdash;hence the only
two subfolders are `app/background` and `app/content`.

Each of these directories includes 2 files and a folder by default.

- **`main.ts`** is the entry point of the respective script. This file is
provided by Exteranto and should bot be changed unless strictly necessary. It
boots the framework, registers listeners and loads application config.

- **`events.ts`** is the application "router" and event listener registrar in
one. The file is used to register listeners to various events&mdash;both
cross-script and within a script (bakground/content). Read more about how
events and messages work in the [Typed Message Passing][typed-message-passing]
article.

- **`/listeners`** is a default folder to store script-specific listeners. A
simple listener is created and registered by Exteranto for demonstration. More
about listeners in the previously mentioned
[Typed Message Passing][typed-message-passing] article.

#### `/assets`

This folder contains assets that need to be compiled with the source code.
Exteranto supports `.sass` styling by default.

#### `/exceptions`

The `exceptions` directory contains global definitions for exteption classes.

#### `/messages`

The `messages` directory contains global definitions for message classes. Read
more about how messages work in the
[Typed Message Passing][typed-message-passing] article.

#### `/providers`

This folder contains service provider classes for registering custom services or
events. Read more about these in the [Service Providers][service-providers]
article.

[&laquo; Previous (Installation)][installation]
|
[Next (Application Configuration) &raquo;][application-configuration]

<!-- References -->
[Extension]: TODO

[installation]: /articles/installation
[service-providers]: /articles/service-providers
[typed-message-passing]: /articles/typed-message-passing
[application-configuration]: /articles/application-configuration

[mocha]: https://mochajs.org/
