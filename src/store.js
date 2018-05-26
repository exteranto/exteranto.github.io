import Vue from 'vue'
import Vuex from 'vuex'
import config from 'config'
import Cache from '@/core/Cache'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    docs: {},
    snippets: {}
  },

  getters: {
    docs: state => state.docs
  },

  mutations: {
    updateDocs (state, { name, docs }) {
      state.docs[name] = docs
    },

    updateSnippets (state, { name, snippet }) {
      state.snippets[name] = snippet
    }
  },

  actions: {
    async loadDocs ({ commit, dispatch, state }, { name }) {
      if (state.docs[name]) {
        return state.docs[name]
      }

      return Cache.store(name, () => {
        return Vue.prototype.$http.get(`${config.s3}/${name}.json`)
          .then(response => response.data)
      }).then((docs) => {
        commit('updateDocs', { name, docs })

        return docs
      })
    },

    async loadSnippet ({ commit, dispatch, state }, { name }) {
      if (state.snippets[name]) {
        return state.snippets[name]
      }

      return Cache.store(name, () => {
        return Vue.prototype.$http.get(`${config.s3}/snippets/${name.replace('s3:', '')}`)
          .then(response => response.data)
      }).then((snippet) => {
        commit('updateSnippets', { name, snippet })

        return snippet
      })
    }
  }
})
