import md5 from 'md5'

export default {

  timeout: 600,

  async store (key, cacheable) {
    const hashed = this.hashKey(key)
    const now = Date.now()
    let value = JSON.parse(window.localStorage[hashed] || null)

    if (!value || value.expires < now) {
      window.localStorage[hashed] = JSON.stringify(value = {
        expires: now + (this.timeout * 1000),
        data: await cacheable()
      })
    }

    return value.data
  },

  hashKey (key) {
    return `cache__${md5(key)}`
  }
}
