<template>
  <main-layout>
    <header class="hero is-medium">
      <div class="hero-body has-text-centered">
        <h1 class="title is-1">
          Exteranto
        </h1>
        <span class="subtitle is-3">
          The awsome browser extension framework.
        </span>
        <div class="action-group mt-2">
          <a target="_blank" href="https://github.com/exteranto/exteranto" class="action is-primary">
            <i class="fa fa-github"></i> GitHub
          </a>
          <a href="https://github.com/exteranto/exteranto/archive/master.zip" class="action is-secondary">
            <i class="fa fa-download"></i> Get .zip
          </a>
        </div>
        <div class="mt-2">
          <div class="columns">
            <div class="column is-4 is-offset-4">
              <pre><code>git clone git@github.com:exteranto/exteranto.git my-app</code></pre>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="section">
      <div class="container content">
        <h2 class="title is-2">Intro</h2>
        <p class="has-text-justified">This is the official page of the Exteranto browser extension framework. Note that the framework is in a beta version and some functionality is yet to be in place. Feel free to contribute to the project or open issues with suggestions regarding the framework.</p>
        <p class="has-text-justified">With this project, our main goal is to unify the APIs for extension development as well as provide an object-oriented and strictly-typed structure to the application. The application comes with a native support for Vue for creating templates in popup and content scripts.</p>
        <p class="has-text-justified">The documentation itself is a subject of continuous development.</p>

        <h2 class="title is-2">Quick Installation</h2>
        <p>To install the framework, simply clone the skeleton and modify it to your needs.</p>
        <pre><code>git clone git@github.com:exteranto/exteranto.git my-app</code></pre>
        <p>You will probably also want to re-initialize git and adjust the contents of <code>package.json</code> to suit your application.</p>

        <h2 class="title is-2">Contribution</h2>
        <p class="has-text-justified">To contribute to any repository you should create your own fork of the repository in question, make your changes and create a pull request with a thorough description of the changes you made. All new functionality should be thoroughly tested. Each library package has it’s own tslint configured and the code style must be followed. All of these rules are enforced using the Travis CI tool.</p>
      </div>
    </main>
  </main-layout>
</template>

<script>
import MainLayout from '@/components/layouts/Main'

export default {
  components: { MainLayout }
}
</script>
