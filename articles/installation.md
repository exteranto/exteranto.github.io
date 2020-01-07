---
title: Installation
layout: page
---

## Installation <!-- omit in toc -->

- [Via the Exteranto CLI](#via-the-exteranto-cli)
- [Manual cloning](#manual-cloning)

### Via the Exteranto CLI

Install the Exteranto CLI and use it to scaffold your application with a single
command.

```bash
npm i -g @exteranto/cli
ext create my-extension
```

### Manual cloning

Or you can clone the `exteranto/exteranto` repository manually.

```bash
git clone git@github.com:exteranto/exteranto.git my-application
cd my-application
npm i
rm -rf .git
git init
```

[Next (Directory Structure) &raquo;][directory-structure]

<!-- References -->

[directory-structure]: /articles/directory-structure
