<template>
  <api-layout>
    <h1 class="title is-3">@exteranto/cache</h1>
    <span class="subtitle is-5">The cache driver for the Exteranto framework.</span>

    <hr>

    <block title="class <code>Cache</code><br>usage <code>import { Cache } from '@exteranto/cache'</code>">
      <block title="method <code>Cache.store(key: string, storable: () => any, timeout?: number) : Promise any</code>">
        <p>Stores a callback return value in the cache. On consecutve calls resolves this value from the cache.</p>
        <strong>Example Code</strong>
        <snippet lang="typescript">
this.cache.store('current-time', () => new DateTime, 60)
        </snippet>
        <strong>Parameters</strong>
        <ul>
          <li><code>key: string</code> The cache key to be used</li>
          <li><code>storable: () => any</code> The callback, its return value will be cached, note that this CAN be a promise</li>
          <li><em>(optional)</em> <code>timeout: number</code> The timeout, default timeout can be set in config</li>
        </ul>
        <strong>Returns</strong>
        <ul>
          <li><code>Promise any</code> A promise with the callback return value or the cached value</li>
        </ul>
      </block>

      <block title="method <code>Cache.clear() : Promise void</code>">
        ...
      </block>
    </block>
  </api-layout>
</template>

<script>
import Block from '@/components/elements/Block'
import ApiLayout from '@/components/layouts/Api'
import Snippet from '@/components/elements/Snippet'
export default {
  components: { ApiLayout, Block, Snippet }
}
</script>
